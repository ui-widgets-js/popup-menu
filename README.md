# @ui-widgets-js/popup-menu

Simple, lightweight, framework-independent, and easy-to-use popup menu UI widget for web applications.

## PopupMenu demo

![All menus are with icons](https://raw.githubusercontent.com/web-components-js/popup-menu/HEAD/screenshot1.png "All menus are with icons") ![Some menus are with icons](https://raw.githubusercontent.com/web-components-js/popup-menu/HEAD/screenshot2.png "Some menus are with icons")

## Installing from NPM

```
  npm install @ui-widgets-js/popup-menu
```

## Viewing Demo Application

First, run `npm install` to install all development dependencies. Then run `npm start` to start the demo application in the default browser.


## Using PopupMenu in your application

The documentation is available [here](https://ui-widgets-js.github.io/popup-menu/PopupMenu.html).

```
  import PopupMenu, { PopupMenuItem, PopupMenuPosition } from '@ui-widgets-js/popup-menu';

  // This example shows how to display PopupMenu under the specific button
  const myButton = document.getElementById('myButton');
  const itemList = [
    new PopupMenuItem(1, 'Play', './images/image-play.svg'),
    new PopupMenuItem(2, 'Pause', './images/image-pause.svg'),
    new PopupMenuItem(3, 'Next', './images/image-next.svg'),
    new PopupMenuItem(4, 'Previous', './images/image-previous.svg')
  ];
  const position = PopupMenuPosition.alignBottomLeft(myButton);
  const selectedId = await PopupMenu.show(itemList, position);
```
Check [demo/index.js](https://github.com/ui-widgets-js/popup-menu/blob/master/demo/index.js) for the full example code.

Note: This example code uses [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import). Consider using [webpack](https://www.npmjs.com/package/webpack) to import PopupMenu same way.


## Styling the PopupMenu

Modify the font, the color, or any other property of the PopupMenu by adding css for _popup-menu_ tag in your application. For example:
```
  body popup-menu {
    background-color: #add8e624;
    border: 1px solid #add8e6;
    border-radius: 5px;
    color: #0e5490;
  }
```

![Restyled PopupMenu](https://raw.githubusercontent.com/web-components-js/popup-menu/HEAD/screenshot3.png "Restyled PopupMenu")

## License

<a href="https://github.com/ui-widgets-js/popup-menu/blob/master/LICENSE">MIT License</a>