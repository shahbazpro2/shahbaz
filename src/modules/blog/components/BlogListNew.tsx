import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import EmptyState from '@/common/components/elements/EmptyState';
import Pagination from '@/common/components/elements/Pagination';
import BlogCardNewSkeleton from '@/common/components/skeleton/BlogCardNewSkeleton';
import { BlogItemProps } from '@/common/types/blog';
import { fetcher } from '@/services/fetcher';

import BlogCardNew from './BlogCardNew';
import BlogFeaturedSection from './BlogFeaturedSection';

const BlogListNew = () => {
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  const { data, error, mutate, isValidating } = useSWR(
    `/api/blog?page=${page}&per_page=6`,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    },
  );

  const {
    posts: blogData = [],
    total_pages: totalPages = 1,
    total_posts = 0,
  } = data?.data || {};

  const handlePageChange = async (newPage: number) => {
    await mutate();
    router.push(
      {
        pathname: '/blog',
        query: { page: newPage },
      },
      undefined,
      { shallow: true },
    );
    setPage(newPage);
  };

  useEffect(() => {
    const queryPage = Number(router.query.page);
    if (!isNaN(queryPage) && queryPage !== page) {
      setPage(queryPage);
    }
  }, [page, router.query.page]);

  const renderEmptyState = () =>
    !isValidating &&
    (!data?.status || blogData.length === 0) && (
      <EmptyState message={error ? 'Error loading posts' : 'No Post Found.'} />
    );

  return (
    <div className='space-y-10'>
      <BlogFeaturedSection />

      <div className='space-y-5'>
        <div className='mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row'>
          <div className='flex items-center gap-2 px-1  text-xl font-medium'>
            <h4 className='text-neutral-800 dark:text-neutral-200'>
              Latest Articles
            </h4>
            <span className='rounded-full bg-neutral-300 px-2 py-1  text-xs text-neutral-900 dark:bg-neutral-700 dark:text-neutral-50'>
              {total_posts}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {!isValidating ? (
            <>
              {blogData.map((item: BlogItemProps, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <BlogCardNew {...item} />
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {new Array(3).fill(0).map((_, index) => (
                <BlogCardNewSkeleton key={index} />
              ))}
            </>
          )}
        </div>

        {!isValidating && data?.status && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        {renderEmptyState()}
      </div>
    </div>
  );
};

export default BlogListNew;
