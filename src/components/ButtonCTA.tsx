'use client';

import {
  Heading,
  Icon,
  IconButton,
  IconButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { BiPhone } from 'react-icons/bi';
import { BsMessenger } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { SiZalo } from 'react-icons/si';

const FormWrapper = dynamic(() =>
  import('@/components/FormWrapper').then((mod) => mod.FormWrapper)
);

export const BtnPhone = ({ label }: { label?: string }) => {
  return (
    <Tooltip label={label || '0941011771'} placement="left" bg={'red.500'} hasArrow>
      <IconButton
        icon={<Icon as={BiPhone} w={'25px'} h={'25px'} />}
        rounded={'full'}
        color={'white'}
        bg={'red.500'}
        as={'a'}
        href={`tel: ${label || '0941011771'}`}
        w={'56px'}
        h={'56px'}
        aria-label="phone"
      />
    </Tooltip>
  );
};

export const BtnZalo = (props: IconButtonProps) => {
  return (
    <Tooltip label={'Zalo chat'} placement="left" bg={'blue.500'} hasArrow>
      <IconButton
        prefetch={false}
        icon={<SiZalo />}
        rounded={'full'}
        color={'white'}
        bg={'blue.500'}
        p={'8px'}
        as={'a'}
        href={'https://zalo.me/0941011771'}
        {...props}
      />
    </Tooltip>
  );
};

export const BtnMes = (props: IconButtonProps) => {
  return (
    <Tooltip label={'Facebook messenger'} placement="left" bg={'blue.500'} hasArrow>
      <IconButton
        prefetch={false}
        icon={<BsMessenger />}
        rounded={'full'}
        color={'white'}
        bg={'blue.500'}
        p={'8px'}
        as={'a'}
        href={'https://www.facebook.com/daihoctuxa.etuaf/'}
        {...props}
      />
    </Tooltip>
  );
};

export const BtnEmail = (props: IconButtonProps) => {
  return (
    <Popover placement="left" trigger="hover">
      <PopoverTrigger>
        <IconButton
          icon={<MdEmail />}
          rounded={'full'}
          color={'white'}
          bg={'orange.500'}
          p={'8px'}
          {...props}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader as={Heading} size={'md'} textAlign={'center'}>
          Để lại thông tin
        </PopoverHeader>
        <PopoverBody>
          <FormWrapper type="form-poup" />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
