document.addEventListener("DOMContentLoaded", () => {
  const notiList = document.getElementById("notiList");
  const notiCount = document.getElementById("notiCount");
  const bellBtn = document.querySelector('[data-bs-toggle="dropdown"]');
  const tokenUser = localStorage.getItem("tokenUser");

  // ================== Ù„Ù…Ø§ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… ÙŠÙØªØ­ Ø§Ù„Ø¬Ø±Ø³ ==================
  bellBtn.addEventListener("show.bs.dropdown", async () => {
    const notifications = await getNotifications();
    renderDropdownNotifications(notifications);
    updateUnreadCount(notifications);
  });

  // ================== Ø¬Ù„Ø¨ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ù…Ù† Ø§Ù„Ø³ÙŠØ±ÙØ± ==================
  async function getNotifications() {
    try {
      const res = await fetch(
        "https://graduation-backend-production-d4bd.up.railway.app/api/v1/notifications",
        {
          headers: { Authorization: `Bearer ${tokenUser}` },
        },
      );

      const data = await res.json();

      if (data.success) {
        return data?.data?.notifications || [];
      }

      return [];
    } catch (err) {
      console.error("Failed to fetch notifications", err);
      return [];
    }
  }

  // ================== Ø¹Ø±Ø¶ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø¯Ø§Ø®Ù„ Ø§Ù„Ù€ dropdown ==================
  function renderDropdownNotifications(notifications) {
    notiList.innerHTML = "";

    if (!notifications.length) {
      notiList.innerHTML = `
        <li class="dropdown-item text-center text-muted">
          Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø¥Ø´Ø¹Ø§Ø±Ø§Øª
        </li>`;
      return;
    }

    notifications.forEach((n) => {
      const li = document.createElement("li");

      li.className =
        "dropdown-item border-bottom py-2 " +
        (n.isRead ? "" : "bg-light fw-bold");

      li.style.cursor = "pointer";

      li.innerHTML = `
        <div>${n.title}</div>
        <div class="small text-muted">${n.message}</div>
      `;

      li.addEventListener("click", async () => {
        if (!n.isRead) {
          await markAsRead(n._id);
          n.isRead = true;

          li.classList.remove("bg-light", "fw-bold");
          const current = parseInt(notiCount.textContent || "0", 10) - 1;
          updateBadge(current);
        }
      });

      notiList.appendChild(li);
    });
  }

  // ================== ØªØ¹Ù„ÙŠÙ… Ø§Ù„Ø¥Ø´Ø¹Ø§Ø± ÙƒÙ…Ù‚Ø±ÙˆØ¡ ==================
  async function markAsRead(id) {
    try {
      await fetch(
        `https://graduation-backend-production-d4bd.up.railway.app/api/v1/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${tokenUser}` },
        },
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  }

  // ================== ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø¹Ø¯Ø§Ø¯ ==================
  function updateUnreadCount(notifications) {
    const unread = notifications.filter((n) => !n.isRead).length;
    updateBadge(unread);
  }

  function updateBadge(count) {
    notiCount.textContent = count;

    if (count <= 0) {
      notiCount.classList.add("d-none");
    } else {
      notiCount.classList.remove("d-none");
    }
  }
});

