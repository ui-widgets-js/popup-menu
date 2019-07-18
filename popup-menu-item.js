/**
 * @class PopupMenuItem
 * @classdesc A model of an item of the menu to be displayed
 */
export default class PopupMenuItem {
  /**
   * @constructor
   * @param {any} id The unique ID of the menu item
   * @param {string} name The menu item content
   * @param {string} [imageUrl] The menu item image
   */
  constructor(id, name, imageUrl) {
    this.itemId = id;
    this.itemName = name;
    this.imageUrl = imageUrl;
  }
}