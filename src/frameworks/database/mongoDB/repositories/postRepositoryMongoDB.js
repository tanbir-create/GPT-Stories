import Post from "../models/post";

export default function postDbRepositoryMongoDB() {
  const add = (postEntity) => {
    const newPost = new Post({
      user: postEntity.getUser(),
      title: postEntity.getTitle(),
      description: postEntity.getDescription(),
      url: postEntity.getUrl(),
      images: postEntity.getImages(),
      category: postEntity.getCategory()
    });

    return newPost.save();
  };

  return {
    add
    // findOne
  };
}
