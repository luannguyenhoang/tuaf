import { Heading, Text, VStack } from '@chakra-ui/react';

export const HeadSection = ({
  subtitle,
  title,
  desc,
  title_h2,
}: {
  subtitle: string;
  title: string;
  desc: string;
  title_h2?: boolean;
}) => {
  return (
    <VStack justify={'center'}>
      {/* <Text color={"#FA692E"}>{subtitle}</Text> */}
      <Heading
        as={title_h2 ? 'h2' : 'h3'}
        size={{ base: 'sm', md: 'lg' }}
        textAlign={'center'}
        textTransform={'uppercase'}
        color={'#193a43'}
      >
        {title}
      </Heading>
      <Text textAlign={'center'} color={'gray.500'} fontWeight={'thin'}>
        {desc}
      </Text>
    </VStack>
  );
};

export const HeadSectionLight = ({
  subtitle,
  title,
  desc,
  title_h2,
}: {
  subtitle: string;
  title: string;
  desc: string;
  title_h2?: boolean;
}) => {
  return (
    <VStack justify={'center'}>
      {/* <Text color={"#FA692E"}>{subtitle}</Text> */}
      <Heading
        as={title_h2 ? 'h2' : 'h3'}
        size={{ base: 'sm', md: 'lg' }}
        textAlign={'center'}
        textTransform={'uppercase'}
        color={'whiteAlpha.900'}
      >
        {title}
      </Heading>
      <Text color={'whiteAlpha.900'} fontWeight={'sm'}>
        {desc}
      </Text>
    </VStack>
  );
};
