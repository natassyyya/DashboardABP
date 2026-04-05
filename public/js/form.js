$(document).ready(function () {
  $('#formMahasiswa').on('submit', function (e) {
    e.preventDefault();

    const mahasiswaBaru = {
      nim: $('#nim').val().trim(),
      nama: $('#nama').val().trim(),
      fakultas: $('#fakultas').val(),
      jurusan: $('#jurusan').val(),
      angkatan: parseInt($('#angkatan').val(), 10),
      email: $('#email').val().trim()
    };

    if (
      !mahasiswaBaru.nim ||
      !mahasiswaBaru.nama ||
      !mahasiswaBaru.fakultas ||
      !mahasiswaBaru.jurusan ||
      Number.isNaN(mahasiswaBaru.angkatan) ||
      !mahasiswaBaru.email
    ) {
      $('#alertBox').html(
        `<div class="alert alert-danger">Semua field wajib diisi dengan benar.</div>`
      );
      return;
    }

    $.ajax({
      url: '/api/mahasiswa',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(mahasiswaBaru),
      success: function (response) {
        $('#alertBox').html(
          `<div class="alert alert-success alert-dismissible fade show" role="alert">
            ${response.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>`
        );

        $('#formMahasiswa')[0].reset();

        setTimeout(function () {
          window.location.href = 'table.html';
        }, 900);
      },
      error: function (xhr) {
        const message = xhr.responseJSON?.message || 'Terjadi kesalahan saat menyimpan data.';
        $('#alertBox').html(
          `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>`
        );
      }
    });
  });
});
