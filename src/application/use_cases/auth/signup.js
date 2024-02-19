import { user, schema as signupSchema } from "@entities/user";

import { AppError } from "@utils/error";

export default async function signup(
  userObj,
  userRepository,
  authService,
  validationService
) {
  const validatedUser = validationService.validate(userObj, signupSchema);

  const existingUser = await userRepository.findOne({ email: userObj.email });

  if (existingUser) {
    throw new AppError("User already exists", 400, "form_validation_error", {
      errors: [{ email: "User alredy exists" }]
    });
  }

  const encryptedPassword = await authService.encrypt(validatedUser.password);

  let newUser = user({ ...validatedUser, password: encryptedPassword });

  newUser = await userRepository.add(newUser);

  newUser.password = undefined;

  const payload = {
    user: {
      id: newUser._id
    }
  };

  const { accessToken, refreshToken } =
    await authService.generateAccessAndRefreshTokens(payload);

  return {
    user: newUser,
    accessToken,
    refreshToken
  };
}
