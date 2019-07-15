/**
 * @class PopupMenuItem
 * @classdesc A model of an item of the menu to be displayed
 */
export default class PopupMenuItem {
  /**
   * @constructor
   * @param {any} id The unique ID of the menu item
   * @param {String} name The menu item content
   */
  constructor(id, name) {
    this.itemId = id;
    this.itemName = name;
  }
}