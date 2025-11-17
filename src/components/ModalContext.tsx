'use client';

import { useDisclosure } from '@chakra-ui/react';
import { ReactNode, createContext, useContext } from 'react';

const ModalContext = createContext<{
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onToggle?: () => void;
}>({});

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  return (
    <ModalContext.Provider value={{ isOpen, onClose, onOpen, onToggle }}>
      {children}
    </ModalContext.Provider>
  );
};
