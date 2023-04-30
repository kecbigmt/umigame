export type SizeName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ThemeSizes = { [K in SizeName]: string };

export const defaultSizes: ThemeSizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
};
