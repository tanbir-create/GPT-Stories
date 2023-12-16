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

  const user = await userRepository.findOne({ email }, "password");
  if (!user) {
    throw new AppError("Invalid email or password", 401, "invalid_data_error");
  }

  const passwordsMatch = await authService.compare(password, user.password);
  if (!passwordsMatch) {
    throw new AppError("Invalid email or password", 401, "invalid_data_error");
  }

  const payload = {
    user: {
      id: user._id
    }
  };
  return authService.generateToken(payload);
}
