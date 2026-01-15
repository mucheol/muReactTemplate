import { useState, useMemo } from 'react';
import type { FaqCategory } from '../types';
import { filterFaqs, countFaqsByCategory } from '../utils';

export const useFaqFilter = () => {
  const [category, setCategory] = useState<FaqCategory>('all');
  const [search, setSearch] = useState('');

  const filteredFaqs = useMemo(() => {
    return filterFaqs(category, search);
  }, [category, search]);

  const faqsByCategory = useMemo(() => {
    return countFaqsByCategory();
  }, []);

  return {
    category,
    setCategory,
    search,
    setSearch,
    filteredFaqs,
    faqsByCategory,
  };
};
