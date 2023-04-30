import '@emotion/react';
import { Theme as ThemeType } from '../theme';

// override Theme by ThemeType
declare module '@emotion/react' {
    export interface Theme extends ThemeType {}
}
