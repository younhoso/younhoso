export interface Relay {
  id: number;
  memberId: string;
  memberType: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  title: string;
  content?: string;
  contentFileUrl1?: string;
  contentFileUrl2?: string;
  contentFileUrl3?: string;
  createdAt: string;
  isHasAttachment?: boolean;
}
