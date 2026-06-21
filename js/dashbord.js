// ?=====>  globel   <====
const loooder = document.getElementById("loooder");
const tokenUser = localStorage.getItem("tokenUser");
let searchInput = document.getElementById("searchInput");
let allDocs = [];

getDataMe();
//!=====>  when start   <====

//*=====>  events   <====
// log out
document.getElementById("logOut").addEventListener("click", function () {
  loooder.classList.remove("d-none"); //Ã˜Â§Ã˜Â¸Ã™â€¡Ã˜Â§Ã˜Â± looder
  localStorage.removeItem("tokenUser");
  location.href = "./signIn.html";
  loooder.classList.add("d-none"); //Ã˜Â§Ã˜Â®Ã™ Ã˜Â§Ã˜Â¡ looder
});
//Ã˜Â§Ã˜Â¬Ã™Å Ã˜Â¨ Ã˜Â§Ã™Ë†Ã™â€ž Ã˜Â§Ã™â€žÃ˜ÂµÃ™ Ã˜Â­Ã™â€¡
window.scrollTo({
  top: 0,
  // behavior: "",
});

// Ø±Ø¨Ø· Ø­Ù‚Ù„ Ø§Ù„Ø¨Ø­Ø« Ø¨Ø¯Ø§Ù„Ø© Ø§Ù„Ø¨Ø­Ø« (BUG-017 Fix)
if (searchInput) {
  searchInput.addEventListener("input", searcData);
}
//!=====>  function   <====
//* Ã˜Â¹Ã˜Â±Ã˜Â¶ Ã˜Â§Ã™â€žÃ˜Â¨Ã™Å Ã˜Â§Ã™â€ Ã˜Â§Ã˜Âª
async function getDataDashbord() {
  loooder.classList.remove("d-none"); //Ã˜Â§Ã˜Â¸Ã™â€¡Ã˜Â§Ã˜Â± looder
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
    console.log(dat);
    let data = dat.data.documents;
    allDocs = data;
    // allData
    let cartonaAll = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "valid") {
        cartonaAll += `
        <!-- Card -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card green national">
                        <div class="card-header">
                          <div class="icon-box icon-green">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-green">Ã˜Â³Ã˜Â§Ã˜Â±Ã™Å Ã˜Â©</span>
                        </div>
  
                        <div class="title">  ${data[i].title}</div>
  
                        <div class="subtitle">${data[i].documentId}</div>
  
                        <div class="card-footer">
  
                          <div class="expire">
                            Ã˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
                            <strong>${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      } else if (data[i].status === "about_to_expire") {
        cartonaAll += `
         <!-- Card 2 -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow license">
                        <div class="card-header">
                          <div class="icon-box icon-yellow">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-yellow">Ã™â€šÃ˜Â±Ã™Å Ã˜Â¨ Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡</span>
                        </div>
  
                        <div class="title">  ${data[i].title}</div>
  
                        <div class="subtitle">  ${data[i].documentId}</div>
  
                        <div class="card-footer">
  
                          <div class="expire">
                            Ã˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
                            <strong>${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      } else {
        cartonaAll += `
         <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow denger">
                        <div class="card-header">
                          <div class="icon-box icon-denger">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-denger"> Ã™â€¦Ã™â€ Ã˜ÂªÃ™â€¡Ã™Å Ã™â€¡</span>
                        </div>
  
                        <div class="title"> ${data[i].title}</div>
  
                        <div class="subtitle">${data[i].documentId}</div>
  
                        <div class="card-footer">
  
                          <div class="expire">
                            Ã˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
                            <strong> ${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    // allData
    document.getElementById("allData").innerHTML = cartonaAll;

    //valid
    let cartonaValid = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "valid") {
        cartonaValid += `
        <!-- Card -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card green national">
                        <div class="card-header">
                          <div class="icon-box icon-green">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-green">Ã˜Â³Ã˜Â§Ã˜Â±Ã™Å Ã˜Â©</span>
                        </div>
  
                        <div class="title">  ${data[i].title}</div>
  
                        <div class="subtitle">${data[i].documentId}</div>
  
                        <div class="card-footer">
  
                          <div class="expire">
                            Ã˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
                            <strong>${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    document.getElementById("validData").innerHTML = cartonaValid;
    //about-about_to_expire
    let cartonaAbout_to_expire = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "about_to_expire") {
        cartonaAbout_to_expire += `
         <!-- Card 2 -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow license">
                        <div class="card-header">
                          <div class="icon-box icon-yellow">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-yellow">Ã™â€šÃ˜Â±Ã™Å Ã˜Â¨ Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡</span>
                        </div>
  
                        <div class="title">  ${data[i].title}</div>
  
                        <div class="subtitle">  ${data[i].documentId}</div>
  
                        <div class="card-footer">
  
                          <div class="expire">
                            Ã˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
                            <strong>${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    document.getElementById("about_to_expireData").innerHTML =
      cartonaAbout_to_expire;

    //expireData
    let cartonaExpire = ``;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "expired") {
        cartonaExpire += `
         <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow denger">
                        <div class="card-header">
                          <div class="icon-box icon-denger">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-denger"> Ã™â€¦Ã™â€ Ã˜ÂªÃ™â€¡Ã™Å Ã™â€¡</span>
                        </div>
  
                        <div class="title"> ${data[i].title}</div>
  
                        <div class="subtitle">${data[i].documentId}</div>
  
                        <div class="card-footer">
  
                          <div class="expire">
                            Ã˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
                            <strong> ${new Date(data[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    document.getElementById("expireData").innerHTML = cartonaExpire;
    changeRogres(data);
  }
  loooder.classList.add("d-none"); //Ã˜Â§Ã˜Â®Ã™ÂÃ˜Â§Ã˜Â¡ looder
}

function changeRogres(data) {
  const validCount = data.filter((doc) => doc.status === "valid").length; //Ã˜Â¹Ã™â€žÃ˜Â´Ã˜Â§Ã™â€  Ã˜Â§Ã˜Â¬Ã™Å Ã˜Â¨ Ã˜Â¹Ã˜Â¯Ã˜Â¯ Ã˜Â§Ã™â€žÃ™Ë†Ã˜Â«Ã˜Â§Ã˜Â¦Ã™â€š Ã˜Â§Ã™â€žÃ˜Â³Ã˜Â§Ã˜Â±Ã™Å Ã™â€¡
  const aboutCount = data.filter(
    (doc) => doc.status === "about_to_expire",
  ).length; //Ã˜Â¹Ã™â€žÃ˜Â´Ã˜Â§Ã™â€  Ã˜Â§Ã˜Â¬Ã™Å Ã˜Â¨ Ã˜Â¹Ã˜Â¯Ã˜Â¯ Ã˜Â§Ã™â€žÃ™Ë†Ã˜Â«Ã˜Â§Ã˜Â¦Ã™â€š Ã™â€šÃ˜Â§Ã˜Â±Ã˜Â¨Ã˜Âª Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
  const expiredCount = data.filter((doc) => doc.status === "expired").length; //Ã˜Â¹Ã™â€žÃ˜Â´Ã˜Â§Ã™â€  Ã˜Â§Ã˜Â¬Ã™Å Ã˜Â¨ Ã˜Â¹Ã˜Â¯Ã˜Â¯ Ã˜Â§Ã™â€žÃ™Ë†Ã˜Â«Ã˜Â§Ã˜Â¦Ã™â€š Ã™â€¦Ã™â€ Ã˜ÂªÃ™â€¡Ã™Å Ã™â€¡
  const allData = data.length;
  document.querySelector(".gree").style.width =
    `${(validCount / allData) * 100}%`;
  document.querySelector(".percent-green").innerHTML = `${validCount}`;
  document.querySelector(".ye").style.width =
    `${(aboutCount / allData) * 100}%`;
  document.querySelector(".percent-ye").innerHTML = `${aboutCount}`;
  document.querySelector(".re").style.width =
    `${(expiredCount / allData) * 100}%`;
  document.querySelector(".percent-red").innerHTML = `${expiredCount}`;
}
async function getDataMe() {
  loooder.classList.remove("d-none"); //Ã˜Â§Ã˜Â¸Ã™â€¡Ã˜Â§Ã˜Â± looder
  const api = await fetch(
    `https://graduation-backend-production-d4bd.up.railway.app/api/v1/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser}`,
      },
    },
  );
  let dat = await api.json();
  //   console.log(dat.data.user);
  const data = dat.data.user.name;
  document.getElementById("name").innerHTML = `Ã™â€¦Ã˜Â±Ã˜Â­Ã˜Â¨Ã˜Â§Ã™â€¹ ${data} Ã°Å¸â€˜â€¹ `;
}
function searcData() {
  // console.log(searchInput.value);
  let term = searchInput.value; // text user
  let cartonaAll = ``;
  for (let i = 0; i < allDocs.length; i++) {
    if (allDocs[i].title.toLowerCase().includes(term.toLowerCase())) {
      if (allDocs[i].status === "valid") {
        cartonaAll += `
        <!-- Card -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card green national">
                        <div class="card-header">
                          <div class="icon-box icon-green">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-green">Ã˜Â³Ã˜Â§Ã˜Â±Ã™Å Ã˜Â©</span>
                        </div>
  
                        <div class="title">  ${allDocs[i].title}</div>
  
                        <div class="subtitle">${allDocs[i].documentId}</div>
  
                        <div class="card-footer">
  
                          <div class="expire">
                            Ã˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
                            <strong>${new Date(allDocs[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      } else if (allDocs[i].status === "about_to_expire") {
        cartonaAll += `
         <!-- Card 2 -->
                    <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow license">
                        <div class="card-header">
                          <div class="icon-box icon-yellow">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-yellow">Ã™â€šÃ˜Â±Ã™Å Ã˜Â¨ Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡</span>
                        </div>
  
                        <div class="title">  ${allDocs[i].title}</div>
  
                        <div class="subtitle">  ${allDocs[i].documentId}</div>
  
                        <div class="card-footer">
  
                          <div class="expire">
                            Ã˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
                            <strong>${new Date(allDocs[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      } else {
        cartonaAll += `
         <div class="col-12 col-md-6 col-lg-4">
                      <div class="doc-card yellow denger">
                        <div class="card-header">
                          <div class="icon-box icon-denger">
                            <i class="fa-solid fa-id-card"></i>
                          </div>
  
                          <span class="status status-denger"> Ã™â€¦Ã™â€ Ã˜ÂªÃ™â€¡Ã™Å Ã™â€¡</span>
                        </div>
  
                        <div class="title"> ${allDocs[i].title}</div>
  
                        <div class="subtitle">${allDocs[i].documentId}</div>
  
                        <div class="card-footer">
  
                          <div class="expire">
                            Ã˜ÂªÃ˜Â§Ã˜Â±Ã™Å Ã˜Â® Ã˜Â§Ã™â€žÃ˜Â§Ã™â€ Ã˜ÂªÃ™â€¡Ã˜Â§Ã˜Â¡
                            <strong> ${new Date(allDocs[i].expiryDate).toLocaleDateString()}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
        `;
      }
    }
    // allData
  }
  document.getElementById("allData").innerHTML = cartonaAll;
}
//?=====>  validation   <====
//*=====>  call Function   <====
getDataDashbord();
// ================== Ã˜ÂªÃ˜Â´Ã˜ÂºÃ™Å Ã™â€ž Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª Ã˜Â¹Ã™â€ Ã˜Â¯ Ã™ÂÃ˜ÂªÃ˜Â­ Ã˜Â§Ã™â€žÃ˜ÂµÃ™ÂÃ˜Â­Ã˜Â© ==================
// Ã˜Â£Ã™Ë†Ã™â€ž Ã™â€¦Ã˜Â§ Ã˜Â§Ã™â€žÃ˜ÂµÃ™ÂÃ˜Â­Ã˜Â© Ã˜ÂªÃ™ÂÃ˜ÂªÃ˜Â­ Ã™â€ Ã˜Â¬Ã™Å Ã˜Â¨ Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª
getNotifications();

// ================== Ã˜Â¬Ã™â€žÃ˜Â¨ Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª Ã™â€¦Ã™â€  Ã˜Â§Ã™â€žÃ˜Â³Ã™Å Ã˜Â±Ã™ÂÃ˜Â± ==================
async function getNotifications() {
  try {
    // Ã˜Â·Ã™â€žÃ˜Â¨ API Ã™â€žÃ˜Â¬Ã™â€žÃ˜Â¨ Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª Ã˜ÂºÃ™Å Ã˜Â± Ã˜Â§Ã™â€žÃ™â€¦Ã™â€šÃ˜Â±Ã™Ë†Ã˜Â¡Ã˜Â©
    const res = await fetch(
      "https://graduation-backend-production-d4bd.up.railway.app/api/v1/notifications",
      {
        method: "GET",

        headers: {
          // Ã˜Â¥Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€ž Ã˜Â§Ã™â€žÃ˜ÂªÃ™Ë†Ã™Æ’Ã™â€  Ã˜Â¹Ã˜Â´Ã˜Â§Ã™â€  Ã˜Â§Ã™â€žÃ˜Â³Ã™Å Ã˜Â±Ã™ÂÃ˜Â± Ã™Å Ã˜Â¹Ã˜Â±Ã™Â Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã™â€¦
          Authorization: `Bearer ${tokenUser}`,

          // Ã™â€¦Ã™â€ Ã˜Â¹ Ã˜Â§Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã˜Â§Ã™â€¦ Ã˜Â§Ã™â€žÃ™Æ’Ã˜Â§Ã˜Â´ (Ã˜Â¹Ã˜Â´Ã˜Â§Ã™â€  Ã™Å Ã˜Â¬Ã™Å Ã˜Â¨ Ã˜Â£Ã˜Â­Ã˜Â¯Ã˜Â« Ã˜Â¨Ã™Å Ã˜Â§Ã™â€ Ã˜Â§Ã˜Âª)
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },

        // Ã˜Â¥Ã˜Â¬Ã˜Â¨Ã˜Â§Ã˜Â± Ã˜Â§Ã™â€žÃ™â€¦Ã˜ÂªÃ˜ÂµÃ™ÂÃ˜Â­ Ã˜Â¥Ã™â€ Ã™â€¡ Ã™â€¦Ã˜Â§ Ã™Å Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã™â€¦Ã˜Â´ Ã˜Â¨Ã™Å Ã˜Â§Ã™â€ Ã˜Â§Ã˜Âª Ã™â€šÃ˜Â¯Ã™Å Ã™â€¦Ã˜Â©
        cache: "no-store",
      },
    );

    // Ã˜ÂªÃ˜Â­Ã™Ë†Ã™Å Ã™â€ž Ã˜Â§Ã™â€žÃ˜Â±Ã˜Â¯ Ã˜Â¥Ã™â€žÃ™â€° JSON
    const dat = await res.json();

    // Ã˜Â·Ã˜Â¨Ã˜Â§Ã˜Â¹Ã˜Â© Ã˜Â§Ã™â€žÃ™â€ Ã˜ÂªÃ™Å Ã˜Â¬Ã˜Â© Ã™ÂÃ™Å  Ã˜Â§Ã™â€žÃ™Æ’Ã™Ë†Ã™â€ Ã˜Â³Ã™Ë†Ã™â€ž Ã™â€žÃ™â€žÃ˜ÂªÃ˜Â¬Ã˜Â±Ã˜Â¨Ã˜Â©
    console.log("Notifications:", dat);

    // Ã™â€žÃ™Ë† Ã˜Â§Ã™â€žÃ˜Â¹Ã™â€¦Ã™â€žÃ™Å Ã˜Â© Ã™â€ Ã˜Â§Ã˜Â¬Ã˜Â­Ã˜Â©
    if (dat.success) {
      // Ã˜Â¥Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€ž Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª Ã™â€žÃ˜Â¯Ã˜Â§Ã™â€žÃ˜Â© Ã˜Â§Ã™â€žÃ˜Â¹Ã˜Â±Ã˜Â¶
      renderNotifications(dat?.data?.notifications || []);
    }
  } catch (err) {
    // Ã™ÂÃ™Å  Ã˜Â­Ã˜Â§Ã™â€žÃ˜Â© Ã™Ë†Ã˜Â¬Ã™Ë†Ã˜Â¯ Ã˜Â®Ã˜Â·Ã˜Â£ Ã™ÂÃ™Å  Ã˜Â§Ã™â€žÃ˜Â§Ã˜ÂªÃ˜ÂµÃ˜Â§Ã™â€ž
    console.error("Error:", err);
  }
}

// ================== Ã˜Â¹Ã˜Â±Ã˜Â¶ Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª Ã™ÂÃ™Å  Ã˜Â§Ã™â€žÃ˜ÂµÃ™ÂÃ˜Â­Ã˜Â© ==================
function renderNotifications(notifications) {
  // Ã˜Â¹Ã™â€ Ã˜ÂµÃ˜Â± Ã˜Â§Ã™â€žÃ™â€šÃ˜Â§Ã˜Â¦Ã™â€¦Ã˜Â© Ã™ÂÃ™Å  HTML
  const list = document.getElementById("notiList");

  // Ã˜Â¹Ã™â€ Ã˜ÂµÃ˜Â± Ã˜Â§Ã™â€žÃ˜Â¹Ã˜Â¯Ã˜Â§Ã˜Â¯ Ã™ÂÃ™Ë†Ã™â€š Ã˜Â§Ã™â€žÃ˜Â¬Ã˜Â±Ã˜Â³
  const count = document.getElementById("notiCount");

  // Ã˜ÂªÃ™ÂÃ˜Â±Ã™Å Ã˜Âº Ã˜Â§Ã™â€žÃ™â€šÃ˜Â§Ã˜Â¦Ã™â€¦Ã˜Â© Ã™â€šÃ˜Â¨Ã™â€ž Ã˜Â¥Ã˜Â¹Ã˜Â§Ã˜Â¯Ã˜Â© Ã˜Â§Ã™â€žÃ˜Â±Ã˜Â³Ã™â€¦
  list.innerHTML = "";

  // Ã™â€žÃ™Ë† Ã™â€¦Ã™ÂÃ™Å Ã˜Â´ Ã˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª
  if (notifications.length === 0) {
    list.innerHTML = `
      <li class="dropdown-item text-center text-muted">
        Ã™â€žÃ˜Â§ Ã™Å Ã™Ë†Ã˜Â¬Ã˜Â¯ Ã˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª
      </li>
    `;

    // Ã˜ÂªÃ˜ÂµÃ™ÂÃ™Å Ã˜Â± Ã˜Â§Ã™â€žÃ˜Â¹Ã˜Â¯Ã˜Â§Ã˜Â¯
    count.textContent = 0;

    return;
  }

  // ================== Ã˜Â¹Ã˜Â±Ã˜Â¶ Ã™Æ’Ã™â€ž Ã˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â± ==================
  for (let i = 0; i < notifications.length; i++) {
    const n = notifications[i];

    // Ã˜Â¥Ã˜Â¶Ã˜Â§Ã™ÂÃ˜Â© Ã™Æ’Ã™â€ž Ã˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â± Ã™ÂÃ™Å  Ã˜Â§Ã™â€žÃ™â€šÃ˜Â§Ã˜Â¦Ã™â€¦Ã˜Â©
    list.innerHTML += `
      <li class="dropdown-item" style="cursor:pointer"
          onclick="markAsRead('${n._id}')">

        <!-- Ã™â€ Ã˜Âµ Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â± -->
        ${n.message}

      </li>
    `;
  }

  // Ã˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â« Ã˜Â¹Ã˜Â¯Ã˜Â¯ Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª
  count.textContent = notifications.length;
}

// ================== Ã˜ÂªÃ˜Â¹Ã™â€žÃ™Å Ã™â€¦ Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â± Ã™Æ’Ã™â€¦Ã™â€šÃ˜Â±Ã™Ë†Ã˜Â¡ ==================
async function markAsRead(id) {
  try {
    // Ã˜Â¥Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€ž Ã˜Â·Ã™â€žÃ˜Â¨ Ã™â€žÃ™â€žÃ˜Â³Ã™Å Ã˜Â±Ã™ÂÃ˜Â± Ã™â€žÃ˜ÂªÃ˜ÂºÃ™Å Ã™Å Ã˜Â± Ã˜Â­Ã˜Â§Ã™â€žÃ˜Â© Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â± Ã˜Â¥Ã™â€žÃ™â€° "Ã™â€¦Ã™â€šÃ˜Â±Ã™Ë†Ã˜Â¡"
    await fetch(
      `https://graduation-backend-production-d4bd.up.railway.app/api/v1/notifications/${id}/read`,
      {
        method: "PATCH",

        headers: {
          // Ã˜Â§Ã™â€žÃ˜ÂªÃ™Ë†Ã™Æ’Ã™â€  Ã™â€žÃ™â€žÃ˜ÂªÃ˜Â£Ã™Æ’Ã˜Â¯ Ã™â€¦Ã™â€  Ã˜Â§Ã™â€žÃ™â€¦Ã˜Â³Ã˜ÂªÃ˜Â®Ã˜Â¯Ã™â€¦
          Authorization: `Bearer ${tokenUser}`,
        },
      },
    );

    // Ã˜Â¥Ã˜Â¹Ã˜Â§Ã˜Â¯Ã˜Â© Ã˜ÂªÃ˜Â­Ã™â€¦Ã™Å Ã™â€ž Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â´Ã˜Â¹Ã˜Â§Ã˜Â±Ã˜Â§Ã˜Âª Ã˜Â¨Ã˜Â¹Ã˜Â¯ Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â­Ã˜Â¯Ã™Å Ã˜Â«
    getNotifications();
  } catch (err) {
    console.error(err);
  }
}




