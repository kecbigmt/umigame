type ColorType =
    | 'primary'
    | 'secondary'
    | 'background'
    | 'surface'
    | 'danger';

type OnColorType =
    | 'onPrimary'
    | 'onSecondary'
    | 'onBackground'
    | 'onSurface';

type ColorVariant = 'base' | 'dark' | 'light';

export type ColorName = `${ColorType}.${ColorVariant}`;

export type OnColorName = `${OnColorType}.${ColorVariant}`;

export type ThemeColors = {
    [K in ColorName | OnColorName]?: string;
}

export const darkColors: ThemeColors = {
    'primary.base': '#00E5BC',
    'primary.dark': '#116B5B',
    'secondary.base': '#0094E7',
    'background.base': '#333333',
    'surface.base': '#222222',
    'danger.base': '#EB5757',
    'onPrimary.base': '#004852',
    'onPrimary.dark': '#ffffff',
    'onSecondary.base': '#ffffff',
    'onBackground.base': '#ccc',
    'onBackground.light': '#fff',
    'onBackground.dark': '#aaa',
    'onSurface.base': '#ccc',
    'onSurface.light': '#fff',
    'onSurface.dark': '#aaa',
};
