type AccentColorType =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'error';

type SurfaceColorType = 'surface';

type BackgroundColorType = 'background';

type OutlineColorType = 'outline';

export type AccentColorName =
	| AccentColorType
	| `${AccentColorType}.container`

export type AccentContentColorName =
	| `on${Capitalize<AccentColorType>}`
	| `on${Capitalize<AccentColorType>}.container`;

export type SurfaceColorName =
	| SurfaceColorType
	| `${SurfaceColorType}.variant`;

export type SurfaceContentColorName =
	| `on${Capitalize<SurfaceColorType>}`
	| `on${Capitalize<SurfaceColorType>}.variant`;

export type BackgroundColorName =
	| BackgroundColorType;

export type BackgroundContentColorName =
	| `on${Capitalize<BackgroundColorType>}`;

export type OutlineColorName = OutlineColorType;

export type ThemeBaseColorName =
	| AccentColorName
	| SurfaceColorName
	| BackgroundColorName
	| OutlineColorName;

export type ThemeContentColorName = 
	| AccentContentColorName
	| SurfaceContentColorName	
	| BackgroundContentColorName;

export type ThemeColorName =
	| ThemeBaseColorName
	| ThemeContentColorName;

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
