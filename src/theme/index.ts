import { ThemeColors, darkColors } from './colors';
import { ThemeFonts, defaultFonts } from './fonts';
import { ThemeParagraphGaps, defaultParagraphGaps } from './paragraphGaps';
import { ThemeSizes, defaultSizes } from './sizes';

export type Theme = {
    fonts: ThemeFonts,
    sizes: ThemeSizes,
    paragraphGaps: ThemeParagraphGaps,
    colors: ThemeColors,
}

export const darkTheme = {
    fonts: defaultFonts,
    sizes: defaultSizes,
    paragraphGaps: defaultParagraphGaps,
    colors: darkColors,
}

export * from './colors';
export * from './fonts';
export * from './paragraphGaps';
export * from './sizes';
