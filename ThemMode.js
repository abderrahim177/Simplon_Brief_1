// export function initDarkMode() {
//   const btn = document.getElementById("dark_mode_toggle");
//   if (!btn) return;

//   // load الحالة من localStorage
//   const savedTheme = localStorage.getItem("theme");

//   if (savedTheme === "dark") {
//     document.documentElement.classList.add("dark");
//     btn.textContent = "☀️ Light";
//   } else {
//     btn.textContent = "🌙 Dark";
//   }

//   // event click
//   btn.addEventListener("click", () => {
//     const isDark = document.documentElement.classList.toggle("dark");

//     if (isDark) {
//       localStorage.setItem("theme", "dark");
//       btn.textContent = "☀️ Light";
//     } else {
//       localStorage.setItem("theme", "light");
//       btn.textContent = "🌙 Dark";
//     }
//   });
// }