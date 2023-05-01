import { FC, MouseEventHandler } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';
import { Icon, IconName } from '../../atoms/Icon';

import { ThemeContentColorName } from '../../../theme';
import { Label } from '../../atoms/Label';

export type ButtonBaseProps = {
  /**
   * Color of the button content
   */
  contentColor: ThemeContentColorName;

  /**
   * Content of the button
   */
  children?: string;

  /**
   * Function to be called when the button is clicked
   * @returns {void}
   */
  onClick: MouseEventHandler;

  /**
   * If true, the button will be disabled
   */
  disabled?: boolean;

  /**
   * If true, the button will be submit button
   */
  submit?: boolean;

  /**
   * Icon to be displayed
   */
  icon?: IconName;

  /**
   * Position of the icon
   */
  iconPosition?: 'inner' | 'left' | 'right';

  /**
   * Custom style for the button
   */
  customStyle?: Interpolation<Theme>;
};

/**
 * Base component for FilledButton, OutlinedButton and TextButton
 */
export const ButtonBase: FC<ButtonBaseProps> = ({
  contentColor,
  children,
  onClick,
  disabled = false,
  submit = false,
  icon,
  iconPosition = 'inner',
  customStyle,
}) => {
  const size = 'md';

  const buttonStyle = (theme: Theme) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3rem;
    padding: 0.75rem calc(1.5rem + ${theme.iconSizes[size]});
    cursor: pointer;
    position: relative;
    transition: box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;

    &:disabled {
      opacity: 33%;
      cursor: not-allowed;
    }
  `;

  const iconStyle =
    iconPosition === 'inner'
      ? undefined
      : (theme: Theme) => css`
          position: absolute;
          ${iconPosition}: 0.75rem;
          top: calc(50% - ${theme.iconSizes[size]} / 2);
        `;

  const contentWrapperStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  `;

  return (
    <button
      type={submit ? 'submit' : 'button'}
      css={[buttonStyle, customStyle]}
      onClick={onClick}
      disabled={disabled}
    >
      <div css={contentWrapperStyle}>
        {icon && (
          <Icon
            customStyle={iconStyle}
            name={icon}
            size={size}
            color={contentColor}
          />
        )}
        {
          children && (
            <Label size={size} color={contentColor} weight="bold">
              {children}
            </Label>
          ) 
        }
      </div>
    </button>
  );
};
