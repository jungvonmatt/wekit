export default function isHidden(element) {
  /**
   * The offsetParent property will return null whenever it or
   * any of its parents is hidden via the display style property.
   * Just make sure that the element isn't fixed.
   */
  return element.offsetParent === null;
}
