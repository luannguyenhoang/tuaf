'use client';

import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

const InputSearch = dynamic(() =>
  import('@/features/search/InputSearch').then((mod) => mod.InputSearch)
);

export const Search = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <IconButton
        size="xl"
        color="#1a202c"
        _hover={{ color: '#2563eb', bg: 'white' }}
        pl={4}
        bg="white"
        aria-label="Search database"
        icon={<IoSearch fontSize="24px" />}
        borderRadius={'0'}
        _focus={{ outline: 'none' }}
        _active={{ bg: 'white' }}
        onClick={onOpen}
      />
    );
  }

  return (
    <>
      <Popover placement="bottom" isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <IconButton
            size="xl"
            color="#1a202c"
            _hover={{ color: '#2563eb', bg: 'white' }}
            pl={4}
            bg="white"
            aria-label="Search database"
            icon={<IoSearch fontSize="24px" />}
            borderRadius={'0'}
            _focus={{ outline: 'none' }}
            _active={{ bg: 'white' }}
            onClick={onOpen}
          />
        </PopoverTrigger>
        <PopoverContent mt="15px" p={5} bgColor={'#22543d'}>
          <InputSearch onClose={onClose} />
        </PopoverContent>
      </Popover>
    </>
  );
};
