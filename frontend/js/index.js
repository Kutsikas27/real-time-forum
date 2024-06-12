//@ts-nocheck
import { loadLoginView } from "./views/login.js";
import { loadMainPage } from "./views/dashboard.js";
import { loadCategory } from "./views/category.js";
import { loadErrorPage } from "./views/error.js";
import { displayPost } from "./views/post.js";
import { loadProfile } from "./views/profile.js";
import { loadChat } from "./views/ws.js";
import { closeConnection } from "./views/ws.js";
import { loadRegisterView } from "./views/register.js";


export const navigateTo = (url) => {
  if (url === "") {
    return;
  }
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  var titles = {
    "/login": "Login",
    "/register": "Register",
    "/": "",
    "/Home": "Home",
    "/Info": "Info",
    "/School": "School",
    "/Creativity": "Creativity",
    "/post": "Post",
    "/Error": "404",
    "/profile": "User profile",
    "/chat": "Forum chat",
  };

  var routes = [
    {
      path: "/login",
      view: loadLoginView,
    },
    {
      path: "/register",
      view: loadRegisterView,
    },
    {
      path: "/",
      view: loadPage,
    },
    {
      path: "/Home",
      view: loadMainPage,
    },
    {
      path: "/Info",
      view: loadCategory,
    },
    {
      path: "/School",
      view: loadCategory,
    },
    {
      path: "/Creativity",
      view: loadCategory,
    },
    {
      path: "/post",
      view: displayPost,
    },
    {
      path: "/Error",
      view: loadErrorPage,
    },
    {
      path: "/profile",
      view: loadProfile,
    },
    {
      path: "/chat",
      view: loadChat,
    },
  ];

  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("postid");
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch:
        (idParam &&
          window.location.pathname === "/post" &&
          route.path === "/post") ||
        (!idParam && window.location.pathname === route.path),
    };
  });
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);
  if (!match) {
    match = {
      route: routes[8],
      isMatch: true,
    };
  }

  document.title = titles[match.route.path];
  if (match.route.view === loadCategory) {
    const arg = match.route.path.slice(1);
    match.route.view(null, arg);
  } else if (match.route.view === displayPost) {
    match.route.view(idParam);
  } else {
    match.route.view();
  }
};

window.onpopstate = function () {
  router();
};

async function loadPage() {
  // Make a POST request to the server to check the login status
  await fetch("/logincheck", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
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
      // Check the response and update the page accordingly
      if (data.isLoggedIn) {
        navigateTo("/Home");
      } else {
        const currentPath = window.location.pathname;
        if (currentPath === "/register") {
          navigateTo("/register");
        } else {
          navigateTo("/login");
        }
      }
    });
}

export async function getNickname() {
  var myCookieId = localStorage.getItem("myCookieId");
  const response = await fetch(`/getnickname?cookieid=${myCookieId}`);
  const json = response.json();
  const nickname = json.nickname;
  return nickname;
}

export async function getNicknameFromUserId(userId) {
  const response = await fetch(`/getnicknamefromuserid?userid=${userId}`);
  const json = await response.json();
  return json;
}

export function logout() {
  closeConnection();
  fetch(`/logout?cookieid=${localStorage.getItem("myCookieId")}`);
  //var data = response.json()
  document.cookie = "sessionId=; Max-Age=0";
  localStorage.removeItem("myCookieId");
  navigateTo("/login");
}

// Call the loadPage function when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

export async function checkLogin() {
  let answer;
  await fetch("/logincheck", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
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
      // Check the response and update the page accordingly
      if (data.isLoggedIn) {
        answer = true;
      } else {
        answer = false;
      }
    });
  return answer;
}
