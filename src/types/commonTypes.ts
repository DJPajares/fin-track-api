import { Request } from 'express';

type PaginationRequestProps = Request & {
  paginationQuery?: {
    skip: number;
    limit: number;
  };
};

export { PaginationRequestProps };
