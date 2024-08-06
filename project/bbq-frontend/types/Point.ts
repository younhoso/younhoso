export type Point = {
  id: number;
  deltaPoint: number;
  currentPoint: number;
  description: string;
  createdAt: string; // TODO: string -> Date 가능한지 체크
  expiresAt: string; // TODO: string -> Date 가능한지 체크
};
