/* ==========================================================================
   Leen Nimer — site script
   Vanilla JS · GSAP + ScrollTrigger + Lenis (CDN)
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     0. Helpers + environment
     ------------------------------------------------------------------------ */
  var d = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var mq = function (q) { return window.matchMedia(q); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var env = {
    reduce: mq('(prefers-reduced-motion: reduce)').matches,
    fine: mq('(hover: hover) and (pointer: fine)').matches,
    saveData: !!(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''))),
    desktop: function () { return mq('(min-width: 1024px)').matches; }
  };

  var store = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  var hasGSAP = !!(window.gsap && window.ScrollTrigger);
  window.__siteReady = true;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  var nav = $('[data-nav]');
  var navH = function () { return nav ? nav.offsetHeight : 76; };

  /* ------------------------------------------------------------------------
     1. Toast + copy email
     ------------------------------------------------------------------------ */
  var toastEl = $('[data-toast]');
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2200);
  }

  function initCopyEmail() {
    $$('[data-copy-email]').forEach(function (a) {
      a.setAttribute('data-cursor', 'Copy');
      a.addEventListener('click', function () {
        var email = a.getAttribute('data-copy-email');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(function () { toast('Email copied: ' + email); }, function () {});
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. Scenes: posters, scroll-scrubbed video, inline loops, fallbacks
     ------------------------------------------------------------------------ */
  function Scene(el) {
    this.el = el;
    this.ready = el.getAttribute('data-ready') === 'true';
    this.fallback = $('.scene__fallback', el);
    this.video = null;
    this.duration = 0;
    this.target = 0;
    this.current = 0;
    this.loading = false;
    this.fallbackFn = null;
  }

  Scene.prototype.insert = function (node) {
    var scrim = $('.hero__scrim', this.el);
    if (scrim) this.el.insertBefore(node, scrim); else this.el.appendChild(node);
  };

  Scene.prototype.poster = function (priority) {
    if (!this.ready || this.posterEl) return;
    var base = this.el.getAttribute('data-poster');
    var pic = document.createElement('picture');
    var source = document.createElement('source');
    source.srcset = base + '.webp';
    source.type = 'image/webp';
    var img = document.createElement('img');
    img.className = 'scene__poster';
    img.alt = '';
    img.decoding = 'async';
    if (priority) img.fetchPriority = 'high'; else img.loading = 'lazy';
    img.addEventListener('load', function () { img.classList.add('is-ready'); });
    img.src = base + '.jpg';
    pic.appendChild(source);
    pic.appendChild(img);
    this.insert(pic);
    this.posterEl = img;
  };

  Scene.prototype.makeVideo = function () {
    var v = document.createElement('video');
    v.className = 'scene__media';
    v.muted = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('aria-hidden', 'true');
    v.setAttribute('tabindex', '-1');
    v.disablePictureInPicture = true;
    return v;
  };

  /* Desktop: fetch whole clip as a Blob so seeking never waits on the network */
  Scene.prototype.loadScrub = function () {
    if (!this.ready || this.loading) return;
    this.loading = true;
    var self = this;
    var src = this.el.getAttribute('data-video');
    var v = this.makeVideo();
    v.preload = 'auto';
    v.addEventListener('loadedmetadata', function () { self.duration = v.duration || 0; }, { once: true });
    v.addEventListener('canplaythrough', function () { v.classList.add('is-ready'); }, { once: true });
    var attach = function (url) {
      v.src = url;
      self.insert(v);
      self.video = v;
      var p = v.play();
      if (p && p.then) p.then(function () { v.pause(); }, function () {});
    };
    if (window.fetch && window.URL && URL.createObjectURL) {
      fetch(src).then(function (r) { if (!r.ok) throw new Error('video'); return r.blob(); })
        .then(function (b) { attach(URL.createObjectURL(b)); })
        .catch(function () { attach(src); });
    } else {
      attach(src);
    }
  };

  /* Mobile: lightweight inline loop that only plays while visible */
  Scene.prototype.loadLoop = function () {
    if (!this.ready || this.loading) return;
    this.loading = true;
    var v = this.makeVideo();
    v.loop = true;
    v.preload = 'metadata';
    v.src = this.el.getAttribute('data-video-mobile');
    v.addEventListener('canplay', function () { v.classList.add('is-ready'); }, { once: true });
    this.insert(v);
    this.video = v;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          else v.pause();
        });
      }, { threshold: 0.4 }).observe(this.el);
    }
  };

  Scene.prototype.setProgress = function (p) {
    p = clamp(p, 0, 1);
    if (this.video && this.duration && !this.video.loop) this.target = p * Math.max(0, this.duration - 0.05);
    if (this.fallbackFn && !(this.video && this.video.classList.contains('is-ready'))) this.fallbackFn(p);
  };

  Scene.prototype.tick = function () {
    var v = this.video;
    if (!v || v.loop || !this.duration || v.seeking) return;
    var diff = this.target - this.current;
    if (Math.abs(diff) < 0.001) return;
    this.current += diff * 0.12;
    if (Math.abs(v.currentTime - this.current) > 1 / 48) {
      try { v.currentTime = this.current; } catch (e) { /* ignore */ }
    }
  };

  var scenes = $$('[data-scene]').map(function (el) { return new Scene(el); });
  var sceneHero = scenes[0], scenePillars = scenes[1], sceneFinale = scenes[2];

  /* Fallback motion: keeps the frames alive until the generated clips exist */
  (function fallbacks() {
    if (sceneHero && sceneHero.fallback) {
      var fb = sceneHero.fallback;
      var thread = $('.thread-wall__thread', fb);
      var pins = $$('.thread-wall__pins circle', fb);
      var last = $('.thread-wall__last', fb);
      sceneHero.fallbackFn = function (p) {
        fb.style.transform = 'scale(' + (1 + p * 0.1).toFixed(4) + ')';
        fb.style.transformOrigin = '72% 46%';
        var t = clamp(p / 0.75, 0, 1);
        if (thread) thread.style.strokeDashoffset = (1 - t).toFixed(4);
        pins.forEach(function (c, i) { c.style.opacity = t * pins.length >= i ? 1 : 0.15; });
        if (last) {
          var k = clamp((p - 0.25) / 0.3, 0, 1);
          var e = 1 - Math.pow(1 - k, 3);
          last.style.transform = 'translate(' + ((1 - e) * 26).toFixed(2) + 'px,' + ((1 - e) * -34).toFixed(2) + 'px) rotate(' + ((1 - e) * 7).toFixed(2) + 'deg)';
          last.style.transformOrigin = '550px 462px';
        }
      };
      sceneHero.fallbackFn(0);
    }
    if (scenePillars && scenePillars.fallback) {
      var fb2 = scenePillars.fallback;
      scenePillars.fallbackFn = function (p) {
        fb2.style.transform = 'translateX(' + ((p - 0.5) * -6).toFixed(3) + '%) scale(1.08)';
      };
      scenePillars.fallbackFn(0);
    }
    if (sceneFinale && sceneFinale.fallback) {
      var fb3 = sceneFinale.fallback;
      var sun = $('.scene__sun', fb3);
      sceneFinale.fallbackFn = function (p) {
        fb3.style.transform = 'scale(' + (1.14 - p * 0.14).toFixed(4) + ')';
        if (sun) sun.style.top = (16 + p * 14).toFixed(2) + '%';
      };
      sceneFinale.fallbackFn(0);
    }
  })();

  function sceneMode() {
    if (env.reduce || env.saveData) return 'poster';
    return env.desktop() ? 'scrub' : 'loop';
  }

  function initScenes(useTriggers) {
    var mode = sceneMode();
    scenes.forEach(function (s, i) {
      s.poster(i === 0);
      if (mode === 'poster') return;
      if (mode === 'loop') {
        if (i === 0) s.loadLoop();
        else if (useTriggers) {
          ScrollTrigger.create({ trigger: s.el, start: 'top bottom+=100%', once: true, onEnter: function () { s.loadLoop(); } });
        } else s.loadLoop();
        return;
      }
      if (i === 0) s.loadScrub();
      else if (useTriggers) {
        ScrollTrigger.create({ trigger: s.el, start: 'top bottom+=150%', once: true, onEnter: function () { s.loadScrub(); } });
      } else s.loadScrub();
    });
  }

  /* ------------------------------------------------------------------------
     3. Menu (mobile sheet)
     ------------------------------------------------------------------------ */
  var menu = $('[data-menu]');
  var menuToggle = $('[data-menu-toggle]');
  var menuOpen = false;
  var lenis = null;

  function focusables(root) {
    return $$('a[href], button:not([disabled])', root).filter(function (el) { return el.offsetParent !== null; });
  }

  function openMenu() {
    if (!menu || menuOpen) return;
    menuOpen = true;
    menu.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.querySelector('.sr-only').textContent = 'Close menu';
    nav.classList.remove('is-hidden');
    if (lenis) lenis.stop(); else document.body.style.overflow = 'hidden';
    if (hasGSAP && !env.reduce) {
      gsap.fromTo($$('.menu__link span', menu), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05 });
      gsap.fromTo($('.menu__foot', menu), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'expo.out', delay: 0.25 });
    }
    var f = focusables(menu);
    if (f[0]) f[0].focus();
  }

  function closeMenu(returnFocus) {
    if (!menu || !menuOpen) return;
    menuOpen = false;
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.sr-only').textContent = 'Open menu';
    if (lenis) lenis.start(); else document.body.style.overflow = '';
    if (returnFocus) menuToggle.focus();
  }

  function initMenu() {
    if (!menu || !menuToggle) return;
    menuToggle.addEventListener('click', function () { if (menuOpen) closeMenu(true); else openMenu(); });
    document.addEventListener('keydown', function (e) {
      if (!menuOpen) return;
      if (e.key === 'Escape') { closeMenu(true); return; }
      if (e.key === 'Tab') {
        var f = [menuToggle].concat(focusables(menu));
        var first = f[0], lastF = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastF.focus(); }
        else if (!e.shiftKey && document.activeElement === lastF) { e.preventDefault(); first.focus(); }
      }
    });
    mq('(min-width: 1024px)').addEventListener('change', function (e) { if (e.matches) closeMenu(false); });
  }

  /* ------------------------------------------------------------------------
     4. Anchor routing (Lenis aware, handles sticky cards)
     ------------------------------------------------------------------------ */
  function targetY(t) {
    var cases = t.classList && t.classList.contains('case') ? t.parentElement : null;
    if (cases && cases.classList.contains('is-stacked')) {
      var y = cases.getBoundingClientRect().top + window.scrollY;
      var gap = parseFloat(getComputedStyle(cases).rowGap) || 0;
      var kids = Array.prototype.slice.call(cases.children);
      for (var i = 0; i < kids.indexOf(t); i++) y += kids[i].offsetHeight + gap;
      return y - (navH() + 16);
    }
    if (t.id === 'top') return 0;
    return t.getBoundingClientRect().top + window.scrollY - (navH() + 8);
  }

  function scrollToEl(t) {
    var y = Math.max(0, targetY(t));
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: env.reduce ? 'auto' : 'smooth' });
  }

  function initAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      var t = document.getElementById(id.slice(1));
      if (!t) return;
      e.preventDefault();
      closeMenu(false);
      scrollToEl(t);
      if (history.replaceState) history.replaceState(null, '', id);
      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
      setTimeout(function () { t.focus({ preventScroll: true }); }, 50);
      if (a.hasAttribute('data-jump') && t.classList.contains('case')) {
        setTimeout(function () {
          t.classList.remove('is-flash'); void t.offsetWidth; t.classList.add('is-flash');
        }, 1100);
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Work filters (FLIP when GSAP is present)
     ------------------------------------------------------------------------ */
  function initFilters() {
    var bar = $('[data-filters]');
    var work = $('#work');
    if (!bar || !work) return;
    var cards = $$('.pcard-wrap', work);
    var groups = $$('[data-group]', work);
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var f = btn.getAttribute('data-filter');
      $$('[data-filter]', bar).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });

      var before = new Map();
      cards.forEach(function (c) { if (!c.classList.contains('is-hidden') && c.offsetParent) { var r = c.getBoundingClientRect(); before.set(c, { x: r.left, y: r.top }); } });
      cards.forEach(function (c) { c.classList.toggle('is-hidden', !(f === 'all' || c.getAttribute('data-status-row') === f)); });
      groups.forEach(function (g) {
        var n = $$('.pcard-wrap:not(.is-hidden)', g).length;
        g.hidden = n === 0;
        var count = $('[data-group-count]', g); if (count) count.textContent = n;
      });
      if (hasGSAP && !env.reduce) {
        cards.forEach(function (c) {
          if (c.classList.contains('is-hidden')) return;
          var r = c.getBoundingClientRect();
          var b0 = before.get(c);
          if (b0) {
            var dx = b0.x - r.left, dy = b0.y - r.top;
            if (dx || dy) gsap.fromTo(c, { x: dx, y: dy }, { x: 0, y: 0, duration: 0.9, ease: 'expo.out', clearProps: 'transform' });
          } else {
            gsap.fromTo(c, { autoAlpha: 0, y: 32, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out', clearProps: 'transform,opacity,visibility' });
          }
        });
        clearTimeout(initFilters._t);
        initFilters._t = setTimeout(function () { ScrollTrigger.refresh(); }, 950);
      }
    });
  }

  /* ------------------------------------------------------------------------
     5b. Lightbox for gallery images on project pages
     ------------------------------------------------------------------------ */
  function initLightbox() {
    var box = $('[data-lightbox]');
    if (!box) return;
    var img = $('.lightbox__img', box);
    var lastFocus = null;
    var close = function () { box.hidden = true; img.removeAttribute('src'); if (lenis) lenis.start(); if (lastFocus) lastFocus.focus(); };
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('.pgallery .media img, [data-full]');
      if (!t) return;
      lastFocus = t;
      var thumb = t.tagName === 'IMG' ? t : t.querySelector('img');
      img.src = t.getAttribute('data-full') || t.currentSrc || t.src; img.alt = thumb ? thumb.alt : '';
      box.hidden = false;
      if (lenis) lenis.stop();
      $('[data-lightbox-close]', box).focus();
    });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.hasAttribute('data-lightbox-close')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });
    $$('.pgallery .media img').forEach(function (i) { i.setAttribute('tabindex', '0'); i.addEventListener('keydown', function (e) { if (e.key === 'Enter') i.click(); }); });
  }

  /* ------------------------------------------------------------------------
     5c. Page transitions (curtain between the home page and project pages)
     ------------------------------------------------------------------------ */
  function initCurtain() {
    var curtain = $('.curtain');
    if (!curtain) return;
    var isProject = document.body.classList.contains('page-project');
    var canAnimate = hasGSAP && !env.reduce;
    if (isProject && canAnimate) {
      gsap.to(curtain, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut', delay: 0.15 });
      gsap.to($('.curtain__mark', curtain), { autoAlpha: 0, duration: 0.4 });
    } else if (isProject) {
      curtain.style.clipPath = 'inset(0 0 100% 0)';
    }
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) { curtain.classList.remove('is-leaving'); curtain.style.clipPath = 'inset(0 0 100% 0)'; }
    });
    if (!canAnimate) return;
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download')) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:)/i.test(href)) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;
      e.preventDefault();
      curtain.classList.add('is-leaving');
      gsap.set($('.curtain__mark', curtain), { autoAlpha: 0 });
      gsap.fromTo(curtain, { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.inOut',
        onComplete: function () { location.href = url.href; }
      });
      gsap.to($('.curtain__mark', curtain), { autoAlpha: 1, duration: 0.3, delay: 0.45 });
    });
  }

  /* ------------------------------------------------------------------------
     6. Footer wordmark fit
     ------------------------------------------------------------------------ */
  function fitWordmark() {
    var el = $('.footer__wordmark');
    if (!el) return;
    el.style.fontSize = '';
    var container = el.parentElement;
    var cs = getComputedStyle(container);
    var avail = container.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var w = el.scrollWidth;
    if (!w) return;
    var size = parseFloat(getComputedStyle(el).fontSize) * (avail / w) * 0.995;
    el.style.fontSize = Math.min(size, 420) + 'px';
  }

  /* ------------------------------------------------------------------------
     No-GSAP fallback path: everything visible, native scroll
     ------------------------------------------------------------------------ */
  function initBasics() {
    initMenu();
    initAnchors();
    initCopyEmail();
    initFilters();
    initLightbox();
    initScenes(false);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWordmark); else fitWordmark();
    window.addEventListener('resize', fitWordmark);
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 80); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (!hasGSAP) {
    d.classList.remove('motion');
    d.classList.add('is-loaded');
    var pre = $('.preloader'); if (pre) pre.remove();
    initBasics();
    return;
  }

  /* ========================================================================
     GSAP path
     ======================================================================== */
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: 'expo.out' });

  /* ------------------------------------------------------------------------
     7. Smooth scroll
     ------------------------------------------------------------------------ */
  if (!env.reduce && window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  gsap.ticker.add(function () { for (var i = 0; i < scenes.length; i++) scenes[i].tick(); });

  /* ------------------------------------------------------------------------
     8. Text splitting
     ------------------------------------------------------------------------ */
  function splitWords(el) {
    if (el._words) return el._words;
    var words = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'split-w';
            var i = document.createElement('span'); i.className = 'split-i'; i.textContent = part;
            w.appendChild(i); frag.appendChild(w); words.push(i);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) {
          walk(n);
        }
      });
    })(el);
    el._words = words;
    return words;
  }

  function splitChars(el) {
    if (el._chars) return el._chars;
    var text = el.textContent.replace(/\s+/g, ' ').trim();
    el.removeAttribute('aria-label');
    el.textContent = '';
    var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = text;
    var vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
    var chars = [];
    text.split(' ').forEach(function (word, wi, arr) {
      var ww = document.createElement('span'); ww.className = 'chars-wrap';
      Array.prototype.forEach.call(word, function (ch) {
        var c = document.createElement('span'); c.className = 'char'; c.textContent = ch;
        ww.appendChild(c); chars.push(c);
      });
      vis.appendChild(ww);
      if (wi < arr.length - 1) vis.appendChild(document.createTextNode(' '));
    });
    el.appendChild(sr);
    el.appendChild(vis);
    el._chars = chars;
    return chars;
  }

  /* ------------------------------------------------------------------------
     9. Preloader
     ------------------------------------------------------------------------ */
  var resolveLoaded;
  var loaded = new Promise(function (r) { resolveLoaded = r; });

  function runPreloader() {
    var pre = $('.preloader');
    if (!pre || env.reduce) {
      if (pre) pre.remove();
      d.classList.add('is-loaded');
      resolveLoaded();
      return;
    }
    pre.style.animation = 'none';
    if (lenis) lenis.stop();
    var quick = store.get('ln-seen') === '1';
    store.set('ln-seen', '1');
    var bar = $('.preloader__bar span', pre);
    var name = $$('.preloader__name span', pre);
    var tag = $('.preloader__tag', pre);
    var start = performance.now();
    var minTime = quick ? 350 : 1100;
    var cap = quick ? 900 : 2500;

    var tasks = [];
    if (document.fonts && document.fonts.ready) tasks.push(document.fonts.ready);
    if (sceneHero && sceneHero.posterEl && !sceneHero.posterEl.complete) {
      tasks.push(new Promise(function (r) { sceneHero.posterEl.addEventListener('load', r); sceneHero.posterEl.addEventListener('error', r); }));
    }
    var done = 0;
    var prog = { v: 0 };
    var setBar = function () { gsap.to(prog, { v: (done + 1) / (tasks.length + 1), duration: 0.6, ease: 'power2.out', onUpdate: function () { bar.style.transform = 'scaleX(' + prog.v + ')'; } }); };
    tasks.forEach(function (t) { t.then(function () { done++; setBar(); }); });

    gsap.from(name, { yPercent: 110, duration: quick ? 0.6 : 1.1, ease: 'expo.out', stagger: 0.08 });
    gsap.from(tag, { autoAlpha: 0, y: 10, duration: 0.8, delay: 0.25 });

    var finish = function () {
      gsap.to(prog, { v: 1, duration: 0.35, ease: 'power2.out', onUpdate: function () { bar.style.transform = 'scaleX(' + prog.v + ')'; } });
      gsap.to(pre, {
        clipPath: 'inset(0% 0% 100% 0%)', duration: quick ? 0.7 : 1.1, ease: 'expo.inOut', delay: 0.35,
        onStart: function () { setTimeout(resolveLoaded, quick ? 250 : 420); },
        onComplete: function () {
          pre.remove();
          d.classList.add('is-loaded');
          if (lenis) lenis.start();
        }
      });
    };

    var waited = Promise.race([
      Promise.all(tasks),
      new Promise(function (r) { setTimeout(r, cap); })
    ]);
    waited.then(function () {
      var elapsed = performance.now() - start;
      setTimeout(finish, Math.max(0, minTime - elapsed));
    });
  }

  /* ------------------------------------------------------------------------
     10. Shared reveals (all breakpoints, motion allowed)
     ------------------------------------------------------------------------ */
  function initReveals() {
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 90%',
      once: true,
      onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }); }
    });
    ScrollTrigger.batch('[data-row]', {
      start: 'top 92%',
      once: true,
      onEnter: function (els) { gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.06, overwrite: true }); }
    });

    $$('[data-split]').forEach(function (el) {
      var words = splitWords(el);
      gsap.set(words, { yPercent: 115 });
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: function () { gsap.to(words, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.06 }); }
      });
    });

    /* Work cards */
    var pcards = $$('.pcard-wrap');
    if (pcards.length) {
      gsap.set(pcards, { autoAlpha: 0, y: 48 });
      ScrollTrigger.batch(pcards, {
        start: 'top 92%', once: true,
        onEnter: function (els) { gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, clearProps: 'transform' }); }
      });
    }

    /* Timeline */
    var tl = $('[data-timeline]');
    if (tl) {
      gsap.fromTo($('.timeline__line span', tl), { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: tl, start: 'top 75%', end: 'bottom 70%', scrub: true }
      });
      var items = $$('.timeline__item', tl);
      gsap.set(items, { opacity: 0, x: -16 });
      ScrollTrigger.batch(items, {
        start: 'top 90%', once: true,
        onEnter: function (els) { gsap.to(els, { opacity: 1, x: 0, duration: 0.9, stagger: 0.07 }); }
      });
    }

    /* Portrait parallax */
    var portrait = $('[data-portrait] img');
    if (portrait) {
      gsap.fromTo(portrait, { yPercent: -6, scale: 1.14 }, {
        yPercent: 6, scale: 1.14, ease: 'none',
        scrollTrigger: { trigger: '[data-portrait]', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }

    /* Quote ink */
    $$('.quote [data-ink]').forEach(function (el) {
      var words = splitWords(el);
      gsap.fromTo(words, { opacity: 0.15 }, {
        opacity: 1, ease: 'none', stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: true }
      });
    });

    /* Skill meters fill when each tile scrolls into view */
    $$('.skill .meters').forEach(function (m, i) {
      var rows = $$('.meter', m);
      gsap.set(rows, { opacity: 0, y: 8 });
      ScrollTrigger.create({
        trigger: m, start: 'top 88%', once: true,
        onEnter: function () {
          gsap.to(rows, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, delay: 0.1 });
          setTimeout(function () { m.classList.add('is-filled'); }, 250);
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     11. Stats
     ------------------------------------------------------------------------ */
  function initStats() {
    var wrap = $('[data-stats]');
    if (!wrap) return;
    var words = $$('.stat__word', wrap);
    var counts = $$('[data-count]', wrap);
    var labels = $$('.stat__label', wrap);
    var xs = $$('.stat__x', wrap);
    var smalls = $$('.stat__small', wrap);
    gsap.set(words, { yPercent: 110 });
    gsap.set(labels, { opacity: 0, y: 12 });
    gsap.set(xs.concat(smalls), { opacity: 0 });
    counts.forEach(function (c) {
      var from = parseFloat(c.getAttribute('data-from') || '0');
      var dec = parseInt(c.getAttribute('data-decimals') || '0', 10);
      c.textContent = from.toFixed(dec);
    });
    ScrollTrigger.create({
      trigger: wrap, start: 'top 78%', once: true,
      onEnter: function () {
        gsap.to(words, { yPercent: 0, duration: 1.2, stagger: 0.12 });
        gsap.to(labels, { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.2 });
        gsap.to(smalls, { opacity: 1, duration: 0.8, delay: 0.3 });
        counts.forEach(function (c, i) {
          var to = parseFloat(c.getAttribute('data-count'));
          var from = parseFloat(c.getAttribute('data-from') || '0');
          var dec = parseInt(c.getAttribute('data-decimals') || '0', 10);
          var o = { v: from };
          gsap.to(o, {
            v: to, duration: 1.6, ease: 'power3.out', delay: 0.24 + i * 0.12,
            onUpdate: function () { c.textContent = o.v.toFixed(dec); },
            onComplete: function () { c.textContent = to.toFixed(dec); }
          });
        });
        gsap.to(xs, { opacity: 1, duration: 0.6, delay: 1.7 });
      }
    });
  }

  /* ------------------------------------------------------------------------
     12. Marquee (velocity reactive)
     ------------------------------------------------------------------------ */
  function initMarquee() {
    var track = $('[data-marquee-track]');
    if (!track) return;
    var loop = gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
    var dir = 1, boost = 0, skew = 0;
    var setSkew = gsap.quickSetter(track, 'skewX', 'deg');
    ScrollTrigger.create({
      trigger: '[data-marquee]', start: 'top bottom', end: 'bottom top',
      onToggle: function (s) { if (s.isActive) loop.play(); else loop.pause(); },
      onUpdate: function (s) {
        var v = s.getVelocity();
        dir = s.direction || dir;
        boost = Math.max(boost, Math.min(Math.abs(v) / 400, 5));
        skew = clamp(v / -300, -6, 6);
      }
    });
    gsap.ticker.add(function () {
      boost *= 0.92;
      skew *= 0.9;
      loop.timeScale(dir * (1 + boost));
      setSkew(skew);
    });
  }

  /* ------------------------------------------------------------------------
     13. Nav state, active links, scroll progress
     ------------------------------------------------------------------------ */
  function initNav() {
    var bar = $('.scroll-progress span');
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: function (s) {
        var y = s.scroll();
        nav.classList.toggle('is-scrolled', y > 80);
        if (!menuOpen) nav.classList.toggle('is-hidden', s.direction === 1 && y > window.innerHeight * 0.6);
        if (bar) bar.style.transform = 'scaleX(' + s.progress.toFixed(4) + ')';
      }
    });
    $$('[data-nav-link]').forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1));
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec, start: 'top 50%', end: 'bottom 50%',
        onToggle: function (s) { a.classList.toggle('is-active', s.isActive); }
      });
    });
    nav.addEventListener('focusin', function () { nav.classList.remove('is-hidden'); });
  }

  var cursorEl = $('.cursor');
  function setDark(on) {
    nav.classList.toggle('is-dark', on);
    if (cursorEl) cursorEl.classList.toggle('is-dark', on);
  }

  /* ------------------------------------------------------------------------
     14. Cursor, magnetic buttons, card tilt (fine pointers only)
     ------------------------------------------------------------------------ */
  function initPointer() {
    if (!env.fine || env.reduce) return;
    d.classList.add('has-cursor');
    var style = document.createElement('style');
    style.textContent = '.has-cursor, .has-cursor * { cursor: none !important; }';
    document.head.appendChild(style);

    var ring = $('.cursor__ring'), dot = $('.cursor__dot'), label = $('.cursor__label');
    var rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    var ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });
    var dx = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    var dy = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    gsap.set([ring, dot], { x: -100, y: -100 });

    window.addEventListener('pointermove', function (e) {
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
      cursorEl.classList.remove('is-hidden');
    }, { passive: true });
    document.addEventListener('pointerleave', function () { cursorEl.classList.add('is-hidden'); });
    document.addEventListener('pointerover', function (e) {
      var t = e.target.closest ? e.target.closest('a, button, [data-cursor]') : null;
      var lab = t && t.getAttribute('data-cursor');
      cursorEl.classList.toggle('is-link', !!t && !lab);
      cursorEl.classList.toggle('is-label', !!lab);
      label.textContent = lab || '';
    });

    /* Magnetic */
    $$('[data-magnetic]').forEach(function (btn) {
      var mx = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'power3.out' });
      var my = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'power3.out' });
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var ox = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var oy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        mx(clamp(ox, -1, 1) * 10); my(clamp(oy, -1, 1) * 8);
      });
      btn.addEventListener('pointerleave', function () {
        gsap.to(btn, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)' });
      });
    });

    /* Tilt */
    $$('[data-tilt]').forEach(function (card) {
      var tx = gsap.quickTo(card, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      var ty = gsap.quickTo(card, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      gsap.set(card, { transformPerspective: 1400 });
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        tx(((e.clientX - r.left) / r.width - 0.5) * 4);
        ty(((e.clientY - r.top) / r.height - 0.5) * -4);
      });
      card.addEventListener('pointerleave', function () { tx(0); ty(0); });
    });
  }

  /* ------------------------------------------------------------------------
     15. Responsive motion contexts
     ------------------------------------------------------------------------ */
  function initContexts() {
    var mm = gsap.matchMedia();

    mm.add({
      desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)'
    }, function (ctx) {
      var desktop = ctx.conditions.desktop;
      var cleanups = [];
      if (!$('.hero')) return;

      /* ---------- HERO ---------- */
      var hero = $('.hero');
      var frame = $('.hero__frame');
      var words = $$('[data-hero-word]');
      var eyebrow = $('[data-hero-eyebrow]');
      var foot = $('[data-hero-foot]');
      var rule = $('.hero__rule');
      var cue = $('[data-scroll-cue]');
      var content = $('.hero__content');

      gsap.set(words, { yPercent: 112 });
      gsap.set(eyebrow, { autoAlpha: 0, y: 14 });
      gsap.set(rule, { scaleX: 0 });
      if (cue) gsap.set(cue, { autoAlpha: 0 });

      var intro = gsap.timeline({ paused: true });
      intro.to(eyebrow, { autoAlpha: 1, y: 0, duration: 1 }, 0)
        .to(words[0], { yPercent: 0, duration: 1.3 }, 0.08);

      if (desktop) {
        gsap.set(foot, { autoAlpha: 0, y: 28 });
        if (cue) intro.to(cue, { autoAlpha: 1, duration: 1 }, 0.5);

        var vw = function () { return window.innerWidth; };
        var htl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero, start: 'top top', end: '+=140%', pin: '.hero__pin', scrub: true,
            invalidateOnRefresh: true,
            onUpdate: function (s) { if (sceneHero) sceneHero.setProgress(s.progress); }
          }
        });
        htl.fromTo(frame,
          { '--it': function () { return (navH() + 8) + 'px'; }, '--ix': function () { return (vw() * 0.03) + 'px'; }, '--ib': function () { return (vw() * 0.03) + 'px'; }, '--ir': '28px' },
          { '--it': '0px', '--ix': '0px', '--ib': '0px', '--ir': '0px', duration: 0.35 }, 0)
          .to(cue, { autoAlpha: 0, duration: 0.08 }, 0.05)
          .to(words[1], { yPercent: 0, duration: 0.14, ease: 'power3.out' }, 0.16)
          .to(words[2], { yPercent: 0, duration: 0.14, ease: 'power3.out' }, 0.36)
          .to(rule, { scaleX: 1, duration: 0.12, ease: 'power2.inOut' }, 0.46)
          .to(foot, { autoAlpha: 1, y: 0, duration: 0.14, ease: 'power3.out' }, 0.56)
          .to(content, { yPercent: -5, duration: 0.2 }, 0.8);
      } else {
        gsap.set(foot, { autoAlpha: 0, y: 20 });
        intro.to(words[1], { yPercent: 0, duration: 1.3 }, 0.23)
          .to(words[2], { yPercent: 0, duration: 1.3 }, 0.38)
          .to(rule, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, 0.8)
          .to(foot, { autoAlpha: 1, y: 0, duration: 1 }, 0.7);
        ScrollTrigger.create({
          trigger: frame, start: 'top top', end: 'bottom top', scrub: true,
          onUpdate: function (s) { if (sceneHero) sceneHero.setProgress(s.progress); }
        });
      }
      loaded.then(function () { intro.play(); });

      /* ---------- MISSION ---------- */
      var statement = $('.mission__statement');
      var inkWords = splitWords(statement);
      var ems = $$('em', statement);
      ems.forEach(function (em) { em.classList.add('ink-em'); });
      gsap.set(ems, { '--u': 0 });
      var mtl = gsap.timeline({
        scrollTrigger: desktop
          ? { trigger: '.mission__pin', start: 'center center', end: '+=80%', pin: true, scrub: true }
          : { trigger: statement, start: 'top 80%', end: 'bottom 45%', scrub: true }
      });
      mtl.fromTo(inkWords, { opacity: 0.15 }, { opacity: 1, ease: 'none', stagger: 0.1, duration: 0.4 }, 0)
        .to(ems, { '--u': 1, ease: 'power2.inOut', duration: 0.3, stagger: 0.15 }, '>-0.25');

      /* ---------- PILLARS ---------- */
      var pillarsSec = $('.pillars');
      var pillars = $$('[data-pillar]');
      var numerals = $$('[data-pillar-numeral]');
      var ticks = $$('[data-pillar-tick]');
      var setTick = function (i) { ticks.forEach(function (t, k) { t.classList.toggle('is-active', k === i); }); };

      if (desktop) {
        pillarsSec.classList.add('is-pinned');
        cleanups.push(function () { pillarsSec.classList.remove('is-pinned'); setTick(0); });
        gsap.set(pillars.slice(1), { autoAlpha: 0, y: 48 });
        gsap.set(numerals, { autoAlpha: 0, yPercent: 20 });
        gsap.set(numerals[0], { autoAlpha: 0.9, yPercent: 0 });
        var ptl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: pillarsSec, start: 'top top', end: '+=210%', pin: '.pillars__pin', scrub: true,
            onUpdate: function (s) {
              if (scenePillars) scenePillars.setProgress(s.progress);
              setTick(s.progress < 0.33 ? 0 : s.progress < 0.66 ? 1 : 2);
            }
          }
        });
        ptl.to(pillars[0], { autoAlpha: 0, y: -48, duration: 0.1 }, 0.27)
          .to(numerals[0], { autoAlpha: 0, yPercent: -20, duration: 0.1 }, 0.27)
          .to(pillars[1], { autoAlpha: 1, y: 0, duration: 0.1 }, 0.33)
          .to(numerals[1], { autoAlpha: 0.9, yPercent: 0, duration: 0.1 }, 0.33)
          .to(pillars[1], { autoAlpha: 0, y: -48, duration: 0.1 }, 0.6)
          .to(numerals[1], { autoAlpha: 0, yPercent: -20, duration: 0.1 }, 0.6)
          .to(pillars[2], { autoAlpha: 1, y: 0, duration: 0.1 }, 0.66)
          .to(numerals[2], { autoAlpha: 0.9, yPercent: 0, duration: 0.1 }, 0.66)
          .to({}, { duration: 0.24 }, 0.76);
      } else {
        gsap.set(pillars, { autoAlpha: 0, y: 32 });
        pillars.forEach(function (p, i) {
          ScrollTrigger.create({
            trigger: p, start: 'top 85%', once: true,
            onEnter: function () { gsap.to(p, { autoAlpha: 1, y: 0, duration: 1 }); }
          });
          ScrollTrigger.create({
            trigger: p, start: 'top 60%', end: 'bottom 40%',
            onToggle: function (s) {
              if (!s.isActive) return;
              setTick(i);
              numerals.forEach(function (n, k) { gsap.to(n, { autoAlpha: k === i ? 0.9 : 0, duration: 0.6, overwrite: true }); });
            }
          });
        });
        ScrollTrigger.create({
          trigger: '.pillars__frame', start: 'top bottom', end: 'bottom top', scrub: true,
          onUpdate: function (s) { if (scenePillars) scenePillars.setProgress(s.progress); }
        });
      }

      /* ---------- PROCESS (horizontal on desktop) ---------- */
      var proc = $('.process');
      var track = $('[data-process-track]');
      var progress = $('[data-process-progress]');
      var stages = $$('.stage', track);
      /* cards slide in sideways, so load all their images once the section is near */
      ScrollTrigger.create({ trigger: proc, start: 'top bottom+=100%', once: true, onEnter: function () { $$('img[loading="lazy"]', track).forEach(function (i) { i.loading = 'eager'; }); } });
      if (desktop) {
        proc.classList.add('is-horizontal');
        cleanups.push(function () { proc.classList.remove('is-horizontal'); });
        var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
        var hTween = gsap.to(track, {
          x: function () { return -dist(); }, ease: 'none',
          scrollTrigger: {
            trigger: proc, start: 'top top', end: function () { return '+=' + dist(); },
            pin: '.process__pin', scrub: true, invalidateOnRefresh: true,
            onUpdate: function (s) { if (progress) progress.style.transform = 'scaleX(' + s.progress.toFixed(4) + ')'; }
          }
        });
      } else {
        gsap.set(stages, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(stages, {
          start: 'top 88%', once: true,
          onEnter: function (els) { gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06 }); }
        });
        /* swipe row: progress line follows the horizontal scroll */
        var onSwipe = function () {
          var max = track.scrollWidth - track.clientWidth;
          if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? track.scrollLeft / max : 0).toFixed(4) + ')';
        };
        track.addEventListener('scroll', onSwipe, { passive: true });
        onSwipe();
        cleanups.push(function () { track.removeEventListener('scroll', onSwipe); });
      }

      /* ---------- FINALE ---------- */
      var fin = $('.finale');
      var finFrame = $('.finale__frame');
      var veil = $('.finale__veil');
      var title = $('.finale__title');
      var chars = splitChars(title);
      var ctaItems = $$('[data-cta-item]', fin);

      if (desktop) {
        fin.classList.add('is-pinned');
        cleanups.push(function () { fin.classList.remove('is-pinned'); setDark(false); });
        gsap.set(chars, { yPercent: 115 });
        gsap.set(ctaItems, { autoAlpha: 0, y: 30 });
        gsap.fromTo(finFrame, { clipPath: 'inset(10% 8% 0% 8% round 28px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
          scrollTrigger: { trigger: fin, start: 'top bottom', end: 'top top', scrub: true }
        });
        var ftl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: fin, start: 'top top', end: '+=140%', pin: '.finale__pin', scrub: true,
            onUpdate: function (s) {
              if (sceneFinale) sceneFinale.setProgress(s.progress / 0.85);
              setDark(s.progress > 0.7);
            },
            onLeaveBack: function () { setDark(false); }
          }
        });
        ftl.to(veil, { opacity: 1, duration: 0.3 }, 0.6)
          .to(ctaItems[0], { autoAlpha: 1, y: 0, duration: 0.08, ease: 'power3.out' }, 0.68)
          .to(chars, { yPercent: 0, duration: 0.14, ease: 'power3.out', stagger: 0.005 }, 0.7)
          .to(ctaItems.slice(1), { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power3.out', stagger: 0.03 }, 0.82)
          .to({}, { duration: 0.04 }, 0.96);
        ScrollTrigger.create({ trigger: '.footer', start: 'top bottom', onEnter: function () { setDark(true); } });
      } else {
        gsap.set(chars, { yPercent: 115 });
        gsap.set(ctaItems.slice(1), { autoAlpha: 0, y: 24 });
        ScrollTrigger.create({
          trigger: finFrame, start: 'top bottom', end: 'bottom top', scrub: true,
          onUpdate: function (s) { if (sceneFinale) sceneFinale.setProgress(s.progress); }
        });
        ScrollTrigger.create({
          trigger: title, start: 'top 85%', once: true,
          onEnter: function () {
            gsap.to(chars, { yPercent: 0, duration: 1.1, stagger: 0.02 });
            gsap.to(ctaItems.slice(1), { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, delay: 0.3 });
          }
        });
        ScrollTrigger.create({
          trigger: '.finale__content', start: function () { return 'top ' + navH() + 'px'; }, end: 'max',
          onToggle: function (s) { setDark(s.isActive); }
        });
      }

      return function () { cleanups.forEach(function (fn) { fn(); }); };
    });

    /* Reduced motion: no pins, no hidden states; scenes stay as posters */
    mm.add('(prefers-reduced-motion: reduce)', function () {
      if (sceneHero) sceneHero.setProgress(1);
      if (scenePillars) scenePillars.setProgress(0.5);
      if (sceneFinale) sceneFinale.setProgress(1);
    });
  }

  /* Footer wordmark + project-page extras (all pages) */
  function initFooterMotion() {
    var mark = $('.footer__wordmark');
    if (mark) {
      var markChars = splitChars(mark);
      fitWordmark();
      gsap.set(markChars, { yPercent: 115 });
      ScrollTrigger.create({
        trigger: mark, start: 'top 95%', once: true,
        onEnter: function () { gsap.to(markChars, { yPercent: 0, duration: 1.3, stagger: 0.035 }); }
      });
    }
  }

  function initProjectPage() {
    if (!document.body.classList.contains('page-project')) return;
    var dark = $('.pcta');
    if (dark) {
      ScrollTrigger.create({
        trigger: dark, start: function () { return 'top ' + navH() + 'px'; }, end: 'max',
        onToggle: function (s) { setDark(s.isActive); }
      });
    }
    if (env.reduce) return;
    var cover = $('[data-pcover] img');
    if (cover) {
      gsap.fromTo($('[data-pcover] .pcover__frame'), { clipPath: 'inset(8% 6% 8% 6% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.6, ease: 'expo.out', delay: 0.5 });
      gsap.fromTo(cover, { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'expo.out', delay: 0.5 });
      gsap.to(cover, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '[data-pcover]', start: 'top top', end: 'bottom top', scrub: true } });
    }
  }

  /* ------------------------------------------------------------------------
     16. Boot
     ------------------------------------------------------------------------ */
  initMenu();
  initAnchors();
  initCopyEmail();
  initFilters();
  initLightbox();
  initScenes(true);
  initCurtain();

  if (!env.reduce) {
    initReveals();
    initStats();
    initMarquee();
  }
  initNav();
  initContexts();
  initProjectPage();
  if (!env.reduce) initFooterMotion();
  initPointer();
  runPreloader();

  var refresh = function () { fitWordmark(); ScrollTrigger.refresh(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', function () {
    refresh();
    if (location.hash && location.hash.length > 1) {
      var t = document.getElementById(location.hash.slice(1));
      if (t) loaded.then(function () { setTimeout(function () { scrollToEl(t); }, 200); });
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  });
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(fitWordmark, 150); });
})();
