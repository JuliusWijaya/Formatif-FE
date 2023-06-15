const editData = async (id, nama, usia, poli) => {
  document.getElementById('nama').value = nama;
  document.getElementById('usia').value = usia;
  document.getElementById('poli').value = poli;
  document.getElementById('btn').innerText = 'Update';
  document.getElementById('btn').setAttribute('onclick', `updateData(${id})`);
};

const updateData = async (id) => {
  let nama = document.getElementById('nama').value;
  let usia = document.getElementById('usia').value;
  let poli = document.getElementById('poli').value;

  let konfirmasi = 'Serius data ' + nama + ' Akan Di Ubah ?';

  if (confirm(konfirmasi)) {
    await axios
      .patch(`https://database.politekniklp3i-tasikmalaya.ac.id/api/klinik/${id}`, {
        nama: nama,
        usia: usia,
        poli: poli,
      })

      .then((Response) => {
        alert('Data Berhasil Diupdate');
        document.getElementById('nama').value = '';
        document.getElementById('usia').value = '';
        document.getElementById('poli').value = '';
        getKlinik();
        console.log(Response);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }
};

const deleteData = async (id) => {
  let text = 'Serius Data Mau Dihapus ?';
  if (confirm(text)) {
    await axios
      .delete(`https://database.politekniklp3i-tasikmalaya.ac.id/api/klinik/${id}`)
      .then((Response) => {
        alert('Success delete klinik');
        getKlinik();
        console.log(Response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

const saveData = async () => {
  let name = document.getElementById('nama').value;
  let age = document.getElementById('usia').value;
  let poli = document.getElementById('poli').value;

  // Validasi
  if (name == '' || age == '') {
    alert('Inputan Harus Terisi Semua');
  } else {
    await axios
      .post(`https://database.politekniklp3i-tasikmalaya.ac.id/api/klinik`, {
        nama: name,
        usia: age,
        poli: poli,
      })

      .then((Response) => {
        alert('Data Berhasil Disimpan');
        getKlinik();
        document.getElementById('nama').value = '';
        document.getElementById('usia').value = '';
        document.getElementById('poli').value = '';
        console.log(Response);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }
};

const getPoli = async () => {
  await axios
    .get('https://database.politekniklp3i-tasikmalaya.ac.id/api/poli')
    .then((Response) => {
      let bucket = '';
      let polis = Response.data;

      polis.forEach((poli) => {
        bucket += `
                <option value="${poli.name}">${poli.name}</option>
            `;
      });

      document.getElementById('poli').innerHTML = bucket;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

getPoli();

const getKlinik = async () => {
  await axios
    .get('https://database.politekniklp3i-tasikmalaya.ac.id/api/klinik')
    .then((response) => {
      let bucket = '';
      let kliniks = response.data.kliniks;

      kliniks.forEach((klinik, i) => {
        bucket += `
            <tr>
                <td>${i + 1}</td>
                <td>${klinik.nama}</td>
                <td>${klinik.usia}</td>
                <td>${klinik.poli}</td>
                <td class="text-center">
                    <button onclick="editData('${klinik.id}', 
                    '${klinik.nama}', '${klinik.usia}', '${klinik.poli}')" class="btn btn-warning btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                        EDIT
                    </button>
                    <button onclick="deleteData('${klinik.id}')" class="btn btn-danger btn-sm">DELETE</button>
                </td>
            </tr>               
            `;
      });
      document.getElementById('result').innerHTML = bucket;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

getKlinik();
