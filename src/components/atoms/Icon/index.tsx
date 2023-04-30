import { FC } from 'react';
import { IconContext } from 'react-icons';
import { 
	BsChevronUp,
	BsChevronDown,
	BsChevronLeft,
	BsChevronRight,
	BsX,
	BsList,
	BsFillCheckCircleFill,
	BsFillMicFill,
	BsMicMuteFill,
	BsKeyboard,
	BsTrash,
} from 'react-icons/bs';
import { useTheme } from '@emotion/react';

import { ThemeContentColorName, SizeName } from '../../../theme';

export type IconName =
	| 'chevronUp'
	| 'chevronDown'
	| 'chevronLeft'
	| 'chevronRight'
	| 'close'
	| 'menu'
	| 'doneFill'
	| 'micOn'
	| 'micOff'
	| 'keyboard'
	| 'trash';

export type IconProps = {
	name: IconName;
  color: ThemeContentColorName;
  size: SizeName;
};

export const Icon: FC<IconProps> = ({ name, color, size }) => {
  const theme = useTheme();
	const getIcon = (name: IconName) => {
		switch (name) {
			case 'chevronUp':
				return <BsChevronUp />;
			case 'chevronDown':
				return <BsChevronDown />;
			case 'chevronLeft':
				return <BsChevronLeft />;
			case 'chevronRight':
				return <BsChevronRight />;
			case 'close':
				return <BsX />;
			case 'menu':
				return <BsList />;
			case 'doneFill':
				return <BsFillCheckCircleFill />;
			case 'micOn':
				return <BsFillMicFill />;
			case 'micOff':
				return <BsMicMuteFill />;
			case 'keyboard':
				return <BsKeyboard />;
			case 'trash':
				return <BsTrash />;
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
