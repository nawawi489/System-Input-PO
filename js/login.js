document.getElementById("loginBtn").addEventListener("click", async function () {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  try {
    // Ambil user/pass dari API Vercel (aman, tidak bisa dibaca publik)
    const res = await fetch("/api/auth");
    const auth = await res.json();

    if (user === auth.user && pass === auth.pass) {
      // Sesi login 12 jam
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loginTime", Date.now());

      window.location.href = "index.html";
    } else {
      document.getElementById("error").classList.remove("hidden");
    }

  } catch (err) {
    console.error("Auth Error:", err);
    alert("Terjadi kesalahan pada login. Hubungi administrator.");
  }
});
