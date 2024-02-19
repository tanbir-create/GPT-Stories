import addPost from "@application/use_cases/post/add";

export default function postController(
  postDbRepository,
  postDbRepositoryImpl,
  validationServiceInterface,
  validationServiceImpl,
  postServiceInterface,
  postServiceImpl
) {
  const dbRepository = postDbRepository(postDbRepositoryImpl());
  const validationService = validationServiceInterface(validationServiceImpl());
  const postService = postServiceInterface(postServiceImpl());

  const addNewPost = (req, res, next) => {
    const { title, description, url, images, category } = req.body;

    const user = req.user?.id;

    addPost(
      { user, title, description, url, images, category },
      dbRepository,
      validationService,
      postService
    )
      .then((data) => {
        res.status(201).json({
          status: "success",
          message: "Created new post",
          data
        });
      })
      .catch((err) => {
        next(err);
      });
  };

  return {
    addNewPost
  };
}
