/**
 * This demo code demonstrates how to use PopupMenu UI widget
 */
import PopupMenu, { PopupMenuItem, PopupMenuPosition } from './../popup-menu.js';

window.onload = () => {

  // Create menu items for the PopupMenu
  const itemList = [
    new PopupMenuItem(1, 'First menu item'),
    new PopupMenuItem(2, 'Second menu item'),
    new PopupMenuItem(3, 'Third menu item')
  ];

  // Example of showing PopupMenu on the top of the first button
  const button1 = document.getElementById('showMenuButton1');
  button1.addEventListener('click', async e => {
    // Mark this click event as ignored by the PopupMenu's event listener
    e.preventDefault();
    // Align PopupMenu position to the bottom left of the button
    const position = PopupMenuPosition.alignTopLeft(button1);
    // Show PopupMenu and wait for the selected menu id asynchronously
    const selectedId = await PopupMenu.show(itemList, position);
    if (selectedId) {
      alert(`You have selected: ${itemList.find(item => item.itemId
        == selectedId).itemName}`);
    }
  });

  // Example of showing PopupMenu on the bottom of the second button
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


