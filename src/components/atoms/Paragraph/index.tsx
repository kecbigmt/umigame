import { FC } from 'react';
import { css, Theme } from '@emotion/react';

import { ThemeContentColorName, SizeName, FontWeightName } from '../../../theme'; 

export type ParagraphProps = {
    /**
     * Text to be displayed
     */
    children: string;
    /**
     * Color of the text
     */
    color: ThemeContentColorName,
    /**
     * Font size
     */
    size: SizeName;
    /**
     * Font weight
     */
    weight?: FontWeightName;
};


const paragraphStyle = (theme: Theme) => css`
    line-height: 125%;
    letter-spacing: -0.02em;
    font-family: ${theme.fonts.primary};
`;

export const Paragraph: FC<ParagraphProps> = ({ children, color, size, weight = 'regular' }) => {
    const colorStyle = (theme: Theme) => {
        const colorValue = theme.colors[color];
        if (!colorValue) throw new Error(`Color ${color} is not defined`);

        return css`
            color: ${colorValue};
        `;
    };
    const sizeStyle = (theme: Theme) => css`
        font-size: ${theme.fontSizes[size]};
        margin-bottom: ${theme.paragraphGaps[size]};
    `;
    const weightStyle = (theme: Theme) => css`
        font-weight: ${theme.fonts.primary.weights[weight]};
    `;

    return (
        <p css={[paragraphStyle, colorStyle, sizeStyle, weightStyle]}>{children}</p>
    )
};
