import { user } from "@entities/user";
import { AppError } from "@utils/error";

export default async function generataRefreshToken(
  { token },
  userRepository,
  authService
) {
  const decodedToken = await authService.verify(token, "refresh");

  const existingUser = await userRepository.findById(
    decodedToken.user.id,
    "refreshToken"
  );

  if (!existingUser) {
    throw new AppError("Invalid login attempt", 401, "auth_token_error");
  }

  const refreshTokensMatch = await authService.compare(
    token,
    existingUser.refreshToken
  );

  if (!refreshTokensMatch) {
    throw new AppError(
      "Invalid login attempt. Please login again",
      401,
      "auth_token_error"
    );
  }

  const payload = {
    user: {
      id: decodedToken.user.id
    }
  };

  const { accessToken, refreshToken } =
    await authService.generateAccessAndRefreshTokens({
      id: decodedToken.user.id,
      payload,
      userRepository,
      user
    });

  return {
    accessToken,
    refreshToken
  };
}
