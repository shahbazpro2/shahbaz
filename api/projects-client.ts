import { stringify } from 'qs-esm';
import { responseApi } from 'use-hook-api';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllProjectsApi = (page: number) => {
  const query = stringify({
    page: page,
    status: 'published',
  });
  return responseApi(`${baseUrl}/projects?${query}`, 'get');
};

export const getProjectApi = (slug: string) => {
  const query = stringify({
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  });
  return responseApi(`${baseUrl}/projects?${query}`, 'get');
};
