document.getElementById("loginBtn").addEventListener("click", function () {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "admin123") {

    // Simpan sesi login + waktu login
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginTime", Date.now());

    window.location.href = "index.html";
  } else {
    document.getElementById("error").classList.remove("hidden");
  }
});
