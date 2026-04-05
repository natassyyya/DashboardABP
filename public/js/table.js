$(document).ready(function () {
  let table;

  function loadTable() {
    $.ajax({
      url: '/api/mahasiswa',
      type: 'GET',
      success: function (response) {
        const data = response.data || [];

        if ($.fn.DataTable.isDataTable('#mahasiswaTable')) {
          $('#mahasiswaTable').DataTable().destroy();
        }

        $('#mahasiswaTable tbody').empty();

        data.forEach(function (item, index) {
          $('#mahasiswaTable tbody').append(`
            <tr>
              <td>${index + 1}</td>
              <td>${item.nim}</td>
              <td>${item.nama}</td>
              <td>${item.fakultas || '-'}</td>
              <td>${item.jurusan}</td>
              <td>${item.angkatan}</td>
              <td>${item.email}</td>
              <td>
                <a href="edit.html?id=${item.id}" class="btn btn-warning btn-sm btn-action me-1">Edit</a>
                <button class="btn btn-danger btn-sm btn-action" onclick="hapusData(${item.id})">Hapus</button>
              </td>
            </tr>
          `);
        });

        table = $('#mahasiswaTable').DataTable({
          pageLength: 5,
          lengthMenu: [5, 10, 25, 50],
          language: {
            search: 'Cari:',
            lengthMenu: 'Tampilkan _MENU_ data',
            info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
            infoEmpty: 'Tidak ada data',
            zeroRecords: 'Data tidak ditemukan',
            paginate: {
              first: 'Awal',
              last: 'Akhir',
              next: 'Berikutnya',
              previous: 'Sebelumnya'
            }
          }
        });
      },
      error: function () {
        $('#tableAlert').html(
          `<div class="alert alert-danger">Gagal mengambil data mahasiswa.</div>`
        );
      }
    });
  }

  window.hapusData = function (id) {
    const konfirmasi = confirm('Yakin ingin menghapus data ini?');
    if (!konfirmasi) return;

    $.ajax({
      url: `/api/mahasiswa/${id}`,
      type: 'DELETE',
      success: function (response) {
        $('#tableAlert').html(
          `<div class="alert alert-success alert-dismissible fade show" role="alert">
            ${response.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>`
        );
        loadTable();
      },
      error: function (xhr) {
        const message = xhr.responseJSON?.message || 'Gagal menghapus data.';
        $('#tableAlert').html(
          `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>`
        );
      }
    });
  };

  loadTable();
});
