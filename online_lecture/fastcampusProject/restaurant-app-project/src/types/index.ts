export interface Description {
  CGG_CODE: string;
  CRTFC_YN: string;
  GNT_NO: string;
  Y_DNTS: string;
  RDN_DETAIL_ADDR: string;
  CRTFC_GBN_NM: string;
  CRTFC_SNO: string;
  MAP_INDICT_YN: string;
  COB_CODE_NM: string;
  BIZCND_CODE: string;
  CRTFC_GBN: string;
  CRTFC_CLASS: string;
  USE_YN: string;
  CRTFC_UPSO_MGT_SNO: string;
  CRTFC_YMD: string;
  X_CNTS: string;
  OWNER_NM: string;
  CGG_CODE_NM: string;
  RDN_ADDR_CODE: string;
  TEL_NO: string;
  BIZCND_CODE_NM: string;
  COB_CODE: string;
  UPSO_SNO: string;
  FOOD_MENU: string;
  UPD_TIME: string;
  CRT_TIME: string;
  UPSO_NM: string;
  RDN_CODE_NM: string;
}

export interface DataItem {
  tel_no: string | null;
  crtfc_gbn: string;
  upd_time: number;
  cob_code_nm: string;
  crtfc_class: string | null;
  rdn_detail_addr: string | null;
  upso_sno: string | null;
  bizcnd_code_nm: string;
  upso_nm: string;
  gnt_no: string | null;
  map_indict_yn: string;
  y_dnts: string;
  cob_code: string;
  x_cnts: string;
  owner_nm: string;
  bizcnd_code: string;
  crtfc_ymd: string;
  crt_time: number;
  crtfc_sno: string;
  crtfc_yn: string;
  rdn_addr_code: string | null;
  rdn_code_nm: string;
  cgg_code: string;
  cgg_code_nm: string;
  crtfc_upso_mgt_sno: number;
  use_yn: string;
  crtfc_gbn_nm: string;
  food_menu: string | null;
}

export interface StoreType {
  DESCRIPTION: Description;
  DATA: DataItem[];
}

export interface StoreTypeCustom {
  id: number;
  phone: string | null; // tel_no
  address: string | null; // rdn_code_nm
  lat: string | null; // y_dnts
  lng: string | null; // x_cnts
  name: string | null; // upso_nm
  category: string | null; // bizcnd_code_nm
  storeType: string | null; // cob_code_nm
  foodCertifyName: string | null; // crtfc_gbn_nm
  likes?: LikeInterface[];
}

export interface LikeInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreTypeCustom;
}

export interface LikeApiResponse {
  data: LikeInterface[];
  totalPage?: number;
  page?: number;
}

export interface StoreApiResponse {
  data: StoreTypeCustom[];
  totalPage?: number;
  totalCont?: number;
  page?: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export interface SearchType {
  q?: string;
  district?: string;
}
