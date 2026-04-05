$(document).ready(function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    window.location.href = "login.html";
    return;
  }

  const adminUsername = localStorage.getItem("adminUsername") || "Admin";
  $(".admin-name").text(adminUsername);
});