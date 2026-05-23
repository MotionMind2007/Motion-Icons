// Auto-Generated file. Do not edit manually.
import iconsData from './icons.js';

const toSvg = (contents, attrs = {}) => {
    const size = attrs.size || 24;
    const color = attrs.color || 'currentColor';
    const className = attrs.class || '';

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" class="${className}" style="color: ${color};">${contents}</svg>`;
};

const icons = {};

Object.keys(iconsData).forEach(key => {
    const pascalName = key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

    const iconObject = {
        ...iconsData[key],
        toSvg: (attrs) => toSvg(iconsData[key].contents, attrs)
    };

    icons[pascalName] = iconObject;
    icons[key] = iconObject;
});

const replace = () => {
    if (typeof document === 'undefined') return;

    const elements = document.querySelectorAll('[data-kivex]');
    elements.forEach(element => {
        const iconName = element.getAttribute('data-kivex');
        const size = element.getAttribute('data-size');
        const color = element.getAttribute('data-color');
        const className = element.getAttribute('class');

        if (icons[iconName]) {
            const options = {};
            if (size) options.size = size;
            if (color) options.color = color;
            if (className) options.class = className;

            element.outerHTML = icons[iconName].toSvg(options);
        }
    });
};

icons.replace = replace;

export default icons;
