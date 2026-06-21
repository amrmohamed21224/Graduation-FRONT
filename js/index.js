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
//Ù‡Ù†Ø®ÙÙŠ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ù…Ù† Ø§Ù„Ù†Ø§Ù Ø·ÙˆÙ„ Ù…Ù‡Ùˆ Ù…Ø³Ø¬Ù„
if (localStorage.getItem("tokenUser") != null) {
  document.getElementById("loginNave").classList.add("d-none"); //Ø§Ø®ÙØ§Ø¡ Ø²Ø± ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ù Ø§Ù„Ù†Ø§Ù
  document.getElementById("sideNave").classList.remove("d-none"); //Ø§Ø¸Ù‡Ø§Ø± Ø§Ù„Ø³ÙŠØ¯ Ø¨Ø§Ø± Ù Ø­Ø§Ù„Ù‡ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
  document.getElementById("nodefcation-home").classList.remove("d-none"); //Ø§Ø¸Ù‡Ø§Ø± Ø¬Ø±Ø³ Ø§Ù„Ø§Ø´Ø¹Ø§Ø±Ø§Øª Ù Ø­Ø§Ù„Ù‡ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
  document.querySelector(".startNowHome").classList.add("d-none"); // Ø§Ø®ÙØ§Ø¡ Ø²Ø± Ø§Ø¨Ø¯Ø§ Ø§Ù„Ø§Ù† Ø¹Ù†Ø¯ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
  document.querySelector(".startNowHomeBox").classList.add("d-none"); // Ø§Ø®ÙØ§Ø¡ Ø²Ø± Ø§Ø¨Ø¯Ø§ Ø§Ù„Ø§Ù† Ø¹Ù†Ø¯ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
} else {
  document.getElementById("loginNave").classList.remove("d-none"); //Ø§Ø¸Ù‡Ø§Ø± Ø²Ø± ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ù Ø§Ù„Ù†Ø§Ù
  document.getElementById("sideNave").classList.add("d-none"); //Ø§Ø®ÙØ§Ø¡ Ø§Ù„Ø³ÙŠØ¯ Ø¨Ø§Ø± Ù Ø­Ø§Ù„Ù‡ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
  document.getElementById("nodefcation-home").classList.add("d-none"); //Ø§Ø®ÙØ§Ø¡ Ø¬Ø±Ø³ Ø§Ù„Ø§Ø´Ø¹Ø§Ø±Ø§Øª Ù Ø­Ø§Ù„Ù‡ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
  document.querySelector(".startNowHome").classList.remove("d-none"); // Ø§Ø¸Ù‡Ø§Ø± Ø²Ø± Ø§Ø¨Ø¯Ø§ Ø§Ù„Ø§Ù† Ø¹Ù†Ø¯ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
  document.querySelector(".startNowHomeBox").classList.remove("d-none"); // Ø§Ø¸Ù‡Ø§Ø± Ø²Ø± Ø§Ø¨Ø¯Ø§ Ø§Ù„Ø§Ù† Ø¹Ù†Ø¯ ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„
}
//!=====>  function   <====

//?=====>  validation   <====

