import { useEffect, useState } from 'react';
import { Global, ThemeProvider, css } from '@emotion/react';

import { Theme, darkTheme } from './theme';
import { ChatMessage } from './domain';
import { TopAppBar } from './components/molecules/TopAppBar';
import { ChatTimeline } from './components/organisms/ChatTimeline';
import { ChatInputBar } from './components/organisms/ChatInputBar';
import { QuestionAccordion } from './components/organisms/QuestionAccordion';
import { useLiteralThinkingQuizChain } from './hooks/useLiteralThinkingQuizChain';

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const quiz = {
  title: import.meta.env.VITE_QUIZ_TITLE as string,
  question: import.meta.env.VITE_QUIZ_QUESTION as string,
  answer: import.meta.env.VITE_QUIZ_ANSWER as string,
  answerKey: import.meta.env.VITE_QUIZ_ANSWER_KEY as string,
};

const globalStyle = (theme: Theme) => css`
  html {
    height: 100%;
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.onBackground};
    margin: 0;
    height: 100%;
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;

const headerStyle = css`
  width: 100%;
  position: sticky;
  top: 0;
`;

const quizAccordionStyle = css`
  width: calc(100% - 2rem);
  max-width: 600px;
  margin: 0 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.7);
`;

const mainStyle = css`
  width: calc(100% - 2rem);
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  flex-grow: 1;
`;

const timelineStyle = css`
  flex-grow: 1;
`;

const chatInputBar = css`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const chain = useLiteralThinkingQuizChain(quiz, openAIApiKey);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [botLoading, setBotLoading] = useState(false);

  // When new message is added, scroll to bottom
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const onSubmitMessage = async (message: string) => {
    const newMessages: ChatMessage[] = [
      ...messages,
      { text: message, owner: 'user' },
    ];
    setMessages(newMessages);
    setBotLoading(true);

    chain
      .call({ input: message })
      .then((res) => {
        setBotLoading(false);
        console.log(res);

        const responseMessage = res['response'];
        if (typeof responseMessage !== 'string')
          throw new Error('Invalid response from OpenAI API');

        setMessages([...newMessages, { text: responseMessage, owner: 'bot' }]);
      })
      .catch(() => {
        setBotLoading(false);
        setMessages([
          ...newMessages,
          { text: 'エラーが発生しました。', owner: 'bot' },
        ]);
      });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Global styles={globalStyle} />
      <header css={headerStyle}>
        <TopAppBar
          color="surface"
          title={quiz.title}
          trailingAction={{
            icon: 'threeDots',
            onClick: () => console.log('settings'),
          }}
        />
        <QuestionAccordion
          color="surface.variant"
          lines={[quiz.question]}
          customStyle={quizAccordionStyle}
        />
      </header>
      <main css={mainStyle}>
        <ChatTimeline
          messages={messages}
          botLoading={botLoading}
          customStyle={timelineStyle}
        />
        <ChatInputBar
          onSubmitMessage={onSubmitMessage}
          customStyle={chatInputBar}
        />
      </main>
    </ThemeProvider>
  );
}

export default App;
