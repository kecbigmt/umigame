import { FC } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';

import { ThemeBaseColorName, getContentColorName } from '../../../theme';
import { Paragraph } from '../../atoms/Paragraph';

export type ChatBubbleProps = {
  /**
   * Color of the bubble
   * */
  color: ThemeBaseColorName;

  /**
   * Text inside the bubble
   */
  children: string;

  /**
   * Bubble position
   */
  position: 'left' | 'right';

  /**
   * Custom style
   */
  customStyle?: Interpolation<Theme>;
};

/**
 * Bubble component
 * */
export const ChatBubble: FC<ChatBubbleProps> = ({
  color: baseColor,
  children,
  position,
  customStyle,
}) => {
  const contentColor = getContentColorName(baseColor);

  const bubbleStyle = (theme: Theme) => css`
    padding: 0.5rem 1rem;
    border-radius: ${theme.borderRadius.lg};
    background-color: ${theme.colors[baseColor]};
    display: inline-block;

		${position === 'left' &&
		css`
			border-top-left-radius: 0;

		`}
		${position === 'right' &&
		css`
			border-top-right-radius: 0;
		`}
  `;

  return (
    <div css={[bubbleStyle, customStyle]}>
      <Paragraph color={contentColor} size="sm" single>
        {children}
      </Paragraph>
    </div>
  );
};
