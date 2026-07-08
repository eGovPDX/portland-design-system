import once from "@drupal/once";
import { validateBoxConfiguration } from "@cityofportland/types/box";

(({ behaviors }) => {
  behaviors["@cityofportland/components-drupal/box"] = {
    attach: (context) => {
      once(
        "@cityofportland/components-drupal/box",
        context.querySelectorAll(".box")
      ).forEach((box) => {
        const [color, variant] = validateBoxConfiguration(
          box.dataset.color,
          box.dataset.variant
        );

        // if anything is undefined, remove the set classes on the element
        if (color === undefined)
          box.classList.remove(`box--${box.dataset.color}`);
        if (variant === undefined)
          box.classList.remove(`box--${box.dataset.variant}`);
      });
    },
  };
})(Drupal);
