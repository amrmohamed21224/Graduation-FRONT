// ?=====>  globel   <====
const loooder = document.getElementById("loooder");
const NameInut = document.getElementById("nameDos");
const locationDosInput = document.getElementById("locationDos");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const tokenUser = localStorage.getItem("tokenUser");

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

//submit Data
document.getElementById("submitData").addEventListener("click", function (e) {
  e.preventDefault();
  // setForm();
  //* ØªÙ…Ù†Ø¹ Ø§Ø±Ø³Ø§Ù„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù„Ùˆ Ø§Ù„Ø­Ù‚ÙˆÙ„ ÙØ§Ø±ØºÙ‡
  if (
    !NameInut.value ||
    !locationDosInput.value ||
    !startDateInput.value ||
    !endDateInput.value
  ) {
    Swal.fire({
      icon: "error",
      title: "Ø®Ø·Ø§Ø¡ ÙÙŠ Ø­ÙØ¸ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª...",
      text: "Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ØºÙŠØ± Ù…ÙƒØªÙ…Ù„Ù‡",
      timer: 3000,
      showConfirmButton: false,
      buttonsStyling: false,
    });
    return;
  }

  Swal.fire({
    title: "هل انت متأكد؟",
    text: "لحفظ هذه البيانات ....!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم، أضف",
    cancelButtonText: "إلغاء",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const success = await setForm(); // انتظر الAPI الاول
      if (success) {
        Swal.fire({
          title: "تمت الإضافة بنجاح",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          location.href = "./add.html"; // انتقل لقائمة الوثائق
        });
      } else {
        Swal.fire({
          title: "فشل حفظ الوثيقة",
          text: "يرجى المحاولة مرة أخرى",
          icon: "error",
        });
      }
    }
  });
  loooder.classList.remove("d-none"); //اظهار looder
});

//clear Data
document.getElementById("clear").addEventListener("click", function (e) {
  e.preventDefault();
  //* ØªÙ…Ù†Ø¹ Ø­Ø°Ù  Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù„Ùˆ Ø§Ù„Ø­Ù‚ÙˆÙ„ Ù Ø§Ø±ØºÙ‡
  if (
    !NameInut.value &&
    !locationDosInput.value &&
    !startDateInput.value &&
    !endDateInput.value
  ) {
    Swal.fire({
      icon: "error",
      title: "Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ù„Ø­Ø°ÙÙ‡Ø§",
      text: "ÙŠØ¬Ø¨ Ø§Ø¯Ø®Ø§Ù„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§ÙˆÙ„Ø§",
      timer: 3000,
      showConfirmButton: false,
      buttonsStyling: false,
    });
    return;
  }
  Swal.fire({
    title: "Ù‡Ù„ Ø§Ù†ØªØ§ Ù…ØªØ§ÙƒØ¯ !",
    text: "Ù„Ù† ØªØªÙ…ÙƒÙ† Ù…Ù† Ø§Ù„ØªØ±Ø§Ø¬Ø¹ Ø¹Ù† Ù‡Ø°Ø§.....!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ù†Ø¹Ù… , Ø£Ø­Ø°Ù",
    cancelButtonText: "Ø¥Ù„ØºØ§Ø¡",
  }).then((result) => {
    if (result.isConfirmed) {
      clearForm();
      Swal.fire({
        title: "ØªÙ… Ø§Ù„Ø­Ø°Ù!",
        text: "",
        icon: "success",
      });
    }
  });
  // clearForm();
  // console.log("delet");
});
//!=====>  function   <====
//Ø³Ø­Ø¨ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ù† Ø§Ù„Ù ÙˆØ±Ù…
async function setForm() {
  const NewDos = {
    title: NameInut.value,
    documentId: locationDosInput.value,
    issueDate: new Date(startDateInput.value).toISOString(),
    expiryDate: new Date(endDateInput.value).toISOString(),
  };
  return await sendDataBacend(NewDos);
}

//Ø§Ø±Ø³Ø§Ù„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù„Ù„Ø¨Ø§Ùƒ Ø§Ù†Ø¯
async function sendDataBacend(NewDos) {
  try {
    loooder.classList.remove("d-none"); //اظهار looder
    const api = await fetch(
      `https://graduation-backend-production-d4bd.up.railway.app/api/v1/documents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        body: JSON.stringify(NewDos),
      },
    );
    const dat = await api.json();
    loooder.classList.add("d-none"); //اخفاء looder
    return dat.success === true;
  } catch (err) {
    loooder.classList.add("d-none");
    console.error("Error saving document:", err);
    return false;
  }
}

//clearForm
function clearForm() {
  NameInut.value = null;
  locationDosInput.value = null;
  startDateInput.value = null;
  endDateInput.value = null;
}

//?=====>  validation   <====

