export default function postService(service) {
  const processUrl = (url) => service.processUrl(url);

  const extractTags = (textObj) => service.extractTags(textObj);

  return {
    processUrl,
    extractTags
  };
}
