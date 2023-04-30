import { FC } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';

import { Button } from '../Button';
import { IconName } from '../../atoms/Icon';
import { ThemeBaseColorName, getContentColorName } from '../../../theme';
import { Label } from '../../atoms/Label';

type Action = {
  icon: IconName;
  onClick: () => void;
};

export type TopAppBarProps = {
  color: ThemeBaseColorName | 'transparent';

  /**
   * Title of the top app bar
   */
  title?: string;

  /**
   * Leading navigation button
   */
  leadingNavigation?: Action;

  /**
   * Trailing action button
   */
  trailingAction?: Action;

  /**
   * Custom style
   * */
  customStyle?: Interpolation<Theme>;
};

/**
 * TopAppBar component
 * */
export const TopAppBar: FC<TopAppBarProps> = ({
  color,
  title,
  leadingNavigation,
  trailingAction,
  customStyle,
}) => {
  const AppBarStyle = (theme: Theme) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 56px;
    background-color: ${color === 'transparent'
      ? 'transparent'
      : theme.colors[color]};
		position: relative;
  `;

	const titleStyle = css`
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	`;

  const contentColor =
    color === 'transparent' ? 'onBackground' : getContentColorName(color);

  return (
    <header css={[AppBarStyle, customStyle]}>
      {leadingNavigation ? (
        <Button
          type="icon"
          icon={leadingNavigation.icon}
          onClick={leadingNavigation.onClick}
          color={contentColor}
        />
      ) : (
        <div />
      )}
      {title && (
        <Label size="md" color={contentColor} customStyle={titleStyle}>
          {title}
        </Label>
      )}
      {trailingAction ? (
        <Button
          type="icon"
          icon={trailingAction.icon}
          onClick={trailingAction.onClick}
          color={contentColor}
        />
      ) : (
        <div />
      )}
    </header>
  );
};
