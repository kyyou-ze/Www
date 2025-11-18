
const jsonUrl = 'https://raw.githubusercontent.com/kyyou-ze/Data/refs/heads/main/Data.json';

function getIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

const chapterList = document.getElementById("chapterList");
const btnNewest = document.getElementById("btnNewest");
const btnOldest = document.getElementById("btnOldest");

let chapters = [];

function renderChapters(data) {
  chapterList.innerHTML = "";
  data.forEach((chapter, index) => {
    const div = document.createElement("div");
    div.className = "chapter-item";
    div.innerHTML = `
      <div>
        <div onclick="location.href='ch.html?id=${getIdFromUrl()}&ch=${index}'">
          <i class="fas fa-book-open"></i>${chapter.title}
        </div>
        <div class="views"><i class="fas fa-eye"></i>${chapter.views}</div>
      </div>
    `;
    chapterList.appendChild(div);
});
}

fetch(jsonUrl)
.then(res => {
    if (!res.ok) throw new Error('Network response not OK');
    return res.json();
})
.then(data => {
    const id = getIdFromUrl();
    const item = data.find(d => d.id === id);
    if (!item) {
      document.getElementById('novel-slider').innerHTML = '<p>Novel tidak ditemukan.</p>';
      return;
}

    // Tampilkan detail novel
    const detailHTML = `
      <div class="card">
        <img src="${item.img}" alt="${item.title}" />
        <h2>${item.title}</h2>
        <div class="meta">
          <i class="fas fa-star"></i>${item.rating}
          <i class="fas fa-calendar-alt"></i> ${item.year}
          <i class="fas fa-check-circle"></i>${item.status}
        </div>
        <div class="genre">
          <i class="fas fa-tags"></i> ${item.genre1}${item.genre2? ', ' + item.genre2: ''}
        </div>
        <button class="btn-back" onclick="location.href='index.html'">
          <i class="fas fa-arrow-left"></i> Kembali
        </button>
      </div>
      <div class="section">
        <h3>Sinopsis</h3>
        <p>${item.summary}</p>
      </div>
    `;
    document.getElementById('novel-slider').innerHTML = detailHTML;

    // Tampilkan daftar chapter
    chapters = item.chapters || [];
    renderChapters(chapters);
})
.catch(err => {
    console.error('Error fetching JSON:', err);
    document.getElementById('novel-slider').innerHTML = '<p>Gagal memuat data.</p>';
});

// Tombol urutan chapter
btnNewest.addEventListener("click", () => {
  btnNewest.classList.add("active");
  btnOldest.classList.remove("active");
  renderChapters(chapters);
});

btnOldest.addEventListener("click", () => {
  btnOldest.classList.add("active");
  btnNewest.classList.remove("active");
  renderChapters([...chapters].slice().reverse());
});
