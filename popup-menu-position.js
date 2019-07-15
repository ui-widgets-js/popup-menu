/**
 * @class PopupMenuPosition
 * @classdesc Absolute coordinates of the popup menu item to be displayed
 */
export default class PopupMenuPosition {
  /**
   * Provide at lest two coordinates to determine an absolute position of the
   * PopupMenu in the browser or webview
   * @param {number} [left] left horizontal offset
   * @param {number} [top] top vertical offset
   * @param {number} [right] right horizontal offset
   * @param {number} [bottom] bottom vertical offset
   */
  constructor(left, top, right, bottom) {
    const isProvided = arg => arg !== null && arg !== undefined;

    // Validate input
    if (isProvided(left) && typeof(left) !== 'number') {
      throw new Error('Invalid Parameter: left must be an integer');
    }
    if (isProvided(top) && typeof(top) !== 'number') {
      throw new Error('Invalid Parameter: top must be an integer');
    }
    if (isProvided(right) && typeof(right) !== 'number') {
      throw new Error('Invalid Parameter: right must be an integer');
    }
    if (isProvided(bottom) && typeof(bottom) !== 'number') {
      throw new Error('Invalid Parameter: bottom must be an integer');
    }

    this.left = isProvided(left) ? `${left}px` : undefined;
    this.top = isProvided(top) ? `${top}px` : undefined;
    this.right = isProvided(right) ? `${right}px` : undefined;
    this.bottom = isProvided(bottom) ? `${bottom}px` : undefined;
  }

  static alignBottomLeft(domElement) {
    const rect = domElement.getBoundingClientRect();
    return new PopupMenuPosition(
      rect.left,
      rect.bottom
    );
  }

  static alignBottomRight(domElement) {
    const rect = domElement.getBoundingClientRect();
    return new PopupMenuPosition(
      undefined,
      rect.bottom,
      window.innerWidth - rect.right
    );
  }

  static alignTopLeft(domElement) {
    const rect = domElement.getBoundingClientRect();
    return new PopupMenuPosition(
      rect.left,
      undefined,
      undefined,
      window.innerHeight - rect.top
    );
  }

  static alignTopRight(domElement) {
    const rect = domElement.getBoundingClientRect();
    return new PopupMenuPosition(
      undefined,
      undefined,
      window.innerWidth - rect.right,
      window.innerHeight - rect.top
    );
  }
}
