import { SizeName } from './sizes';

export type ThemeParagraphGaps = { [K in SizeName]: string };

export const defaultParagraphGaps: ThemeParagraphGaps = {
    xs: '0.5rem',
    sm: '0.65625rem',
    md: '0.75rem',
    lg: '0.843755rem',
    xl: '0.9375rem',
};
