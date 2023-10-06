export const getQueryParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
};

export const setQueryParams = (name, value) => {
  let params = new URLSearchParams(document.location.search);

  console.log(value);
  if (params.has(name))
    params.set(
      name,
      params.get(name).includes(value)
        ? params.get(name).replace("," + value, "")
        : `${params.get(name)},${value}`
    );
  else params.set(name, value);

  return params.toString();
};

export const removeQueryParams = (name) => {
  let params = new URLSearchParams(document.location.search);
  params.delete(name);
  return params.toString();
};
