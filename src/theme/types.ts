type ColorType = 
    | 'primary'
    | 'secondary'
    | 'background'
    | 'surface'
    | 'danger'
    | 'onPrimary'
    | 'onSecondary'
    | 'onBackground'
    | 'onSurface';

type ColorVariant = 'base' | 'dark' | 'light';

export type ColorName = `${ColorType}.${ColorVariant}`;

export type ThemeColors = {
    [K in ColorName]?: string;
}

export type SizeName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Theme = {
    fonts: {
        family: {
            primary: string;
            secondary: string;
        },
        sizes: { [K in SizeName]: string },
        paragraphGaps: { [K in SizeName]: string },
    },
    colors: ThemeColors,
}