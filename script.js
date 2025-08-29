document.addEventListener('DOMContentLoaded', function(    // === ATATÜRK GIF VE GENÇLİĞE HİTABE LOGİĞİ ===
    const ataturkGif = document.getElementById('ataturkGif');
    const hitabeContainer = document.getElementById('hitabeContainer');
    const gencligeHitabe = document.getElementById('gencligeHitabe');

    const hitabeMetni = `Ey Türk Gençliği! Birinci vazifen, Türk istiklâlini, Türk Cumhuriyetini, ilelebet muhafaza ve müdafaa etmektir.

Mevcudiyetinin ve istikbalinin yegâne temeli budur. Bu temel, senin en kıymetli hazinendir. İstikbalde dahi, seni bu hazineden mahrum etmek isteyecek dâhilî ve haricî bedhahların olacaktır. Bir gün, istiklâl ve Cumhuriyeti müdafaa mecburiyetine düşersen, vazifeye atılmak için, içinde bulunacağın vaziyetin imkân ve şerâitini düşünmeyeceksin! Bu imkân ve şerâit, çok nâmüsait bir mahiyette tezahür edebilir. İstiklâl ve Cumhuriyetine kastedecek düşmanlar, bütün dünyada emsali görülmemiş bir galibiyetin mümessili olabilirler. Cebren ve hile ile aziz vatanın bütün kaleleri zaptedilmiş, bütün tersanelerine girilmiş, bütün orduları dağıtılmış ve memleketin her köşesi bilfiil işgal edilmiş olabilir. Bütün bu şerâitten daha elim ve daha vahim olmak üzere, memleketin dâhilinde iktidara sahip olanlar gaflet ve dalâlet ve hattâ hıyanet içinde bulunabilirler. Hattâ bu iktidar sahipleri şahsî menfaatlerini, müstevlilerin siyasî emelleriyle tevhit edebilirler. Millet, fakr ü zaruret içinde harap ve bîtap düşmüş olabilir.

Ey Türk istikbalinin evlâdı! İşte, bu ahval ve şerâit içinde dahi vazifen, Türk İstiklâl ve Cumhuriyetini kurtarmaktır! Muhtaç olduğun kudret, damarlarındaki asil kanda mevcuttur!
`;

    if (gencligeHitabe) { // gencligeHitabe elementinin varlığını kontrol et
        gencligeHitabe.textContent = hitabeMetni; // Metni pre etiketine yerleştir
    }
    
    if (ataturkGif && hitabeContainer) { // Her iki elementin de varlığını kontrol et
        ataturkGif.addEventListener('click', () => {
            hitabeContainer.classList.toggle('hitabe-visible');
            // Gençliğe Hitabe açıldığında scroll'u en üste getir
            if (hitabeContainer.classList.contains('hitabe-visible')) {
                hitabeContainer.scrollTop = 0;
            }
        });

        // Hitabe açıkken dışarı tıklayınca kapatma
        hitabeContainer.addEventListener('click', (event) => {
            if (event.target === hitabeContainer) { // Sadece kapsayıcıya tıklanırsa kapat
                hitabeContainer.classList.remove('hitabe-visible');
            }
        });

        // ESC tuşuna basıldığında hitabeyi kapatma
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && hitabeContainer.classList.contains('hitabe-visible')) {
                hitabeContainer.classList.remove('hitabe-visible');
            }
        });
    }
    // === ATATÜRK GIF VE GENÇLİĞE HİTABE LOGİĞİ SONU ===) {

    // === SAYFA GEÇİŞLERİ ===
    const navLinkElements = document.querySelectorAll('.nav-link');
    const sayfalar = document.querySelectorAll('.sayfa');
    navLinkElements.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
                sayfalar.forEach(s => s.classList.remove('aktif'));
                document.getElementById(targetId).classList.add('aktif');
// Sayfa geçişlerinde tüm modal pencereleri kapat
                modals.forEach(modal => {
            if (modal) {
                modal.style.display = "none";
                }
            });
// Gençliğe Hitabe modalını da kapat
if (hitabeContainer) { // hitabeContainer'ın tanımlı olduğundan emin olalım
    hitabeContainer.classList.remove('hitabe-visible');
}
        });
    });

    // === MODAL ELEMENTLERİ ===
    const projeModal = document.getElementById('proje-modal');
    const demoModal = document.getElementById('demo-modal');
    const modals = [projeModal, demoModal];

    modals.forEach(modal => {
        if (modal) {
            const closeButton = modal.querySelector('.close-button');
            if (closeButton) { // closeButton'ın varlığını kontrol et
                closeButton.onclick = () => modal.style.display = "none";
            }
        }
    });

    window.onclick = event => {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    };

    // === AKSİYON BUTONLARI ===
    document.body.addEventListener('click', function(event) {

        // Kodu Göster/Gizle
        if (event.target.matches('.btn-goster')) {
            const wrapper = event.target.closest('.kod-blogu-wrapper');
            const kodBlok = wrapper.querySelector('.kod-blogu');
            kodBlok.classList.toggle('acik');
            event.target.textContent = kodBlok.classList.contains('acik') ? 'Kodu Gizle' : 'Kodu Göster';
        }

        // Kopyala
        if (event.target.matches('.btn-kopyala')) {
            const wrapper = event.target.closest('.kod-blogu');
            const kod = wrapper.querySelector('code').innerText;
            navigator.clipboard.writeText(kod).then(() => {
                event.target.classList.add('kopyalandi');
                setTimeout(() => event.target.classList.remove('kopyalandi'), 1500);
            });
        }

        // Demo
        if (event.target.matches('.btn-demo')) {
            const kodId = event.target.dataset.id;
            const kodData = tumVeri.kodlar.find(k => k.id === kodId);
            if(kodData) demoyuBaslat(kodData);
        }
    });

    // VERİLERİ YÜKLE
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
            </div>`;
        });

        projeModal.style.display = "block";
    }

    // === DEMO BAŞLATMA ===
    function demoyuBaslat(kodData) {
        const title = document.getElementById('demo-modal-title');
        const content = document.getElementById('demo-modal-content');
        title.textContent = kodData.baslik;
        content.innerHTML = '';

        // JS mantığıyla tüm demo id'leri
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
                    if (isNaN(tahmin)) {
                        sonuc.textContent = 'Lütfen geçerli bir sayı girin.';
                        return;
                    }
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
                    if (isNaN(uzunluk) || uzunluk < 4 || uzunluk > 32) {
                        document.getElementById('sifreSonuc').textContent = 'Lütfen 4 ile 32 arasında bir uzunluk girin.';
                        return;
                    }
                    const karakterler = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%&*?";
                    let sifre = '';
                    for (let i = 0; i < uzunluk; i++) {
                        sifre += karakterler.charAt(Math.floor(Math.random() * karakterler.length));
                    }
                    document.getElementById('sifreSonuc').textContent = `Oluşturulan Şifre: ${sifre}`;
                });
                break;

            case 'html-karanlik-mod':
                content.innerHTML = `
                    <style>
                        #demo-karanlik-mod-body {
                            font-family: Arial, sans-serif;
                            transition: background 0.5s, color 0.5s;
                            background: #f0f0f0;
                            color: #333;
                            text-align: center;
                            padding-top: 20px;
                            min-height: 150px;
                            border-radius: 8px;
                            border: 1px solid #ccc;
                            margin-top: 20px;
                        }
                        #demo-karanlik-mod-body.dark {
                            background: #222;
                            color: white;
                        }
                        #demo-karanlik-mod-body label {
                            cursor: pointer;
                            font-size: 18px;
                            display: inline-flex;
                            align-items: center;
                            gap: 8px;
                        }
                        #demo-karanlik-mod-body input[type="checkbox"] {
                            width: 20px;
                            height: 20px;
                            accent-color: #4cafef;
                            transform: scale(1.2);
                            transition: transform 0.2s ease;
                        }
                        #demo-karanlik-mod-body input[type="checkbox"]:hover {
                            transform: scale(1.4);
                        }
                    </style>
                    <div id="demo-karanlik-mod-body">
                        <label>
                            <input type="checkbox" id="demoThemeCheckbox">
                            Karanlık Mod
                        </label>
                        <p>Bu bir örnek içeriktir.</p>
                    </div>
                `;
                const demoCheckbox = content.querySelector("#demoThemeCheckbox");
                const demoBody = content.querySelector("#demo-karanlik-mod-body");
                if (demoCheckbox && demoBody) {
                    demoCheckbox.addEventListener("change", () => {
                        demoBody.classList.toggle("dark", demoCheckbox.checked);
                    });
                }
                break;

            case 'python-sifreli-liste-yoneticisi':
                let demoListeSifre = '1234'; // Basit bir demo şifresi
                let demoListe = [];
                content.innerHTML = `
                    <p>Demo şifresi: <strong>${demoListeSifre}</strong></p>
                    <input type="password" id="sifreGirisInput" placeholder="Şifreyi Girin">
                    <div id="yoneticiKontrolleri" style="display:none; margin-top:10px;">
                        <input type="text" id="ekleCikarInput" placeholder="Eleman Ekle/Çıkar">
                        <button id="ekleBtn" class="btn">Ekle</button>
                        <button id="cikarBtn" class="btn">Çıkar</button>
                        <button id="gosterBtn" class="btn">Listeyi Göster</button>
                    </div>
                    <p id="listeSonuc"></p>
                `;

                const sifreGirisInput = document.getElementById('sifreGirisInput');
                const yoneticiKontrolleri = document.getElementById('yoneticiKontrolleri');
                const ekleCikarInput = document.getElementById('ekleCikarInput');
                const ekleBtn = document.getElementById('ekleBtn');
                const cikarBtn = document.getElementById('cikarBtn');
                const gosterBtn = document.getElementById('gosterBtn');
                const listeSonuc = document.getElementById('listeSonuc');

                if (sifreGirisInput && yoneticiKontrolleri && ekleCikarInput && ekleBtn && cikarBtn && gosterBtn && listeSonuc) {
                    sifreGirisInput.addEventListener('input', () => {
                        if (sifreGirisInput.value === demoListeSifre) {
                            yoneticiKontrolleri.style.display = 'block';
                            listeSonuc.textContent = "Giriş başarılı!";
                        } else {
                            yoneticiKontrolleri.style.display = 'none';
                            listeSonuc.textContent = "Yanlış şifre!";
                        }
                    });

                    ekleBtn.addEventListener('click', () => {
                        const eleman = ekleCikarInput.value.trim();
                        if (eleman) {
                            demoListe.push(eleman);
                            listeSonuc.textContent = `'${eleman}' listeye eklendi.`;
                            ekleCikarInput.value = '';
                        } else {
                            listeSonuc.textContent = 'Lütfen bir eleman girin.';
                        }
                    });

                    cikarBtn.addEventListener('click', () => {
                        const eleman = ekleCikarInput.value.trim();
                        const index = demoListe.indexOf(eleman);
                        if (index > -1) {
                            demoListe.splice(index, 1);
                            listeSonuc.textContent = `'${eleman}' listeden çıkarıldı.`;
                            ekleCikarInput.value = '';
                        } else {
                            listeSonuc.textContent = `'${eleman}' listede bulunamadı.`;
                        }
                    });

                    gosterBtn.addEventListener('click', () => {
                        if (demoListe.length > 0) {
                            listeSonuc.textContent = `Liste: ${demoListe.join(', ')}`;
                        } else {
                            listeSonuc.textContent = 'Liste boş.';
                        }
                    });
                }
                break;

            case 'python-gelistirilmis-hesap-makinesi':
                content.innerHTML = `
                    <input type="number" id="sayi1" placeholder="Sayı 1">
                    <input type="number" id="sayi2" placeholder="Sayı 2 (Faktöriyel/Karekök hariç)">
                    <select id="islemSecimi">
                        <option value="toplama">Toplama (+)</option>
                        <option value="cikarma">Çıkarma (-)</option>
                        <option value="carpma">Çarpma (*)</option>
                        <option value="bolme">Bölme (/)</option>
                        <option value="us_alma">Üs Alma (^)</option>
                        <option value="faktoriyel">Faktöriyel (!)</option>
                        <option value="karekok">Karekök (√)</option>
                    </select>
                    <button id="hesaplaBtn" class="btn">Hesapla</button>
                    <p id="hesapSonuc"></p>
                `;

                const sayi1Input = document.getElementById('sayi1');
                const sayi2Input = document.getElementById('sayi2');
                const islemSecimi = document.getElementById('islemSecimi');
                const hesaplaBtn = document.getElementById('hesaplaBtn');
                const hesapSonuc = document.getElementById('hesapSonuc');

                if (sayi1Input && sayi2Input && islemSecimi && hesaplaBtn && hesapSonuc) {
                    hesaplaBtn.addEventListener('click', () => {
                        const s1 = parseFloat(sayi1Input.value);
                        const s2 = parseFloat(sayi2Input.value);
                        const islem = islemSecimi.value;
                        let sonuc;

                        if (isNaN(s1) && islem !== "faktoriyel" && islem !== "karekok") {
                            hesapSonuc.textContent = "Lütfen ilk sayıyı girin.";
                            return;
                        }

                        // Sayı 2'nin sadece gerekli işlemlerde kontrolü
                        if (isNaN(s2) && ['toplama', 'cikarma', 'carpma', 'bolme', 'us_alma'].includes(islem)) {
                            hesapSonuc.textContent = "Lütfen ikinci sayıyı girin.";
                            return;
                        }

                        switch (islem) {
                            case 'toplama':
                                sonuc = s1 + s2;
                                break;
                            case 'cikarma':
                                sonuc = s1 - s2;
                                break;
                            case 'carpma':
                                sonuc = s1 * s2;
                                break;
                            case 'bolme':
                                if (s2 === 0) {
                                    hesapSonuc.textContent = "Sıfıra bölme hatası!";
                                    return;
                                }
                                sonuc = s1 / s2;
                                break;
                            case 'us_alma':
                                sonuc = Math.pow(s1, s2);
                                break;
                            case 'faktoriyel':
                                if (isNaN(s1) || s1 < 0 || s1 % 1 !== 0) {
                                    hesapSonuc.textContent = "Faktöriyel için pozitif tam sayı girin.";
                                    return;
                                }
                                let fact = 1;
                                for (let i = 2; i <= s1; i++) {
                                    fact *= i;
                                }
                                sonuc = fact;
                                break;
                            case 'karekok':
                                if (isNaN(s1) || s1 < 0) {
                                    hesapSonuc.textContent = "Karekök için pozitif sayı girin.";
                                    return;
                                }
                                sonuc = Math.sqrt(s1);
                                break;
                            default:
                                sonuc = "Geçersiz işlem";
                        }
                        hesapSonuc.textContent = `Sonuç: ${sonuc}`;
                    });
                }
                break;

            case 'python-turtle-kalp':
                 content.innerHTML = `
                    <p>Bu demo, Python Turtle kütüphanesini taklit eder ve tarayıcıda bir kalp çizer.</p>
                    <canvas id="kalpCanvas" width="300" height="200" style="border:1px solid #d3d3d3; background-color: #f9f9f9;"></canvas>
                    <button id="kalpCizBtn" class="btn" style="margin-top: 10px;">Kalp Çiz</button>
                 `;
                 const kalpCanvas = document.getElementById('kalpCanvas');
                 const kalpCizBtn = document.getElementById('kalpCizBtn');

                 if (kalpCanvas && kalpCizBtn) {
                     const ctx = kalpCanvas.getContext('2d');
                     kalpCizBtn.addEventListener('click', () => {
                        ctx.clearRect(0, 0, kalpCanvas.width, kalpCanvas.height); // Kanvası temizle
                        ctx.strokeStyle = 'red';
                        ctx.fillStyle = 'red';
                        ctx.lineWidth = 3;

                        // Kanvasın ortasını orijin yapalım ve Y eksenini ters çevirelim (Turtle gibi)
                        ctx.save(); // Mevcut durumu kaydet
                        ctx.translate(kalpCanvas.width / 2, kalpCanvas.height / 2 + 50); // Ortaya yakın bir yere taşı
                        ctx.scale(1, -1); // Y eksenini ters çevir

                        ctx.beginPath();
                        ctx.moveTo(0, 0); // Başlangıç noktası
                        ctx.rotate(Math.PI / 180 * 50); // left(50)
                        ctx.lineTo(0, 133); // forward(133)

                        // İlk yay (circle(50, 200) simülasyonu)
                        // ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise)
                        // Turtle'ın soluna doğru (yeni koordinat sisteminde yukarıya doğru)
                        ctx.arc(-50, 133, 50, Math.PI / 2, Math.PI * 1.5, true); // Sol üst çeyrekten başlayıp aşağıya doğru

                        ctx.rotate(Math.PI / 180 * -140); // right(140)

                        // İkinci yay (diğer taraf)
                        ctx.arc(50, 133, 50, Math.PI * 1.5, Math.PI / 2, true); // Sağ alt çeyrekten başlayıp yukarıya doğru

                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();

                        ctx.restore(); // Kanvası eski durumuna döndür
                     });
                 }
                 break;

            // Buraya diğer demo id’lerini JS ile ekleyebilirsin
        }

        demoModal.style.display = 'block';
    }

    verileriYukle();
});


