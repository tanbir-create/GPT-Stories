export default function postService() {
  const generateShortId = (length = 7) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  const processUrl = (url) => {
    const longUrl = url;

    const shortId = generateShortId();

    const { hostname } = new URL(url);

    let sld = hostname.split(".").at(-2);
    sld = sld.at(0).toUpperCase() + sld.substring(1);

    return {
      longUrl,
      shortId,
      hostname,
      sld
    };
  };

  const extractTags = (textObj) => {
    const tags = Object.values(textObj)
      .flatMap((text) => text.split(/\s+/)) // splitting text with multiple spaces betweeen words
      .filter((word) => word.startsWith("#") && word.length > 1)
      .map((tag) => tag.substring(1));

    return tags;
  };

  return {
    processUrl,
    extractTags
  };
}
