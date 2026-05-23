import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, '../../../icons');
const OUTPUT_DIR = path.resolve(__dirname, '../src');
const ICONS_FILE = path.join(OUTPUT_DIR, 'icons.js');
const INDEX_FILE = path.join(OUTPUT_DIR, 'index.js');

const extractAndProcessContents = (svgString) => {
    const match = svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    if (!match) return svgString;
    
    let contents = match[1].replace(/\r?\n|\r/g, '\n').trim();

    // Convert hardcoded black fills/strokes or any static hex colors to currentColor
    contents = contents
        .replace(/fill="(#000000|#000|black|#000000|#000|rgb\(0,\s*0,\s*0\))"/gi, 'fill="currentColor"')
        .replace(/stroke="(#000000|#000|black|#000000|#000|rgb\(0,\s*0,\s*0\))"/gi, 'stroke="currentColor"');

    return contents;
};

const build = () => {
    if (!fs.existsSync(ICONS_DIR)) {
        console.error(`Error: Icons directory not found at ${ICONS_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(ICONS_DIR).filter(file => file.endsWith('.svg'));
    const iconsData = {};

    files.forEach(file => {
        const iconName = path.basename(file, '.svg');
        const svgContent = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');
        const contents = extractAndProcessContents(svgContent);

        iconsData[iconName] = {
            name: iconName,
            contents: contents
        };
    });

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const iconsFileContent = `// Auto-Generated file. Do not edit manually.\nconst iconsData = ${JSON.stringify(iconsData, null, 2)};\n\nexport default iconsData;\n`;
    fs.writeFileSync(ICONS_FILE, iconsFileContent, 'utf-8');

    const indexFileContent = `// Auto-Generated file. Do not edit manually.
import iconsData from './icons.js';

const toSvg = (contents, attrs = {}) => {
    const size = attrs.size || 24;
    const color = attrs.color || 'currentColor';
    const className = attrs.class || '';

    return \`<svg xmlns="http://www.w3.org/2000/svg" width="\${size}" height="\${size}" viewBox="0 0 24 24" class="\${className}" style="color: \${color};">\${contents}</svg>\`;
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
`;

    fs.writeFileSync(INDEX_FILE, indexFileContent, 'utf-8');
    console.log(`🚀 Success: Generated clean icons.js and auto-wrote index.js with ${files.length} icons!`);
};

build();