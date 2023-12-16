import { post, schema as postSchema } from "@entities/post";

export default async function add(postObj, postRepository, validationService) {
  const value = validationService.validate(postObj, postSchema);

  let newPost = post(value);

  newPost = await postRepository.add(newPost);

  return newPost;
}
