declare namespace Drupal {
  let locale: {};
  /**
   * Helper to rethrow errors asynchronously.
   *
   * This way Errors bubbles up outside of the original callstack, making it
   * easier to debug errors in the browser.
   *
   * @param {Error|string} error
   *   The error to be thrown.
   */
  function throwError(error: Error | string): void;
  let behaviors: {
    [x: string]: DrupalBehavior;
  };
  /**
   * Defines a behavior to be run during attach and detach phases.
   *
   * Attaches all registered behaviors to a page element.
   *
   * Behaviors are event-triggered actions that attach to page elements,
   * enhancing default non-JavaScript UIs. Behaviors are registered in the
   * {@link Drupal.behaviors} object using the method 'attach' and optionally
   * also 'detach'.
   *
   * {@link Drupal.attachBehaviors} is added below to the `jQuery.ready` event
   * and therefore runs on initial page load. Developers implementing Ajax in
   * their solutions should also call this function after new page content has
   * been loaded, feeding in an element to be processed, in order to attach all
   * behaviors to the new content.
   *
   * Behaviors should use `var elements =
   * once('behavior-name', selector, context);` to ensure the behavior is
   * attached only once to a given element. (Doing so enables the reprocessing
   * of given elements, which may be needed on occasion despite the ability to
   * limit behavior attachment to a particular element.)
   *
   * @example
   * Drupal.behaviors.behaviorName = {
   *   attach: function (context, settings) {
   *     // ...
   *   },
   *   detach: function (context, settings, trigger) {
   *     // ...
   *   }
   * };
   *
   * @param {Document|HTMLElement} [context=document]
   *   An element to attach behaviors to.
   * @param {object} [settings=drupalSettings]
   *   An object containing settings for the current context. If none is given,
   *   the global {@link drupalSettings} object is used.
   *
   * @see Drupal~behaviorAttach
   * @see Drupal.detachBehaviors
   *
   * @throws {Drupal~DrupalBehaviorError}
   */
  function attachBehaviors(
    context?: Document | HTMLElement,
    settings?: object
  ): void;
  /**
   * Detaches registered behaviors from a page element.
   *
   * Developers implementing Ajax in their solutions should call this function
   * before page content is about to be removed, feeding in an element to be
   * processed, in order to allow special behaviors to detach from the content.
   *
   * Such implementations should use `once.filter()` and `once.remove()` to find
   * elements with their corresponding `Drupal.behaviors.behaviorName.attach`
   * implementation, i.e. `once.remove('behaviorName', selector, context)`,
   * to ensure the behavior is detached only from previously processed elements.
   *
   * @param {Document|HTMLElement} [context=document]
   *   An element to detach behaviors from.
   * @param {object} [settings=drupalSettings]
   *   An object containing settings for the current context. If none given,
   *   the global {@link drupalSettings} object is used.
   * @param {string} [trigger='unload']
   *   A string containing what's causing the behaviors to be detached. The
   *   possible triggers are:
   *   - `'unload'`: The context element is being removed from the DOM.
   *   - `'move'`: The element is about to be moved within the DOM (for example,
   *     during a tabledrag row swap). After the move is completed,
   *     {@link Drupal.attachBehaviors} is called, so that the behavior can undo
   *     whatever it did in response to the move. Many behaviors won't need to
   *     do anything simply in response to the element being moved, but because
   *     IFRAME elements reload their "src" when being moved within the DOM,
   *     behaviors bound to IFRAME elements (like WYSIWYG editors) may need to
   *     take some action.
   *   - `'serialize'`: When an Ajax form is submitted, this is called with the
   *     form as the context. This provides every behavior within the form an
   *     opportunity to ensure that the field elements have correct content
   *     in them before the form is serialized. The canonical use-case is so
   *     that WYSIWYG editors can update the hidden textarea to which they are
   *     bound.
   *
   * @throws {Drupal~DrupalBehaviorError}
   *
   * @see Drupal~behaviorDetach
   * @see Drupal.attachBehaviors
   */
  function detachBehaviors(
    context?: Document | HTMLElement,
    settings?: object,
    trigger?: string
  ): void;
  /**
   * Encodes special characters in a plain-text string for display as HTML.
   *
   * @param {string} str
   *   The string to be encoded.
   *
   * @return {string}
   *   The encoded string.
   *
   * @ingroup sanitization
   */
  function checkPlain(str: string): string;
  /**
   * Replaces placeholders with sanitized values in a string.
   *
   * @param {string} str
   *   A string with placeholders.
   * @param {object} args
   *   An object of replacements pairs to make. Incidences of any key in this
   *   array are replaced with the corresponding value. Based on the first
   *   character of the key, the value is escaped and/or themed:
   *    - `'!variable'`: inserted as is.
   *    - `'@variable'`: escape plain text to HTML ({@link Drupal.checkPlain}).
   *    - `'%variable'`: escape text and theme as a placeholder for user-
   *      submitted content ({@link Drupal.checkPlain} +
   *      `{@link Drupal.theme}('placeholder')`).
   *
   * @return {string}
   *   The formatted string.
   *
   * @see Drupal.t
   */
  function formatString(str: string, args: object): string;
  /**
   * Replaces substring.
   *
   * The longest keys will be tried first. Once a substring has been replaced,
   * its new value will not be searched again.
   *
   * @param {string} str
   *   A string with placeholders.
   * @param {object} args
   *   Key-value pairs.
   * @param {Array|null} keys
   *   Array of keys from `args`. Internal use only.
   *
   * @return {string}
   *   The replaced string.
   */
  function stringReplace(str: string, args: object, keys: any[] | null): string;
  /**
   * Translates strings to the page language, or a given language.
   *
   * See the documentation of the server-side t() function for further details.
   *
   * @param {string} str
   *   A string containing the English text to translate.
   * @param {Object.<string, string>} [args]
   *   An object of replacements pairs to make after translation. Incidences
   *   of any key in this array are replaced with the corresponding value.
   *   See {@link Drupal.formatString}.
   * @param {object} [options]
   *   Additional options for translation.
   * @param {string} [options.context='']
   *   The context the source string belongs to.
   *
   * @return {string}
   *   The formatted string.
   *   The translated string.
   */
  function t(
    str: string,
    args?: {
      [x: string]: string;
    },
    options?: {
      context?: string;
    }
  ): string;
  /**
   * Returns the URL to a Drupal page.
   *
   * @param {string} path
   *   Drupal path to transform to URL.
   *
   * @return {string}
   *   The full URL.
   */
  function url(path: string): string;
  namespace url {
    /**
     * Returns the passed in URL as an absolute URL.
     *
     * @param {string} url
     *   The URL string to be normalized to an absolute URL.
     *
     * @return {string}
     *   The normalized, absolute URL.
     *
     * @see https://github.com/angular/angular.js/blob/v1.4.4/src/ng/urlUtils.js
     * @see https://grack.com/blog/2009/11/17/absolutizing-url-in-javascript
     */
    function toAbsolute(url: string): string;
    /**
     * Returns true if the URL is within Drupal's base path.
     *
     * @param {string} url
     *   The URL string to be tested.
     *
     * @return {boolean}
     *   `true` if local.
     *
     * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L58
     */
    function isLocal(url: string): boolean;
  }
  /**
   * Formats a string containing a count of items.
   *
   * This function ensures that the string is pluralized correctly. Since
   * {@link Drupal.t} is called by this function, make sure not to pass
   * already-localized strings to it.
   *
   * See the documentation of the server-side
   * \Drupal\Core\StringTranslation\TranslationInterface::formatPlural()
   * function for more details.
   *
   * @param {number} count
   *   The item count to display.
   * @param {string} singular
   *   The string for the singular case. Make sure it is clear this is singular,
   *   to ease translation (e.g. use "1 new comment" instead of "1 new"). Do not
   *   use @count in the singular string.
   * @param {string} plural
   *   The string for the plural case. Make sure it is clear this is plural, to
   *   ease translation. Use @count in place of the item count, as in "@count
   *   new comments".
   * @param {object} [args]
   *   An object of replacements pairs to make after translation. Incidences
   *   of any key in this array are replaced with the corresponding value.
   *   See {@link Drupal.formatString}.
   *   Note that you do not need to include @count in this array.
   *   This replacement is done automatically for the plural case.
   * @param {object} [options]
   *   The options to pass to the {@link Drupal.t} function.
   *
   * @return {string}
   *   A translated string.
   */
  function formatPlural(
    count: number,
    singular: string,
    plural: string,
    args?: object,
    options?: object
  ): string;
  /**
   * Encodes a Drupal path for use in a URL.
   *
   * For aesthetic reasons slashes are not escaped.
   *
   * @param {string} item
   *   Unencoded path.
   *
   * @return {string}
   *   The encoded path.
   */
  function encodePath(item: string): string;
  /**
   * Triggers deprecation error.
   *
   * Deprecation errors are only triggered if deprecation errors haven't
   * been suppressed.
   *
   * @param {Object} deprecation
   *   The deprecation options.
   * @param {string} deprecation.message
   *   The deprecation message.
   *
   * @see https://www.drupal.org/core/deprecation#javascript
   */
  function deprecationError({ message }: { message: string }): void;
  /**
   * Triggers deprecation error when object property is being used.
   *
   * @param {Object} deprecation
   *   The deprecation options.
   * @param {Object} deprecation.target
   *   The targeted object.
   * @param {string} deprecation.deprecatedProperty
   *   A key of the deprecated property.
   * @param {string} deprecation.message
   *   The deprecation message.
   * @returns {Object}
   *
   * @see https://www.drupal.org/core/deprecation#javascript
   */
  function deprecatedProperty({
    target,
    deprecatedProperty,
    message,
  }: {
    target: any;
    deprecatedProperty: string;
    message: string;
  }): any;
  /**
   * Generates the themed representation of a Drupal object.
   *
   * All requests for themed output must go through this function. It examines
   * the request and routes it to the appropriate theme function. If the current
   * theme does not provide an override function, the generic theme function is
   * called.
   *
   * @example
   * <caption>To retrieve the HTML for text that should be emphasized and
   * displayed as a placeholder inside a sentence.</caption>
   * Drupal.theme('placeholder', text);
   *
   * @namespace
   *
   * @param {function} func
   *   The name of the theme function to call.
   * @param {...args}
   *   Additional arguments to pass along to the theme function.
   *
   * @return {string|object|HTMLElement|jQuery}
   *   Any data the theme function returns. This could be a plain HTML string,
   *   but also a complex object.
   */
  function theme(
    func: Function,
    ...args: any[]
  ): string | object | HTMLElement | jQuery;
  namespace theme {
    /**
     * Formats text for emphasized display in a placeholder inside a sentence.
     *
     * @param {string} str
     *   The text to format (plain-text).
     *
     * @return {string}
     *   The formatted text (html).
     */
    function placeholder(str: string): string;
  }
  /**
   * Determine if an element is visible.
   *
   * @param {HTMLElement} elem
   *   The element to check.
   *
   * @return {boolean}
   *  True if the element is visible.
   */
  function elementIsVisible(elem: HTMLElement): boolean;
  /**
   * Determine if an element is hidden.
   *
   * @param {HTMLElement} elem
   *   The element to check.
   *
   * @return {boolean}
   *  True if the element is hidden.
   */
  function elementIsHidden(elem: HTMLElement): boolean;
}
declare let drupalSettings: any;
declare let drupalTranslations: any;
/**
 * A jQuery object, typically the return value from a `$(selector)` call.
 *
 * Holds an HTMLElement or a collection of HTMLElements.
 */
type jQuery = {
  /**
   * =0
   * Number of elements contained in the jQuery object.
   */
  length: number;
};
/**
 * Custom error thrown after attach/detach if one or more behaviors failed.
 * Initializes the JavaScript behaviors for page loads and Ajax requests.
 */
type DrupalBehaviorAttach = (
  context: Document | HTMLElement,
  settings: object | null
) => any;
/**
 * Reverts and cleans up JavaScript behavior initialization.
 */
type DrupalBehaviorDetach = (
  context: Document | HTMLElement,
  settings: object,
  trigger: string
) => any;
type DrupalBehavior = {
  /**
   *   Function run on page load and after an Ajax call.
   */
  attach: DrupalBehaviorAttach;
  /**
   * Function run when content is serialized or removed from the page.
   */
  detach?: DrupalBehaviorDetach;
};
