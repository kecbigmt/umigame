import { ChangeEvent, FC, FormEventHandler, useState } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';

import { Button } from '../../molecules/Button';
import { ChatTextArea } from '../../molecules/ChatTextArea';

export type ChatInputBarProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  customStyle?: Interpolation<Theme>;
};

/**
 * ChatInputBar component
 * */
export const ChatInputBar: FC<ChatInputBarProps> = ({
  onSubmit,
  customStyle,
}) => {
  const [text, setText] = useState('');
  const [micOn, setMicOn] = useState(false);

  const [inputInterface, setInputInterface] = useState<
    'keyboard' | 'mic' | 'none'
  >('none');

  const enableMic = () => {
    setInputInterface('mic');
  };

  const enableKeyboard = () => {
    setInputInterface('keyboard');
  };

  const chatInputBarStyle = (theme: Theme) => css`
    display: flex;
    align-items: ${inputInterface === 'none' ? 'center' : 'flex-end'};
    justify-content: ${inputInterface === 'none' ? 'center' : 'space-between'};
    gap: 0.5rem;
    padding: 0.5rem 1rem;

    background-color: ${theme.colors.surface};
    ${inputInterface === 'mic' && 'position: relative;'}
  `;

  const speechToTextInputStyle = css`
    position: absolute;
    bottom: calc(100% + 0.25rem);
    right: 0;
		width: 80%;
  `;

  const onMicOn = () => {
    setMicOn(true);
  };

  const onMicOff = () => {
    setMicOn(false);
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onClickClearButton = () => {
    setText('');
  };

  return inputInterface === 'keyboard' ? (
    <form css={[chatInputBarStyle, customStyle]} onSubmit={onSubmit}>
      <Button type="icon" color="onSurface" icon="micOn" onClick={enableMic} />
      <ChatTextArea
        value={text}
        onTextChange={onTextChange}
        onClickClearButton={onClickClearButton}
        color="secondary"
      />
      <Button
        submit
        type="filledIcon"
        color="primary"
        icon="check"
        onClick={micOn ? onMicOff : onMicOn}
        disabled={text === ''}
      />
    </form>
  ) : inputInterface === 'mic' ? (
    <div css={[chatInputBarStyle, customStyle]}>
      <Button
        type="icon"
        color="onSurface"
        icon={micOn ? 'micOn' : 'micOff'}
        onClick={micOn ? onMicOff : onMicOn}
      />
      <Button
        type="icon"
        color="onSurface"
        icon="keyboard"
        onClick={enableKeyboard}
      />
      {text && (
        <div css={speechToTextInputStyle}>
          <ChatTextArea
            value={text}
            onTextChange={onTextChange}
            onClickClearButton={onClickClearButton}
            color="secondary"
          />
        </div>
      )}
    </div>
  ) : (
    <div css={[chatInputBarStyle, customStyle]}>
      <Button type="filled" color="primary" icon="micOn" onClick={enableMic}>
        マイクで話す
      </Button>
      <Button
        type="text"
        color="onSurface"
        icon="keyboard"
        onClick={enableKeyboard}
      >
        文字入力
      </Button>
    </div>
  );
};
