import { FC } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';

import { ChatBubble } from '../../molecules/ChatBubble';

export type ChatMessage = {
  owner: 'user' | 'bot'; // TODO: add 'friend' when multiple users are supported
  text: string;
};

export type ChatHistoryProps = {
  /**
   * Chat message items.
   * They are displayed in the order of the array.
   * User message is on the right, bot message is on the left.
   * */
  messages: ChatMessage[];

  /**
   * Loading state of the bot.
   * If true, loading indicator will be displayed on the left side of the chat history.
   * */
  botLoading?: boolean;

  /**
   * Custom style
   * */
  customStyle?: Interpolation<Theme>;
};

/**
 * ChatHistory component
 * */
export const ChatHistory: FC<ChatHistoryProps> = ({
  messages,
  botLoading = false,
  customStyle,
}) => {
  const chatHistoryStyle = (_theme: Theme) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
		gap: 0.5rem;
  `;

  return (
    <div css={[chatHistoryStyle, customStyle]}>
      {messages.map((message, index) => (
        <ChatBubble
          key={index}
          color={message.owner === 'user' ? 'secondary' : 'surface.variant'}
          position={message.owner === 'user' ? 'right' : 'left'}
					customStyle={css`
						margin-${message.owner === 'user' ? 'left' : 'right'}: auto;
					`}
        >
          {message.text}
        </ChatBubble>
      ))}
      {botLoading && (
        <ChatBubble
          color="surface.variant"
          position="left"
        >{'loading...'}</ChatBubble>
      )}
    </div>
  );
};
