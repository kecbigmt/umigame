import { FC } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';

import { ChatHistory } from '../../../domain';
import { ChatBubble } from '../../molecules/ChatBubble';

export type ChatTimelineProps = {
  /**
   * Chat message items.
   * They are displayed in the order of the array.  
   * User message is on the right, bot message is on the left.
   * */
  messages: ChatHistory;

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

const chatBubbleStyle = css`
  max-width: 80%;
`;

/**
 * ChatTimeline component
 * */
export const ChatTimeline: FC<ChatTimelineProps> = ({
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
            ${chatBubbleStyle}
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
          customStyle={chatBubbleStyle}
        >{'loading...'}</ChatBubble>
      )}
    </div>
  );
};
