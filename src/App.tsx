
import { useEffect, useState } from 'react';
import { Channel as StreamChannel, User } from 'stream-chat';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  VirtualizedMessageList,
  Window,
} from 'stream-chat-react';

import { useClient } from './hooks/useClient';

import 'stream-chat-react/dist/css/v2/index.css';
import './App.css';

const userId = 'small-boat-4';
const userName = 'small-boat-4';

const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?id=${userId}&name=${userName}`,
};

const apiKey = 'bzg4s28qnk6h';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic21hbGwtYm9hdC00In0.WqlfbEigC9NFIZcXciokBXT_bQ08UHTBE_aKO-5KqxY';

const App = () => {
  const chatClient = useClient({
    apiKey,
    user,
    tokenOrProvider: userToken,
  });

  const [channel, setChannel] = useState<StreamChannel>();
  useEffect(() => {
    if (!chatClient) return;

    const spaceChannel = chatClient.channel('livestream', 'spacex', {
      image: 'https://goo.gl/Zefkbx',
      name: 'SpaceX launch discussion',
    });

    setChannel(spaceChannel);
  }, [chatClient]);


  if (!chatClient) return null;

  return (
    <Chat client={chatClient} theme='str-chat__theme-dark'>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader live />
          <VirtualizedMessageList />
          <MessageInput focus />
        </Window>
      </Channel>
    </Chat>
  );
};

export default App;