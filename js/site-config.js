(() => {
  const email = "hello@graisix.com";
  const status = "mailbox planned; may not yet receive messages";
  document.querySelectorAll("[data-contact-email]").forEach(element => {
    element.textContent = email + " — " + status;
  });
})();

