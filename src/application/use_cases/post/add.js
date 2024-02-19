import { post, schema as postSchema } from "@entities/post";
import EventEmitter from "node:events";

// const ee = new EventEmitter();

// ee.on("process-image", async (data, repository) => {
//   await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 5000);
//   });

//   console.log(await repository.findOne({ _id: data._id }));
// });
// ee.emit("process-image", newPost, postRepository);

export default async function add(
  postObj,
  postRepository,
  validationService,
  postService
) {
  const validatedPost = validationService.validate(postObj, postSchema);

  const urlObj = postService.processUrl(validatedPost.url); //returns { longUrl, shortId, hostname, sld }

  const tags = postService.extractTags({
    title: validatedPost.title,
    description: validatedPost.description
  });

  // await postService.generateImages;

  let newPost = post({ ...validatedPost, url: urlObj, tags });

  newPost = await postRepository.add(newPost);

  return newPost;
}
