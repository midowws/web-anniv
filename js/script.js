document.addEventListener("DOMContentLoaded", () => {
  console.log("Script dimuat!");

  // ==================================================
  // BAGIAN 1: COUNTDOWN (PENGHITUNG WAKTU)
  // ==================================================
  const tanggalJadian = "2025-02-04";
  const jadianDate = new Date(tanggalJadian).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = now - jadianDate;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMinutes = document.getElementById("minutes");
    const elSeconds = document.getElementById("seconds");

    if (elDays) elDays.innerText = days < 10 ? "0" + days : days;
    if (elHours) elHours.innerText = hours < 10 ? "0" + hours : hours;
    if (elMinutes) elMinutes.innerText = minutes < 10 ? "0" + minutes : minutes;
    if (elSeconds) elSeconds.innerText = seconds < 10 ? "0" + seconds : seconds;
  }
  setInterval(updateTimer, 1000);
  updateTimer();

  // ==================================================
  // BAGIAN 2: CAROUSEL (FOTO GESER)
  // ==================================================
  const container = document.querySelector(".carousel-container");
  const slides = document.querySelectorAll(".carousel-container img");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentSlide = 0;

  if (slides.length > 0) {
    function updateGlow(image) {
      let color = image.getAttribute("data-color");
      if (!color) color = "#FFD700";
      if (container) container.style.setProperty("--glow-color", color);
    }

    function showSlide(index) {
      if (index >= slides.length) currentSlide = 0;
      else if (index < 0) currentSlide = slides.length - 1;
      else currentSlide = index;

      slides.forEach((img) => img.classList.remove("active-slide"));
      const activeImg = slides[currentSlide];
      activeImg.classList.add("active-slide");
      updateGlow(activeImg);
    }

    if (prevBtn)
      prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    if (nextBtn)
      nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

    showSlide(0);
  }

  // ==================================================
  // BAGIAN 3: MUSIC PLAYER (FIX POP-UP & PLAY)
  // ==================================================

  // --- DAFTAR LAGU (GANTI NAMA FILE DI SINI) ---
  const playlist = [
    {
      title: "Berhasil",
      artist: "Perunggu",
      src: "assets/music/Berhasil.mp3",
    },
    {
      title: "ILYSB",
      artist: "LANY",
      src: "assets/music/ilysb.mp3",
    },
    {
      title: "Honey",
      artist: "Boy Pablo",
      src: "assets/music/honey.mp3",
    },
    {
      title: "Waking Up Together with You",
      artist: "Ardhito Pramono",
      src: "assets/music/wuwty.mp3",
    },
  ];
  // ----------------------------------------------

  let songIndex = 0;
  let isPlaying = false;

  // Ambil Elemen (Pastikan ID di HTML cocok)
  const audioPlayer = document.getElementById("audioPlayer");
  const musicCard = document.getElementById("musicCard");
  const musicToggle = document.getElementById("musicToggle");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevTrackBtn = document.getElementById("prevTrack");
  const nextTrackBtn = document.getElementById("nextTrack");
  const songTitle = document.getElementById("songTitle");
  const artistName = document.getElementById("artistName");

  // Cek apakah elemen musik ada di HTML?
  if (audioPlayer && musicCard && musicToggle) {
    console.log("Music Player Siap!");

    // 1. Fungsi Load Lagu
    function loadSong(song) {
      if (!song) return; // Cegah error jika playlist kosong
      songTitle.innerText = song.title;
      artistName.innerText = song.artist;
      audioPlayer.src = song.src;
    }

    // 2. Fungsi Play
    function playSong() {
      musicCard.classList.add("playing");
      playPauseBtn.innerText = "⏸"; // Ikon Pause
      audioPlayer
        .play()
        .then(() => {
          isPlaying = true;
        })
        .catch((error) =>
          console.log("Gagal play (mungkin perlu interaksi user):", error),
        );
    }

    // 3. Fungsi Pause
    function pauseSong() {
      musicCard.classList.remove("playing");
      playPauseBtn.innerText = "▶"; // Ikon Play
      audioPlayer.pause();
      isPlaying = false;
    }

    // 4. EVENT: TOMBOL POP-UP (TOGGLE)
    musicToggle.addEventListener("click", () => {
      console.log("Toggle diklik");
      // Tambah/Hapus class 'show-player' untuk animasi pop-up
      musicCard.classList.toggle("show-player");
    });

    // 5. EVENT: PLAY/PAUSE
    playPauseBtn.addEventListener("click", () => {
      if (isPlaying) {
        pauseSong();
      } else {
        playSong();
      }
    });

    // 6. EVENT: NEXT
    nextTrackBtn.addEventListener("click", () => {
      songIndex++;
      if (songIndex > playlist.length - 1) songIndex = 0;

      loadSong(playlist[songIndex]);
      playSong();
    });

    // 7. EVENT: PREV
    prevTrackBtn.addEventListener("click", () => {
      songIndex--;
      if (songIndex < 0) songIndex = playlist.length - 1;

      loadSong(playlist[songIndex]);
      playSong();
    });

    // Load lagu pertama (tanpa auto play)
    loadSong(playlist[songIndex]);
  } else {
    console.error("Elemen Music Player tidak ditemukan. Cek ID di HTML!");
  }
});
// ==================================================
// BAGIAN 4: EFEK HUJAN KELOPAK MAWAR (ROSE PETALS)
// ==================================================

document.addEventListener("DOMContentLoaded", () => {
  const petalsContainer = document.getElementById("petals-container");

  // Daftar gambar kelopak (Pastikan file ada di folder assets/petals/)
  const petalImages = [
    "assets/petals/petals1.png",
    "assets/petals/petals2.png",
    "assets/petals/petals3.png",
  ];

  // Hanya jalankan jika containernya ada
  if (petalsContainer) {
    function createPetal() {
      const petal = document.createElement("img");

      // 1. Pilih gambar acak
      petal.src = petalImages[Math.floor(Math.random() * petalImages.length)];
      petal.classList.add("petal");

      // 2. Posisi Horizontal Acak (0% sampai 100% lebar layar)
      petal.style.left = Math.random() * 100 + "vw";

      // 3. Ukuran Acak (Skala antara 0.5x sampai 1.2x)
      const scale = Math.random() * 0.7 + 0.5;
      petal.style.transform = `scale(${scale})`;

      // 4. Durasi Jatuh Acak (Antara 6 detik sampai 12 detik) - Semakin lama semakin lambat
      const duration = Math.random() * 6 + 6;
      petal.style.animation = `fall-sway ${duration}s linear forwards`;

      // 5. Delay Animasi Acak (Agar tidak mulai bersamaan)
      petal.style.animationDelay = -(Math.random() * duration) + "s";

      // Masukkan ke wadah
      petalsContainer.appendChild(petal);

      // 6. PENTING: Hapus elemen setelah animasi selesai agar memori tidak penuh
      setTimeout(() => {
        petal.remove();
      }, duration * 1000);
    }

    // Buat kelopak baru setiap 300ms (Atur angka ini untuk kepadatan. Makin kecil makin padat)
    setInterval(createPetal, 300);

    // Buat beberapa di awal biar langsung ramai
    for (let i = 0; i < 15; i++) createPetal();
  }
});
// ==================================================
// BAGIAN 5: SURAT CINTA (POP-UP TYPEWRITER)
// ==================================================

// PESAN SURAT (Edit di sini)
const message = `Hai Sayang,

Udah setahun kita lewatin banyak yang sudah kita lauli bersama,
dari sedih, seneng, sedih lagi seneng lagi dan aku bersyukur kita bisa menghadapi itu bersama.
Meski kita ga bisa ketemu setiap hari i think itu suatu privillage buat kita karna kita bisa fokus ke kesibukan masing-masing.
Terima kasih udah jadi pendengar yang baik, tempat aku curhat, dan selalu support aku dalam keadaan apapun.
And in this one year aku belajar banyak hal dari kamu, tentang kesabaran, tentang pengertian, dan tentang cinta itu sendiri.
Aku harap kita bisa terus belajar bareng, tumbuh bareng, dan saling support satu sama lain di tahun-tahun berikutnya.
Dan menuai semua perjuangan kita LDR ini dengan kebahagiaan yang kita impikan bersama.

Aku cuma mau bilang...
I Love You, More Than Words Can Say. ❤️

Happy Anniversary!`;

const speed = 50;
let i = 0;
let isTyping = false; // Biar gak dobel jalan

function openLetter() {
  const modal = document.getElementById("letter-modal");
  const textElement = document.getElementById("typewriter-text");
  const cursor = document.getElementById("cursor");

  // 1. Munculkan Modal
  modal.classList.add("active");

  // 2. Reset Teks (Biar ngetik ulang dari awal setiap dibuka)
  if (!isTyping) {
    textElement.innerHTML = "";
    i = 0;
    cursor.style.display = "inline-block";
    isTyping = true;
    typeWriter();
  }
}

function closeLetter() {
  const modal = document.getElementById("letter-modal");
  modal.classList.remove("active");

  // Opsional: Kalau mau stop typing saat ditutup, bisa tambah logika di sini
  // Tapi membiarkannya jalan di background juga tidak masalah.
}

function typeWriter() {
  const textElement = document.getElementById("typewriter-text");
  const cursor = document.getElementById("cursor");

  if (i < message.length) {
    // Cek karakter khusus baris baru
    if (message.charAt(i) === "\n") {
      textElement.innerHTML += "<br>";
    } else {
      textElement.innerHTML += message.charAt(i);
    }
    i++;
    setTimeout(typeWriter, speed);
  } else {
    // Selesai ngetik
    cursor.style.display = "none";
    isTyping = false; // Reset status biar bisa dibuka ulang nanti
  }
}

// Tutup modal kalau klik di luar kertas (area gelap)
document.getElementById("letter-modal").addEventListener("click", (e) => {
  if (e.target.id === "letter-modal") {
    closeLetter();
  }
});
