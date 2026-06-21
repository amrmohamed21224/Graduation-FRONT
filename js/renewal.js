// ?=====>  globel   <====
const loooder = document.getElementById("loooder");

//!=====>  when start   <====

//*=====>  events   <====
// log out
document.getElementById("logOut").addEventListener("click", function () {
  loooder.classList.remove("d-none"); //Ø§Ø¸Ù‡Ø§Ø± looder
  localStorage.removeItem("tokenUser");
  location.href = "./signIn.html";
  loooder.classList.add("d-none"); //Ø§Ø®ÙØ§Ø¡ looder
});
//Ø§Ø¬ÙŠØ¨ Ø§ÙˆÙ„ Ø§Ù„ØµÙØ­Ù‡
window.scrollTo({
  top: 0,
  // behavior: "",
});
//!=====>  function   <====

//?=====>  validation   <====

