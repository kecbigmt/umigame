export type AccentBaseColorName =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'error';

export type OnAccentBaseColorName = `on${Capitalize<AccentBaseColorName>}`;

export type AccentContainerColorName = `${AccentBaseColorName}.container`;

export type OnAccentContainerColorName = `on${Capitalize<AccentContainerColorName>}`;

export type SurfaceBaseColorName = 'surface';

export type OnSufaceBaseColorName = `on${Capitalize<SurfaceBaseColorName>}`;

export type SurfaceVariantColorName = `${SurfaceBaseColorName}.variant`;

export type OnSufaceVariantColorName = `on${Capitalize<SurfaceVariantColorName>}`;

export type BackgroundColorName = 'background';

export type OnBackgroundColorName = `on${Capitalize<BackgroundColorName>}`;

export type OutlineColorName = 'outline';

export type ThemeBaseColorName =
	| AccentBaseColorName
	| AccentContainerColorName
	| SurfaceBaseColorName
	| SurfaceVariantColorName
	| BackgroundColorName;

export type ThemeContentColorName = 
	| OnAccentBaseColorName
	| OnAccentContainerColorName
	| OnSufaceBaseColorName
	| OnSufaceVariantColorName
	| OnBackgroundColorName;

export type ThemeColorName =
	| ThemeBaseColorName
	| ThemeContentColorName
	| OutlineColorName;

export type ColorCode = `#${string}`;

export type ThemeColors = {
	[K in ThemeColorName]: ColorCode;
}

export const lightColors: ThemeColors = {
	'primary': '#00639c',
	'onPrimary': '#ffffff',
	'primary.container': '#cee5ff',
	'onPrimary.container': '#001d33',
	'secondary': '#006b57',
	'onSecondary': '#ffffff',
	'secondary.container': '#42fdd3',
	'onSecondary.container': '#002019',
	'tertiary': '#266c2b',
	'onTertiary': '#ffffff',
	'tertiary.container': '#aaf5a4',
	'onTertiary.container': '#002204',
	'error': '#ba1a1a',
	'onError': '#ffffff',
	'error.container': '#ffdad6',
	'onError.container': '#410002',
	'background': '#f3fffa',
	'onBackground': '#00201a',
	'surface': '#f3fffa',
	'onSurface': '#00201a',
	'surface.variant': '#dee3eb',
	'onSurface.variant': '#42474e',
	'outline': '#72777f',
};

export const darkColors: ThemeColors = {
	'primary': '#98cbff',
	'onPrimary': '#003354',
	'primary.container': '#004a77',
	'onPrimary.container': '#cee5ff',
	'secondary': '#00e0b8',
	'onSecondary': '#00382c',
	'secondary.container': '#005141',
	'onSecondary.container': '#42fdd3',
	'tertiary': '#8fd88a',
	'onTertiary': '#00390b',
	'tertiary.container': '#055315',
	'onTertiary.container': '#aaf5a4',
	'error': '#ffb4ab',
	'onError': '#690005',
	'error.container': '#93000a',
	'onError.container': '#ffdad6',
	'background': '#00201a',
	'onBackground': '#79f8dc',
	'surface': '#00201a',
	'onSurface': '#79f8dc',
	'surface.variant': '#42474e',
	'onSurface.variant': '#c2c7cf',
	'outline': '#8c9199',
};

export const getContentColorName = (baseColorName: ThemeBaseColorName): ThemeContentColorName => {
	const capitalized = baseColorName.charAt(0).toUpperCase() + baseColorName.slice(1);
	return `on${capitalized}` as ThemeContentColorName;
}

export const getBaseColorName = (contentColorName: ThemeContentColorName): ThemeBaseColorName => {
	const baseColorName = contentColorName.replace('on', '').toLowerCase();
	return baseColorName as ThemeBaseColorName;
};
