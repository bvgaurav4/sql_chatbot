import { BackgroundImage, Center, Text, Box,  Container } from '@mantine/core';

export default function M2x({info=""}) {
  return (
        <Container>

    <Box maw={300} mx="auto">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        radius="md"
      >
        <Center p="md">
          <Text color="#fff">
{info}
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
    </Container>
  );
}