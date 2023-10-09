export const useFetch = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => resolve({ response, data }));
        } else if (response.status === 401) {
          localStorage.removeItem("token");
          throw window.location.replace("userLogin.html");
        } else {
          response.json().then((data) => reject({ response, data }));
        }
      })
      .catch((error) => reject({ response: { ok: false }, error }));
  });
};
