const btnCad = document.querySelector("#btn-cad");
const btnLogin = document.querySelector("#login");
const user = document.querySelector("#user");
const password = document.querySelector("#password");
const btnSaveData = document.querySelector("#save-data");
let saveData = false;

btnCad.addEventListener("click", (e) => {
  e.preventDefault();
  showScreenRegister();
});

function showScreenRegister() {
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (saveData === true) {
    saveDataUser(user.value, password.value);
  } else {
  }
  validatioUser(user.value, password.value);
});

function validatioUser(user, password) {

  if (user == "admin" && password == "1234") {
    location.href = 'pages/home.html'
  } else {
    document.querySelector(".message").textContent =
      "Usuário e/ou senha inválida !";
  }
}
btnSaveData.addEventListener("input", (e) => {
  saveData = e.target.checked;
});
function saveDataUser(user, password) {
    sessionStorage.setItem(`user`,`${user}`);
  const allData = JSON.parse(localStorage.getItem("dataUser")) || [];

  allData.push({
    user: user,
    password: password,
  });
  localStorage.setItem("dataUser", JSON.stringify(allData));
}