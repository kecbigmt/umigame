import { FC } from 'react';
import { css, Theme } from '@emotion/react';

import { OnColorName, SizeName, FontWeightName, ThemeFontName } from '../../../theme'; 

export type LabelProps = {
    /**
     * Text to be displayed
     */
    children: string;
    /**
     * Color of the text
     */
    color: OnColorName,
    /**
     * Font size
     */
    size: SizeName;
    /** 
     * Font weight
     */
    weight?: FontWeightName;

    /**
     * Font type
     */
    font?: ThemeFontName;
};


const labelStyle = css`
    line-height: 125%;
    letter-spacing: 0.02em;
`;

export const Label: FC<LabelProps> = ({ children, color, size, weight = 'regular', font = 'primary' }) => {
    const colorStyle = (theme: Theme) => {
        const colorValue = theme.colors[color];
        if (!colorValue) throw new Error(`Color ${color} is not defined`);

        return css`
            color: ${colorValue};
        `;
    };
    const sizeStyle = (theme: Theme) => css`
        font-size: ${theme.fontSizes[size]};
    `;
    const fontStyle = (theme: Theme) => css`
        font-family: ${theme.fonts[font].family};
        font-weight: ${theme.fonts[font].weights[weight]};
    `;

    return (
        <span css={[labelStyle, colorStyle, sizeStyle, fontStyle]}>{children}</span>
    )
};
