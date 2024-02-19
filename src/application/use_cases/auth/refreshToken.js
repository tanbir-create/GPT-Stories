import { user } from "@entities/user";
import { AppError } from "@utils/error";

export default async function generataRefreshToken(
  { token },
  userRepository,
  authService
) {
  const decodedToken = await authService.verify(token, "refresh");

  const existingUser = await userRepository.findById(decodedToken.user.id);

  if (!existingUser) {
    throw new AppError("Invalid login attempt", 401, "auth_token_error");
  }

  const payload = {
    user: {
      id: decodedToken.user.id
    }
  };

  const { accessToken, refreshToken } =
    await authService.generateAccessAndRefreshTokens(payload);

  return {
    accessToken,
    refreshToken
  };
}
