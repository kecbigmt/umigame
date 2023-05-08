import { ChangeEvent, FC, MouseEventHandler, useEffect, useState } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';

import { ThemeBaseColorName, getContentColorName } from '../../../theme';
import { Button } from '../Button';

export type ChatTextAreaProps = {
  value: string;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickClearButton: MouseEventHandler;
  onPressEnter?: (value: string) => void;
  color: ThemeBaseColorName;
  customStyle?: Interpolation<Theme>;
};

/**
 * ChatTextArea component
 * */
export const ChatTextArea: FC<ChatTextAreaProps> = ({
  value,
  onTextChange,
  onClickClearButton,
  onPressEnter,
  color,
  customStyle,
}) => {
  const contentColor = getContentColorName(color);

  const inputWrapperStyle = (theme: Theme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.colors[color]};
    border: none;
    border-radius: ${theme.borderRadius.md};
    gap: 0.5rem;
    padding: 0.5rem 0.25rem 0.5rem 1rem;
  `;

  const inputStyle = (theme: Theme) => css`
    color: ${theme.colors[contentColor]};
		background-color: transparent;\
		font-family: ${theme.fonts.primary.family};
		font-weight: ${theme.fonts.primary.weights.regular};
		font-size: ${theme.fontSizes.sm};
		border: none;
		resize: none;
		outline: none;
		flex-grow: 1;
		overflow-y: scroll;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			width: 0.25rem;
		}

		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: ${theme.colors[contentColor]};
			border-radius: ${theme.borderRadius.md};
		}
  `;

  const clearButtonStyle = css`
    flex-shrink: 0;
  `;

  // If true, the user is composing a message.
  const [isComposing, setIsComposing] = useState(false);

  // Listen to the composition events to prevent onPressEnter from firing when the user is composing a message.
  useEffect(() => {
    const onCompositionStart = () => {
      setIsComposing(true);
    };
    const onCompositionEnd = () => {
      setIsComposing(false);
    };

    document.addEventListener('compositionstart', onCompositionStart);
    document.addEventListener('compositionend', onCompositionEnd);

    return () => {
      document.removeEventListener('compositionstart', onCompositionStart);
      document.removeEventListener('compositionend', onCompositionEnd);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (onPressEnter && e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      onPressEnter(value);
    }
  };

  return (
    <div css={[inputWrapperStyle, customStyle]}>
      <textarea
        css={[inputStyle, customStyle]}
        value={value}
        onChange={onTextChange}
        onKeyDown={onKeyDown}
        rows={2}
      />
      {value !== '' && (
        <Button
          type="icon"
          icon="closeCircleFill"
          color={contentColor}
          onClick={onClickClearButton}
          customStyle={clearButtonStyle}
        />
      )}
    </div>
  );
};
