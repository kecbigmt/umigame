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
    xs: '1rem',
    sm: '1.25rem',
    md: '1.5rem',
    lg: '1.75rem',
    xl: '2rem',
};
