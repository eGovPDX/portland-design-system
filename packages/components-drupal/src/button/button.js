/**
 * @file
 * Portland Button component JavaScript behaviors.
 *
 * This file provides Drupal-specific JavaScript behaviors for the Portland Button component.
 * It handles integration with Drupal's form system, AJAX, and accessibility features.
 */

/* eslint-env browser */
/* global Drupal, drupalSettings, once, CustomEvent, setTimeout, document */

(function (Drupal, drupalSettings, once) {
  "use strict";

  /**
   * Portland Button behavior.
   *
   * Handles initialization and interaction for Portland Button components.
   */
  Drupal.behaviors.portlandButton = {
    attach: function (context) {
      // Find all portland-button elements that haven't been processed
      const buttons = once("portland-button", "portland-button", context);

      buttons.forEach(function (button) {
        // Initialize the button
        initializeButton(button);

        // Handle form submission for submit buttons
        if (button.getAttribute("type") === "submit") {
          setupFormSubmission(button);
        }

        // Setup accessibility enhancements
        setupAccessibility(button);

        // Handle AJAX integration
        setupAjaxIntegration(button);
      });
    },

    detach: function (context, settings, trigger) {
      if (trigger === "unload") {
        // Clean up event listeners when components are removed
        const buttons = context.querySelectorAll("portland-button");
        buttons.forEach(function (button) {
          cleanupButton(button);
        });
      }
    },
  };

  /**
   * Initialize a Portland Button component.
   *
   * @param {HTMLElement} button - The portland-button element.
   */
  function initializeButton(button) {
    // Store reference for cleanup
    if (!button.portlandButtonData) {
      button.portlandButtonData = {
        initialized: true,
        handlers: {},
      };
    }

    // Handle click events
    const clickHandler = function (event) {
      handleButtonClick(button, event);
    };

    button.addEventListener("click", clickHandler);
    button.portlandButtonData.handlers.click = clickHandler;

    // Handle keyboard events for accessibility
    const keydownHandler = function (event) {
      handleButtonKeydown(button, event);
    };

    button.addEventListener("keydown", keydownHandler);
    button.portlandButtonData.handlers.keydown = keydownHandler;

    // Add loading state support for AJAX
    button.setLoading = function (loading) {
      if (loading) {
        button.classList.add("is-loading");
        button.setAttribute("aria-busy", "true");
        button.disabled = true;
      } else {
        button.classList.remove("is-loading");
        button.removeAttribute("aria-busy");
        button.disabled = false;
      }
    };
  }

  /**
   * Handle button click events.
   *
   * @param {HTMLElement} button - The portland-button element.
   * @param {Event} event - The click event.
   */
  function handleButtonClick(button, event) {
    // Don't process if button is disabled
    if (
      button.hasAttribute("disabled") ||
      button.getAttribute("aria-disabled") === "true"
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    // Trigger custom event for other behaviors to listen to
    const customEvent = new CustomEvent("portlandButton:click", {
      bubbles: true,
      cancelable: true,
      detail: {
        button: button,
        originalEvent: event,
      },
    });

    button.dispatchEvent(customEvent);

    // If the custom event was cancelled, prevent default action
    if (customEvent.defaultPrevented) {
      event.preventDefault();
      return false;
    }
  }

  /**
   * Handle keyboard events for button accessibility.
   *
   * @param {HTMLElement} button - The portland-button element.
   * @param {Event} event - The keydown event.
   */
  function handleButtonKeydown(button, event) {
    // Handle Space and Enter keys for button activation
    if (event.key === " " || event.key === "Enter") {
      // Only handle if this is not a native button element
      if (button.tagName.toLowerCase() !== "button") {
        event.preventDefault();
        button.click();
      }
    }
  }

  /**
   * Setup form submission handling for submit buttons.
   *
   * @param {HTMLElement} button - The portland-button element.
   */
  function setupFormSubmission(button) {
    const form = button.closest("form");
    if (!form) {
      return;
    }

    // Add form validation before submission
    const submitHandler = function (event) {
      // Trigger form validation
      if (form.checkValidity && !form.checkValidity()) {
        event.preventDefault();

        // Focus on first invalid field
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) {
          firstInvalid.focus();
        }

        return false;
      }

      // Set loading state for AJAX forms
      if (
        form.hasAttribute("data-drupal-ajax") ||
        form.classList.contains("ajax-form")
      ) {
        button.setLoading(true);
      }
    };

    button.addEventListener("click", submitHandler);
    if (button.portlandButtonData) {
      button.portlandButtonData.handlers.submit = submitHandler;
    }
  }

  /**
   * Setup accessibility enhancements.
   *
   * @param {HTMLElement} button - The portland-button element.
   */
  function setupAccessibility(button) {
    // Ensure proper ARIA attributes
    if (!button.hasAttribute("role")) {
      button.setAttribute("role", "button");
    }

    // Ensure tabindex for non-button elements
    if (
      button.tagName.toLowerCase() !== "button" &&
      !button.hasAttribute("tabindex")
    ) {
      button.setAttribute("tabindex", "0");
    }

    // Handle aria-describedby for form errors
    const form = button.closest("form");
    if (form) {
      const errorMessages = form.querySelectorAll(".form-item--error .error");
      if (errorMessages.length > 0) {
        const errorIds = Array.from(errorMessages).map((error) => {
          if (!error.id) {
            error.id = "error-" + Math.random().toString(36).substr(2, 9);
          }
          return error.id;
        });

        const existingDescribedBy =
          button.getAttribute("aria-describedby") || "";
        const describedBy = [existingDescribedBy, ...errorIds]
          .filter(Boolean)
          .join(" ");
        button.setAttribute("aria-describedby", describedBy);
      }
    }
  }

  /**
   * Setup AJAX integration for Drupal forms.
   *
   * @param {HTMLElement} button - The portland-button element.
   */
  function setupAjaxIntegration(button) {
    // Listen for AJAX events from Drupal
    button.addEventListener("ajax:before", function () {
      button.setLoading(true);
    });

    button.addEventListener("ajax:success", function () {
      button.setLoading(false);
    });

    button.addEventListener("ajax:error", function () {
      button.setLoading(false);

      // Add error state
      button.classList.add("has-error");
      setTimeout(function () {
        button.classList.remove("has-error");
      }, 3000);
    });

    // Handle Drupal's AJAX command responses
    document.addEventListener("drupalAjaxResponse", function (event) {
      if (event.detail && event.detail.element === button) {
        button.setLoading(false);
      }
    });
  }

  /**
   * Clean up button event listeners and data.
   *
   * @param {HTMLElement} button - The portland-button element.
   */
  function cleanupButton(button) {
    if (button.portlandButtonData && button.portlandButtonData.handlers) {
      const handlers = button.portlandButtonData.handlers;

      // Remove event listeners
      if (handlers.click) {
        button.removeEventListener("click", handlers.click);
      }
      if (handlers.keydown) {
        button.removeEventListener("keydown", handlers.keydown);
      }
      if (handlers.submit) {
        button.removeEventListener("click", handlers.submit);
      }

      // Clean up data
      delete button.portlandButtonData;
      delete button.setLoading;
    }
  }

  /**
   * Utility function to enhance button groups.
   * This can be called by other behaviors that need to work with button groups.
   */
  Drupal.portlandButton = {
    /**
     * Initialize a group of buttons with shared behavior.
     *
     * @param {NodeList|Array} buttons - Collection of portland-button elements.
     * @param {Object} options - Configuration options.
     */
    initializeGroup: function (buttons, options) {
      options = options || {};

      buttons.forEach(function (button, index) {
        // Add group attributes
        button.setAttribute("data-button-group-index", index);

        if (options.exclusive) {
          // For exclusive groups (like radio button behavior)
          button.addEventListener("click", function () {
            buttons.forEach(function (otherButton) {
              if (otherButton !== button) {
                otherButton.classList.remove("active");
                otherButton.setAttribute("aria-pressed", "false");
              }
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
          });
        }
      });
    },

    /**
     * Get all Portland Button elements in a context.
     *
     * @param {Element} context - The context to search within.
     * @return {NodeList} Collection of portland-button elements.
     */
    getButtons: function (context) {
      context = context || document;
      return context.querySelectorAll("portland-button");
    },
  };
})(Drupal, drupalSettings, once);