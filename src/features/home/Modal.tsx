import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const FormWrapper = dynamic(() =>
  import('@/components/FormWrapper').then((mod) => mod.FormWrapper)
);

interface IModalBase {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalBase = (props: IModalBase) => {
  const { onClose, isOpen } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          bg={'white'}
          pt={'12px'}
          pb={0}
          rounded={'sm'}
          px={{ base: '8px', md: '12px', lg: '16px' }}
        >
          <ModalCloseButton />
          <ModalBody rounded={'sm'}>
            <FormWrapper type="form-poup" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
