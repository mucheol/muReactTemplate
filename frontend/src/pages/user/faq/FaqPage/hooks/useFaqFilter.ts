import { useState, useMemo, useEffect } from 'react';
import type { FaqCategory, FaqItem } from '../types';
import { faqApi } from '../../../../../modules/faq';

export const useFaqFilter = () => {
  const [category, setCategory] = useState<FaqCategory>('all');
  const [search, setSearch] = useState('');
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await faqApi.getItems();
        setFaqs(response.data as FaqItem[]);
      } catch (err) {
        console.error('FAQ 목록 조회 실패:', err);
        setError('FAQ를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const filteredFaqs = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return faqs.filter((item) => {
      const matchCategory = category === 'all' || item.category === category;
      const matchKeyword =
        !keyword ||
        item.question.toLowerCase().includes(keyword) ||
        item.answer.toLowerCase().includes(keyword) ||
        (item.tags || []).some((t) => t.toLowerCase().includes(keyword));
      return matchCategory && matchKeyword;
    });
  }, [category, search, faqs]);

  const faqsByCategory = useMemo(() => {
    return faqs.reduce(
      (acc, cur) => {
        acc[cur.category] = (acc[cur.category] || 0) + 1;
        acc.all += 1;
        return acc;
      },
      { all: 0, service: 0, account: 0, payment: 0, etc: 0 } as Record<FaqCategory, number>,
    );
  }, [faqs]);

  return {
    category,
    setCategory,
    search,
    setSearch,
    filteredFaqs,
    faqsByCategory,
    loading,
    error,
  };
};
