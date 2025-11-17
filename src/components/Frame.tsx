import { Heading, ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const BtnTheme = dynamic(() => import('@/components/BtnTheme').then((mod) => mod.BtnTheme));

export const Frame = ({
  title1,
  title2,
  label,
  list1,
  list2,
  onClick,
}: {
  title1: string;
  title2?: string;
  label: string;
  list1?: string[];
  list2?: string[];
  onClick?: () => void;
}) => {
  return (
    <VStack rounded={'sm'} border={'1px solid teal'} padding={'16px'}>
      <Heading as={'h2'} size={'md'} textAlign={'center'}>
        {title1}
      </Heading>

      <UnorderedList>
        {list1?.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </UnorderedList>

      {title2 && (
        <>
          <Heading as={'h3'} size={'md'} textAlign={'center'}>
            {title2}
          </Heading>

          <UnorderedList>
            {list2?.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </UnorderedList>
        </>
      )}
      <BtnTheme onClick={onClick}>{label}</BtnTheme>
    </VStack>
  );
};
