import once from "@drupal/once";

/** @type {DrupalBehavior} */
Drupal.behaviors["@cityofportland/components-drupal/control"] = {
  attach: (context) => {
    once(
      "@cityofportland/components-drupal/control",
      context.querySelectorAll(".input")
    ).forEach((control) => {
      const input = control.querySelector("*:first-child");

      if (!input) {
        throw new RangeError("Found empty control wrapper.");
      }

      const describedBy = new Set(
        [input.getAttribute("aria-describedby")?.split(" ")].flat()
      );

      const addDescribedBy = (/** @type {string} */ selector) => {
        context.querySelectorAll(selector).forEach((addon) => {
          if (addon.id) {
            describedBy.add(addon.id);
          } else {
            console.warn("Found input addon without an ID.", addon);
          }
        });
      };

      addDescribedBy(".input__addon--prefix");

      addDescribedBy(".input__addon--suffix");

      if (describedBy.size) {
        input.setAttribute(
          "aria-describedby",
          Array.from(describedBy).filter(Boolean).join(" ")
        );
      }
    });
  },
};
