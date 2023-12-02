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

  if (listUser.length === 0) {
    sendMessage({
      message: "Unregistered user",
      type: "error",
    });
  }

  if (inputEmail.value === "" || inputPassword.value === "") {
    sendMessage({
      message: "Complete all the fields correctly",
      type: "error",
    });
  }

  const user = {
    email: inputEmail.value,
    password: inputPassword.value,
  };

  listUser.forEach((item) => {
    const { email, password } = item;

    if (email !== user.email && password !== user.password) {
      sendMessage({
        message: "Email or password incorrect",
        type: "error",
      });
    } else {
      localStorage.setItem("token", generateToken());

      sendMessage({
        message: "Login successfully",
        type: "success",
      });

      setTimeout(() => {
        window.location.href = "./pages/main/main.html";
      }, 3000);
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

function generateToken() {
  const currentDate = new Date();

  const expirationTime = new Date(currentDate.getTime() + 1 * 60000);

  const hour = expirationTime.getHours();
  const minutes = expirationTime.getMinutes();

  return `moto-${hour}-${minutes}-code`;
}
