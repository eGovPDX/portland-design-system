import { ASSETS_CITY_SEAL } from "@cityofportland/design-tokens";
import once from "@drupal/once";

(({ behaviors }) => {
  behaviors["@cityofportland/components-drupal/footer"] = {
    attach: (context) => {
      once(
        "@cityofportland/components-drupal/footer/copyright/text",
        context.querySelectorAll(".footer__copyright-text")
      ).forEach((e) => {
        const currentYear = new Date().getFullYear();
        const copyrightStart = parseInt(e.dataset.copyrightStart);

        const copyrightText =
          copyrightStart >= currentYear || !copyrightStart
            ? `© Copyright ${currentYear}`
            : `© Copyright ${copyrightStart}-${currentYear}`;

        const copyrightElement = document.createElement("p");
        copyrightElement.textContent = copyrightText;
        e.appendChild(copyrightElement);
      });

      once(
        "@cityofportland/components-drupal/footer/copyright/image",
        context.querySelectorAll(".footer__copyright-img")
      ).forEach((img) => {
        img.src = ASSETS_CITY_SEAL;
      });
    },
  };
})(Drupal);
