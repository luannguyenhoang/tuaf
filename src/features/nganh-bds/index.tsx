'use client';

import { splitByNewLine } from '@/utils/createArray';
import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

export const Bds = ({ bds }: any) => {
  return (
    <LayoutNganh title={bds?.title || 'Ngành bất động sản'}>
      <Branch
        name={bds?.title || 'Ngành bất động sản'}
        overview={splitByNewLine(bds.overview.list_overview)}
        kien-thuc={splitByNewLine(bds.skill.list_overview.overview_1)}
        ky-nang={splitByNewLine(bds.skill.list_overview.overview_2)}
        image-kien-thuc={bds?.skill?.image || '/common.jpg'}
        image-overview={bds?.overview?.image || '/bds.jpg'}
      />
    </LayoutNganh>
  );
};
