import Post from "../models/post";

export default function postDbRepositoryMongoDB() {
  const findOne = (params) => {
    return Post.findOne(params);
  };

  const add = (postEntity) => {
    const urlObj = postEntity.getUrl();
    const newPost = new Post({
      user: postEntity.getUser(),
      title: postEntity.getTitle(),
      description: postEntity.getDescription(),
      url: {
        longUrl: urlObj.getLongUrl(),
        shortId: urlObj.getShortId(),
        hostname: urlObj.getHostname(),
        sld: urlObj.getSld()
      },
      tags: postEntity.getTags(),
      images: postEntity.getImages(),
      category: postEntity.getCategory()
    });

    return newPost.save();
  };

  return {
    add,
    findOne
  };
}
