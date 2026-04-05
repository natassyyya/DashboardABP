$(document).ready(function () {
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "index.html";
    return;
  }

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const username = $("#username").val().trim();
    const password = $("#password").val().trim();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminUsername", username);

      $("#loginAlert").html(`
        <div class="alert alert-success">Login berhasil. Mengarahkan ke dashboard...</div>
      `);

      setTimeout(() => {
        window.location.href = "index.html";
      }, 800);
    } else {
      $("#loginAlert").html(`
        <div class="alert alert-danger">Username atau password salah.</div>
      `);
    }
  });
});