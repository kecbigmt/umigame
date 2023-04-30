import { FC } from 'react';
import { Theme, Interpolation } from '@emotion/react';

import { ThemeBaseColorName, getContentColorName } from '../../../theme';
import { Paragraph } from '../../atoms/Paragraph';
import { Accordion } from '../../molecules/Accordion';

export type QuestionAccordionProps = {
  /**
   * Text lines shown in the accordion body.
   * Accordion title will be the lines joined with space.
   */
  lines: string[];

  /**
   * Color of the box
   */
  color: ThemeBaseColorName;

  /**
   * Custom style
   */
  customStyle?: Interpolation<Theme>;
};

/**
 * QuestionAccordion component
 * */
export const QuestionAccordion: FC<QuestionAccordionProps> = ({
  lines,
  color,
  customStyle,
}) => {
  const contentColor = getContentColorName(color);

  return (
    <Accordion
      titleIcon="questionSquareFill"
      preview={lines.join(' ')}
      color={color}
      customStyle={customStyle}
    >
      {lines.map((line, index) => (
        <Paragraph key={index} color={contentColor} size="md" weight="medium">
          {line}
        </Paragraph>
      ))}
    </Accordion>
  );
};
