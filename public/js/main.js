$(document).ready(function () {
  $.ajax({
    url: '/api/mahasiswa',
    type: 'GET',
    success: function (response) {
      const dataMahasiswa = response.data || [];

      const totalMahasiswa = dataMahasiswa.length;
      const fakultasMap = {};
      const jurusanMap = {};
      const angkatanMap = {};

      dataMahasiswa.forEach(function (item) {
        fakultasMap[item.fakultas || 'Lainnya'] = (fakultasMap[item.fakultas || 'Lainnya'] || 0) + 1;
        jurusanMap[item.jurusan] = (jurusanMap[item.jurusan] || 0) + 1;
        angkatanMap[item.angkatan] = (angkatanMap[item.angkatan] || 0) + 1;
      });

      $('#totalMahasiswa').text(totalMahasiswa);
      $('#totalFakultas').text(Object.keys(fakultasMap).length);
      $('#totalJurusan').text(Object.keys(jurusanMap).length);

      var fakultasHtml = '';
      Object.entries(fakultasMap).forEach(function (entry) {
        fakultasHtml += `
          <div class="summary-item">
            <span>${entry[0]}</span>
            <span>${entry[1]}</span>
          </div>
        `;
      });
      $('#fakultasList').html(fakultasHtml || "<p class='text-muted'>Belum ada data.</p>");

      var jurusanHtml = '';
      Object.entries(jurusanMap).forEach(function (entry) {
        jurusanHtml += `
          <div class="summary-item">
            <span>${entry[0]}</span>
            <span>${entry[1]}</span>
          </div>
        `;
      });
      $('#jurusanList').html(jurusanHtml || "<p class='text-muted'>Belum ada data.</p>");

      var angkatanEntries = Object.entries(angkatanMap).sort(function (a, b) {
        return a[0] - b[0];
      });
      var maxValue = Math.max.apply(null, Object.values(angkatanMap));
      if (!isFinite(maxValue)) {
        maxValue = 1;
      }

      var chartHtml = '';
      angkatanEntries.forEach(function (entry) {
        var angkatan = entry[0];
        var jumlah = entry[1];
        var height = (jumlah / maxValue) * 180 + 20;
        chartHtml += `
          <div class="bar-group">
            <div class="bar" style="height:${height}px"></div>
            <div class="bar-label">${angkatan}<br>${jumlah}</div>
          </div>
        `;
      });

      $('#angkatanChart').html(chartHtml || "<p class='text-muted'>Belum ada data statistik angkatan.</p>");
    },
    error: function () {
      $('#totalMahasiswa').text('0');
      $('#totalFakultas').text('0');
      $('#totalJurusan').text('0');
      $('#fakultasList').html("<p class='text-muted'>Tidak dapat mengambil data.</p>");
      $('#jurusanList').html("<p class='text-muted'>Tidak dapat mengambil data.</p>");
      $('#angkatanChart').html("<p class='text-muted'>Tidak dapat mengambil data statistik.</p>");
    }
  });
});
