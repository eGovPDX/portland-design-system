import once from "@drupal/once";
import { BOX_ERRORS } from "@cityofportland/types/box";

(({ behaviors }) => {
  behaviors["@cityofportland/components-drupal/box"] = {
    attach: (context) => {
      once(
        "@cityofportland/components-drupal/box",
        context.querySelectorAll(".box")
      ).forEach((box) => {
        box.attributes["data-errors"]?.value.split(" ").forEach((error) => {
          console.error(
            `${BOX_ERRORS[error] || `An unknown error (${error}) occurred with the Box component.`}`
          );
        });
      });
    },
  };
})(Drupal);
