(function () {
  emailjs.init("z1Af9t04kIYjUY9xc"); //Public Key
})();

const form = document.getElementById("contactForm");
const loader = document.getElementById("loooder");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  //Ø§Ø¬ÙŠØ¨ Ø§ÙˆÙ„ Ø§Ù„ØµÙØ­Ù‡
  window.scrollTo({
    top: 0,
    // behavior: "",
  });
  // âœ… Ø¥Ø¸Ù‡Ø§Ø± Ø§Ù„Ù„ÙˆØ¯Ø±
  loader.classList.remove("d-none");

  // âœ… ØªØ¹Ø·ÙŠÙ„ Ø§Ù„Ø²Ø± Ø¹Ø´Ø§Ù† Ù…ÙŠØªØ¯Ø§Ø³Ø´ ÙƒØ°Ø§ Ù…Ø±Ø©
  const btn = form.querySelector("button");
  btn.disabled = true;
  btn.innerText = "Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„...";

  emailjs
    .sendForm("service_eh4lcrd", "template_s6kxcrr", this)
    .then(function () {
      loader.classList.add("d-none");

      toastr.success("ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø¨Ù†Ø¬Ø§Ø­");

      form.reset();
      btn.disabled = false;
      btn.innerText = "Ø§Ø±Ø³Ø§Ù„";
    })
    .catch(function (error) {
      loader.classList.add("d-none");

      console.log(error);
      toastr.error("Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„");

      btn.disabled = false;
      btn.innerText = "Ø§Ø±Ø³Ø§Ù„";
    });
});

