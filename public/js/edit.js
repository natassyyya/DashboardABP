$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'), 10);

  if (!id) {
    $('#alertBox').html(`<div class="alert alert-danger">ID mahasiswa tidak ditemukan.</div>`);
    return;
  }

  $.ajax({
    url: `/api/mahasiswa/${id}`,
    type: 'GET',
    success: function (response) {
      const mahasiswa = response.data;
      $('#id').val(mahasiswa.id);
      $('#nim').val(mahasiswa.nim);
      $('#nama').val(mahasiswa.nama);
      $('#fakultas').val(mahasiswa.fakultas);
      $('#jurusan').val(mahasiswa.jurusan);
      $('#angkatan').val(mahasiswa.angkatan);
      $('#email').val(mahasiswa.email);
    },
    error: function () {
      $('#alertBox').html(`<div class="alert alert-danger">Gagal mengambil detail data mahasiswa.</div>`);
    }
  });

  $('#editMahasiswaForm').on('submit', function (e) {
    e.preventDefault();

    const updatedMahasiswa = {
      nim: $('#nim').val().trim(),
      nama: $('#nama').val().trim(),
      fakultas: $('#fakultas').val(),
      jurusan: $('#jurusan').val(),
      angkatan: parseInt($('#angkatan').val(), 10),
      email: $('#email').val().trim()
    };

    if (
      !updatedMahasiswa.nim ||
      !updatedMahasiswa.nama ||
      !updatedMahasiswa.fakultas ||
      !updatedMahasiswa.jurusan ||
      Number.isNaN(updatedMahasiswa.angkatan) ||
      !updatedMahasiswa.email
    ) {
      $('#alertBox').html(
        `<div class="alert alert-danger">Semua field wajib diisi dengan benar.</div>`
      );
      return;
    }

    $.ajax({
      url: `/api/mahasiswa/${id}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedMahasiswa),
      success: function (response) {
        $('#alertBox').html(
          `<div class="alert alert-success alert-dismissible fade show" role="alert">
            ${response.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>`
        );

        setTimeout(function () {
          window.location.href = 'table.html';
        }, 900);
      },
      error: function (xhr) {
        const message = xhr.responseJSON?.message || 'Gagal mengupdate data.';
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
