
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("show");
}


function goToProfile() {
  alert("Masuk ke halaman profil...");
}

const jsonUrl = 'https://raw.githubusercontent.com/kyyou-ze/Data/refs/heads/main/Data.json'; // Ganti dengan link raw JSON kamu

fetch(jsonUrl)
  .then(res => {
    if (!res.ok) throw new Error('Network response not OK');
    return res.json();
  })
  .then(data => {
    data.forEach(item => {
    const slide = `
  <div class="swiper-slide" onclick="location.href='desk.html?id=${item.id}'">
    <div class="card">
      <img class="card-img" src="${item.img}" alt="${item.title}">
    </div>
  </div>
`;
      document.getElementById('novel-slider').innerHTML += slide;
    });

new Swiper('.mySwiper', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  freeMode: true,
  freeModeMomentum: true,   // bikin scroll lebih halus
  speed: 800,               // durasi animasi perpindahan slide dalam ms
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
  })
  .catch(err => console.error('Error fetching JSON:', err));


const url = 'https://raw.githubusercontent.com/kyyou-ze/Data/refs/heads/main/Data.json';
const latestList = document.getElementById('latest-list');

fetch(url)
.then(res => res.json())
.then(data => {
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'latest-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="latest-info">
          <div class="latest-title">${item.title}</div>
          <div class="chapter-list">
            ${
              Array.isArray(item.chapters)
? item.chapters.map(ch => `<div class="chapter-badge">${ch.title}</div>`).join("")
: "<div class='no-chapter'>No chapter</div>"
}
          </div>
        </div>
      `;
      latestList.appendChild(div);
});
})
.catch(error => {
    console.error('Error fetching data:', error);
});
