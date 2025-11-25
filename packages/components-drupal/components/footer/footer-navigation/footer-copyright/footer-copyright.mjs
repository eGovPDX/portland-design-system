import { ASSETS_CITY_SEAL } from "@cityofportland/design-tokens";

(({ behaviors }) => {
  console.debug("Footer copyright behavior loaded.", behaviors);
  behaviors["footer-copyright"] = {
    attach: (context) => {
      context.querySelectorAll(".footer__copyright-end").forEach((end) => {
        const year = new Date().getFullYear();
        end.textContent = year.toString();
      });

      context.querySelectorAll(".footer__copyright-img").forEach((img) => {
        img.src = ASSETS_CITY_SEAL;
      });
    },
  };
})(Drupal);
