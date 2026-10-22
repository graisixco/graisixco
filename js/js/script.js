document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  if (header) {
    const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 10);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const burger = document.getElementById("burgerBtn");
  const menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    const menuLinks = [...menu.querySelectorAll("a")];
    const closeMenu = (restoreFocus = false) => {
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
      if (restoreFocus) burger.focus();
    };
    const openMenu = () => {
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Close menu");
      menuLinks[0]?.focus();
    };

    burger.addEventListener("click", () => {
      if (burger.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });
    menuLinks.forEach(link => link.addEventListener("click", () => closeMenu()));
    menu.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      } else if (event.key === "Tab" && menuLinks.length) {
        const first = menuLinks[0];
        const last = menuLinks[menuLinks.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  let revealObserver = null;
  const observeReveals = () => {
    const pending = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      pending.forEach(element => element.classList.add("in"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
    }
    pending.forEach(element => revealObserver.observe(element));
  };
  observeReveals();
  setTimeout(observeReveals, 100);

  document.querySelectorAll(".tl-step").forEach(step => {
    step.addEventListener("mouseenter", () => {
      document.querySelectorAll(".tl-step").forEach(item => item.classList.remove("active"));
      step.classList.add("active");
    });
  });

  const form = document.getElementById("contactForm");
  if (form) {
    const note = form.querySelector(".form-note");
    const button = form.querySelector('button[type="submit"]');
    const label = button?.querySelector(".btn-label");
    const emailField = form.querySelector("#cf-email");
    const validEmailTlds = window.GRAISIX_VALID_EMAIL_TLDS;
    let isSubmitting = false;

    const validateEmailTld = () => {
      if (!emailField) return;
      const email = emailField.value.trim();
      if (!email || emailField.validity.typeMismatch) {
        emailField.setCustomValidity("");
        return;
      }

      const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
      const tld = domain.split(".").pop();
      const hasRecognizedTld = validEmailTlds instanceof Set && validEmailTlds.has(tld);
      emailField.setCustomValidity(
        hasRecognizedTld
          ? ""
          : "Enter an email address with a recognized ending, such as .com, .in, or .org."
      );
    };

    if (emailField) {
      emailField.addEventListener("input", validateEmailTld);
      emailField.addEventListener("blur", validateEmailTld);
    }

    form.addEventListener("submit", async event => {
      event.preventDefault();
      validateEmailTld();
      if (isSubmitting || !form.reportValidity()) return;

      isSubmitting = true;
      if (button) button.disabled = true;
      if (label) label.textContent = "Sending…";
      if (note) note.textContent = "Sending your message…";

      try {
        const response = await fetch(form.dataset.formspreeEndpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error("Form provider did not accept the submission.");
        form.reset();
        if (note) note.textContent = "The form provider accepted your message. The destination inbox and reply process have not been confirmed.";
      } catch (error) {
        if (note) note.textContent = "We could not confirm that your message was delivered. Please try again later.";
      } finally {
        isSubmitting = false;
        if (button) button.disabled = false;
        if (label) label.textContent = "Send message";
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  if (header) {
    const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 10);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  const burger = document.getElementById("burgerBtn");
  const menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    const menuLinks = [...menu.querySelectorAll("a")];
    const closeMenu = (restoreFocus = false) => {
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
      if (restoreFocus) burger.focus();
    };
    const openMenu = () => {
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Close menu");
      menuLinks[0]?.focus();
    };

    burger.addEventListener("click", () => {
      if (burger.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });
    menuLinks.forEach(link => link.addEventListener("click", () => closeMenu()));
    menu.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      } else if (event.key === "Tab" && menuLinks.length) {
        const first = menuLinks[0];
        const last = menuLinks[menuLinks.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  let revealObserver = null;
  const observeReveals = () => {
    const pending = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      pending.forEach(element => element.classList.add("in"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
    }
    pending.forEach(element => revealObserver.observe(element));
  };
  observeReveals();
  setTimeout(observeReveals, 100);

  document.querySelectorAll(".tl-step").forEach(step => {
    step.addEventListener("mouseenter", () => {
      document.querySelectorAll(".tl-step").forEach(item => item.classList.remove("active"));
      step.classList.add("active");
    });
  });

  const form = document.getElementById("contactForm");
  if (form) {
    const note = form.querySelector(".form-note");
    const button = form.querySelector('button[type="submit"]');
    const label = button?.querySelector(".btn-label");
    const emailField = form.querySelector("#cf-email");
    const validEmailTlds = window.GRAISIX_VALID_EMAIL_TLDS;
    let isSubmitting = false;

    const validateEmailTld = () => {
      if (!emailField) return;
      const email = emailField.value.trim();
      if (!email || emailField.validity.typeMismatch) {
        emailField.setCustomValidity("");
        return;
      }

      const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
      const tld = domain.split(".").pop();
      const hasRecognizedTld = validEmailTlds instanceof Set && validEmailTlds.has(tld);
      emailField.setCustomValidity(
        hasRecognizedTld
          ? ""
          : "Enter an email address with a recognized ending, such as .com, .in, or .org."
      );
    };

    if (emailField) {
      emailField.addEventListener("input", validateEmailTld);
      emailField.addEventListener("blur", validateEmailTld);
    }

    form.addEventListener("submit", async event => {
      event.preventDefault();
      validateEmailTld();
      if (isSubmitting || !form.reportValidity()) return;

      isSubmitting = true;
      if (button) button.disabled = true;
      if (label) label.textContent = "Sending…";
      if (note) note.textContent = "Sending your message…";

      try {
        const response = await fetch(form.dataset.formspreeEndpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error("Form provider did not accept the submission.");
        form.reset();
        if (note) note.textContent = "The form provider accepted your message. The destination inbox and reply process have not been confirmed.";
      } catch (error) {
        if (note) note.textContent = "We could not confirm that your message was delivered. Please try again later.";
      } finally {
        isSubmitting = false;
        if (button) button.disabled = false;
        if (label) label.textContent = "Send message";
      }
    });
  }
});
