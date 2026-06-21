//* ================> ØµÙØ­Ù‡ Ø§Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨  <===================

// ?=====>  globel   <====
const inputs = document.querySelectorAll("input");
const btnRegister = document.getElementById("btnRegister");
const formData = document.querySelector("form");
let isValid = false; //ØªØ§ÙƒØ¯ Ø§Ù† ÙƒÙ„ Ø§Ù„Ø¯Ø§ØªØ§ ØµØ­ÙŠØ­Ù‡
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
  if (
    validationName(inputs[0]) &&
    validationEmail(inputs[1]) &&
    validationPassword(inputs[2])
  ) {
    isValid = true; //Ø§Ù„Ø¯Ø§ØªØ§ Ù…ÙƒØªÙˆØ¨Ù‡ ØµØ­
  } else {
    isValid = false; // Ø§Ù„Ø¯Ø§ØªØ§ ÙÙŠÙ‡Ø§ ØºÙ„Ø·
  }
});

// //  !    Name
// inputs[0].addEventListener("blur", function () {
//   validationName(inputs[0]);
// });
// //  !    email
// inputs[1].addEventListener("blur", function () {
//   validationEmail(inputs[1]);
// });
// //  !    password
// inputs[2].addEventListener("blur", function () {
//   validationPassword(inputs[2]);
// });

//Ø§Ø¬ÙŠØ¨ Ø§ÙˆÙ„ Ø§Ù„ØµÙØ­Ù‡
window.scrollTo({
  top: 0,
  // behavior: "",
});

// shoo Password Register
const toggleRegisterPassword = document.getElementById(
  "toggleRegisterPassword",
);
const registerPassword = document.getElementById("registerPassword");

toggleRegisterPassword?.addEventListener("click", () => {
  const type = registerPassword.type === "password" ? "text" : "password";
  registerPassword.type = type;

  toggleRegisterPassword.classList.toggle("fa-eye");
  toggleRegisterPassword.classList.toggle("fa-eye-slash");
});

//!=====>  function   <====
// Ù‡Ø¹Ù…Ù„ ÙÙ†ÙƒØ´Ù† ØªØµÙ†Ø¹ ÙÙˆØ±Ù…
function setForm() {
  const user = {
    name: inputs[0].value,
    email: inputs[1].value,
    password: inputs[2].value,
  };
  // console.log(user);
  registerForm(user);
  // user=userData
}
//callapi
async function registerForm(userData) {
  loooder.classList.remove("d-none"); //Ø§Ø¸Ù‡Ø§Ø± looder

  const api = await fetch(
    `https://graduation-backend-production-d4bd.up.railway.app/api/v1/auth/register`,
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
  loooder.classList.add("d-none"); //Ø§Ø®ÙØ§Ø¡ looder

  toastr.options = {
    positionClass: "toast-right-center",
    timeOut: 5000,
    closeButton: true,
    progressBar: true,
  };
  if (res.success === true) {
    // loooder.classList.remove("d-none"); //Ø§Ø¸Ù‡Ø§Ø± looder

    toastr.success("ØªÙ… Ø§Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨ Ø¨Ù†Ø¬Ø§Ø­"); //alert
    location.href = "./signIn.html"; //ÙˆØ¯ÙŠÙ†ÙŠ Ù„ØµÙØ­Ù‡ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ù„Ùˆ Ø§Ù„Ø¯Ø§ØªØ§ Ø¨ØªØ§Ø¹ØªÙŠ ØµØ­
    loooder.classList.add("d-none"); //Ø§Ø®ÙØ§Ø¡ looder
  } else {
    toastr.error(res.message); //alert
    // loooder.classList.add("d-none"); //Ø§Ø®ÙØ§Ø¡ looder
  }

  // console.log(res);
}

//?=====>  validation   <====

// ! Namme
function validationName(inputName) {
  const regexStyle =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  if (regexStyle.test(inputName.value)) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    document.getElementById("alertName").classList.add("d-none");
    return true;
  } else {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
    document.getElementById("alertName").classList.remove("d-none");
    return false;
  }
}
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

