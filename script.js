document.addEventListener('DOMContentLoaded', function() {

    // === SAYFA GEÇİŞLERİ ===
    const navLinkElements = document.querySelectorAll('.nav-link');
    const sayfalar = document.querySelectorAll('.sayfa');
    navLinkElements.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            sayfalar.forEach(s => s.classList.remove('aktif'));
            document.getElementById(targetId).classList.add('aktif');
        });
    });

    // === MODAL ELEMENTLERİ ===
    const projeModal = document.getElementById('proje-modal');
    const demoModal = document.getElementById('demo-modal');
    const modals = [projeModal, demoModal];

    modals.forEach(modal => {
        if (modal) {
            const closeButton = modal.querySelector('.close-button');
            closeButton.onclick = () => modal.style.display = "none";
        }
    });

    window.onclick = event => {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    };
    
    // === AKSİYON BUTONLARI İÇİN EVENT LISTENER ===
    document.body.addEventListener('click', function(event) {
        
        // Kodu Göster/Gizle Butonu (GÜNCELLENDİ)
        if (event.target.matches('.btn-goster')) {
            const wrapper = event.target.closest('.kod-blogu-wrapper');
            const kodBlok = wrapper.querySelector('.kod-blogu'); // Hedefi değiştirdik
            kodBlok.classList.toggle('acik'); // Sınıfı artık bu elemente ekliyoruz
            
            if (kodBlok.classList.contains('acik')) {
                event.target.textContent = 'Kodu Gizle';
            } else {
                event.target.textContent = 'Kodu Göster';
            }
        }

        // Kopyala Butonu
        if (event.target.matches('.btn-kopyala')) {
            const wrapper = event.target.closest('.kod-blogu');
            const kod = wrapper.querySelector('code').innerText;
            navigator.clipboard.writeText(kod).then(() => {
                event.target.classList.add('kopyalandi');
                setTimeout(() => {
                    event.target.classList.remove('kopyalandi');
                }, 1500);
            });
        }

        // Demoyu Dene Butonu
        if (event.target.matches('.btn-demo')) {
            const kodId = event.target.dataset.id;
            const kodData = tumVeri.kodlar.find(k => k.id === kodId);
            if(kodData) {
                demoyuBaslat(kodData);
            }
        }
    });


    // VERİLERİ YÜKLE VE SAYFAYI OLUŞTUR
    let tumVeri = {}; 
    async function verileriYukle() {
        try {
            const response = await fetch('data.json');
            tumVeri = await response.json();

            // Projeler listesini doldur
            const projelerListesi = document.getElementById('projeler-listesi');
            projelerListesi.innerHTML = '';
            tumVeri.projeler.forEach(proje => {
                const projeElementi = document.createElement('div');
                projeElementi.className = 'proje-karti';
                projeElementi.dataset.id = proje.id;
                const kapakResmi = proje.resimler && proje.resimler.length > 0 ? proje.resimler[0] : 'images/default.png';
                projeElementi.innerHTML = `<img src="${kapakResmi}" alt="${proje.baslik}"><div class="proje-karti-icerik"><h3>${proje.baslik}</h3><p>${proje.aciklama}</p></div>`;
                projeElementi.addEventListener('click', () => detaylariGoster(proje));
                projelerListesi.appendChild(projeElementi);
            });

            // Kodlar listesini doldur
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
                    
                    let demoButton = '';
                    if(kod.demo) {
                        demoButton = `<button class="btn btn-demo" data-id="${kod.id}">⚡ Demoyu Dene</button>`;
                    }

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
    
    // TIKLANAN PROJENİN DETAYLARINI POP-UP'TA GÖSTER
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
            </div>`;
        });

        projeModal.style.display = "block";
    }

    // DEMO BAŞLATMA FONKSİYONU
    function demoyuBaslat(kodData) {
        const title = document.getElementById('demo-modal-title');
        const content = document.getElementById('demo-modal-content');
        title.textContent = kodData.baslik;
        content.innerHTML = ''; // İçeriği temizle

        switch(kodData.id) {
            case 'python-sayi-tahmin':
                let sayi = Math.ceil(Math.random() * 100);
                content.innerHTML = `
                    <p>1 ile 100 arasında bir sayı tuttum. Hadi tahmin et!</p>
                    <input type="number" id="tahminInput" placeholder="Tahminin...">
                    <button id="tahminButton" class="btn">Tahmin Et</button>
                    <p id="tahminSonuc"></p>
                `;
                document.getElementById('tahminButton').addEventListener('click', () => {
                    const tahmin = parseInt(document.getElementById('tahminInput').value);
                    const sonuc = document.getElementById('tahminSonuc');
                    if (tahmin === sayi) {
                        sonuc.innerHTML = `🎉 Tebrikler, doğru tahmin! Sayı ${sayi} idi. Yeni oyun için pencereyi kapatıp tekrar aç.`;
                    } else if (tahmin > sayi) {
                        sonuc.textContent = 'Daha küçük bir sayı gir.';
                    } else {
                        sonuc.textContent = 'Daha büyük bir sayı gir.';
                    }
                });
                break;
            
            case 'python-tkm':
                content.innerHTML = `
                    <p>Seçimini yap: Taş mı, Kağıt mı, Makas mı?</p>
                    <button class="btn tkm-secim" data-secim="Taş">Taş</button>
                    <button class="btn tkm-secim" data-secim="Kağıt">Kağıt</button>
                    <button class="btn tkm-secim" data-secim="Makas">Makas</button>
                    <p id="tkmSonuc"></p>
                `;
                document.querySelectorAll('.tkm-secim').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const oyuncuSecimi = e.target.dataset.secim;
                        const secenekler = ["Taş", "Kağıt", "Makas"];
                        const bilgisayarSecimi = secenekler[Math.floor(Math.random() * 3)];
                        const sonuc = document.getElementById('tkmSonuc');
                        
                        let sonucText = `Senin seçimin: <strong>${oyuncuSecimi}</strong>, Bilgisayarın seçimi: <strong>${bilgisayarSecimi}</strong>.<br>`;
                        if (oyuncuSecimi === bilgisayarSecimi) {
                            sonucText += "Berabere!";
                        } else if (
                            (oyuncuSecimi === "Taş" && bilgisayarSecimi === "Makas") ||
                            (oyuncuSecimi === "Kağıt" && bilgisayarSecimi === "Taş") ||
                            (oyuncuSecimi === "Makas" && bilgisayarSecimi === "Kağıt")
                        ) {
                            sonucText += "Kazandın!";
                        } else {
                            sonucText += "Kaybettin!";
                        }
                        sonuc.innerHTML = sonucText;
                    });
                });
                break;

            case 'python-sifre-olusturucu':
                content.innerHTML = `
                    <p>Kaç karakterli bir şifre istersin?</p>
                    <input type="number" id="sifreUzunluk" value="12" min="4" max="32">
                    <button id="sifreButton" class="btn">Şifre Oluştur</button>
                    <p id="sifreSonuc"></p>
                `;
                document.getElementById('sifreButton').addEventListener('click', () => {
                    const uzunluk = parseInt(document.getElementById('sifreUzunluk').value);
                    const karakterler = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%&*?";
                    let sifre = '';
                    for (let i = 0; i < uzunluk; i++) {
                        sifre += karakterler.charAt(Math.floor(Math.random() * karakterler.length));
                    }
                    document.getElementById('sifreSonuc').textContent = `Oluşturulan Şifre: ${sifre}`;
                });
                break;
        }

        demoModal.style.display = 'block';
    }

    verileriYukle();
});