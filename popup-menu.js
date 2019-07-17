'use strict';

import PopupMenuItem from './popup-menu-item.js';
import PopupMenuPosition from './popup-menu-position.js';

let instance = null;
let isConstructorAllowed = false;

/**
 * @class PopupMenu
 * @classdesc
 * Implements the functionality of a popup up menu to be displayed in your
 * application. The popup menu contains of the list of the provided menu items.
 * 
 * Listens window 'click' event to close itself. For the cases when it is needed
 * to display the menu on click, mark the 'click' event as defaultPrevented
 * using event.preventDefault(), so the PopupMenu will ignore it.
 * 
 * Example of usage:
 * 
 *  // Display PopupMenu under the button
 *  const myButton = document.getElementById('myButton');
 *  const itemList = [
 *    new PopupMenuItem(1, 'Menu item 1'),
 *    new PopupMenuItem(2, 'Menu item 2'),
 *    new PopupMenuItem(3, 'Menu item 3')
 *  ];
 *  const position = PopupMenuPosition.alignBottomLeft(myButton);
 *  const selectedId = await PopupMenu.show(itemList, position);
 */
export default class PopupMenu extends HTMLElement {
  /**
   * @constructor
   * @private
   * @param {Array<PopupMenuItem>} menuItems Menu items to be displayed
   */
  constructor(menuItems) {
    if (!isConstructorAllowed) {
      throw new Error('This is private constructor. Use PopupMenu.show() instead.');
    }
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      .host {
        width: auto;
        height: auto;
        font-size: small;
        font-family: Arial, sans-serif;
        max-width: 320px;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: white;
        position: relative;
        box-sizing: border-box;
        box-shadow: rgba(221, 221, 221, 0.35) 0px 2px 8px;
        border: 1px lightgray solid;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: #24292E;
        border-radius: 5px;
        overflow: hidden;
      }

      .host .popup-menu-item {
        text-align: left;
        overflow: hidden;
        display: flex;
        width: 100%;
        max-width: 100%;
        height: 32px;
        max-height: 32px;
        flex-direction: column;
        justify-content: center;
      }

      .host .popup-menu-item p {
        margin-top: 0px;
        margin-bottom: 0px;
        margin-left: 8px;
        margin-right: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .host .popup-menu-item:hover {
        background-color: #F1F8FF;
      }`;

    const host = document.createElement('div');
    host.classList.add('host');
    host.id = 'host';
    menuItems.forEach(item => {
      const p = document.createElement('p');
      p.innerText = item.itemName;

      const menuItem = document.createElement('div');
      menuItem.classList.add('popup-menu-item');
      menuItem.addEventListener('click', () => {
        this._onPopupMenuItemClick(item.itemId);
      });
      menuItem.appendChild(p);

      host.appendChild(menuItem);
    });

    this.shadow.appendChild(style);
    this.shadow.appendChild(host);
    this.style.position = 'absolute';
  }

  /**
   * @private
   * @param {any} itemId The id of the selected item
   */
  _onPopupMenuItemClick(itemId) {
    if (this.onItemSelected) {
      this.onItemSelected(itemId);
      this.onItemSelected = null;
    }
  }

  static get is() {
    return 'popup-menu';
  }

  /**
   * Displays the popup menu and returns the id of the selected item
   * asynchronously.
   * 
   * Example of usage:
   *
   *  const selectedId = await PopupMenu.show(itemsList, position);
   * 
   * @static
   * @async
   * @param {Array<PopupMenuItem>} menuItems The list of items to be displayed
   * @param {PopupMenuPosition} position The position of PopupMenu
   */
  static async show(menuItems, position) {
    // Validate the input
    if (!Array.isArray(menuItems)) {
      throw new Error('Invalid parameter: items must be an Array of PopupMenuItem');
    }
    if (!menuItems.every(item => item instanceof PopupMenuItem)) {
      throw new Error(`Invalid parameter: each menu item must be an instance PopupMenuItem`);
    }
    if (!(position instanceof PopupMenuPosition)) {
      throw new Error ('Invalid parameter: position must be an instance of PopupMenuPosition');
    }
    PopupMenu.close();
    isConstructorAllowed = true;
    instance = new PopupMenu(menuItems);
    isConstructorAllowed = false;

    instance.style.top = position.top;
    instance.style.left = position.left;
    instance.style.right = position.right;
    instance.style.bottom = position.bottom;

    const itemId = await new Promise(resolve => {
      instance.onItemSelected = resolve;
      document.body.appendChild(instance);
    });
    return itemId;
  }

  /**
   * Closes any existing instance of PopupMenu on the screen
   * @static
   */
  static close() {
    if (instance) {
      try {
        if (instance.onItemSelected) {
          instance.onItemSelected(undefined);
        }
        instance.parentElement.removeChild(instance);
      }
      catch(error) {
        console.error(`PopupMenu: ${error}\n${error.stack}`);
      }
      instance = null;
    }
  }
}

if (!window.customElements.get(PopupMenu.is)) {
  window.customElements.define(PopupMenu.is, PopupMenu);
  window.addEventListener('click', event => {
    // Do not close the PopupMenu for the events marked as ignored for the
    // PopupMenu
    if (!event.defaultPrevented) {
      // When the non-marked click event is received, always close PopupMenu
      PopupMenu.close();
    }
  });
}

export { PopupMenuItem, PopupMenuPosition };