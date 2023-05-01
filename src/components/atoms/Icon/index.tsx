import { FC } from 'react';
import { IconContext } from 'react-icons';
import {
  BsChevronUp,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsX,
  BsXCircleFill,
  BsList,
  BsCheck,
  BsFillMicFill,
  BsMicMuteFill,
  BsKeyboard,
  BsTrash,
  BsQuestionSquare,
  BsQuestionSquareFill,
} from 'react-icons/bs';
import { useTheme, Theme, Interpolation } from '@emotion/react';

import { ThemeContentColorName, SizeName } from '../../../theme';

export type IconName =
  | 'chevronUp'
  | 'chevronDown'
  | 'chevronLeft'
  | 'chevronRight'
  | 'close'
  | 'closeCircleFill'
  | 'menu'
  | 'check'
  | 'micOn'
  | 'micOff'
  | 'keyboard'
  | 'trash'
  | 'questionSquare'
  | 'questionSquareFill';

export type IconProps = {
  /**
   * Icon name
   */
  name: IconName;

  /**
   * Color of the icon
   */
  color: ThemeContentColorName;

  /**
   * Size of the icon
   */
  size: SizeName;

  /**
   * Custom style
   */
  customStyle?: Interpolation<Theme>;
};

export const Icon: FC<IconProps> = ({ name, color, size, customStyle }) => {
  const theme = useTheme();
  const getIcon = (name: IconName) => {
    switch (name) {
      case 'chevronUp':
        return <BsChevronUp css={customStyle} />;
      case 'chevronDown':
        return <BsChevronDown css={customStyle} />;
      case 'chevronLeft':
        return <BsChevronLeft css={customStyle} />;
      case 'chevronRight':
        return <BsChevronRight css={customStyle} />;
      case 'close':
        return <BsX css={customStyle} />;
      case 'closeCircleFill':
        return <BsXCircleFill css={customStyle} />;
      case 'menu':
        return <BsList css={customStyle} />;
      case 'check':
        return <BsCheck css={customStyle} />;
      case 'micOn':
        return <BsFillMicFill css={customStyle} />;
      case 'micOff':
        return <BsMicMuteFill css={customStyle} />;
      case 'keyboard':
        return <BsKeyboard css={customStyle} />;
      case 'trash':
        return <BsTrash css={customStyle} />;
      case 'questionSquare':
        return <BsQuestionSquare css={customStyle} />;
      case 'questionSquareFill':
        return <BsQuestionSquareFill css={customStyle} />;
      default:
        return null;
    }
  };

  return (
    <IconContext.Provider
      value={{ color: theme.colors[color], size: theme.iconSizes[size] }}
    >
      {getIcon(name)}
    </IconContext.Provider>
  );
};
