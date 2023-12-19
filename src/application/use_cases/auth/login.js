import { user } from "@entities/user";
import { AppError } from "@utils/error";

export default async function login(
  { email, password },
  userRepository,
  authService
) {
  if (!email || !password) {
    throw new AppError(
      "Email and password fields cannot be empty",
      401,
      "invalid_data_error"
    );
  }

  const existingUser = await userRepository.findOne({ email }, "password");
  if (!existingUser) {
    throw new AppError("Invalid email or password", 401, "invalid_data_error");
  }

  const passwordsMatch = await authService.compare(
    password,
    existingUser.password
  );
  if (!passwordsMatch) {
    throw new AppError("Invalid email or password", 401, "invalid_data_error");
  }

  const payload = {
    user: {
      id: existingUser._id
    }
  };

  const { accessToken, refreshToken } =
    await authService.generateAccessAndRefreshTokens({
      id: existingUser._id,
      payload,
      userRepository,
      user
    });

  return {
    accessToken,
    refreshToken
  };
}
