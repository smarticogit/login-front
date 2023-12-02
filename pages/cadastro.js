const toast = document.querySelector(".toast");
const iconEyeConfirm = document.querySelector(".eye-open-confirm");
const iconEye = document.querySelector(".eye-open");

let inputName = document.querySelector(".name");
let labelName = document.querySelector(".labelName");
let validInputName = false;

let inputEmail = document.querySelector(".email");
let labelEmail = document.querySelector(".labelEmail");
let validInputEmail = false;

let inputPassword = document.querySelector(".password");
let labelPassword = document.querySelector(".labelPassword");
let validInputPassword = false;

let inputConfirmPassword = document.querySelector(".confirmPassword");
let labelConfirmPassword = document.querySelector(".labelConfirmPassword");
let validInputConfirmPassword = false;

inputName.addEventListener("keyup", () => {
  if (inputName.value.length <= 2) {
    labelName.setAttribute("style", "color: red");
    inputName.setAttribute("style", "border-color: red");
    labelName.innerHTML = "name must have at least 3 characters";
  } else {
    labelName.setAttribute("style", "color: green");
    inputName.setAttribute("style", "border-color: green");
    labelName.innerHTML = "Name";
    validInputName = true;
  }
});

inputEmail.addEventListener("keyup", () => {
  if (!inputEmail.value.includes("@") || !inputEmail.value.includes(".")) {
    labelEmail.setAttribute("style", "color: red");
    inputEmail.setAttribute("style", "border-color: red");
    labelEmail.innerHTML = "email invalid";
  } else {
    labelEmail.setAttribute("style", "color: green");
    inputEmail.setAttribute("style", "border-color: green");
    labelEmail.innerHTML = "Email";
    validInputEmail = true;
  }
});

inputPassword.addEventListener("keyup", () => {
  if (inputPassword.value.length <= 5) {
    labelPassword.setAttribute("style", "color: red");
    inputPassword.setAttribute("style", "border-color: red");
    labelPassword.innerHTML = "password must have at least 6 characters";
  } else {
    labelPassword.setAttribute("style", "color: green");
    inputPassword.setAttribute("style", "border-color: green");
    labelPassword.innerHTML = "Password";
    validInputPassword = true;
  }
});

inputConfirmPassword.addEventListener("keyup", () => {
  if (inputPassword.value !== inputConfirmPassword.value) {
    labelConfirmPassword.setAttribute("style", "color: red");
    inputConfirmPassword.setAttribute("style", "border-color: red");
    labelConfirmPassword.innerHTML = "the password does not match";
  } else {
    labelConfirmPassword.setAttribute("style", "color: green");
    inputConfirmPassword.setAttribute("style", "border-color: green");
    labelConfirmPassword.innerHTML = "Confirm Password";
    validInputConfirmPassword = true;
  }
});

function signUp(event) {
  event.preventDefault();

  if (
    validInputName &&
    validInputEmail &&
    validInputPassword &&
    validInputConfirmPassword
  ) {
    let listUser = JSON.parse(localStorage.getItem("listUser") || "[]");

    listUser.push({
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
    });

    localStorage.setItem("listUser", JSON.stringify(listUser));
    sendMessage({
      message: "Registered successfully",
      type: "success",
    });

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 3000);
  } else {
    sendMessage({
      message: "Complete all the fields correctly",
      type: "error",
    });
  }

  clearInput();
}

iconEye.addEventListener("click", () => {
  if (inputPassword.getAttribute("type") == "password") {
    iconEye.src = "../assets/icon-eye-closed.svg";
    inputPassword.setAttribute("type", "text");
  } else {
    iconEye.src = "../assets/icon-eye-open.svg";
    inputPassword.setAttribute("type", "password");
  }
});

iconEyeConfirm.addEventListener("click", () => {
  if (inputConfirmPassword.getAttribute("type") == "password") {
    iconEyeConfirm.src = "../assets/icon-eye-closed.svg";
    inputConfirmPassword.setAttribute("type", "text");
  } else {
    iconEyeConfirm.src = "../assets/icon-eye-open.svg";
    inputConfirmPassword.setAttribute("type", "password");
  }
});

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
  const labelFields = [
    labelName,
    labelEmail,
    labelPassword,
    labelConfirmPassword,
  ];

  const inputs = [inputName, inputEmail, inputPassword, inputConfirmPassword];

  labelFields.forEach((label) => {
    label.setAttribute("style", "color: rgb(18, 18, 53)");
  });

  inputs.forEach((input) => {
    input.setAttribute("style", "border-color: rgb(18, 18, 53)");
    input.value = "";
  });
}
