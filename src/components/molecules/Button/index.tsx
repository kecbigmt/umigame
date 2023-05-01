import { FC } from 'react';
import { css, Theme } from '@emotion/react';

import { ButtonBase, ButtonBaseProps } from './base';
import {
  getContentColorName,
  getBaseColorName,
  ThemeBaseColorName,
  ThemeContentColorName,
} from '../../../theme';
import { IconName } from '../../atoms/Icon';

export type FilledButtonProps = {
  type: 'filled';
  color: ThemeBaseColorName;
  children: string;
} & Omit<ButtonBaseProps, 'contentColor'>;

export type OutlinedButtonProps = {
  type: 'outlined';
  color: ThemeContentColorName;
  children: string;
} & Omit<ButtonBaseProps, 'contentColor'>;

export type TextButtonProps = {
  type: 'text';
  color: ThemeContentColorName;
  children: string;
} & Omit<ButtonBaseProps, 'contentColor'>;

export type IconButtonProps = {
  type: 'icon';
  color: ThemeContentColorName;
  icon: IconName;
} & Omit<ButtonBaseProps, 'contentColor' | 'iconPosition'>;

export type FilledIconButtonProps = {
  type: 'filledIcon';
  color: ThemeBaseColorName;
  icon: IconName;
} & Omit<ButtonBaseProps, 'contentColor' | 'iconPosition'>;

export type ButtonProps =
  | FilledButtonProps
  | OutlinedButtonProps
  | TextButtonProps
  | IconButtonProps
  | FilledIconButtonProps;

export const Button: FC<ButtonProps> = (props) => {
  const { type, children, color, customStyle, ...otherProps } = props;

  const contentColor =
    type === 'filled' || type === 'filledIcon'
      ? getContentColorName(color)
      : color;
  const buttonStyle = getButtonStyle(props);

  return (
    <ButtonBase
      customStyle={[buttonStyle, customStyle]}
      contentColor={contentColor}
      {...otherProps}
    >
      {children}
    </ButtonBase>
  );
};

const getButtonStyle = ({ type, color }: ButtonProps) => {
  switch (type) {
    case 'filled':
      return (theme: Theme) => css`
        border: none;
        background-color: ${theme.colors[color]};

        &:hover:not(:disabled) {
          box-shadow: 0 0 0 0.125rem ${theme.colors[color]};
        }
      `;
    case 'outlined':
      return (theme: Theme) => css`
        border: 2px solid ${theme.colors[color]};
        background-color: transparent;

        &:hover:not(:disabled) {
          box-shadow: 0 0 0 0.125rem ${theme.colors[color]};
        }
      `;
    case 'text':
      return (theme: Theme) => css`
        border: none;
        background-color: transparent;
        color: ${theme.colors[color]};

        &:hover:not(:disabled) {
          text-decoration: underline;
        }
      `;
    case 'icon':
      const baseColor = getBaseColorName(color);
      return (theme: Theme) => css`
        border: none;
        background-color: transparent;
        color: ${theme.colors[color]};
        padding: 0.25rem;

        &:hover:not(:disabled) {
          background-color: ${theme.colors[baseColor]};
          box-shadow: 0 0 0 0.125rem ${theme.colors[baseColor]};
        }
      `;
    case 'filledIcon':
      return (theme: Theme) => css`
        border: none;
        background-color: ${theme.colors[color]};
        padding: 0.25rem;

        &:hover:not(:disabled) {
          box-shadow: 0 0 0 0.125rem ${theme.colors[color]};
        }
      `;
    default:
      throw new Error('Invalid button type');
  }
};
