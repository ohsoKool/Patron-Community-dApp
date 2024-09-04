import { useMutation } from '@tanstack/react-query';
import {
  addUserToDb,
  changeUserImage,
  changeUserName,
  createGroup,
  CreateGroupType,
  displayImageOnPreview,
  generatePreSignedUrls,
  getAllGroups,
  getUserByAddress,
} from '@/lib/api';
import { ChangeUserImageType, ChangeUserNameType, GroupType } from '@/lib/types';

// * AWS S3

export const useDisplayImageOnPreview = () => {
  return useMutation({
    mutationFn: (file: File) => displayImageOnPreview(file),
  });
};

export const useGeneratePresignedUrl = () => {
  return useMutation({
    mutationFn: (groups: GroupType[]) => generatePreSignedUrls(groups),
  });
};

export const useAddUserToDb = () => {
  return useMutation({
    mutationFn: (walletAddress: string) => addUserToDb(walletAddress),
  });
};

export const useGetUserByAddress = () => {
  return useMutation({
    mutationFn: (walletAddress: string) => getUserByAddress(walletAddress),
  });
};

export const useChangeUserProfileImage = () => {
  return useMutation({
    mutationFn: (userObject: ChangeUserImageType) => changeUserImage(userObject),
  });
};

export const useChangeUserName = () => {
  return useMutation({
    mutationFn: (userObject: ChangeUserNameType) => changeUserName(userObject),
  });
};

// * GROUP QUERIES

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: ({
      groupName,
      groupDescription,
      groupCoverImage,
      walletAddress,
    }: CreateGroupType) =>
      createGroup({ groupName, groupDescription, groupCoverImage, walletAddress }),
  });
};

export const useGetAllGroups = () => {
  return useMutation({
    mutationFn: () => getAllGroups(),
  });
};
