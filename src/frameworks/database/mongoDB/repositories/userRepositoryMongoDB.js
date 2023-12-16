import User from "../models/user";

export default function userDbRepositoryMongoDB() {
  const findOne = (params, selectFields = "") => {
    return User.findOne(params).select(selectFields);
  };

  const add = (userEntity) => {
    const newUser = new User({
      username: userEntity.getUsername(),
      email: userEntity.getEmail(),
      password: userEntity.getPassword(),
      links: userEntity.getLinks(),
      specialization: userEntity.getProfileImageUrl(),
      description: userEntity.getDescription(),
      profileImageUrl: userEntity.getProfileImageUrl()
    });

    return newUser.save();
  };

  return {
    add,
    findOne
  };
}
