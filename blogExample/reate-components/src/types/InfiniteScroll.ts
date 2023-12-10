export type Review = {
  createdAt: number;
  updatedAt: number;
  id: number;
  title: string;
  imgUrl: string;
  content: string;
  rating: number;
};

export type Paging = {
  count: number;
  hasNext: boolean;
};

export type ResponseData = {
  reviews: Review[];
  paging: Paging;
};
