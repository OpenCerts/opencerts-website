const defaultUrl = "/static/registry.json";

export default function fetchIssuers(
  url = defaultUrl
): Promise<{
  [key: string]: {
    name: string;
    displayCard: boolean;
  };
}> {
  return window
    .fetch(url)
    .then((res) => res.json())
    .then((json) => json.issuers)
    .catch(console.error); // eslint-disable-line
}
