(() => {
  "use strict";

  const menuToggle = document.querySelector("#menuToggle");
  const mainNav = document.querySelector("#mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const appointmentDate = document.querySelector("#appointmentDate");
  if (appointmentDate) {
    const now = new Date();
    const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    appointmentDate.min = localToday;
  }

  const quoteTab = document.querySelector("#quoteTab");
  const scheduleTab = document.querySelector("#scheduleTab");
  const schedulePanel = document.querySelector("#schedulePanel");
  const requestType = document.querySelector("#requestType");

  function setRequestMode(mode) {
    const isSchedule = mode === "schedule";
    if (schedulePanel) schedulePanel.hidden = !isSchedule;
    if (quoteTab) {
      quoteTab.classList.toggle("active", !isSchedule);
      quoteTab.setAttribute("aria-selected", String(!isSchedule));
    }
    if (scheduleTab) {
      scheduleTab.classList.toggle("active", isSchedule);
      scheduleTab.setAttribute("aria-selected", String(isSchedule));
    }
    if (requestType) requestType.value = isSchedule ? "Appointment request" : "Quote request";
    const dateField = document.querySelector("#appointmentDate");
    if (dateField) dateField.required = isSchedule;
  }

  if (quoteTab) quoteTab.addEventListener("click", () => setRequestMode("quote"));
  if (scheduleTab) scheduleTab.addEventListener("click", () => setRequestMode("schedule"));

  document.querySelectorAll(".quote-service").forEach((link) => {
    link.addEventListener("click", () => {
      const serviceSelect = document.querySelector("#serviceSelect");
      if (serviceSelect && link.dataset.service) serviceSelect.value = link.dataset.service;
      setRequestMode("quote");
    });
  });

  const quoteForm = document.querySelector("#quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = (id) => {
        const field = document.getElementById(id);
        return field ? field.value.trim() : "";
      };

      const mode = value("requestType") || "Quote request";
      const lines = [
        mode + " — Local Detailz",
        "",
        "Name: " + value("customerName"),
        "Email: " + value("customerEmail"),
        "Vehicle year: " + (value("vehicleYear") || "Not provided"),
        "Vehicle make/model: " + (value("vehicleModel") || "Not provided"),
        "Service: " + (value("serviceSelect") || "Not sure yet")
      ];
      if (mode === "Appointment request") {
        lines.push("Preferred date: " + (value("appointmentDate") || "Not provided"));
        lines.push("Preferred time: " + (value("appointmentTime") || "Flexible"));
      }
      lines.push("", "Additional details:", value("customerMessage") || "None provided");
      lines.push("", "Please replace this demo recipient with the real Local Detailz business email before launch.");

      const subject = encodeURIComponent(mode + " — " + (value("customerName") || "Website visitor"));
      const body = encodeURIComponent(lines.join("\n"));
      const status = document.querySelector("#formStatus");
      if (status) status.textContent = "Opening your email app. Review the draft and replace the demo recipient before sending.";
      // Demo recipient placeholder. Replace with the business's actual email address.
      window.location.href = "mailto:replace-with-business-email@example.com?subject=" + subject + "&body=" + body;
    });
  }

  const googleReviewLink = document.querySelector("#googleReviewLink");
  if (googleReviewLink) {
    googleReviewLink.addEventListener("click", (event) => {
      event.preventDefault();
      const note = document.querySelector("#googleReviewNote");
      if (note) note.textContent = "DEMO LINK: replace this button URL with the business’s real Google review link before launch.";
    });
  }

  document.querySelectorAll("[data-social]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("href") === "#") {
        event.preventDefault();
        const social = link.dataset.social || "social profile";
        window.alert("Demo placeholder: add the real Local Detailz " + social + " profile URL in the HTML before publishing.");
      }
    });
  });
})();