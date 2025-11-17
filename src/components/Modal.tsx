'use client';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Box,
  Stack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface IModalBase {
  isOpen: boolean;
  children: ReactNode;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalBase = (props: IModalBase) => {
  const { onClose, isOpen, children } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      blockScrollOnMount={false}
      closeOnOverlayClick={true}
      returnFocusOnClose={false}
    >
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody rounded={'md'} p={0}>
          <Box zIndex={80}>{children}</Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
