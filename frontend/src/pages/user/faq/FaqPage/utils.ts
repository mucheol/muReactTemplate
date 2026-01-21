import type { FaqItem, FaqCategory } from './types';
import { FAQ_LIST } from './constants';

export const filterFaqs = (
  category: FaqCategory,
  searchKeyword: string,
): FaqItem[] => {
  const keyword = searchKeyword.trim().toLowerCase();
  return FAQ_LIST.filter((item) => {
    const matchCategory = category === 'all' || item.category === category;
    const matchKeyword =
      !keyword ||
      item.question.toLowerCase().includes(keyword) ||
      item.answer.toLowerCase().includes(keyword) ||
      (item.tags || []).some((t) => t.toLowerCase().includes(keyword));
    return matchCategory && matchKeyword;
  });
};

export const countFaqsByCategory = (): Record<FaqCategory, number> => {
  return FAQ_LIST.reduce(
    (acc, cur) => {
      acc[cur.category] += 1;
      acc.all += 1;
      return acc;
    },
    { all: 0, service: 0, account: 0, payment: 0, etc: 0 } as Record<FaqCategory, number>,
  );
};
