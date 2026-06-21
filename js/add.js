// ?=====>  globel   <====
const loooder = document.getElementById("loooder");
const tokenUser = localStorage.getItem("tokenUser");
let allData = document.getElementById("kolo");
let validData = document.getElementById("valid");
let about_to_expireData = document.getElementById("about_to_expire");
let expiredData = document.getElementById("expired");
let searchInput = document.getElementById("searchInput");
let allDocs = [];

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

// ربط حقل البحث بدالة البحث (BUG-016 Fix)
if (searchInput) {
  searchInput.addEventListener("input", searcData);
}

function searcData() {
  // console.log(searchInput.value);
  let term = searchInput.value; // text user
  let cartonaAll = ``;
  for (let i = 0; i < allDocs.length; i++) {
    if (allDocs[i].title.toLowerCase().includes(term.toLowerCase())) {
      if (allDocs[i].status === "valid") {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${allDocs[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${allDocs[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(allDocs[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #10b981;
                                    background-color: #2ef7a6d7;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            Ø³Ø§Ø±ÙŠØ©
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
             <span onclick="upDate('${allDocs[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span onclick="deletItem('${allDocs[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      } else if (allDocs[i].status === "about_to_expire") {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${allDocs[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${allDocs[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(allDocs[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #F2D7A8;
                                    background-color: #F2D7A8;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            Ø¹Ù„Ù‰ ÙˆØ´Ùƒ Ø§Ù„Ø§Ù†ØªÙ‡Ø§Ø¡
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${allDocs[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${allDocs[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      } else {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${allDocs[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${allDocs[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(allDocs[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #FAAFAF;
                                    background-color:#FAAFAF;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
           Ù…Ù†ØªÙ‡ÙŠ Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ©
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${allDocs[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${allDocs[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
  }
  allData.innerHTML = cartonaAll;
  document.getElementById("koloFoter").innerHTML =
    ` Ø¹Ø±Ø¶ ${allDocs.length} Ù…Ù† Ø£ØµÙ„ ${allDocs.length} ÙˆØ«Ø§Ø¦Ù‚`;
}
//!=====>  function   <====
//* Ø¹Ø±Ø¶ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
async function getData() {
  loooder.classList.remove("d-none"); //Ø§Ø¸Ù‡Ø§Ø± looder
  const api = await fetch(
    `https://graduation-backend-production-d4bd.up.railway.app/api/v1/documents`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser}`,
      },
    },
  );
  let dat = await api.json();
  if (dat.success === true) {
    // console.log(dat);
    let data = dat.data.documents;

    allDocs = data;
    // console.log(allDocs);
    // allData
    let cartonaAll = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "valid") {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #10b981;
                                    background-color: #2ef7a6d7;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            Ø³Ø§Ø±ÙŠØ©
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
             <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      } else if (data[i].status === "about_to_expire") {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #F2D7A8;
                                    background-color: #F2D7A8;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            Ø¹Ù„Ù‰ ÙˆØ´Ùƒ Ø§Ù„Ø§Ù†ØªÙ‡Ø§Ø¡
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      } else {
        cartonaAll += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #FAAFAF;
                                    background-color:#FAAFAF;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
           Ù…Ù†ØªÙ‡ÙŠ Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ©
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
    // allData
    allData.innerHTML = cartonaAll;
    document.getElementById("koloFoter").innerHTML =
      ` Ø¹Ø±Ø¶ ${data.length} Ù…Ù† Ø£ØµÙ„ ${data.length} ÙˆØ«Ø§Ø¦Ù‚`;

    // validData
    let cartonaValid = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "valid") {
        cartonaValid += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #10b981;
                                    background-color: #2ef7a6d7;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            Ø³Ø§Ø±ÙŠØ©
          </span>
        </td>
         <td class="py-3">
          <div class="d-flex">
           <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
    // validData
    validData.innerHTML = cartonaValid;
    const validCount = data.filter((doc) => doc.status === "valid").length; //Ø¹Ù„Ø´Ø§Ù† Ø§Ø¬ÙŠØ¨ Ø¹Ø¯Ø¯ Ø§Ù„ÙˆØ«Ø§Ø¦Ù‚ Ø§Ù„Ø³Ø§Ø±ÙŠÙ‡
    document.getElementById("validFoter").innerHTML =
      ` Ø¹Ø±Ø¶ ${validCount} Ù…Ù† Ø£ØµÙ„ ${data.length} ÙˆØ«Ø§Ø¦Ù‚`;

    // about_to_expire
    let cartonaAboutToExpire = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "about_to_expire") {
        cartonaAboutToExpire += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #F2D7A8;
                                    background-color: #F2D7A8;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
            Ø¹Ù„Ù‰ ÙˆØ´Ùƒ Ø§Ù„Ø§Ù†ØªÙ‡Ø§Ø¡
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
            <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
           <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
    // about_to_expire
    about_to_expireData.innerHTML = cartonaAboutToExpire;
    const about_to_expireCount = data.filter(
      (doc) => doc.status === "about_to_expire",
    ).length; //Ø¹Ù„Ø´Ø§Ù† Ø§Ø¬ÙŠØ¨ Ø¹Ø¯Ø¯ Ø§Ù„ÙˆØ«Ø§Ø¦Ù‚ Ù‚Ø±Ø¨Øª ØªÙ†ØªÙ‡ÙŠ
    document.getElementById("about_to_expireFoter").innerHTML =
      ` Ø¹Ø±Ø¶ ${about_to_expireCount} Ù…Ù† Ø£ØµÙ„ ${data.length} ÙˆØ«Ø§Ø¦Ù‚`;

    //expired
    let cartonaExpired = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "expired") {
        cartonaExpired += `
      <tr>
        <th class="py-3" style="font-size: 0.9rem; font-weight: 700">
          <i
            class="fa-solid fa-id-card"
            style="
                                    border: 1px solid #e5e7eb;
                                    color: #1e40af;
                                    background-color: #78a3d9cb;
                                    border-radius: 0.375rem;
                                    padding: 0.375rem;
                                    font-size: 0.625rem;
                                  "
          ></i>
          ${data[i].title}
        </th>
        <td class="py-3" style="font-size: 0.7875rem; color: #64748b">
          ${data[i].documentId}
        </td>
        <td class="py-3" style="font-size: 0.75rem; font-weight: 700">
          ${new Date(data[i].expiryDate).toLocaleDateString()}
        </td>
        
        <td class="py-3" style="font-size: 0.675rem; font-weight: bold">
          <span
            style="
                                    color: #000;
                                    border: 1px solid #FAAFAF;
                                    background-color:#FAAFAF;
                                    padding: 2px 6px;
                                    border-radius: 6px;
                                  "
          >
           Ù…Ù†ØªÙ‡ÙŠ Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ©
          </span>
        </td>
           <td class="py-3">
          <div class="d-flex">
            <span onclick="upDate('${data[i]._id}')" class="btn btn-outline-info" font-size: 14.4px">
              <i class="fa-regular fa-pen-to-square"></i>
            </span>
            <span onclick="deletItem('${data[i]._id}')" class=" me-3 btn btn-outline-danger"  font-size: 14.4px">
             <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </td>
      </tr>
      `;
      }
    }
    //expired
    expiredData.innerHTML = cartonaExpired;
    const expiredCount = data.filter((doc) => doc.status === "expired").length; //Ø¹Ù„Ø´Ø§Ù† Ø§Ø¬ÙŠØ¨ Ø¹Ø¯Ø¯ Ø§Ù„ÙˆØ«Ø§Ø¦Ù‚ Ù‚Ø±Ø¨Øª ØªÙ†ØªÙ‡ÙŠ
    document.getElementById("expiredFooter").innerHTML =
      ` Ø¹Ø±Ø¶ ${expiredCount} Ù…Ù† Ø£ØµÙ„ ${data.length} ÙˆØ«Ø§Ø¦Ù‚`;
  }

  loooder.classList.add("d-none"); //Ø§Ø®Ù Ø§Ø¡ looder
}

//* حذف عنصر — مع تأكيد (MISS-004 Fix)
async function deletItem(id) {
  const confirm = await Swal.fire({
    title: "هل أنت متأكد؟",
    text: "لن تتمكن من استرداد هذه الوثيقة بعد الحذف!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "نعم، احذف",
    cancelButtonText: "إلغاء",
  });

  if (!confirm.isConfirmed) return;

  try {
    loooder.classList.remove("d-none");
    const api = await fetch(
      `https://graduation-backend-production-d4bd.up.railway.app/api/v1/documents/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
      },
    );
    let dat = await api.json();
    if (dat.success) {
      Swal.fire({
        icon: "success",
        title: "تم حذف العنصر بنجاح",
        text: "",
        timer: 2000,
        showConfirmButton: false,
      });
      getData();
    } else {
      Swal.fire("فشل الحذف", dat.message || "", "error");
    }
  } catch (err) {
    console.error("Delete error:", err);
    Swal.fire("حصل خطأ في الاتصال", "", "error");
  } finally {
    loooder.classList.add("d-none");
  }
}
//* ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„Ø¹Ù†ØµØ±

async function upDate(id) {
  // 1) Ù†Ø¬ÙŠØ¨ Ø§Ù„Ø¹Ù†ØµØ± Ø§Ù„Ø­Ø§Ù„ÙŠ Ù…Ù† Ø§Ù„Ø¯Ø§ØªØ§
  const item = allDocs.find((doc) => doc._id === id);
  if (!item) return; // Ù„Ùˆ Ù…Ø´ Ù…ÙˆØ¬ÙˆØ¯ Ù†Ø®Ø±Ø¬

  // 2) Ù†ÙØªØ­ Ù†Ø§ÙØ°Ø© ØªØ¹Ø¯ÙŠÙ„
  const { value } = await Swal.fire({
    title: "ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„ÙˆØ«ÙŠÙ‚Ø©",

    // ÙÙˆØ±Ù… Ø¨Ø³ÙŠØ· ÙÙŠÙ‡ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø©
    html: `
      <input id="title" class="swal2-input" value="${item.title}">
      <input id="docId" class="swal2-input" value="${item.documentId}">
      <input id="expiry" type="date" class="swal2-input" value="${item.expiryDate?.split("T")[0] || ""}">
    `,

    showCancelButton: true,
    confirmButtonText: "ØªØ­Ø¯ÙŠØ«",
    cancelButtonText: "Ø¥Ù„ØºØ§Ø¡",

    // 3) Ù†ØªØ£ÙƒØ¯ Ø¥Ù† ÙƒÙ„ Ø­Ø§Ø¬Ø© Ù…ØªØ¹Ø¨ÙŠØ©
    preConfirm: () => {
      const title = document.getElementById("title").value.trim();
      const documentId = document.getElementById("docId").value.trim();
      const expiryDate = document.getElementById("expiry").value;

      if (!title || !documentId || !expiryDate) {
        Swal.showValidationMessage("ÙƒÙ„ Ø§Ù„Ø­Ù‚ÙˆÙ„ Ù…Ø·Ù„ÙˆØ¨Ø©");
        return false;
      }

      return { title, documentId, expiryDate };
    },
  });

  // Ù„Ùˆ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ù„ØºÙ‰
  if (!value) return;

  try {
    // 4) Ù†Ø¸Ù‡Ø± Ø§Ù„Ù„ÙˆØ¯Ø±
    loooder.classList.remove("d-none");

    // 5) Ù†Ø¨Ø¹Øª Ø§Ù„ØªØ¹Ø¯ÙŠÙ„ Ù„Ù„Ø³ÙŠØ±ÙØ±
    const res = await fetch(
      `https://graduation-backend-production-d4bd.up.railway.app/api/v1/documents/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        body: JSON.stringify({
          title: value.title,
          documentId: value.documentId,
          expiryDate: new Date(value.expiryDate).toISOString(),
        }),
      },
    );

    const data = await res.json();

    // 6) Ù†Ø¹Ø±Ø¶ Ø§Ù„Ù†ØªÙŠØ¬Ø©
    if (data.success) {
      Swal.fire("ØªÙ… Ø§Ù„ØªØ­Ø¯ÙŠØ« Ø¨Ù†Ø¬Ø§Ø­", "", "success");
      getData(); // ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
    } else {
      Swal.fire("ÙØ´Ù„ Ø§Ù„ØªØ­Ø¯ÙŠØ«", "", "error");
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Ø­ØµÙ„ Ø®Ø·Ø£", "", "error");
  } finally {
    // 7) Ù†Ø®ÙÙ‘ÙŠ Ø§Ù„Ù„ÙˆØ¯Ø±
    loooder.classList.add("d-none");
  }
}
//?=====>  validation   <====

//!=====>  call Function   <====
getData(); //Ø§Ø¸Ù‡Ø§Ø± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª

// ================== Ø¬Ù„Ø¨ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ù…Ù† Ø§Ù„Ø³ÙŠØ±ÙØ± ==================
async function getNotifications() {
  try {
    // Ø·Ù„Ø¨ Ø¬Ù„Ø¨ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ù…Ù† Ø§Ù„Ù€ API
    const res = await fetch(
      `https://graduation-backend-production-d4bd.up.railway.app/api/v1/notifications?t=${Date.now()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenUser}`, // Ø§Ù„ØªÙˆÙƒÙ† Ù„ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…
          "Cache-Control": "no-cache", // Ù…Ù†Ø¹ Ø§Ù„ÙƒØ§Ø´
          Pragma: "no-cache",
        },
        cache: "no-store", // Ø¥Ø¬Ø¨Ø§Ø± ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
      },
    );

    // ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ø±Ø¯ Ø¥Ù„Ù‰ JSON
    const dat = await res.json();

    // Ù„Ùˆ Ø§Ù„Ø·Ù„Ø¨ Ù†Ø§Ø¬Ø­
    if (dat.success) {
      const notifications = dat?.data?.notifications || [];

      // ÙÙ„ØªØ±Ø© Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª ØºÙŠØ± Ø§Ù„Ù…Ù‚Ø±ÙˆØ¡Ø© ÙÙ‚Ø·
      const unread = notifications.filter((n) => !n.read);

      // Ø¥Ø±Ø³Ø§Ù„Ù‡Ø§ Ù„Ù„Ø¹Ø±Ø¶
      renderNotifications(unread);
    }
  } catch (err) {
    // ÙÙŠ Ø­Ø§Ù„Ø© Ø­Ø¯ÙˆØ« Ø®Ø·Ø£
    console.error("Error loading notifications:", err);
  }
}

// ================== Ø¹Ø±Ø¶ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª ÙÙŠ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© ==================
function renderNotifications(notifications) {
  const list = document.getElementById("notiList"); // Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª
  const count = document.getElementById("notiCount"); // Ø§Ù„Ø¹Ø¯Ø§Ø¯

  // ØªÙØ±ÙŠØº Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ù‚Ø¨Ù„ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ø±Ø³Ù…
  list.innerHTML = "";

  // Ù„Ùˆ Ù…ÙÙŠØ´ Ø¥Ø´Ø¹Ø§Ø±Ø§Øª
  if (notifications.length === 0) {
    list.innerHTML = `
      <li class="dropdown-item text-center text-muted">
        Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¥Ø´Ø¹Ø§Ø±Ø§Øª
      </li>
    `;

    // ØªØµÙÙŠØ± Ø§Ù„Ø¹Ø¯Ø§Ø¯
    count.textContent = 0;
    return;
  }

  // Ø¹Ø±Ø¶ ÙƒÙ„ Ø¥Ø´Ø¹Ø§Ø±
  notifications.forEach((n) => {
    list.innerHTML += `
      <li class="dropdown-item" style="cursor:pointer"
          onclick="markAsRead('${n._id}')">

        <!-- Ù†Øµ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø± -->
        ${n.message}

      </li>
    `;
  });

  // ØªØ­Ø¯ÙŠØ« Ø¹Ø¯Ø¯ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª ØºÙŠØ± Ø§Ù„Ù…Ù‚Ø±ÙˆØ¡Ø©
  count.textContent = notifications.length;
}

// ================== ØªØ¹Ù„ÙŠÙ… Ø§Ù„Ø¥Ø´Ø¹Ø§Ø± ÙƒÙ…Ù‚Ø±ÙˆØ¡ ==================
async function markAsRead(id) {
  try {
    // Ø¥Ø±Ø³Ø§Ù„ Ø·Ù„Ø¨ Ù„ØªØºÙŠÙŠØ± Ø­Ø§Ù„Ø© Ø§Ù„Ø¥Ø´Ø¹Ø§Ø± Ø¥Ù„Ù‰ Ù…Ù‚Ø±ÙˆØ¡
    await fetch(
      `https://graduation-backend-production-d4bd.up.railway.app/api/v1/notifications/${id}/read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${tokenUser}`, // Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…
        },
      },
    );

    // Ø¥Ø¹Ø§Ø¯Ø© ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø¨Ø¹Ø¯ Ø§Ù„ØªØ­Ø¯ÙŠØ«
    getNotifications();
  } catch (err) {
    // ÙÙŠ Ø­Ø§Ù„Ø© Ø®Ø·Ø£
    console.error("Error marking as read:", err);
  }
}

// ================== ØªØ´ØºÙŠÙ„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø¹Ù†Ø¯ ÙØªØ­ Ø§Ù„ØµÙØ­Ø© ==================
// Ø£ÙˆÙ„ Ù…Ø§ Ø§Ù„ØµÙØ­Ø© ØªÙØªØ­ Ù†Ø¬ÙŠØ¨ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª
getNotifications();

