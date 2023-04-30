import { FC, ReactNode, useState } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';

import { ThemeBaseColorName, getContentColorName } from '../../../theme';
import { Icon, IconName } from '../../atoms/Icon';
import { Label } from '../../atoms/Label';
import { Paragraph } from '../../atoms/Paragraph';

export type AccordionProps = {
  /**
   * Accordion title. Always visible.
   * It has chevronUp/chevronDown icon on the right side to indicate the accordion box is opened or closed.
   * It will be rendered in Label component.
   */
  titleLabel?: string;

  /**
   * Accordion title icon.
   * It is always visible on the left side of the title.
   */
  titleIcon?: IconName;

  /**
   * Accordion head preview. Only visible when the accordion box is closed.
   */
  preview?: string;

  /**
   * Accordion content. Only visible when the accordion box is opened
   * If head is string, it will be rendered in Paragraph component.
   */
  children: ReactNode;

  /**
   * Color of the box
   */
  color: ThemeBaseColorName;

  /**
   * Custom style
   * */
  customStyle?: Interpolation<Theme>;
};

/**
 * Accordion component
 * */
export const Accordion: FC<AccordionProps> = ({
  titleLabel,
  titleIcon,
  preview,
  children,
  color,
  customStyle,
}) => {
  /**
   * If true, the accordion box will be opened and the content will be visible.
   * And the icon on the right side of the head will be chevronUp.
   *
   * If false, the accordion box will be closed and the content will be hidden.
   * And the icon on the right side of the head will be chevronDown.
   */
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const contentColor = getContentColorName(color);

  const accordionStyle = (theme: Theme) => css`
    border-radius: ${theme.borderRadius.lg};
    background-color: ${theme.colors[color]};
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  `;

  const headStyle = (theme: Theme) => css`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: ${theme.colors[contentColor]};

    ${open &&
    css`
      border-bottom: 1px solid ${theme.colors.outline};
    `}
  `;

  const titleStyle = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-grow: 1;
    overflow: hidden;
  `;

  const titleLabelStyle = css`
    flex-shrink: 0;
  `;

  const titleIconStyle = css`
    flex-shrink: 0;
  `;

  const previewParagraphStyle = css`
    flex-grow: 1;
  `;

  const chevronIconStyle = css`
    flex-shrink: 0;
  `;

  const contentStyle = (theme: Theme) => css`
    padding: 1rem;
    display: ${open ? 'block' : 'none'};
    color: ${theme.colors[contentColor]};
  `;

  return (
    <div css={[accordionStyle, customStyle]}>
      <div css={headStyle} onClick={toggleOpen}>
        <div css={titleStyle}>
          {titleIcon && (
            <Icon
              customStyle={titleIconStyle}
              name={titleIcon}
              size="md"
              color={contentColor}
            />
          )}
          {titleLabel && (
            <Label
              customStyle={titleLabelStyle}
              size="sm"
              weight="medium"
              color={contentColor}
            >
              {titleLabel}
            </Label>
          )}
          {preview && !open && (
            <Paragraph
              customStyle={previewParagraphStyle}
              color={contentColor}
              size="xs"
              single
              noWrap
              ellipsis
            >
              {preview}
            </Paragraph>
          )}
        </div>

        <Icon
          name={open ? 'chevronUp' : 'chevronDown'}
          size="md"
          color={contentColor}
          customStyle={chevronIconStyle}
        />
      </div>
      <div css={contentStyle}>
        {typeof children === 'string' ? (
          <Paragraph color={contentColor} size="md" weight="medium" single>
            {children}
          </Paragraph>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
