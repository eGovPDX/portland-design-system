/** @type {DrupalBehavior} */
Drupal.behaviors["@cityofportland/components-drupal/textarea"] = {
  attach: (context) => {
    once(
      "@cityofportland/components-drupal/textarea",
      /** @type {NodeListOf<HTMLTextAreaElement>} */
      (context.querySelectorAll("textarea[maxlength][data-character-count]"))
    ).forEach((textarea) => {
      const maxLength = Number.parseInt(
        textarea.getAttribute("maxlength") || ""
      );
      const characterCountElement = document.querySelector(
        `#${textarea.dataset.characterCount}`
      );

      if (Number.isNaN(maxLength) || !characterCountElement) {
        return;
      }

      const updateCharacterCount = () => {
        const remaining = Math.max(maxLength - textarea.value.length, 0);

        characterCountElement.textContent =
          textarea.value.length == 0
            ? Drupal.formatPlural(
                remaining,
                "1 character allowed.",
                "@count characters allowed."
              )
            : Drupal.formatPlural(
                remaining,
                "1 character remaining.",
                "@count characters remaining."
              );
      };

      updateCharacterCount();

      textarea.addEventListener("input", updateCharacterCount);
    });
  },
};
