import { useState } from 'react';
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
}

function App() {
  const chain = useLiteralThinkingQuizChain(quiz, openAIApiKey);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [botLoading, setBotLoading] = useState(false);

  const globalStyle = (theme: Theme) => css`
    body {
      background-color: ${theme.colors.background};
      color: ${theme.colors.onBackground};
      margin: 0;
    } 

    #root {
      width: 100%;
    }
  `;

  const mainStyle = css`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
  `;

  const chatInputBar = css`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
  `;

  const onSubmitMessage = async (message: string) => {
    const newMessages: ChatMessage[] = [...messages, { text: message, owner: 'user' }];
    setMessages(newMessages);
    setBotLoading(true);

    chain.call({ input: message }).then((res) => {
      setBotLoading(false);
      console.log(res);

      const responseMessage = res['response'];
      if (typeof responseMessage !== 'string')
        throw new Error('Invalid response from OpenAI API');
      
      setMessages([...newMessages, { text: responseMessage, owner: 'bot' }]);
    }).catch(() => {
      setBotLoading(false);
      setMessages([...newMessages, { text: 'エラーが発生しました。', owner: 'bot' }]);
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Global styles={globalStyle} />
      <TopAppBar
        color="transparent"
        title={quiz.title}
        trailingAction={{
          icon: 'threeDots',
          onClick: () => console.log('settings'),
        }}
      />
      <main css={mainStyle}>
        <QuestionAccordion
          color="surface.variant"
          lines={[quiz.question]}
        />
        <ChatTimeline messages={messages} botLoading={botLoading} />
      </main>
      <ChatInputBar
        onSubmitMessage={onSubmitMessage}
        customStyle={chatInputBar}
      />
    </ThemeProvider>
  );
}

export default App;
