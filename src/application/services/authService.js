export default function authService(service) {
  const encrypt = (payload) => service.encrypt(payload);

  const compare = (payload, hashedPayload) =>
    service.compare(payload, hashedPayload);

  const compareToken = (token, encryptedToken) =>
    service.compareToken(token, encryptedToken);

  const verify = (token, type) => service.verify(token, type);

  const generateToken = (payload, type) => service.generateToken(payload, type);

  const generateAccessAndRefreshTokens = (data) =>
    service.generateAccessAndRefreshTokens(data);

  return {
    encrypt,
    compare,
    compareToken,
    verify,
    generateToken,
    generateAccessAndRefreshTokens
  };
}
