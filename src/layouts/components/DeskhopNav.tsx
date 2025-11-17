'use client';

import { menus } from '@/router';
import {
  Box,
  Flex,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';

interface INavItem {
  title: string;
  children?: Array<INavItem>;
  path?: string;
}

export const DesktopNav = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const linkColor = '#054659';
  const linkHoverColor = '#FA692E';
  const popoverContentBgColor = 'white';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Stack direction={'row'} spacing={4}>
        {menus.map((navItem) => (
          <Box key={navItem.title}>
            <Box
              as={Link}
              p={2}
              href={navItem.path ?? '#'}
              fontSize={'md'}
              fontWeight={600}
              color={pathname === (navItem.path || '/') ? linkHoverColor : linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
            >
              {navItem.title}
            </Box>
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Stack direction={'row'} spacing={4}>
      {menus.map((navItem) => (
        <Box key={navItem.title}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                as={Link}
                p={2}
                href={navItem.path ?? '#'}
                fontSize={'md'}
                fontWeight={600}
                color={pathname === (navItem.path || '/') ? linkHoverColor : linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.title}
              </Box>
            </PopoverTrigger>

            {navItem.childs && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.childs.map((child) => (
                    <DesktopSubNav key={child.title} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export const DesktopSubNav = ({ title, path }: INavItem) => {
  return (
    <Box
      as={Link}
      href={path}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: 'pink.50' }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            color={'#054659'}
            _groupHover={{ color: '#FA692E' }}
            fontWeight={600}
          >
            {title}
          </Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'#FA692E'} w={5} h={5} as={BsChevronRight} />
        </Flex>
      </Stack>
    </Box>
  );
};
