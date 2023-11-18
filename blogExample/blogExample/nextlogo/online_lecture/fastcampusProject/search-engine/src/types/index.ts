export interface IGetPapersResponse {
    total: number;
    totalHits: number;
    hits: IPaper[];
}

export interface IPaper {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    collections: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
}

export type Orientation = 'all' | 'horizontal' | 'vertical';
export type Order = 'popular' | 'latest';

export interface IParamObj {
    q: string;
    orientation: Orientation;
    order: Order;
    page: string;
    per_page: string;
}

export interface QueryContextType {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
    setOrientation: React.Dispatch<React.SetStateAction<Orientation>>;
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
}
export interface DataContextType {
    data: IGetPapersResponse;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    numOfPages: number;
    currentImageDetail: boolean;
    setCurrentImageDetail: React.Dispatch<React.SetStateAction<boolean>>;
}
