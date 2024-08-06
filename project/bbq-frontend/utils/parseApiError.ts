export const parseApiError = (error: any): { code: string; message: string } => {
  try {
    return (error as any).response.data;
  } catch (e) {
    return (error as any).message ?? (error as any).toString();
  }
};
