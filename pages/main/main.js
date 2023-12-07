const token = localStorage.getItem("token");
const logout = document.querySelector(".logout");
const greeting = document.querySelector(".greeting");

if (!validateToken(token)) {
  window.location.href = "../../index.html";
}

// window.onload = () => {
//   validateToken(token);
// };

function validateToken(token) {
  if (!token) {
    return false;
  }

  const tokenParts = token.split("-");
  const tokenEmail = tokenParts[1];

  if (
    tokenParts.length !== 5 &&
    tokenParts[0] !== "moto" &&
    tokenParts[4] !== "code"
  ) {
    return false;
  }

  const hour = Number(tokenParts[2]);
  const min = Number(tokenParts[3]);

  const currentDate = new Date();
  const currentHour = Number(currentDate.getHours());
  const currentMin = Number(currentDate.getMinutes());

  if (hour !== currentHour || min < currentMin) {
    return false;
  }

  getNameLocalStorage(tokenEmail);
  return true;
}

logout.addEventListener("click", () => {
  forgetMe();
  localStorage.removeItem("token");
  window.location.href = "../../index.html";
});

function forgetMe() {
  const { email } = getCookie();
  document.cookie = email + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
}

function getCookie() {
  const cookies = document.cookie.split("=");

  if (!document.cookie) {
    return false;
  }
  userEmail = cookies[0];
  return {
    email: cookies[0],
    password: cookies[1],
  };
}

function getNameLocalStorage(tokenEmail) {
  const listUser = localStorage.getItem("listUser");
  let name = "";

  for (const item of JSON.parse(listUser)) {
    if (item.email === tokenEmail) {
      name = item.name;
    }
  }
  const firstName = name.split(" ");
  greeting.textContent = `Olá ${firstName[0]}`;
}
