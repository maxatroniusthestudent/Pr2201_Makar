(function () {
  const btn = document.querySelector(".to-top");
  if (!btn) return;

  const SHOW_AFTER = 600;

  const onScroll = () => {
    if (window.scrollY > SHOW_AFTER) {
      btn.classList.add("to-top--visible");
    } else {
      btn.classList.remove("to-top--visible");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");
  const visitedKey = "threelegant_visited";

  if (loader) {
    const hasVisited = localStorage.getItem(visitedKey) === "1";

    if (hasVisited) {
      loader.remove();
    } else {
      document.body.classList.add("page--loading");

      setTimeout(function () {
        loader.classList.add("loader--hidden");
        document.body.classList.remove("page--loading");
        localStorage.setItem(visitedKey, "1");

        setTimeout(function () {
          if (loader.parentNode) loader.parentNode.removeChild(loader);
          requestLocation();
        }, 400);
      }, 1500);
    }
  }

  function requestLocation() {
    if (!("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      function () {
      },
      function () {
      }
    );
  }

  const userBtn = document.querySelector(".header__user");
  const modal = document.getElementById("signin-modal");

  if (userBtn && modal) {
    const backdrop = modal.querySelector(".modal__backdrop");
    const closeBtn = modal.querySelector(".modal__close");

    const openModal = () => {
      modal.classList.add("modal--open");
      document.body.style.overflow = "hidden";
      const firstInput = modal.querySelector("input");
      if (firstInput) firstInput.focus();
    };

    const closeModal = () => {
      modal.classList.remove("modal--open");
      document.body.style.overflow = "";
    };

    userBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    if (backdrop) {
      backdrop.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("modal--open")) {
        closeModal();
      }
    });
  }
});
