const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'mahasiswa.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    // Remove BOM if present
    const clean = raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw;
    return JSON.parse(clean);
  } catch (error) {
    console.error('Gagal membaca data mahasiswa:', error);
    return [];
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Gagal menyimpan data mahasiswa:', error);
    throw error;
  }
}

app.get('/api/mahasiswa', (req, res) => {
  const mahasiswa = readData();
  res.json({
    success: true,
    data: mahasiswa
  });
});

app.get('/api/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = readData();
  const mahasiswa = data.find(item => item.id === id);

  if (!mahasiswa) {
    return res.status(404).json({
      success: false,
      message: 'Data mahasiswa tidak ditemukan'
    });
  }

  res.json({
    success: true,
    data: mahasiswa
  });
});

app.post('/api/mahasiswa', (req, res) => {
  const { nim, nama, fakultas, jurusan, angkatan, email } = req.body;

  if (!nim || !nama || !fakultas || !jurusan || !angkatan || !email) {
    return res.status(400).json({
      success: false,
      message: 'Semua field wajib diisi'
    });
  }

  const data = readData();
  const existingNim = data.find(item => item.nim === nim.trim());

  if (existingNim) {
    return res.status(400).json({
      success: false,
      message: 'NIM sudah digunakan oleh data lain'
    });
  }

  const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
  const mahasiswaBaru = {
    id: newId,
    nim: nim.trim(),
    nama: nama.trim(),
    fakultas: fakultas.trim(),
    jurusan: jurusan.trim(),
    angkatan: parseInt(angkatan, 10),
    email: email.trim()
  };

  data.push(mahasiswaBaru);
  writeData(data);

  res.status(201).json({
    success: true,
    message: 'Data mahasiswa berhasil ditambahkan',
    data: mahasiswaBaru
  });
});

app.put('/api/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nim, nama, fakultas, jurusan, angkatan, email } = req.body;

  if (!nim || !nama || !fakultas || !jurusan || !angkatan || !email) {
    return res.status(400).json({
      success: false,
      message: 'Semua field wajib diisi'
    });
  }

  const data = readData();
  const index = data.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Data mahasiswa tidak ditemukan'
    });
  }

  const checkNim = data.find(item => item.nim === nim.trim() && item.id !== id);
  if (checkNim) {
    return res.status(400).json({
      success: false,
      message: 'NIM sudah digunakan oleh data lain'
    });
  }

  data[index] = {
    id,
    nim: nim.trim(),
    nama: nama.trim(),
    fakultas: fakultas.trim(),
    jurusan: jurusan.trim(),
    angkatan: parseInt(angkatan, 10),
    email: email.trim()
  };

  writeData(data);

  res.json({
    success: true,
    message: 'Data mahasiswa berhasil diupdate',
    data: data[index]
  });
});

app.delete('/api/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = readData();
  const mahasiswa = data.find(item => item.id === id);

  if (!mahasiswa) {
    return res.status(404).json({
      success: false,
      message: 'Data mahasiswa tidak ditemukan'
    });
  }

  const newData = data.filter(item => item.id !== id);
  writeData(newData);

  res.json({
    success: true,
    message: 'Data mahasiswa berhasil dihapus'
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
