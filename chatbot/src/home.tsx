import { useRef, useState,useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  MantineProvider,
  Stack,
  Group,
  TextInput,
  Textarea,
  Button,
  Badge,
  ScrollArea,
  Box,
} from '@mantine/core';
import M2x from './m2';
import Message from './message';
import { useCounter } from '@mantine/hooks';

export default function AppShellDemo() {
  const [messages, setMessages] = useState("");
  const [submittedMessages, setSubmittedMessages] = useState<{color:string,info:string}>([]);
  const theme = useMantineTheme();
  const [s,set_s]=useState(false);
  const [dis,set_dis]=useState(false);
  useEffect(() => {
    scrollToBottom();
  }, [submittedMessages]);
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
  const content = submittedMessages.map((item, index) => (
    <Message key={index} info={item.info} color={item.color}></Message>
  ));
  const [opened, setOpened] = useState(false);
  const endpoints = "http://localhost:5000";

  async function sumbition(event) {
    event.preventDefault();
    handlers.increment();
    if(messages=="")
      {
        set_s(true)
        return 
      }
      set_dis(true)
    set_s(false)

    setSubmittedMessages([...submittedMessages, {info:messages,color:"green"}]);
    setMessages(""); 
    const response = await fetch(`${endpoints}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "question": messages }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      setSubmittedMessages([...submittedMessages, {info:messages,color:"green"}, {info:data.message}]);
    }
    set_dis(false)
    setMessages("");
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <AppShell
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        header={
          <Header height={{ base: 70, md: 90 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Text>Application header</Text>
            </div>
          </Header>
        }
      >
        <Group position="center">
          <Stack align="stretch">
            <ScrollArea h={750} viewportRef={viewport} scrollbarSize={2} scrollHideDelay={0} offsetScrollbars>
              <Box w={700}>
                <Stack>
                  {content}
                </Stack>
              </Box>
            </ScrollArea>
            <form onSubmit={sumbition}>
              <TextInput
                radius="sm"
                id="message"
                error={s}
                disabled={dis}
                placeholder="ur question"
                value={messages}
                onChange={(e) => { setMessages(e.currentTarget.value) }}
                rightSection={
                  <Button
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'rgba(209, 0, 0, 1)', deg: 0 }}
                    radius="xl"
                    size='xs'
                    type='submit'
                    compact
                  >⌘</Button>
                }
              />
            </form>
          </Stack>
        </Group>
      </AppShell>
    </MantineProvider>
  );
}