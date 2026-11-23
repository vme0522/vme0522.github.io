/* PyRUA-Dex project page: clips play while in view, nav follows the section, tooltips on chart marks,
   BibTeX copy, figure lightbox, gentle reveal. No dependencies. */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

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
