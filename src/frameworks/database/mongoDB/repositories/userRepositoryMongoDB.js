import User from "../models/user";

export default function userDbRepositoryMongoDB() {
  const findOne = (params, selectFields = "") => {
    return User.findOne(params).select(selectFields);
  };

  const findById = (id, selectFields = "") => {
    return User.findById(id).select(selectFields);
  };

  const add = (userEntity) => {
    const newUser = new User({
      username: userEntity.getUsername(),
      email: userEntity.getEmail(),
      password: userEntity.getPassword(),
      links: userEntity.getLinks(),
      specialization: userEntity.getSpecialization(),
      description: userEntity.getDescription(),
      profileImageUrl: userEntity.getProfileImageUrl()
    });

    return newUser.save();
  };

  const updateById = (id, userEntity) => {
    const updatedUser = {
      // TODO:
      // Add all the props that are updateable
      username: userEntity.getUsername()
    };

    return User.findOneAndUpdate(
      { _id: id },
      { $set: updatedUser },
      { new: true }
    );
  };

  return {
    add,
    findOne,
    findById,
    updateById
  };
}
