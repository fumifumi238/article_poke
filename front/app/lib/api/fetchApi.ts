const arrayToParams = (paramsName: string, lists: (string | number)[]) => {
  let result = "";
  const params = `${paramsName}[]=`;

  for (let list of lists) {
    result += params + list + "&";
  }

  return result;
};

export const postData = async <T>(url: string, data?: T) => {
  const defaultUrl = "http://localhost:3000";
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(defaultUrl + url, params);
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err);
  }
  return await response.json();
};

export const getData = async <T>(url: string, query?: { [key: string]: T }) => {
  let defaultUrl = "http://localhost:3000" + url;
  if (query) {
    defaultUrl += "?";
    for (let [key, value] of Object.entries(query)) {
      if (Array.isArray(value)) {
        defaultUrl += arrayToParams(key, value);
      } else {
        defaultUrl += `${key}=${value}&`;
      }
    }
  }

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(defaultUrl, params);
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err);
  }
  return await response.json();
};
