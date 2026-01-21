export type FaqCategory = 'all' | 'service' | 'account' | 'payment' | 'etc';

export interface FaqItem {
  id: number;
  category: FaqCategory;
  question: string;
  answer: string;
  tags?: string[];
}
