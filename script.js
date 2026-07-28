// Smooth scroll-reveal for the site.
// Elements fade + rise into view as the user scrolls.
// Respects users who prefer reduced motion.

(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var revealTargets = document.querySelectorAll(
    ".hero, .section, .card, .stamp"
  );

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    // Just show everything immediately, no animation.
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
    return;
  }

  // Reveal the hero right away since it's above the fold.
  var hero = document.querySelector(".hero");
  if (hero) hero.classList.add("in-view");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach(function (el) {
    if (!el.classList.contains("in-view")) {
      observer.observe(el);
    }
  });
})();
