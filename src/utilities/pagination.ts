import { PaginationProps } from '../types/commonTypes';

const pagination = (query: PaginationProps, totalCollection: number) => {
  const { page = '1', limit = '10' } = query;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const totalPages = Math.ceil(totalCollection / parseInt(limit));

  return {
    skip,
    limit: parseInt(limit),
    metadata: {
      limit: parseInt(limit),
      currentPage: parseInt(page),
      totalPages,
      totalCollection
    }
  };
};

export default pagination;
