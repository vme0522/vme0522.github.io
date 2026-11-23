/* PyRUA-Dex project page: clips play while in view, nav follows the section, tooltips on chart marks,
   BibTeX copy, figure lightbox, the real-robot theater, gentle reveal. No dependencies. */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* hero background film: on by default (a visitor's choice is remembered); off, the hero is the light page as before */
  var heroVid = document.getElementById("hero-piano");
  var heroSw = document.querySelector("[data-hero-video]");
  var heroSnd = document.querySelector("[data-hero-sound]");
  var hero = heroVid && heroVid.closest(".hero");
  if (heroVid && heroSw && hero) {
    // the film and its sound are both on by default; a visitor's choices are remembered
    var heroOn = !reduce, heroSeen = true, wantSound = true, waiting = false;
    try {
      var saved = localStorage.getItem("pyruaHeroVideo"); if (saved) heroOn = saved === "on";
      var savedSound = localStorage.getItem("pyruaHeroSound"); if (savedSound) wantSound = savedSound === "on";
    } catch (e) {}
    var heroSound = function () {
      if (!heroSnd) return;
      heroSnd.hidden = !heroOn;
      heroSnd.setAttribute("aria-pressed", heroVid.muted ? "false" : "true");
      heroSnd.textContent = heroVid.muted ? "Sound off" : "Sound on";
    };
    // Browsers refuse to start a film with sound before the visitor has touched the page: it then plays muted and
    // its sound comes on at the first click, tap or key (the hero's own buttons excepted).
    var EV = ["pointerdown", "pointerup", "keydown", "touchend"];
    var unmuteGo = function (e) {
      if (e && e.target && e.target.closest && e.target.closest(".hero-ctl")) return;
      if (!heroOn || !wantSound) { unmuteStop(); return; }
      heroVid.muted = false;
      if (!heroSeen) { unmuteStop(); return; }      // it plays with sound when the hero is back in view
      var p = heroVid.play();
      if (p && p.then) {
        p.then(unmuteStop, function () {
          heroVid.muted = true;
          var q = heroVid.play();
          if (q && q.catch) q.catch(function () {});
        });
      } else unmuteStop();
    };
    var unmuteStop = function () {
      waiting = false;
      EV.forEach(function (t) { document.removeEventListener(t, unmuteGo, true); });
    };
    var unmuteSoon = function () {
      if (waiting) return;
      waiting = true;
      EV.forEach(function (t) { document.addEventListener(t, unmuteGo, true); });
    };
    var heroPlay = function () {
      if (!heroOn || !heroSeen) return;
      var p = heroVid.play();
      if (p && p.catch) p.catch(function () {
        if (heroVid.muted) return;
        heroVid.muted = true;                          // sound refused: muted for now
        var q = heroVid.play();
        if (q && q.catch) q.catch(function () {});
        unmuteSoon();
      });
    };
    var heroApply = function () {
      hero.classList.toggle("vid-on", heroOn);
      hero.classList.toggle("vid-off", !heroOn);
      heroSw.setAttribute("aria-pressed", heroOn ? "true" : "false");
      heroSw.setAttribute("aria-label", heroOn ? "Turn the background video off" : "Turn the background video on");
      if (heroOn) { heroVid.muted = !wantSound; heroPlay(); } else { heroVid.pause(); heroVid.muted = true; }
      heroSound();
    };
    heroSw.addEventListener("click", function () {
      heroOn = !heroOn;
      try { localStorage.setItem("pyruaHeroVideo", heroOn ? "on" : "off"); } catch (e) {}
      heroApply();
    });
    if (heroSnd) heroSnd.addEventListener("click", function () {
      wantSound = heroVid.muted;                       // muted now: the visitor wants the sound
      try { localStorage.setItem("pyruaHeroSound", wantSound ? "on" : "off"); } catch (e) {}
      heroVid.muted = !wantSound;
      if (wantSound) heroPlay();
      heroSound();
    });
    heroVid.addEventListener("volumechange", heroSound);
    document.addEventListener("play", function (e) {   // another film with sound mutes the background
      var v = e.target;
      if (v !== heroVid && v.tagName === "VIDEO" && !v.muted) heroVid.muted = true;
    }, true);
    if (hasIO) {
      new IntersectionObserver(function (es) {
        heroSeen = es[0].isIntersecting;
        if (heroSeen) heroPlay(); else heroVid.pause();
      }, { threshold: 0.05 }).observe(hero.querySelector(".hero-opening"));
    }
    heroApply();
  }

  /* clips: load and play only while on screen; with reduced motion, show controls instead of autoplay */
  var vids = Array.prototype.slice.call(document.querySelectorAll("video[data-auto]"));
  if (reduce) {
    vids.forEach(function (v) { v.controls = true; });
  } else if (hasIO) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (v.preload !== "auto") v.preload = "auto";
          var p = v.play();
          if (p && p.catch) p.catch(function () { v.controls = true; });
        } else {
          v.pause();
        }
      });
    }, { rootMargin: "160px 0px", threshold: 0.2 });
    vids.forEach(function (v) { vio.observe(v); });
  } else {
    vids.forEach(function (v) { v.preload = "auto"; v.autoplay = true; v.play(); });
  }

  /* nav: mark the section in view */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  if (hasIO && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("on"); });
        var a = byId[e.target.id];
        if (a) a.classList.add("on");
      });
    }, { rootMargin: "-42% 0px -52% 0px" });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* tooltips: value first, label second; same on hover and keyboard focus */
  var tip = document.createElement("div");
  tip.className = "tip";
  tip.setAttribute("role", "tooltip");
  document.body.appendChild(tip);
  function showTip(el) {
    tip.textContent = "";
    var v = document.createElement("strong");
    v.textContent = el.getAttribute("data-v") || "";
    var l = document.createElement("span");
    l.textContent = el.getAttribute("data-l") || "";
    tip.appendChild(v);
    tip.appendChild(l);
    var r = el.getBoundingClientRect();
    tip.style.left = (r.left + r.width / 2 + window.pageXOffset) + "px";
    tip.style.top = (r.top + window.pageYOffset) + "px";
    tip.classList.add("on");
  }
  function hideTip() { tip.classList.remove("on"); }
  Array.prototype.forEach.call(document.querySelectorAll("[data-v]"), function (el) {
    if (!el.hasAttribute("aria-label")) el.setAttribute("aria-label", (el.getAttribute("data-l") || "") + ": " + el.getAttribute("data-v"));
    el.addEventListener("pointerenter", function () { showTip(el); });
    el.addEventListener("pointerleave", hideTip);
    el.addEventListener("focus", function () { showTip(el); });
    el.addEventListener("blur", hideTip);
  });
  window.addEventListener("scroll", hideTip, { passive: true });

  /* BibTeX copy */
  var copy = document.getElementById("bib-copy");
  if (copy) {
    copy.addEventListener("click", function () {
      var text = document.getElementById("bib-text").textContent;
      var done = function () {
        var label = copy.querySelector("span");
        copy.classList.add("done");
        label.textContent = "Copied";
        setTimeout(function () { copy.classList.remove("done"); label.textContent = "Copy"; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (err) { /* no clipboard */ }
        document.body.removeChild(ta);
      }
    });
  }

  /* lightbox for the paper's figures */
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Figure");
  var big = document.createElement("img");
  big.alt = "";
  box.appendChild(big);
  document.body.appendChild(box);
  function closeBox() { box.classList.remove("on"); big.removeAttribute("src"); }
  box.addEventListener("click", closeBox);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeBox(); });
  Array.prototype.forEach.call(document.querySelectorAll("a.zoom"), function (a) {
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      big.src = a.getAttribute("href");
      var img = a.querySelector("img");
      big.alt = img ? img.alt : "";
      box.classList.add("on");
    });
  });

  /* real-robot theater: a tab for each task family, a centred carousel of films in each */
  Array.prototype.forEach.call(document.querySelectorAll("[data-theater]"), function (th) {
    var tabs = Array.prototype.slice.call(th.querySelectorAll(".th-tab"));
    var fams = Array.prototype.slice.call(th.querySelectorAll(".th-fam"));
    var ink = th.querySelector(".th-ink");
    var vids = Array.prototype.slice.call(th.querySelectorAll("video"));
    var cur = 0, timer = null;

    function placeInk() {
      var t = tabs[cur];
      if (!ink || !t || !t.offsetWidth) return;
      ink.style.width = t.offsetWidth + "px";
      ink.style.transform = "translateX(" + t.offsetLeft + "px)";
    }
    function pauseAll(except) { vids.forEach(function (v) { if (v !== except && !v.paused) v.pause(); }); }

    fams.forEach(function (fam) {
      var slides = Array.prototype.slice.call(fam.querySelectorAll(".th-slide"));
      var thumbs = Array.prototype.slice.call(fam.querySelectorAll(".th-thumb"));
      var track = fam.querySelector(".th-track");
      fam._i = 0;
      fam._layout = function () {
        slides.forEach(function (s, i) {
          var o = Math.max(-2, Math.min(2, i - fam._i)), on = o === 0, v = s.querySelector("video");
          s.setAttribute("data-pos", String(o));
          s.setAttribute("aria-hidden", on ? "false" : "true");
          v.controls = on && s.classList.contains("started");
          if (!on && !v.paused) v.pause();
          Array.prototype.forEach.call(s.querySelectorAll("button, video"), function (el) { el.tabIndex = on ? 0 : -1; });
        });
        thumbs.forEach(function (b, i) {
          b.classList.toggle("on", i === fam._i);
          b.setAttribute("aria-current", i === fam._i ? "true" : "false");
        });
        var strip = fam.querySelector(".th-thumbs"), tb = thumbs[fam._i];
        if (strip && tb && strip.scrollWidth > strip.clientWidth) {
          var sr = strip.getBoundingClientRect(), br = tb.getBoundingClientRect();
          var left = strip.scrollLeft + br.left - sr.left - (strip.clientWidth - br.width) / 2;
          if (strip.scrollTo) strip.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" }); else strip.scrollLeft = left;
        }
      };
      fam._go = function (i) {
        var n = slides.length;
        if (n < 2) return;
        fam._i = (i % n + n) % n;
        fam._layout();
      };
      slides.forEach(function (s, i) {
        var v = s.querySelector("video"), play = s.querySelector(".th-play");
        /* a film at the side comes to the front instead of starting */
        s.addEventListener("click", function (e) {
          if (i !== fam._i) { e.preventDefault(); e.stopPropagation(); fam._go(i); }
        }, true);
        play.addEventListener("click", function () {
          s.classList.add("started");
          v.controls = true;
          if (v.preload !== "auto") v.preload = "auto";
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        });
        v.addEventListener("play", function () { s.classList.add("started", "playing"); v.controls = true; pauseAll(v); });
        v.addEventListener("pause", function () { s.classList.remove("playing"); });
        v.addEventListener("ended", function () { s.classList.remove("playing"); });
        v.addEventListener("timeupdate", function () {
          var b = thumbs[i];
          if (b && v.duration) b.style.setProperty("--p", (v.currentTime / v.duration).toFixed(4));
        });
      });
      thumbs.forEach(function (b, i) { b.addEventListener("click", function () { fam._go(i); }); });
      var prev = fam.querySelector(".th-nav.prev"), next = fam.querySelector(".th-nav.next");
      if (prev) prev.addEventListener("click", function () { fam._go(fam._i - 1); });
      if (next) next.addEventListener("click", function () { fam._go(fam._i + 1); });
      fam.addEventListener("keydown", function (e) {
        if (e.target.tagName === "VIDEO") return;
        if (e.key === "ArrowLeft") { fam._go(fam._i - 1); e.preventDefault(); }
        if (e.key === "ArrowRight") { fam._go(fam._i + 1); e.preventDefault(); }
      });
      var x0 = null, y0 = 0;
      track.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      track.addEventListener("touchend", function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
        x0 = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > 1.6 * Math.abs(dy)) fam._go(fam._i + (dx < 0 ? 1 : -1));
      }, { passive: true });
      fam._layout();
    });

    function show(k, focus) {
      if (k === cur) return;
      var dir = k > cur ? "r" : "l", out = fams[cur], inn = fams[k];
      pauseAll(null);
      tabs.forEach(function (t, j) {
        t.classList.toggle("on", j === k);
        t.setAttribute("aria-selected", j === k ? "true" : "false");
        t.tabIndex = j === k ? 0 : -1;
      });
      if (focus) tabs[k].focus();
      cur = k;
      placeInk();
      var bar = tabs[k].parentNode;
      if (bar.scrollWidth > bar.clientWidth) {
        var left = tabs[k].offsetLeft - (bar.clientWidth - tabs[k].offsetWidth) / 2;
        if (bar.scrollTo) bar.scrollTo({ left: left, behavior: reduce ? "auto" : "smooth" }); else bar.scrollLeft = left;
      }
      clearTimeout(timer);
      fams.forEach(function (f) { if (f !== out) { f.hidden = true; f.classList.remove("on", "enter-r", "enter-l", "leave-r", "leave-l"); } });
      function bringIn() {
        out.hidden = true;
        out.classList.remove("on", "leave-r", "leave-l", "enter-r", "enter-l");
        inn.hidden = false;
        inn.classList.add("on");
        inn._layout();
        if (reduce) return;
        inn.classList.add("fan", "enter-" + dir);
        void inn.offsetWidth;
        setTimeout(function () { inn.classList.remove("fan"); }, 40);
        timer = setTimeout(function () { inn.classList.remove("enter-" + dir); }, 800);
      }
      if (reduce) { bringIn(); return; }
      out.classList.add("leave-" + dir);
      timer = setTimeout(bringIn, 170);
    }
    tabs.forEach(function (t, k) {
      t.addEventListener("click", function () { show(k, false); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length;
        if (e.key === "ArrowRight") { show((cur + 1) % n, true); e.preventDefault(); }
        if (e.key === "ArrowLeft") { show((cur - 1 + n) % n, true); e.preventDefault(); }
      });
    });
    placeInk();
    window.addEventListener("resize", placeInk);
    window.addEventListener("load", placeInk);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeInk);
  });

  /* reveal on scroll */
  var rv = document.querySelectorAll(".rv");
  if (reduce || !hasIO) {
    Array.prototype.forEach.call(rv, function (el) { el.classList.add("in"); });
  } else {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    Array.prototype.forEach.call(rv, function (el) { rio.observe(el); });
  }
})();
