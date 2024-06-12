//@ts-nocheck
import { navigateTo } from "../index.js";

export function loadRegisterView() {
  document.getElementById(
    "content"
  ).innerHTML = `<div class="h-100 d-flex justify-content-center align-items-center">
      <div class="w-50">
        <form id="register-form" enctype="multipart/form-data">
          <div class="mb-3">
            <h2>Create an account</h2>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
            />
              <div id="emailError" class="invalid-feedback">
            </div>
          </div>
          <div class="mb-3">
            <label for="nickname" class="form-label">Nickname</label>
            <input
              type="text"
              id="nickname"
              class="form-control"
              name="nickname"
              required
            />
             <div id="nicknameError" class="invalid-feedback">
            </div>
          </div>
  
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="firstName" class="form-label">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="lastName" class="form-label" >Last name</label>
                <input type="text" id="lastName" class="form-control" name="lastName" required />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="age" class="form-label">Age</label>
            <input
              type="number"
              name="age"
              class="form-control"
              id="age"
              min="0"
              max="150"
              required
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
              required
            />
          </div>
  
          <div class="mb-3">
            <div class="form-label">Gender</div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="gender-male"
                value="male"
                checked
              />
              <label class="form-check-label" for="inlineRadio1">Male</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="gender"
                id="gender-female"
                value="female"
              />
              <label class="form-check-label" for="gender">Female</label>
            </div>
          </div>
          <div class="mb-3">
            <a href="/login" class="align-self-center nav__link" data-link>
              Already have an account?
            </a>
          </div>
          <button type="submit" id="submit-register-button" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>`;

  const nicknameInput = document.getElementById("nickname");
  nicknameInput.addEventListener("input", () => {
    checkAvailability(
      nicknameInput.value,
      "nickname",
      "nicknameError",
      "Nickname is unavailable"
    );
  });

  const emailInput = document.getElementById("email");
  emailInput.addEventListener("input", () => {
    checkAvailability(
      emailInput.value,
      "email",
      "emailError",
      "Email is unavailable"
    );
  });
  const form = document.getElementById("register-form");
  form.addEventListener("submit", submitRegisterHandler);
  function submitRegisterHandler(event) {
    event.preventDefault();
    submitRegister();
  }

  async function checkAvailability(value, id, errorId, errorMessage) {
    const response = await fetch(`/check-availability?value=${value}`);
    const data = await response.json();
    const error = document.getElementById(errorId);
    const getId = document.getElementById(id);
    if (!data.available) {
      error.innerHTML = errorMessage;
      getId.classList.add("is-invalid");
      return;
    }
    error.innerHTML = "";
    getId.classList.remove("is-invalid");
    getId.classList.add("is-valid");
  }
}

function submitRegister() {
  if (document.getElementById("nicknameError").innerHTML !== "") {
    return;
  }
  if (document.getElementById("emailError").innerHTML !== "") {
    return;
  }
  const form = document.getElementById("register-form");
  const formData = new FormData(form);
  const obj = {};
  for (let [key, value] of formData.entries()) {
    obj[key] = value;
  }
  const jsonString = JSON.stringify(obj);

  fetch("/submitRegisterData", {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: jsonString,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        navigateTo("/login");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
