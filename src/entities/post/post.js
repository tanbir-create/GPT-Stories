export default function post({
  user,
  title,
  description,
  url,
  images,
  category,
  likes,
  comments
}) {
  return {
    getUser: () => user,
    getTitle: () => title,
    getDescription: () => description,
    getUrl: () => url,
    getImages: () => images,
    getCategory: () => category,
    getLikes: () => likes,
    getComments: () => comments
  };
}
