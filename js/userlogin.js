import { useFetch } from "/js/lib/fetch.js";

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const userlogin = document.querySelector(".userlogin");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
const formSignup = document.querySelector("#form-signup");
const formSignin = document.querySelector("#form-signin");

sign_up_btn.addEventListener("click", () => {
  userlogin.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  userlogin.classList.remove("sign-up-mode");
});

sign_up_btn2.addEventListener("click", () => {
  userlogin.classList.add("sign-up-mode2");
});

sign_in_btn2.addEventListener("click", () => {
  userlogin.classList.remove("sign-up-mode2");
});

formSignup.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = formSignup["email"].value;
  const password = formSignup["password"].value;
  const username = formSignup["username"].value;

  const { response, data } = await useFetch(
    "http://localhost:3000/api/user/register",
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
    "http://localhost:3000/api/auth/login",
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
