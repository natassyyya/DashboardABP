function logoutAdmin() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("adminUsername");
  window.location.href = "login.html";
}

$(document).ready(function () {
  $(document).on("click", "#logoutBtn", function (e) {
    e.preventDefault();
    logoutAdmin();
  });
});