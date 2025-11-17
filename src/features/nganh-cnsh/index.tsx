'use client';

import { splitByNewLine } from '@/utils/createArray';
import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

export const Cnsh = ({ cnsh }: any) => {
  return (
    <LayoutNganh title={cnsh?.title || 'Ngành công nghệ sinh học'}>
      <Branch
        name={cnsh?.title || 'Ngành công nghệ sinh học'}
        overview={splitByNewLine(cnsh.overview.list_overview)}
        kien-thuc={splitByNewLine(cnsh.skill.list_overview.overview_1)}
        ky-nang={splitByNewLine(cnsh.skill.list_overview.overview_2)}
        image-kien-thuc={cnsh?.skill?.image || '/common.jpg'}
        image-overview={cnsh?.overview?.image || '/cnsh.jpg'}
      />
    </LayoutNganh>
  );
};
