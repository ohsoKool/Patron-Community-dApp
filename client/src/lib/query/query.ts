import { useMutation } from '@tanstack/react-query';
import {
  addUserToDb,
  addUserToGroup,
  changeUserImage,
  changeUserName,
  createGroup,
  CreateGroupType,
  displayImageOnPreview,
  generatePreSignedUrls,
  getAllGroups,
  getGroupById,
  getUserByAddress,
  getUserJoinedDate,
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

// * USER

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

export const useAddUserToGroup = () => {
  return useMutation({
    mutationFn: ({ groupId, walletAddress }: { groupId: string; walletAddress: string }) =>
      addUserToGroup({ groupId, walletAddress }),
  });
};

export const useGetGroupById = () => {
  return useMutation({
    mutationFn: (groupId: string) => getGroupById(groupId),
  });
};

export const useGetUserJoinedDate = () => {
  return useMutation({
    mutationFn: ({ walletAddress, groupId }: { walletAddress: string; groupId: string }) =>
      getUserJoinedDate({ walletAddress, groupId }),
  });
};
