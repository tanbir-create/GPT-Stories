export default function post({
  user,
  title,
  description,
  url: { longUrl, shortId, views, hostname, sld },
  tags,
  images,
  category,
  likes,
  comments
}) {
  return {
    getUser: () => user,
    getTitle: () => title,
    getDescription: () => description,
    getUrl: () => ({
      getLongUrl: () => longUrl,
      getShortId: () => shortId,
      getHostname: () => hostname,
      getSld: () => sld,
      getViews: () => views
    }),
    getTags: () => tags,
    getImages: () => images,
    getCategory: () => category,
    getLikes: () => likes,
    getComments: () => comments
  };
}
