export interface QNA {
  id: number;
  memberId: string;
  memberType: string; // TODO
  name: string;
  phoneNumber: string;
  title: string;
  content: string;
  contentImageUrl1: string;
  contentImageUrl2: string;
  contentImageUrl3: string;
  isAnswered: boolean;
  answeredAt: string;
  adminAnswer: string;
  branchId: string;
  familyName: string;
  familyAddress: string;
  familyTel: string;
  createdAt: string;
}
