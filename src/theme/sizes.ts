export type SizeName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ThemeSizes = { [K in SizeName]: string };

export const defaultFontSizes: ThemeSizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
};

export const defaultIconSizes: ThemeSizes = {
    xs: '0.875rem',   // 0.75rem * 1.25
    sm: '1.09375rem', // 0.875rem * 1.25
    md: '1.25rem',
    lg: '1.40625rem', // 1.125rem * 1.25
    xl: '1.5625rem',  // 1.25rem * 1.25
};
