/**
 * This demo code demonstrates how to use PopupMenu UI widget
 */
import PopupMenu, { PopupMenuItem, PopupMenuPosition } from './../popup-menu.js';

window.onload = () => {

  // Create menu items for the PopupMenu
  const itemList = [
    new PopupMenuItem(1, 'Menu item One', './images/image-one.svg'),
    new PopupMenuItem(2, 'Menu item Two', './images/image-two.svg'),
    new PopupMenuItem(3, 'Menu item Three'),
    new PopupMenuItem(4, 'Menu item Four')
  ];

  // Example of showing PopupMenu on the bottom of the button:
  const button = document.getElementById('showMenuButton');
  button.addEventListener('click', async e => {
    // Mark this click event as ignored by the PopupMenu's event listener
    e.preventDefault();
    // Align PopupMenu position to the bottom left of the button
    const position = PopupMenuPosition.alignBottomLeft(button);
    // Show PopupMenu and wait for the selected menu id asynchronously
    const selectedId = await PopupMenu.show(itemList, position);
    if (selectedId) {
      alert(`You have selected: ${itemList.find(item => item.itemId
        == selectedId).itemName}`);
    }
  });
}


