import { useState } from 'react';
import { Global, ThemeProvider, css } from '@emotion/react';

import { TopAppBar } from './components/molecules/TopAppBar';
import { Theme, darkTheme } from './theme';
import { ChatTimeline, ChatMessage } from './components/organisms/ChatTimeline';
import { ChatInputBar } from './components/organisms/ChatInputBar';
import { QuestionAccordion } from './components/organisms/QuestionAccordion';
import { useChain } from './hooks/useChain';

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
  const chain = useChain(openAIApiKey);

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
        title="銀河鉄道の夜"
        trailingAction={{
          icon: 'threeDots',
          onClick: () => console.log('settings'),
        }}
      />
      <main css={mainStyle}>
        <QuestionAccordion
          color="surface.variant"
          lines={[
            'カムパネルラ、また僕たち二人きりになったので、すこししゃくにさわってだまっていました。',
            '一時間で行ってくるよと言いながら、自分もだんだん顔いろがかがやいてきました。',
            'わたしの大事なタダシはいまどんな歌をうたってやすむとき、いつも窓からぼんやり白く見えていたのです。',
            'この男は、どこか苦しいというふうではきはき談しているのでした。',
            'どこでできるのですか青年は笑いながら言いました。',
          ]}
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
