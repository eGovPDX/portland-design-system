import once from "@drupal/once";

(({ behaviors }) => {
  behaviors["@cityofportland/components-drupal/alert"] = {
    attach: (context) => {
      once(
        "@cityofportland/components-drupal/alert",
        context.querySelectorAll(".alert__close button")
      ).forEach((button) => {
        button.addEventListener("click", () => {
          const alertElement = button.closest(".alert");

          if (!alertElement) {
            console.warn("Could not find alert to dismiss");
            return;
          }

          const parent = alertElement.parentElement;

          alertElement.remove();

          if (parent) {
            // Prevent focus from silently falling back to <body> after removal.
            parent.setAttribute("tabindex", "-1");
            parent.focus();
          }
        });
      });
    },
  };
})(Drupal);
