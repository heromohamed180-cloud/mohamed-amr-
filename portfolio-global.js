/* =========================================================
   MOHAMED AMR PORTFOLIO
   GLOBAL DARK / LIGHT MODE
   AUTO-INJECT TOGGLE
   MOBILE SLIDE MENU
   REVEAL ANIMATIONS
   DYNAMIC CONTENT SUPPORT
   ========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-theme";

  const DARK = "dark";
  const LIGHT = "light";

  /* =======================================================
     GET SAVED THEME
     ======================================================= */

  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === DARK || saved === LIGHT) {
      return saved;
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      return LIGHT;
    }

    return DARK;
  }

  /* =======================================================
     APPLY THEME
     ======================================================= */

  function applyTheme(theme) {
    const normalizedTheme =
      theme === LIGHT ? LIGHT : DARK;

    document.documentElement.setAttribute(
      "data-theme",
      normalizedTheme
    );

    localStorage.setItem(
      STORAGE_KEY,
      normalizedTheme
    );

    updateThemeToggle(normalizedTheme);
  }

  /* =======================================================
     CREATE THEME TOGGLE AUTOMATICALLY
     ======================================================= */

  function createThemeToggle() {
    if (
      document.querySelector(
        "[data-portfolio-theme-toggle]"
      )
    ) {
      return;
    }

    const navbar =
      document.querySelector(".navbar") ||
      document.querySelector("nav");

    if (!navbar) {
      return;
    }

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "portfolio-theme-toggle";

    button.setAttribute(
      "data-portfolio-theme-toggle",
      ""
    );

    button.setAttribute(
      "aria-label",
      "Switch theme"
    );

    button.setAttribute(
      "title",
      "Switch theme"
    );

    button.innerHTML = `
      <i
        class="fa-solid fa-sun portfolio-theme-icon"
        aria-hidden="true"
      ></i>

      <span class="portfolio-theme-label">
        LIGHT
      </span>
    `;

    const connectButton =
      navbar.querySelector(".btn-outline");

    if (connectButton) {
      navbar.insertBefore(
        button,
        connectButton
      );
    } else {
      navbar.appendChild(button);
    }

    button.addEventListener(
      "click",
      function () {
        const currentTheme =
          document.documentElement.getAttribute(
            "data-theme"
          ) || DARK;

        const nextTheme =
          currentTheme === DARK
            ? LIGHT
            : DARK;

        applyTheme(nextTheme);
      }
    );

    const currentTheme =
      document.documentElement.getAttribute(
        "data-theme"
      ) || DARK;

    updateThemeToggle(currentTheme);
  }

  /* =======================================================
     UPDATE TOGGLE UI
     ======================================================= */

  function updateThemeToggle(theme) {
    const button =
      document.querySelector(
        "[data-portfolio-theme-toggle]"
      );

    if (!button) {
      return;
    }

    const icon =
      button.querySelector(
        ".portfolio-theme-icon"
      );

    const label =
      button.querySelector(
        ".portfolio-theme-label"
      );

    const isLight =
      theme === LIGHT;

    if (icon) {
      icon.className =
        isLight
          ? "fa-solid fa-moon portfolio-theme-icon"
          : "fa-solid fa-sun portfolio-theme-icon";
    }

    if (label) {
      label.textContent =
        isLight
          ? "DARK"
          : "LIGHT";
    }

    button.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark mode"
        : "Switch to light mode"
    );

    button.setAttribute(
      "title",
      isLight
        ? "Switch to dark mode"
        : "Switch to light mode"
    );
  }

  /* =======================================================
     REVEAL ANIMATIONS
     Works across ALL sections
     ======================================================= */

  function initRevealAnimations() {
    const elements =
      document.querySelectorAll(".fu");

    if (!elements.length) {
      return;
    }

    if (
      !("IntersectionObserver" in window)
    ) {
      elements.forEach(
        function (element) {
          element.classList.add("on");
        }
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(
            function (entry) {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "on"
                );

                obs.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.05,
          rootMargin: "0px 0px -30px 0px"
        }
      );

    elements.forEach(
      function (element) {
        observer.observe(
          element
        );
      }
    );
  }

  /* =======================================================
     MOBILE SLIDE MENU
     Auto-builds from the existing navbar links
     ======================================================= */

  function initializeMobileMenu() {
    const navbar =
      document.querySelector(".navbar") ||
      document.querySelector("nav");

    if (!navbar) {
      return;
    }

    if (
      document.querySelector(
        "[data-mobile-menu-toggle]"
      )
    ) {
      return;
    }

    const navLinks =
      navbar.querySelector(".nav-links");

    if (!navLinks) {
      return;
    }

    /* -----------------------------------------------------
       HAMBURGER BUTTON
       ----------------------------------------------------- */

    const toggle =
      document.createElement("button");

    toggle.type = "button";

    toggle.className =
      "mobile-menu-toggle";

    toggle.setAttribute(
      "data-mobile-menu-toggle",
      ""
    );

    toggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

    toggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    /* -----------------------------------------------------
       BACKDROP
       ----------------------------------------------------- */

    const backdrop =
      document.createElement("div");

    backdrop.className =
      "mobile-menu-backdrop";

    backdrop.setAttribute(
      "data-mobile-menu-backdrop",
      ""
    );

    /* -----------------------------------------------------
       SLIDE PANEL
       ----------------------------------------------------- */

    const panel =
      document.createElement("aside");

    panel.className =
      "mobile-menu-panel";

    panel.setAttribute(
      "data-mobile-menu-panel",
      ""
    );

    panel.setAttribute(
      "aria-hidden",
      "true"
    );

    /* -----------------------------------------------------
       PANEL HEADER
       ----------------------------------------------------- */

    const head =
      document.createElement("div");

    head.className =
      "mobile-menu-head";

    head.innerHTML = `
      <div class="mobile-menu-label">
        Navigation
      </div>

      <button
        type="button"
        class="mobile-menu-close"
        aria-label="Close navigation menu"
      >
        <i
          class="fa-solid fa-xmark"
          aria-hidden="true"
        ></i>
      </button>
    `;

    /* -----------------------------------------------------
       MOBILE LINKS
       ----------------------------------------------------- */

    const list =
      document.createElement("ul");

    list.className =
      "mobile-menu-list";

    Array
      .from(
        navLinks.querySelectorAll("a")
      )
      .forEach(
        function (link) {
          const li =
            document.createElement("li");

          const clonedLink =
            link.cloneNode(true);

          li.appendChild(
            clonedLink
          );

          list.appendChild(
            li
          );

          clonedLink.addEventListener(
            "click",
            closeMenu
          );
        }
      );

    panel.appendChild(
      head
    );

    panel.appendChild(
      list
    );

    /* -----------------------------------------------------
       MOBILE CTA
       ----------------------------------------------------- */

    const connectButton =
      navbar.querySelector(".btn-outline");

    if (connectButton) {
      const cta =
        document.createElement("div");

      cta.className =
        "mobile-menu-cta";

      const ctaLink =
        connectButton.cloneNode(true);

      ctaLink.classList.add(
        "btn-outline"
      );

      cta.appendChild(
        ctaLink
      );

      ctaLink.addEventListener(
        "click",
        closeMenu
      );

      panel.appendChild(
        cta
      );
    }

    /* -----------------------------------------------------
       INSERT ELEMENTS
       ----------------------------------------------------- */

    navbar.appendChild(
      toggle
    );

    document.body.appendChild(
      backdrop
    );

    document.body.appendChild(
      panel
    );

    const closeButton =
      panel.querySelector(
        ".mobile-menu-close"
      );

    /* -----------------------------------------------------
       OPEN MENU
       ----------------------------------------------------- */

    function openMenu() {
      toggle.classList.add(
        "is-open"
      );

      panel.classList.add(
        "is-open"
      );

      backdrop.classList.add(
        "is-open"
      );

      document.body.classList.add(
        "mobile-menu-open"
      );

      toggle.setAttribute(
        "aria-expanded",
        "true"
      );

      toggle.setAttribute(
        "aria-label",
        "Close navigation menu"
      );

      panel.setAttribute(
        "aria-hidden",
        "false"
      );
    }

    /* -----------------------------------------------------
       CLOSE MENU
       ----------------------------------------------------- */

    function closeMenu() {
      toggle.classList.remove(
        "is-open"
      );

      panel.classList.remove(
        "is-open"
      );

      backdrop.classList.remove(
        "is-open"
      );

      document.body.classList.remove(
        "mobile-menu-open"
      );

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

      toggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      panel.setAttribute(
        "aria-hidden",
        "true"
      );
    }

    /* -----------------------------------------------------
       TOGGLE
       ----------------------------------------------------- */

    function toggleMenu() {
      if (
        panel.classList.contains(
          "is-open"
        )
      ) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    /* -----------------------------------------------------
       EVENTS
       ----------------------------------------------------- */

    toggle.addEventListener(
      "click",
      toggleMenu
    );

    closeButton.addEventListener(
      "click",
      closeMenu
    );

    backdrop.addEventListener(
      "click",
      closeMenu
    );

    document.addEventListener(
      "keydown",
      function (event) {
        if (
          event.key === "Escape"
        ) {
          closeMenu();
        }
      }
    );

    window.addEventListener(
      "resize",
      function () {
        if (
          window.innerWidth > 900
        ) {
          closeMenu();
        }
      }
    );
  }

  /* =======================================================
     DYNAMIC CONTENT SUPPORT
     ======================================================= */

  function initDynamicSupport() {
    if (
      !("MutationObserver" in window)
    ) {
      return;
    }

    let timer = null;

    const observer =
      new MutationObserver(
        function () {
          clearTimeout(timer);

          timer =
            setTimeout(
              function () {

                /* Theme Toggle */
                if (
                  !document.querySelector(
                    "[data-portfolio-theme-toggle]"
                  )
                ) {
                  createThemeToggle();

                  const theme =
                    document.documentElement.getAttribute(
                      "data-theme"
                    ) || DARK;

                  updateThemeToggle(
                    theme
                  );
                }

                /* Mobile Menu */
                if (
                  !document.querySelector(
                    "[data-mobile-menu-toggle]"
                  )
                ) {
                  initializeMobileMenu();
                }

              },
              50
            );
        }
      );

    observer.observe(
      document.documentElement,
      {
        childList: true,
        subtree: true
      }
    );
  }

  /* =======================================================
     INITIALIZE EVERYTHING
     ======================================================= */

  function initializePortfolioTheme() {
    const savedTheme =
      getSavedTheme();

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );

    createThemeToggle();

    updateThemeToggle(
      savedTheme
    );

    initRevealAnimations();

    initDynamicSupport();
  }

  /* =======================================================
     SYSTEM THEME CHANGES
     ======================================================= */

  if (
    window.matchMedia
  ) {
    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      );

    const handleSystemThemeChange =
      function (event) {
        const manuallySavedTheme =
          localStorage.getItem(
            STORAGE_KEY
          );

        if (manuallySavedTheme) {
          return;
        }

        applyTheme(
          event.matches
            ? LIGHT
            : DARK
        );
      };

    if (
      mediaQuery.addEventListener
    ) {
      mediaQuery.addEventListener(
        "change",
        handleSystemThemeChange
      );
    } else if (
      mediaQuery.addListener
    ) {
      mediaQuery.addListener(
        "change",
        handleSystemThemeChange
      );
    }
  }

  /* =======================================================
     START SCRIPT
     ======================================================= */

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initializePortfolioTheme
    );

    document.addEventListener(
      "DOMContentLoaded",
      initializeMobileMenu
    );
  } else {
    initializePortfolioTheme();
    initializeMobileMenu();
  }

})();
