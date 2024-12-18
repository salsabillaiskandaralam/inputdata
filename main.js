import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyB4C85l_vjvl3f91GVFzdT3iA-yf4_BmLo",
  authDomain: "insan-cemerlang-3a602.firebaseapp.com",
  projectId: "insan-cemerlang-3a602",
  storageBucket: "insan-cemerlang-3a602.firebasestorage.app",
  messagingSenderId: "296067062891",
  appId: "1:296067062891:web:834ec38cebdae1dea0652e",
  measurementId: "G-FWT0MVTHE8"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftarmember() {
  const refDokumen = collection(db, "penginputdata");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      email: dok.data().email,
      nomortelepon: dok.data().nomortelepon,
    });
  });

  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahmember(nama, email, nomortelepon) {
  try {
    const dokRef = await addDoc(collection(db, 'penginputdata'), {

      nama: nama,
      email: email,
      nomortelepon: nomortelepon
    });
    console.log('Berhasil menambah datamember ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah datamember ' + e);
  }
}


export async function hapusmember(docid) {
  await deleteDoc(doc(db, "member", docid));
}
export async function ubahProduk(docId, nama, email, nomortelepon) {
  await updateDoc(doc(db, "member", docId), {
    nama: nama,
    email: email,
    nomortelepon: nomortelepon,
  });
}

export async function ambilmember(docId) {
  const docRef = await doc(db, "member", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}