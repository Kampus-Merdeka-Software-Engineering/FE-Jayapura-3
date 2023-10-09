export const checkAuth = (url, options) => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return window.location.replace("FE-Jayapura-3/userLogin.html");
};

checkAuth();

export const HTTPErrors = (response) => {
  if (response.status === 401) {
    return (window.location.href = "/userLogin.html");
  }
};
