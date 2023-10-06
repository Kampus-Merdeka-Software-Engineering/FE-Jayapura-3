export const useFetch = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => resolve({ response, data }));
        } else {
          if (response.status === 401) {
            // Remove the token and then redirect to the login page
            localStorage.removeItem("token");
            window.location.replace("/userLogin.html");
          } else {
            response.json().then((data) => reject({ response, data }));
          }
        }
      })
      .catch((error) => reject({ response: { ok: false }, error }));
  });
};
