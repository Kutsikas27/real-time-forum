//@ts-nocheck

import { logout, navigateTo } from "../index.js";
import { getUsers, loadWs } from "./ws.js";

export async function loadMainPage() {
  let categories;

  // get user
  const user = await fetch("/user", {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (
        response.headers.get("Content-Type").indexOf("application/json") === -1
      ) {
        throw new TypeError("Response is not JSON");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });

  const userId = user.userId;
  const username = user.username;

  await fetch("/categories", {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (
        response.headers.get("Content-Type").indexOf("application/json") === -1
      ) {
        throw new TypeError("Response is not JSON");
      }
      return response.json();
    })
    .then((data) => {
      categories = data;
    })
    .catch((error) => {
      console.error(error);
    });

  let categorieElems = "";
  //window.history.pushState({}, "", "/");
  for (let elem of categories) {
    categorieElems +=
      `
        <div class="category" style="cursor: pointer;">
            <div id="category" class="card" data-cat="` +
      elem.CategoryName +
      `">
                <img class="image" src="` +
      elem.Img +
      `" alt="Img" style="width:100%">
                <div class="categoryNameContainer">
                    <h4>` +
      elem.CategoryName +
      `</h4>
                </div>
            </div>
        </div>`;
  }
  document.getElementById("content").innerHTML =
    `
       <div class="container-fluid">
    <div class="d-flex flex-row mb-2 justify-content-between">
      <div class="h1">#JSForum</div>
      <div class="d-flex flex-row-reverse">
        <a href="/login" class="btn btn-primary align-self-center" id="logout-btn" data-link>
          Log out
        </a>
        <a
          href="/chat"
          class="btn btn-primary align-self-center nav__link"
          data-link
        >
          Messages</a
        >
        <a
          href="/create-post"
          class="btn postBtn btn-primary align-self-center nav__link"
          data-link
        >
          Create Post
        </a>
      </div>
    </div>
  </div>
           <div class="column">
                        <div class="categoriesHeader">
                            <h2>Select one of the forum categories:</h2>
                        </div>
                        <div class="categories">
                            ` +
    categorieElems +
    `
                        </div>
                    </div>
        `;
  document.getElementById("logout-btn").addEventListener("click", (event) => {
    event.preventDefault();
    logout();
  });

  document.getElementById("profile").addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("/profile?userid=" + userId);
  });

  document.getElementById("noti-button").addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo("/chat");
  });

  const categoryQuery = document.querySelectorAll(".category");
  categoryQuery.forEach((category) => {
    category.addEventListener("click", (event) => {
      event.preventDefault();
      const categoryName = event.target.closest("#category").dataset.cat;
      navigateTo("/" + categoryName);
    });
  });
  await loadWs();
  await getUsers();
}
