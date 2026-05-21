import iconsData from './icons.js';

declare module 'motion-icons' {
  export interface IconAttributes {
    size?: number;
    color?: string;
    'stroke-width'?: number;
    class?: string;
  }

  export interface Icon {
    name: string;
    contents: string;
    tags: string[];
    category: string;
    creator: string;
    toSvg: (attrs?: IconAttributes) => string;
  }

  type IconNames = CamelToPascal<keyof typeof iconsData>;

  type CamelToPascal<S extends string> = S extends `${infer T}-${infer U}`
    ? `${Capitalize<T>}${CamelToPascal<U>}`
    : Capitalize<S>;

  const icons: Record<IconNames, Icon>;

  export default icons;
}