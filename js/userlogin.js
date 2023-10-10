import { useFetch } from "/js/lib/fetch.js";

const formSignup = document.querySelector("#form-signup");
const formSignin = document.querySelector("#form-signin");

formSignup.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = formSignup["email"].value;
  const password = formSignup["password"].value;
  const username = formSignup["username"].value;

  const { response, data } = await useFetch(
    "https://be-jayapura-3-production.up.railway.app/api/user/register",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch(({ data }) => {
    alert(data.error);
  });

  if (response.status === 201) {
    alert("Register success");
    e.target.reset();
    return userlogin.classList.remove("sign-up-mode");
  }
  return alert(data.error);
});

formSignin.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(formSignin["username"]);
  const username = formSignin["username"].value;
  const password = formSignin["password"].value;

  const { response, data } = await useFetch(
    "https://be-jayapura-3-production.up.railway.app/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).catch(({ data }) => {
    alert(data.error);
  });

  if (response.ok) {
    localStorage.setItem("token", data.token);
    return window.location.replace("/index.html");
  }
});