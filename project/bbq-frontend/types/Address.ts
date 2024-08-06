export interface Address {
  id: number;
  legalDongId: string;
  administrativeDongId: string;
  deliveryName: string;
  fullAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}
