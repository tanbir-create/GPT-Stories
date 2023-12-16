export default function user({
  username,
  password,
  email,
  createdAt,
  links,
  profileImageUrl,
  specialization,
  description
}) {
  return {
    getUsername: () => username,
    getPassword: () => password,
    getEmail: () => email,
    getLinks: () => links,
    getProfileImageUrl: () => profileImageUrl,
    getSpecialization: () => specialization,
    getDescription: () => description
    // getCreatedAt: () => createdAt
  };
}
