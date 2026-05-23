## Kivex Icon
![Version](https://img.shields.io/badge/version-1.0.0-blue)

A lightweight, pixel-perfect, and dynamic icon library for web developers.

## Why Kivex Icons?
- **Lightweight**: Minimalist SVG construction.
- **Dynamic**: Easily control size and color via JavaScript.
- **Easy to use**: Designed for vanilla JS and modern frameworks.

## Quick Start
```sh
npm install kivex-icons
```

## Usage
```javascript
import icons from 'kivex-icons';

const menu = icons.Menu.toSvg({ size: 30, color: "#000" });

document.getElementById('app').innerHTML = menu;
```
## CDN Usage
If you prefer not to use a package manager, you can include Kivex Icons directly in your HTML:
```html
<script type="module">
    import icons from 'https://cdn.jsdelivr.net/npm/kivex-icons/src/index.js';

    const menu = icons.Menu.toSvg({ size: 30, color: "#000" });
    document.getElementById('app').innerHTML = menu;
</script>
```

### License
This project is licensed under the MIT License. You are free to use, modify, and distribute this library for any project, including commercial applications.

## Contribution
Feel free to open issues or contribute to the library!

## Author
[MotionMind2007](https://github.com/MotionMind2007)