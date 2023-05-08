import { FC } from 'react';
import { css, Theme, Interpolation } from '@emotion/react';

import { ChatBubble } from '../../molecules/ChatBubble';
import { useRecoilValue } from 'recoil';
import { chatMessageIDArrayState, chatMessageState } from '../../../dataflow';

export type ChatTimelineProps = {
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
export const ChatTimeline: FC<ChatTimelineProps> = ({ customStyle }) => {
  const chatHistoryStyle = (_theme: Theme) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
		gap: 0.5rem;
  `;

  const chatMessageIDArray = useRecoilValue(chatMessageIDArrayState);

  return (
    <div css={[chatHistoryStyle, customStyle]}>
      {chatMessageIDArray.map((chatMessageID) => (
        <ChatTimelineItem key={chatMessageID} chatMessageID={chatMessageID} />
      ))}
    </div>
  );
};

type ChatTimelineItemProps = {
  chatMessageID: string;
};

const ChatTimelineItem: FC<ChatTimelineItemProps> = ({ chatMessageID }) => {
  const message = useRecoilValue(chatMessageState(chatMessageID));

  return (
    <ChatBubble
      color={message.owner === 'user' ? 'secondary' : 'surface.variant'}
      position={message.owner === 'user' ? 'right' : 'left'}
      customStyle={css`
        ${chatBubbleStyle}
        margin-${message.owner === 'user' ? 'left' : 'right'}: auto;
      `}
    >
      {message.body}
    </ChatBubble>
  );
};
