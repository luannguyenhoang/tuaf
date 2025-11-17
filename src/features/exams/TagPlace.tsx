import { Button } from '@chakra-ui/react';
import { JSXElementConstructor, ReactElement } from 'react';

interface ITag {
  leftIcon: ReactElement<any, string | JSXElementConstructor<any>>;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const TagPlace = (props: ITag) => {
  const { label, onClick, selected, leftIcon } = props;
  return (
    <Button
      leftIcon={leftIcon}
      colorScheme="red"
      variant={'outline'}
      rounded={'2xl'}
      bg={selected ? 'red.500' : ''}
      onClick={() => onClick && onClick()}
    >
      {label}
    </Button>
  );
};
