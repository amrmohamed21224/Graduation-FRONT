//* ================> ØµÙØ­Ù‡ ØªØ³Ø¬ÙŠÙ„ Ø¯Ø®ÙˆÙ„  <===================
//* ================>   <===================

// ?=====>  globel   <====
const inputs = document.querySelectorAll("input");
const btnsingIn = document.getElementById("btnsingIn");
const formData = document.querySelector("form");
let isValid = false; //ØªØ§ÙƒØ¯ Ø§Ù† ÙƒÙ„ Ø§Ù„Ø¯Ø§ØªØ§ ØµØ­ÙŠØ­Ù‡
const loooder = document.getElementById("loooder");
//!=====>  when start   <====

//*=====>  events   <====

formData.addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log("ffffff ");
  if (isValid === true) {
    //Ù„Ùˆ ÙÙ„Ø¯ÙŠØ´Ù† ØªÙ…Ø§Ù… Ø§Ø¨Ø¹Øª Ø§Ù„Ø¯Ø§ØªØ§ Ù„Ù„Ø¨Ø§Ùƒ
    setForm();
  }
});
// validation form
formData.addEventListener("input", function () {
  if (validationEmail(inputs[0]) && validationPassword(inputs[1])) {
    isValid = true; //Ø§Ù„Ø¯Ø§ØªØ§ Ù…ÙƒØªÙˆØ¨Ù‡ ØµØ­
  } else {
    isValid = false; // Ø§Ù„Ø¯Ø§ØªØ§ ÙÙŠÙ‡Ø§ ØºÙ„Ø·
  }
});

// //  !    email
// inputs[0].addEventListener("blur", function () {
//   validationEmail(inputs[0]);
// });
// //  !    password
// inputs[1].addEventListener("blur", function () {
//   validationPassword(inputs[1]);
// });
//Ø§Ø¬ÙŠØ¨ Ø§ÙˆÙ„ Ø§Ù„ØµÙØ­Ù‡
window.scrollTo({
  top: 0,
  // behavior: "",
});

// show / hide password signIn
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.querySelector(".password-box input");

togglePassword?.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";

  passwordInput.type = type;

  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});

//!=====>  function   <====
// Ù‡Ø¹Ù…Ù„ ÙÙ†ÙƒØ´Ù† ØªØµÙ†Ø¹ ÙÙˆØ±Ù…
function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };
  // console.log(user);
  loginForm(user);
  // user=userData
}
//callapi
async function loginForm(userData) {
  loooder.classList.remove("d-none"); //Ø§Ø¸Ù‡Ø§Ø± looder
  const api = await fetch(
    `/api/v1/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  );
  const res = await api.json();
  toastr.options = {
    positionClass: "toast-right-center",
    timeOut: 5000,
    closeButton: true,
    progressBar: true,
  };
  if (res.success === true) {
    loooder.classList.remove("d-none"); //Ø§Ø¸Ù‡Ø§Ø± looder
    toastr.success("ØªÙ…  ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø¨Ù†Ø¬Ø§Ø­ "); //alert
    localStorage.setItem("tokenUser", res.data.token); //Ø­ÙØ¸ Ø§Ù„ØªÙˆÙƒÙ† Ù Ù„ÙˆÙƒÙ„ Ø³ØªÙˆØ±Ø¬
    location.href = "./index.html"; //ÙˆØ¯ÙŠÙ†ÙŠ Ù„ØµÙØ­Ù‡ Ø§Ù„Ø±Ø¦Ø¦Ø¦Ø³ÙŠÙ‡ Ù„Ùˆ Ù…Ø³Ø¬Ù„ Ø¯Ø®ÙˆÙ„
    // console.log(res.data.token);
    loooder.classList.add("d-none"); //Ø§Ø®ÙØ§Ø¡ looder
  } else {
    toastr.error(`${res.message}`); //alert
    loooder.classList.add("d-none"); //Ø§Ø®ÙØ§Ø¡ looder
  }

  // console.log(res);
}

//?=====>  validation   <====

// ! email
function validationEmail(inputEmail) {
  const regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regexStyle.test(inputEmail.value)) {
    inputEmail.classList.add("is-valid");
    inputEmail.classList.remove("is-invalid");
    document.getElementById("alertEmail").classList.add("d-none");
    return true;
  } else {
    inputEmail.classList.add("is-invalid");
    inputEmail.classList.remove("is-valid");
    document.getElementById("alertEmail").classList.remove("d-none");
    return false;
  }
}
// ! password
function validationPassword(inputPassword) {
  const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regexStyle.test(inputPassword.value)) {
    inputPassword.classList.add("is-valid");
    inputPassword.classList.remove("is-invalid");
    document.getElementById("alertPassWord").classList.add("d-none");
    return true;
  } else {
    inputPassword.classList.add("is-invalid");
    inputPassword.classList.remove("is-valid");
    document.getElementById("alertPassWord").classList.remove("d-none");
    return false;
  }
}

