const toast = document.querySelector(".toast");
const inputPassword = document.querySelector("#password");
const iconEye = document.querySelector(".eye-open");

let inputEmail = document.querySelector(".email");
let labelEmail = document.querySelector(".labelEmail");

let labelPassword = document.querySelector(".labelPassword");

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
  let listUser = JSON.parse(localStorage.getItem("listUser") || "[]");

  const user = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  listUser.forEach((item) => {
    if (item.email === user.email && item.password === user.password) {
      sendMessage({
        message: "Login successfully",
        type: "success",
      });
    } else {
      sendMessage({
        message: "Email or password incorrect",
        type: "error",
      });
    }
  });

  clearInput();
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
