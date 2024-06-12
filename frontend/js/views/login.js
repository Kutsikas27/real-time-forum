//@ts-nocheck
import { navigateTo } from "../index.js";
async function login() {
  const formElement = document.getElementById("login-form");
  const email = formElement.elements["email"].value;
  const password = formElement.elements["password"].value;
  const response = await fetch(
    `/submitlogin?user=${email}&password=${password}`
  );

  const data = await response.json();
  const errorElement = document.getElementById("error");
  if (data.Error !== "") {
    errorElement.style.visibility = "visible";
    errorElement.style.display = "block";
  }
  //loadWs(data.UserId)
  localStorage.setItem("myCookieId", data.CookieId);
  navigateTo("/Home");
  return;
}

export function loadLoginView() {
  document.getElementById("content").innerHTML = `
                <div class="h-100 d-flex justify-content-center align-items-center">
      <div class="w-50">
        <form id="login-form">
          <div class="mb-3">
            <label></label>
            <label for="email" class="form-label"
              >Email address or nickname</label
            >
            <input
              type="email"
              name="email"
              class="form-control"
              id="email"
            />       
          </div>
          <div class="mb-3">
            <label for="password" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
            />
          </div>
          <div class="mb-3">
            <label class="form-check-label" for="exampleCheck1"
              >Need an account?</label
            >
            <a
              href="/register"
              class="align-self-center nav__link"
              data-link
            >
              Register
            </a>
          </div>
          <button type="submit" class="btn btn-primary" id=login-button>Log in</button>
    <p id="error" style="color:red; display:none; margin-top:14px;margin-bottom:0px; visibility:hidden; width: 300px;">Wrong email or password</p>
        </form>
      </div>
    </div>
  `;
  // Add event listener to the login form submission event
  const loginButton = document.getElementById("login-button");
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    login();
  });
}
