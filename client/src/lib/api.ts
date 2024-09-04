import axios from 'axios';
import { ChangeUserImageType, ChangeUserNameType, GroupType } from '@/lib/types';

// * AWS S3

export const displayImageOnPreview = async (file: File) => {
  const responseUrl = await axios.get('http://localhost:3000/patron/api/s3/pre-signed-url', {
    params: {
      fileName: file?.name,
      contentType: file?.type,
    },
  });

  if (responseUrl.data.data.url) {
    await axios.put(responseUrl.data.data.url, file, {
      headers: {
        'Content-Type': file?.type,
      },
    });
  }

  const responsePreUrl = await axios.get(
    'http://localhost:3000/patron/api/s3/pre-signed-url/posts',
    {
      params: {
        fileName: file?.name,
      },
    }
  );

  return responsePreUrl;
};

export const getUrlFromS3ByName = async (name: string) => {
  const responsePreUrl = await axios.get(
    'http://localhost:3000/patron/api/s3/pre-signed-url/posts',
    {
      params: {
        fileName: name,
      },
    }
  );

  return responsePreUrl.data.data.url;
};

export const generatePreSignedUrls = async (groups: GroupType[]): Promise<GroupType[]> => {
  const groupsWithPresignedUrls = await Promise.all(
    groups.map(async (group) => ({
      ...group,
      groupCoverImage: await getUrlFromS3ByName(group.groupCoverImage),
    }))
  );

  return groupsWithPresignedUrls;
};

type UserToDbReturnType = {
  name: string;
  address: string;
  createdAt: string | Date;
  image: string;
};

export const addUserToDb = async (walletAddress: string): Promise<UserToDbReturnType | void> => {
  const response = await axios.post(
    `http://localhost:3000/patron/api/user/add-user?address=${walletAddress}`
  );

  return response.data.data;
};

export const getUserByAddress = async (
  walletAddress: string
): Promise<UserToDbReturnType | void> => {
  const response = await axios.get(
    `http://localhost:3000/patron/api/user/retrieve-user?address=${walletAddress}`
  );

  return response.data.data;
};

export const changeUserImage = async (userObject: ChangeUserImageType): Promise<string | void> => {
  const response = await axios.put(`http://localhost:3000/patron/api/user/change-profileImage`, {
    image: userObject.image,
    address: userObject.address,
  });

  return response.data.data;
};

export const changeUserName = async (userObject: ChangeUserNameType): Promise<string | void> => {
  const response = await axios.put(`http://localhost:3000/patron/api/user/change-profileName`, {
    name: userObject.name,
    address: userObject.address,
  });

  return response.data.data;
};

export const checkIfUserExists = async (walletAddress: string) => {
  const response = await axios.get(
    `http://localhost:3000/patron/api/user/user-exists?address=${walletAddress}`
  );

  return response.data.data;
};

export const getUserIdByAddress = async (walletAddress: string) => {
  const response = await axios.get(
    `http://localhost:3000/patron/api/user/get-userId?address=${walletAddress}`
  );

  return response.data.data.id;
};

// * GROUP APIS

export type CreateGroupType = {
  walletAddress: string;
  groupName: string;
  groupDescription: string;
  groupCoverImage: string;
};

export const createGroup = async ({
  walletAddress,
  groupName,
  groupDescription,
  groupCoverImage,
}: CreateGroupType) => {
  const ownerId = await getUserIdByAddress(walletAddress);

  if (ownerId) {
    const response = await axios.post(`http://localhost:3000/patron/api/group/create-group`, {
      groupName,
      groupDescription,
      ownerId,
      groupCoverImage,
    });

    if (response) {
      return response;
    }
  } else {
    throw new Error('User not found');
  }
};

export const getAllGroups = async () => {
  const response = await axios.get(`http://localhost:3000/patron/api/group/get-allGroup`);

  return response.data.data;
};
