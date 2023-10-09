export const checkAuth = (url, options) => {
  if (localStorage.getItem("token")) {
    return true;
  }
  return window.location.replace("userlogin.html?");
};

checkAuth();

export const HTTPErrors = (response) => {
  if (response.status === 401) {
    return (window.location.href = "userLogin.html");
  }
};
