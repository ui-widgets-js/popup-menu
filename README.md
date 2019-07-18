# @ui-widgets-js/popup-menu

Simple, lightweight, framework-independent, and easy-to-use popup menu UI widget for web applications.

<img src="https://raw.githubusercontent.com/web-components-js/popup-menu/HEAD/screenshot1.png" height="250px">
<img src="https://raw.githubusercontent.com/web-components-js/popup-menu/HEAD/screenshot2.png" height="250px">

## Viewing Demo Application

First, run `npm install` to install all development dependencies. Then run `npm start` to start the demo application in the default browser.

## Installing from NPM

```
  npm install @ui-widgets-js/popup-menu
```

## Using PopupMenu in your application

```
  import PopupMenu, { PopupMenuItem, PopupMenuPosition } from '@ui-widgets-js/popup-menu';

  // This example shows how to display PopupMenu under the specific button
  const myButton = document.getElementById('myButton');
  const itemList = [
    new PopupMenuItem(1, 'Menu item One', './images/image-one.svg'),
    new PopupMenuItem(2, 'Menu item Two', './images/image-two.svg'),
    new PopupMenuItem(3, 'Menu item Three'),
    new PopupMenuItem(3, 'Menu item Four')
  ];
  const position = PopupMenuPosition.alignBottomLeft(myButton);
  const selectedId = await PopupMenu.show(itemList, position);
```
Check <a href="https://github.com/ui-widgets-js/popup-menu/blob/master/demo/index.js">demo/index.js</a> for the full example code.

## Styling the PopupMenu

Modify the font, the color, or any other property of the PopupMenu by adding css for _popup-menu_ tag in your application. For example:
```
  body popup-menu {
    color: blue;
    border: 1px solid lightblue;
  }
```

<img src="https://raw.githubusercontent.com/web-components-js/popup-menu/HEAD/screenshot3.png" height="250px">

## License

<a href="https://github.com/ui-widgets-js/popup-menu/blob/master/LICENSE">MIT License</a>