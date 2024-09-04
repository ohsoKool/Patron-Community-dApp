export type ChangeUserImageType = {
  address: string;
  image: string;
};

export type ChangeUserNameType = {
  name: string;
  address: string;
};

export type GroupType = {
  groupCoverImage: string;
  groupName: string;
  groupDescription: string;
  createdAt: string | Date;
  members: any[];
};
