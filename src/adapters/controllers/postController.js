import addPost from "@application/use_cases/post/add";

export default function postController(
  postDbRepository,
  postDbRepositoryImpl,
  validationServiceInterface,
  validationServiceImpl
) {
  const dbRepository = postDbRepository(postDbRepositoryImpl());
  const validationService = validationServiceInterface(validationServiceImpl());

  const addNewPost = (req, res, next) => {
    const { user, title, description, url, images, category } = req.body;

    addPost(
      { user, title, description, url, images, category },
      dbRepository,
      validationService
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
