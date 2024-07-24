// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Social {

  // Define a struct to represent a Group
  struct Group {
    string groupTitle;
    string groupCoverImageUrl;
    string groupDescription;
    address groupOwnerAddress;
    string groupId;
  }

  // Define a struct to represent a Post
  struct Post {
    string postId;
    string postTitle;
    address postOwnerAddress;
    string postDescription;
    string postImage;
    string groupId;
  }

  // Mapping to store groups with their unique ID
  mapping(string => Group) public groups;

  // Mapping to store posts within a group using groupId as key
  mapping(string => Post[]) public postsByGroup;

  // Function to create a new Group
  function createGroup(
    string memory _groupTitle,
    string memory _groupCoverImageUrl,
    string memory _groupDescription,
    string memory _groupId
  ) payable public  {
    require(msg.value == 5000000, "Not enought eth");
    groups[_groupId] = Group({
      groupTitle: _groupTitle,
      groupCoverImageUrl: _groupCoverImageUrl,
      groupDescription: _groupDescription,
      groupOwnerAddress: msg.sender,
      groupId: _groupId
    });

  }

  // Function to create a new Post within a Group
  function createPost(
    string memory _postId,
    string memory _groupId,
    string memory _postTitle,
    string memory _postDescription,
    string memory _postImage
  ) payable public  {
    require(msg.value == 5000000, "Not enought eth");
    postsByGroup[_groupId].push(Post({
      postTitle: _postTitle,
      postOwnerAddress: msg.sender,
      postDescription: _postDescription,
      postImage: _postImage,
      groupId: _groupId,
      postId : _postId
    }));
  }

  // Function to retrieve a Group by its ID
  function getGroup(string memory _groupId) public view returns (Group memory) {
    return groups[_groupId];
  }

  // Function to retrieve all Posts within a Group by its ID
  function getPostsByGroup(string memory _groupId) public view returns (Post[] memory) {
    return postsByGroup[_groupId];
  }
}
