import once from "@drupal/once";

/** @type {DrupalBehavior} */
Drupal.behaviors["@cityofportland/components-drupal/control"] = {
  attach: (context) => {
    once(
      "@cityofportland/components-drupal/control",
      context.querySelectorAll(".control")
    ).forEach((/** @type {Element} */ wrapper) => {
      const controlSelectors = ["input", "textarea", "select"];

      const control = wrapper.querySelector(controlSelectors.join(","));

      if (!control) {
        return;
      }

      const describedBy = new Set(
        (control.getAttribute("aria-describedby") || "")
          .split(/\s+/)
          .filter(Boolean)
      );

      wrapper.querySelectorAll("[data-describe-control]").forEach((addon) => {
        if (addon.id) {
          describedBy.add(addon.id);
        } else {
          console.warn("Found control description without an ID.", addon);
        }
      });

      if (describedBy.size) {
        control.setAttribute(
          "aria-describedby",
          Array.from(describedBy).filter(Boolean).join(" ")
        );
      }
    });
  },
};
