export type initData = {
  startDate: string;
  endDate: string;
  timeUnit: string;
  category: {
    name: string, 
    param: string[]
  }[],
  device: string;
  ages: string[];
  gender: string;
}
export type initCategory = {
  category: string[],
  data: {
    period: string, 
    ratio: number
  }[];
  title: string
}