// dark mode — with keyboard support + aria attributes (A11Y-005 fix)
document.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.querySelector(".dark-iecon");

  // لو الزرار مش موجود مفيش أي خطأ
  if (!darkBtn) return;

  const icon = darkBtn.querySelector("i");

  // Make the dark toggle keyboard & screen-reader accessible
  darkBtn.setAttribute("role", "button");
  darkBtn.setAttribute("tabindex", "0");
  darkBtn.setAttribute("aria-label", "تبديل الوضع الليلي");

  // ---- استعادة الوضع من LocalStorage ----
  const isSavedDark = localStorage.getItem("darkMode") === "true";

  if (isSavedDark) {
    document.body.classList.add("dark");
    icon.classList.add("fa-sun");
    icon.classList.remove("fa-moon");
    darkBtn.setAttribute("aria-pressed", "true");
  } else {
    document.body.classList.remove("dark");
    icon.classList.add("fa-moon");
    icon.classList.remove("fa-sun");
    darkBtn.setAttribute("aria-pressed", "false");
  }

  // ---- toggle function ----
  function toggleDark() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
      icon.classList.add("fa-sun");
      icon.classList.remove("fa-moon");
    } else {
      icon.classList.add("fa-moon");
      icon.classList.remove("fa-sun");
    }

    darkBtn.setAttribute("aria-pressed", String(isDark));

    // ---- حفظ الوضع ----
    localStorage.setItem("darkMode", isDark);
  }

  // Click support
  darkBtn.addEventListener("click", toggleDark);

  // Keyboard support (Enter & Space)
  darkBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDark();
    }
  });
});
