import once from "@drupal/once";

(({ behaviors }) => {
  behaviors["@cityofportland/components-drupal/footer/menu"] = {
    attach: (context) => {
      once(
        "@cityofportland/components-drupal/footer/menu",
        context.querySelectorAll(".footer__menu")
      ).forEach((e, index) => {
        e.setAttribute("aria-labelledby", `footer-menu-title-${index}`);
        e.querySelectorAll(".footer__menu-title").forEach((title) => {
          title.setAttribute("id", `footer-menu-title-${index}`);
        });
      });
    },
  };
})(Drupal);
