import { Global, ThemeProvider, css } from '@emotion/react';

import { Theme, darkTheme as theme } from './theme';
import { TopAppBar } from './components/molecules/TopAppBar';
import { ChatTimeline } from './components/organisms/ChatTimeline';
import { ChatInputBar } from './components/organisms/ChatInputBar';
import { QuestionAccordion } from './components/organisms/QuestionAccordion';
import { useSubmitMessage } from './hooks/useSubmitMessage';
import { useQuiz } from './hooks/quiz';
import { useEffect, useRef } from 'react';
import { useAutoScrollDown } from './hooks/useAutoScrollDown';

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
  margin: 0 auto;
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
  const quiz = useQuiz();
  const submitMessage = useSubmitMessage();
  const mainRef = useRef<HTMLDivElement>(null);

  // When new message is added, scroll to bottom
  useAutoScrollDown(mainRef);

  const onSubmitMessage = async (message: string) => {
    submitMessage(message);
    
    // Scroll to bottom
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <header css={headerStyle}>
        <TopAppBar
          color="surface"
          title={quiz ? quiz.title : '問題を考えています...'}
          trailingAction={{
            icon: 'threeDots',
            onClick: () => console.log('settings'),
          }}
        />
        {quiz && (
          <QuestionAccordion
            color="surface.variant"
            lines={[quiz.mystery]}
            customStyle={quizAccordionStyle}
          />
        )}
      </header>
      {quiz && (
        <main css={mainStyle} ref={mainRef}>
          <ChatTimeline customStyle={timelineStyle} />
          <ChatInputBar
            onSubmitMessage={onSubmitMessage}
            customStyle={chatInputBar}
            defaultInputInterface="keyboard"
          />
        </main>
      )}
    </ThemeProvider>
  );
}

export default App;
