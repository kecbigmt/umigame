import { ThemeColors, darkColors } from './colors';
import { ThemeFonts, defaultFonts } from './fonts';
import { ThemeParagraphGaps, defaultParagraphGaps } from './paragraphGaps';
import { ThemeSizes, defaultBorderRaduis, defaultFontSizes, defaultIconSizes } from './sizes';

export type Theme = {
    fonts: ThemeFonts,
    fontSizes: ThemeSizes,
    iconSizes: ThemeSizes,
    borderRadius: ThemeSizes,
    paragraphGaps: ThemeParagraphGaps,
    colors: ThemeColors,
}

export const darkTheme = {
    fonts: defaultFonts,
    fontSizes: defaultFontSizes,
    iconSizes: defaultIconSizes,
    borderRadius: defaultBorderRaduis,
    paragraphGaps: defaultParagraphGaps,
    colors: darkColors,
}

export * from './colors';
export * from './fonts';
export * from './paragraphGaps';
export * from './sizes';
