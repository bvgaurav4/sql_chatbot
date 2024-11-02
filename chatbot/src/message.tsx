import { Card, Image, Text, Badge, Button, Group, Container } from '@mantine/core';

export default function Message({info="",color="pink"}) {
  let person="you";
  if(color==="pink")
  {
    person="bot";
  }
  return (
    <Card  shadow="sm" padding="lg" radius="md" withBorder>


      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Norway Fjord Adventures</Text>
        <Badge color={color} variant="light">
          {person}
        </Badge>
      </Group>
      <Container>

      <Text size="sm" color="dimmed" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}> 
        {info}
      </Text>
      </Container>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}