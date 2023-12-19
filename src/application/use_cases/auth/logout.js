import { user } from "@entities/user";

export default async function logout({ authUser }, userRepository) {
  const updatedUser = user({ refreshToken: "" });
  await userRepository.updateById(authUser.id, updatedUser);

  return;
}
