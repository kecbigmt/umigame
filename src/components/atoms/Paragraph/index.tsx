import { FC } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';

import {
  ThemeContentColorName,
  SizeName,
  FontWeightName,
} from '../../../theme';

export type ParagraphProps = {
  /**
   * Text to be displayed
   */
  children: string;
  /**
   * Color of the text
   */
  color: ThemeContentColorName;
  /**
   * Font size
   */
  size: SizeName;

  /**
   * If true, margin-bottom will be removed
   */
  single?: boolean;

  /**
   * If true, text will not wrap
   */
  noWrap?: boolean;

  /**
   * If true, text will be truncated
   */
  ellipsis?: boolean;

  /**
   * Font weight
   */
  weight?: FontWeightName;
  /**
   * Custom style
   */
  customStyle?: Interpolation<Theme>;
};

const paragraphStyle = (theme: Theme) => css`
  margin: 0;
  line-height: 150%;
  font-family: ${theme.fonts.primary.family};
`;

export const Paragraph: FC<ParagraphProps> = ({
  children,
  color,
  size,
  single = false,
  noWrap = false,
  ellipsis = false,
  weight = 'regular',
  customStyle,
}) => {
  const dynamicStyle = (theme: Theme) => {
    const colorValue = theme.colors[color];
    if (!colorValue) throw new Error(`Color ${color} is not defined`);

    return css`
      color: ${colorValue};
      font-size: ${theme.fontSizes[size]};
      font-weight: ${theme.fonts.primary.weights[weight]};
      ${!single && `margin-bottom: ${theme.paragraphGaps[size]};`}
      ${noWrap && 'white-space: nowrap;'}
      ${ellipsis && `
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      `}
    `;
  };

  return (
    <p css={[paragraphStyle, dynamicStyle, customStyle]}>
      {children}
    </p>
  );
};
