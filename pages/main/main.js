const token = localStorage.getItem("token");

if (!validateToken(token)) {
  window.location.href = "../../index.html";
}

function validateToken(token) {
  if (!token) {
    return false;
  }

  const tokenParts = token.split("-");

  if (
    tokenParts.length !== 5 &&
    tokenParts[0] !== "moto" &&
    tokenParts[4] !== "code"
  ) {
    return false;
  }

  const hour = Number(tokenParts[1]);
  const min = Number(tokenParts[2]);

  const currentDate = new Date();
  const currentHour = Number(currentDate.getHours());
  const currentMin = Number(currentDate.getMinutes());

  console.log({
    hour: `${hour}:${min}`,
    currentHour: `${currentHour}:${currentMin}`,
  });

  if (hour !== currentHour || min < currentMin) {
    return false;
  }

  return true;
}
