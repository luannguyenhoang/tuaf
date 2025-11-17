'use client';

import { useSize } from '@/hooks/useSizeWindow';
import { menus } from '@/router';
import {
  Collapse,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  LinkBox,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { Logo } from './Logo';

const HeaderTop = dynamic(() =>
  import('@/layouts/components/HeaderTop').then((mod) => mod.HeaderTop)
);

interface INavItem {
  title: string;
  childs?: Array<{ title: string; childs?: Array<{}>; path?: string }>;
  path?: string;
  onClose: () => void;
}

export const MobileNavItem = ({ title, childs, path, onClose }: INavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={childs && onToggle}>
      <Flex
        py={2}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
        fontWeight={600}
        color={'gray.600'}
      >
        <Link href={path ?? '#'} style={{ width: '100%' }} onClick={() => !childs && onClose()}>
          {title}
        </Link>
        {childs && (
          <Icon
            as={BsChevronDown}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={'20px'}
            h={'20px'}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={'gray.200'}
          align={'start'}
        >
          {childs &&
            childs.map((child) => (
              <Link
                key={child.title}
                style={{
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  fontWeight: '600',
                  width: '100%',
                }}
                href={child.path ?? '/'}
                onClick={onClose}
              >
                {child.title}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const { size } = useSize();
  const { width } = size;

  return (
    <>
      <IconButton
        w={'50px'}
        h={'50px'}
        ref={btnRef}
        onClick={onOpen}
        icon={<Icon as={AiOutlineMenu} w={'24px'} h={'24px'} />}
        variant={'ghost'}
        aria-label={'Toggle Navigation'}
      />
      <Drawer
        isOpen={width < 992 ? isOpen : false}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex justify={'center'}>
              <LinkBox onClick={onClose}>
                <Logo />
              </LinkBox>
            </Flex>
          </DrawerHeader>
          <Divider />

          <DrawerBody>
            <Stack bg={'white'} p={4} display={{ lg: 'none' }}>
              {menus.map((navItem) => (
                <MobileNavItem key={navItem.title} {...navItem} onClose={onClose} />
              ))}
            </Stack>
          </DrawerBody>
          <Divider />
          <DrawerFooter
            pos={'relative'}
            _before={{
              content: "''",
              width: '5e3px',
              height: '100%',
              backgroundImage:
                '-webkit-gradient(linear,left top,left bottom,from(#00843E),to(#064121));',
              position: 'absolute',
              top: 0,
              right: '36%',
              zIndex: -1,
              transform: 'skew(-30deg)',
              WebkitTransformOrigin: 'left bottom',
            }}
            py="24px"
            px={'12px'}
          >
            <HeaderTop />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
