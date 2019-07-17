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

  // Example of showing PopupMenu on the top of the first button:
  
  const button1 = document.getElementById('showMenuButton1');
  button1.addEventListener('click', async e => {
    // Mark this click event as ignored by the PopupMenu's event listener
    e.preventDefault();
    // Align PopupMenu position to the top left of the button
    const position = PopupMenuPosition.alignTopLeft(button1);
    // Show PopupMenu and wait for the selected menu id asynchronously
    const selectedId = await PopupMenu.show(itemList, position);
    if (selectedId) {
      alert(`You have selected: ${itemList.find(item => item.itemId
        == selectedId).itemName}`);
    }
  });

  // Example of showing PopupMenu on the bottom of the second button:

  const button2 = document.getElementById('showMenuButton2');
  button2.addEventListener('click', async e => {
    // Mark this click event as ignored by the PopupMenu's event listener
    e.preventDefault();
    // Align PopupMenu position to the bottom left of the button
    const position = PopupMenuPosition.alignBottomLeft(button2);
    // Show PopupMenu and wait for the selected menu id asynchronously
    const selectedId = await PopupMenu.show(itemList, position);
    if (selectedId) {
      alert(`You have selected: ${itemList.find(item => item.itemId
        == selectedId).itemName}`);
    }
  });

}


