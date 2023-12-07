const toast = document.querySelector(".toast");
const inputPassword = document.querySelector("#password");
const iconEye = document.querySelector(".eye-open");
const remember = document.querySelector(".input-remember");
const inputEmail = document.querySelector("#email");
const labelEmail = document.querySelector(".labelEmail");
const labelPassword = document.querySelector(".labelPassword");

iconEye.addEventListener("click", () => {
  if (inputPassword.getAttribute("type") == "password") {
    iconEye.src = "./assets/icon-eye-closed.svg";
    inputPassword.setAttribute("type", "text");
  } else {
    iconEye.src = "./assets/icon-eye-open.svg";
    inputPassword.setAttribute("type", "password");
  }
});

function login(event) {
  event.preventDefault();

  const listUser = JSON.parse(localStorage.getItem("listUser") || "[]");

  if (listUser.length === 0 || !listUser) {
    sendMessage({
      message: "Unregistered user",
      type: "error",
    });
    return;
  }

  if (inputEmail.value === "" || inputPassword.value === "") {
    sendMessage({
      message: "Complete all the fields correctly",
      type: "error",
    });
    return;
  }

  const userRegistered = listUser.find(
    (user) => user.email === inputEmail.value
  );

  if (!userRegistered) {
    sendMessage({
      message: "Email or password incorrect",
      type: "error",
    });
    clearInput();
  } else {
    const { email, password } = userRegistered;

    if (password !== inputPassword.value || email !== inputEmail.value) {
      sendMessage({
        message: "Email or password incorrect",
        type: "error",
      });
      clearInput();
      return;
    }
    localStorage.setItem("token", generateToken(email));
    sendMessage({
      message: "Login successfully",
      type: "success",
    });

    if (remember.checked) {
      setCookie(email, password, 1);
    }

    setTimeout(() => {
      window.location.href = "./pages/main/main.html";
    }, 3000);

    clearInput();
  }
}

function sendMessage({ message, type }) {
  let style = "display: block;";

  if (type === "error") {
    style += "background-color: #e74c3c; color: white;";
  } else {
    style += "background-color: green; color: white;";
  }

  toast.setAttribute("style", style);
  toast.innerHTML = message;

  setTimeout(function () {
    toast.setAttribute("style", "display: none;");
  }, 3000);
}

function clearInput() {
  inputEmail.value = "";
  inputPassword.value = "";
}

function generateToken(email) {
  const currentDate = new Date();

  const expirationTime = new Date(currentDate.getTime() + 1 * 60000);

  const hour = expirationTime.getHours();
  const minutes = expirationTime.getMinutes();

  return `moto-${email}-${hour}-${minutes}-code`;
}

window.onload = () => {
  const rememberMeCookie = getCookie();

  if (rememberMeCookie) {
    const { email, password } = rememberMeCookie;

    if (email && password) {
      inputEmail.value = email;
      inputPassword.value = password;
    }
    login({
      preventDefault: function () {},
    });
  }
};

function setCookie(email, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = `${email}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

function getCookie() {
  const cookies = document.cookie.split("=");

  if (!document.cookie) {
    return false;
  }

  return {
    email: cookies[0],
    password: cookies[1],
  };
}

function forgetMe(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
}
