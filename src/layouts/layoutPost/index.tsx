'use client';

import { Container, GridItem, SimpleGrid } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Sidebar = dynamic(() => import('@/layouts/components/Sidebar').then((mod) => mod.Sidebar));

const LayoutPost = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxW={'6xl'} mt={'42px'}>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={'42px'}>
        <GridItem colSpan={{ lg: 2 }}>{children}</GridItem>
        <GridItem colSpan={{ lg: 1 }}>
          <Sidebar sticky="125px" />
        </GridItem>
      </SimpleGrid>
    </Container>
  );
};

export default LayoutPost;
