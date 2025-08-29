document.addEventListener('DOMContentLoaded', function() {

    // === TEMEL ELEMENT TANIMLARI ===
    const navLinkElements = document.querySelectorAll('.nav-link');
    const sayfalar = document.querySelectorAll('.sayfa');
    const projeModal = document.getElementById('proje-modal');
    const demoModal = document.getElementById('demo-modal');
    const modals = [projeModal, demoModal]; 

    // === ATATÜRK GIF VE GENÇLİĞE HİTABE ELEMENT TANIMLARI ===
    const ataturkGif = document.getElementById('ataturkGif');
    const hitabeContainer = document.getElementById('hitabeContainer');
    const gencligeHitabe = document.getElementById('gencligeHitabe');

    const hitabeMetni = `Ey Türk Gençliği! Birinci vazifen, Türk istiklâlini, Türk Cumhuriyetini, ilelebet muhafaza ve müdafaa etmektir.
...
Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur!
`;

    if (gencligeHitabe) {
        gencligeHitabe.textContent = hitabeMetni;
    }

    // === SAYFA GEÇİŞLERİ VE NAVİGASYON LOGİĞİ ===
    navLinkElements.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            if (targetId === 'genclige-hitabe') {
                if (hitabeContainer) {
                    hitabeContainer.classList.toggle('hitabe-visible');
                    if (hitabeContainer.classList.contains('hitabe-visible')) {
                        hitabeContainer.scrollTop = 0;
                    }
                }
                return; 
            }

            sayfalar.forEach(s => s.classList.remove('aktif'));
            document.getElementById(targetId).classList.add('aktif');
            
            modals.forEach(modal => {
                if (modal) modal.style.display = "none";
            });
            if (hitabeContainer) hitabeContainer.classList.remove('hitabe-visible');
        });
    });

    modals.forEach(modal => {
        if (modal) {
            const closeButton = modal.querySelector('.close-button');
            if (closeButton) closeButton.onclick = () => modal.style.display = "none";
        }
    });

    window.onclick = event => {
        modals.forEach(modal => {
            if (event.target == modal) modal.style.display = "none";
        });
        if (event.target == hitabeContainer) {
            if (hitabeContainer) hitabeContainer.classList.remove('hitabe-visible');
        }
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal && modal.style.display === 'block') modal.style.display = 'none';
            });
            if (hitabeContainer && hitabeContainer.classList.contains('hitabe-visible')) hitabeContainer.classList.remove('hitabe-visible');
        }
    });

    if (ataturkGif && hitabeContainer) {
        ataturkGif.addEventListener('click', () => {
            hitabeContainer.classList.toggle('hitabe-visible');
            if (hitabeContainer.classList.contains('hitabe-visible')) hitabeContainer.scrollTop = 0;
        });
    }

    document.body.addEventListener('click', function(event) {
        if (event.target.matches('.btn-goster')) {
            const wrapper = event.target.closest('.kod-blogu-wrapper');
            const kodBlok = wrapper.querySelector('.kod-blogu');
            kodBlok.classList.toggle('acik');
            event.target.textContent = kodBlok.classList.contains('acik') ? 'Kodu Gizle' : 'Kodu Göster';
        }

        if (event.target.matches('.btn-kopyala')) {
            const wrapper = event.target.closest('.kod-blogu');
            const kod = wrapper.querySelector('code').innerText;
            navigator.clipboard.writeText(kod).then(() => {
                event.target.classList.add('kopyalandi');
                setTimeout(() => event.target.classList.remove('kopyalandi'), 1500);
            });
        }

        if (event.target.matches('.btn-demo')) {
            const kodId = event.target.dataset.id;
            const kodData = tumVeri.kodlar.find(k => k.id === kodId);
            if(kodData) demoyuBaslat(kodData);
        }
    });

    let tumVeri = {};
    async function verileriYukle() {
        try {
            const response = await fetch('data.json');
            tumVeri = await response.json();

            const projelerListesi = document.getElementById('projeler-listesi');
            projelerListesi.innerHTML = '';
            tumVeri.projeler.forEach(proje => {
                const projeElementi = document.createElement('div');
                projeElementi.className = 'proje-karti';
                projeElementi.dataset.id = proje.id;
                const kapakResmi = proje.resimler?.[0] || 'images/default.png';
                projeElementi.innerHTML = `<img src="${kapakResmi}" alt="${proje.baslik}"><div class="proje-karti-icerik"><h3>${proje.baslik}</h3><p>${proje.aciklama}</p></div>`;
                projeElementi.addEventListener('click', () => detaylariGoster(proje));
                projelerListesi.appendChild(projeElementi);
            });

            const kodlarListesi = document.getElementById('kodlar-listesi');
            kodlarListesi.innerHTML = '';
            tumVeri.kodlar.forEach(kod => {
                const element = document.createElement('div');
                if (kod.tip === 'indir') {
                    element.className = 'indir-karti';
                    element.innerHTML = `<h3>${kod.baslik}</h3><p>${kod.aciklama}</p><a href="${kod.dosyaYolu}" class="btn" download>İndir</a>`;
                } else {
                    element.className = 'kod-karti';
                    const guvenliKod = kod.kod.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    let demoButton = kod.demo ? `<button class="btn btn-demo" data-id="${kod.id}">⚡ Demoyu Dene</button>` : '';
                    element.innerHTML = `
                        <h3>${kod.baslik}</h3>
                        <p>${kod.aciklama}</p>
                        <div class="kod-blogu-wrapper">
                            <div class="kod-actions">
                                <button class="btn btn-goster">Kodu Göster</button>
                                ${demoButton}
                            </div>
                            <div class="kod-blogu">
                                <button class="btn btn-kopyala">📋</button>
                                <pre><code>${guvenliKod}</code></pre>
                            </div>
                        </div>
                    `;
                }
                kodlarListesi.appendChild(element);
            });

        } catch (error) { console.error('Veri Yüklenemedi:', error); }
    }

    function detaylariGoster(proje) {
        document.getElementById('modal-title').textContent = proje.baslik;

        const imagesContainer = document.getElementById('modal-images');
        imagesContainer.innerHTML = '';
        proje.resimler.forEach(resimUrl => {
            imagesContainer.innerHTML += `<img src="${resimUrl}" alt="${proje.baslik} resmi">`;
        });

        const materialsContainer = document.getElementById('modal-materials');
        materialsContainer.innerHTML = '';
        proje.malzemeler.forEach(malzeme => {
            materialsContainer.innerHTML += `<li>${malzeme}</li>`;
        });

        const codesContainer = document.getElementById('modal-codes');
        codesContainer.innerHTML = '';
        proje.kodBloklari.forEach(blok => {
            const guvenliKod = blok.kod.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            codesContainer.innerHTML += `
            <div class="kod-blogu-wrapper">
                <h4>${blok.dil}</h4>
                <div class="kod-actions">
                    <button class="btn btn-goster">Kodu Göster</button>
                </div>
                <div class="kod-blogu">
                    <button class="btn btn-kopyala">📋</button>
                    <pre><code>${guvenliKod}</code></pre>
                </div>
            </div>
            `;
        });

        projeModal.style.display = 'block';
    }

});
