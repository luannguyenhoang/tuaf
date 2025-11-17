'use client';

import { splitByNewLine } from '@/utils/createArray';
import dynamic from 'next/dynamic';

const LayoutNganh = dynamic(() => import('@/layouts/layoutNganh').then((mod) => mod.LayoutNganh));
const Branch = dynamic(() => import('@/components/Branch').then((mod) => mod.Branch));

export const Ty = ({ ty }: any) => {
  return (
    <LayoutNganh title={ty?.title || 'Ngành thú y'}>
      <Branch
        name={ty?.title || 'Ngành thú y'}
        overview={splitByNewLine(ty.overview.list_overview)}
        kien-thuc={splitByNewLine(ty.skill.list_overview.overview_1)}
        ky-nang={splitByNewLine(ty.skill.list_overview.overview_2)}
        image-kien-thuc={ty?.skill?.image || '/common.jpg'}
        image-overview={ty?.overview?.image || '/ty.jpg'}
      />
    </LayoutNganh>
  );
};
