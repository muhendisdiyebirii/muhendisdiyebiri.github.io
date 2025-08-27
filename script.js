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
                demoCheckbox.addEventListener("change", () => {
                    demoBody.classList.toggle("dark", demoCheckbox.checked);
                });
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

                hesaplaBtn.addEventListener('click', () => {
                    const s1 = parseFloat(sayi1Input.value);
                    const s2 = parseFloat(sayi2Input.value);
                    const islem = islemSecimi.value;
                    let sonuc;

                    if (isNaN(s1) && islem !== "faktoriyel" && islem !== "karekok") {
                        hesapSonuc.textContent = "Lütfen ilk sayıyı girin.";
                        return;
                    }

                    if (isNaN(s2) && islem !== "faktoriyel" && islem !== "karekok" && islem !== "toplama" && islem !== "cikarma" && islem !== "carpma" && islem !== "bolme" && islem !== "us_alma") {
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
                break;

            case 'python-turtle-kalp':
                 content.innerHTML = `
                    <p>Bu demo, Python Turtle kütüphanesini taklit eder ve tarayıcıda bir kalp çizer.</p>
                    <canvas id="kalpCanvas" width="300" height="200" style="border:1px solid #d3d3d3;"></canvas>
                    <button id="kalpCizBtn" class="btn">Kalp Çiz</button>
                 `;
                 const kalpCanvas = document.getElementById('kalpCanvas');
                 const ctx = kalpCanvas.getContext('2d');
                 const kalpCizBtn = document.getElementById('kalpCizBtn');

                 kalpCizBtn.addEventListener('click', () => {
                    ctx.clearRect(0, 0, kalpCanvas.width, kalpCanvas.height); // Kanvası temizle
                    ctx.strokeStyle = 'red';
                    ctx.fillStyle = 'red';
                    ctx.lineWidth = 3;

                    // Turtle başlangıç noktası ve yönünü ayarla (yaklaşık olarak)
                    ctx.translate(kalpCanvas.width / 2, kalpCanvas.height / 2 + 30); // Ortaya yakın bir yere taşı
                    ctx.rotate(Math.PI / 180 * -50); // İlk dönüş

                    ctx.beginPath();
                    ctx.moveTo(0, 0); // Başlangıç noktası
                    ctx.lineTo(0, -133); // forward(133)

                    // İlk daire (approx)
                    ctx.arc(50, -133, 50, Math.PI, 0, false); // circle(50, 200) - 200 dereceyi simüle etmek biraz karmaşık, basit bir yay çizelim
                    
                    ctx.rotate(Math.PI / 180 * 140); // right(140)

                    // İkinci daire (approx)
                    ctx.arc(-50, -133, 50, Math.PI, 0, false);

                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Kanvası eski durumuna döndür
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                 });
                 break;

            // Buraya diğer demo id’lerini JS ile ekleyebilirsin
            // 'python-sinirsiz-mesaj' için demo eklenmemeli, güvenlik nedeniyle.
        }

        demoModal.style.display = 'block';
    }
