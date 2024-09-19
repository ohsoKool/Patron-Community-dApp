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
  id: string;
};

export type createPostType = {
  postImage: string;
  postTitle: string;
  postDescription: string;
  walletAddress: string;
  groupId: string;
};

export type PostType = {
  postImage: string;
  postDescription: string;
  postTitle: string;
  createdAt: Date;
  onwner: {
    name: string;
    image: string;
  };
};
