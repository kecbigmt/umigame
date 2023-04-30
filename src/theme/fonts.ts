export type ThemeFonts = {
    primary: string;
    primaryWeights: { [K in FontWeightName]: number };
    secondary: string;
    secondaryWeights: { [K in FontWeightName]: number };
}

export type FontWeightName = 'light' | 'regular' | 'medium' | 'bold';

export const defaultFonts: ThemeFonts = {
    primary: 'Noto Sans JP, sans-serif',
    primaryWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
    },
    secondary: 'Roboto, sans-serif',
    secondaryWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
    }
};
