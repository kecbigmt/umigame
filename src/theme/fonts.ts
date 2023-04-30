export type ThemeFontName = 'primary' | 'secondary';

export type ThemeFonts = {
    [K in ThemeFontName]: {
        family: string;
        weights: { [K in FontWeightName]: number };
    }
}

export type FontWeightName = 'light' | 'regular' | 'medium' | 'bold';

export const defaultFonts: ThemeFonts = {
    primary: {
        family: 'Noto Sans JP, sans-serif',
        weights: {
            light: 300,
            regular: 400,
            medium: 500,
            bold: 700,
        },
    },
    secondary: {
        family: 'Roboto, sans-serif',
        weights: {
            light: 300,
            regular: 400,
            medium: 500,
            bold: 700,
        },
    }
};
