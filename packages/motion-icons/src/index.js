// Core entry point for motion-icons
import iconsData from './icons.js';

const toSvg = (contents, attrs = {}) => {
    const size = attrs.size || 24;
    const color = attrs.color || 'currentColor';
    const strokeWidth = attrs['stroke-width'] || 2;
    const className = attrs.class || '';

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" class="${className}" style="color: ${color};" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${contents}</svg>`;
};

const icons = {};

Object.keys(iconsData).forEach(key => {
    const pascalName = key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

    icons[pascalName] = {
        ...iconsData[key],
        toSvg: (attrs) => toSvg(iconsData[key].contents, attrs)
    };
});

export default icons;
