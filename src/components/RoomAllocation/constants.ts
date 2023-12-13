import { Limitation } from '@/components/RoomAllocation/types';

export enum MEMBER_VARIANT {
  ADULT = 'adult',
  CHILD = 'child',
}

export const MEMBER_VARIANT_DETAIL: Record<
  MEMBER_VARIANT,
  {
    title: string;
    description?: string;
    limitation: Limitation;
  }
> = {
  [MEMBER_VARIANT.ADULT]: {
    title: '成人',
    description: '年齡 20+',
    limitation: {
      min: 1,
      max: 4,
    },
  },
  [MEMBER_VARIANT.CHILD]: {
    title: '小孩',
    limitation: {
      min: 0,
      max: 4,
    },
  },
};
