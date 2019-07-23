/**
 * This demo code demonstrates how to use PopupMenu UI widget
 */
import PopupMenu, { PopupMenuItem, PopupMenuPosition } from './../popup-menu.js';

window.onload = () => {

  // Create menu items for the PopupMenu
  const itemList = [
    new PopupMenuItem(1, 'Play', './images/image-play.svg'),
    new PopupMenuItem(2, 'Pause', './images/image-pause.svg'),
    new PopupMenuItem(3, 'Next', './images/image-next.svg'),
    new PopupMenuItem(4, 'Previous', './images/image-previous.svg')
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


