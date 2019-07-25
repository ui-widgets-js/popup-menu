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
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: auto;
          height: auto;
          font-size: small;
          font-family: Arial, sans-serif;
          max-width: 320px;
          overflow-y: auto;
          overflow-x: hidden;
          background-color: white;
          position: absolute;
          box-sizing: border-box;
          box-shadow: rgba(221, 221, 221, 0.35) 0px 2px 8px;
          border: 1px lightgray solid;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          color: #24292E;
          overflow: hidden;
          padding-top: 5px;
          padding-bottom: 5px;
        }

        .popup-menu-item {
          text-align: left;
          overflow: hidden;
          display: flex;
          width: 100%;
          max-width: 100%;
          height: 32px;
          max-height: 32px;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }

        .popup-menu-item:hover {
          background-color: #D3D3D352;
        }

        .popup-menu-item .image {
          min-width: 30px;
          min-height: 30px;
          background-repeat: no-repeat;
          background-position: center;
        }

        .popup-menu-item p {
          margin-top: 0px;
          margin-bottom: 0px;
          margin-left: 8px;
          margin-right: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: inherit;
        }
      </style>
      `;
    menuItems.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('popup-menu-item');
      menuItem.innerHTML = `
        <div class="image" style="background-image: url('${item.imageUrl}')"></div>
        <p>${item.itemName}</p>
      `;
      menuItem.addEventListener('click', () => {
        this._onPopupMenuItemClick(item.itemId);
      });
      this.shadowRoot.appendChild(menuItem);
    });
    this._onHandleClosingEvent = this._onHandleClosingEvent.bind(this);
  }

  connectedCallback() {
    ['click', 'resize', 'orientationchange'].forEach(eventName =>
      window.addEventListener(eventName, this._onHandleClosingEvent));
  }

  disconnectedCallback() {
    ['click', 'resize', 'orientationchange'].forEach(eventName =>
      window.removeEventListener(eventName, this._onHandleClosingEvent));
  }

  /**
   * @private
   * @param {DOMEvent} e Closes the existing instance of PopupMenu if specified
   * event is not defaultPrevented
   */
  _onHandleClosingEvent(e) {
    if (!e.defaultPrevented) {
      PopupMenu.close();
    }
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
    if (!Array.isArray(menuItems) || menuItems.length === 0) {
      throw new Error('Invalid parameter: items must be a non empty Array of PopupMenuItem');
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
}

export { PopupMenuItem, PopupMenuPosition };