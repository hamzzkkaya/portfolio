# PROJE TALİMATI: PASTEL MİNİMALİST PORTFOLYO SİTESİ (BUN + ELYSIA + REACT)

## 1. TEMEL TEKNOLOJİ YIĞINI (STACK)
- **Runtime & Paket Yönetimi:** Tamamen Bun kullanılacak (npm/yarn kullanılmayacak).
- **Backend (Sunucu):** ElysiaJS.
- **Frontend:** React (TypeScript ile).
- **Styling:** Tailwind CSS.
- **Animasyonlar:** Framer Motion (Zorunlu).
- **Veri Kaynağı:** Yerel JSON dosyaları (İçerik Markdown formatında).

## 2. SUNUCU MİMARİSİ VE KRİTİK KURALLAR
- Proje `src/index.ts` üzerinden çalışmalı.
- `index.html` dosyası doğrudan import edilmelidir: `import index from "./index.html"`.
- **Yönlendirme Kuralı:** Elysia'da ana dizin tanımlanırken HTML verisi doğrudan parametre olarak geçilmelidir. 
  - *Doğru Kullanım:* `app.get('/', index)`
  - *Yanlış Kullanım:* `app.get('/', () => index)` (Fonksiyon içinde döndürülmemeli).
- Proje statik dosya sunumu ve API yönetimi için optimize edilmelidir.

## 3. TASARIM VE UI/UX PRENSİPLERİ
- **Renk Paleti:** - Arka plan: Göz yormayan, açık gri pastel tonları.
  - Vurgu Rengi: Laciverte dönmeyen, hafif parlak ve canlı bir pastel mavi.
- **Hissiyat:** Kompakt, modern ve "smooth" (pürüzsüz). 
- **Performans:** En eski cihazlarda ve mobil tarayıcılarda bile 60 FPS akıcılıkta çalışmalı, gram kasma olmamalıdır.
- **Animasyonlar (Framer Motion):** - Sayfa geçişleri, bileşenlerin ekrana girişi ve etkileşimli tüm öğeler için özel Framer Motion animasyonları kullanılmalı.
  - "Spring" efektli yumuşak geçişler ve pürüzsüz açılıp kapanma animasyonları standart olmalı.

## 4. SAYFA YAPISI VE İÇERİK YÖNETİMİ
Tüm metin içerikleri `public/data/` altındaki JSON dosyalarından çekilecektir. JSON içindeki veriler Markdown formatında tutulacak ve sitede bu formata uygun render edilecektir.

1. **Giriş (Home):** Modern bir intro, kısa tanıtım ve sosyal medya yönlendirmeleri.
2. **Hakkımda (About):** Eğitim durumunu gösteren animasyonlu bir yol haritası (Roadmap).
3. **Projeler:** Geliştirilen projelerin ve bağlantıların bulunduğu bir Hub/Galeri.
4. **Blog:** Markdown yazılarının pürüzsüzce görüntülendiği bir liste ve okuma sayfası.

## 5. GELİŞTİRME YOL HARİTASI
- **Aşama 1:** Bun ile React + TS + Tailwind projesini başlat ve Elysia sunucu yapısını kur.
- **Aşama 2:** JSON verilerini çekecek ve Markdown içeriğini parse edecek (render edecek) yapıyı kur.
- **Aşama 3:** Framer Motion ile `AnimatePresence` tabanlı sayfa geçişlerini ve ana Layout'u oluştur.
- **Aşama 4:** Sayfaları (Home, About, Projects, Blog) şartnamede belirtilen görsel kaliteye göre tek tek geliştir.
- **Aşama 5:** Tüm cihazlar için optimizasyon testlerini yap ve performansı maksimize et.

---
**NOT:** Bu talimat setine harfiyen uyulmalı, özellikle Elysia tarafındaki parametre geçiş kuralı ve animasyonlardaki akıcılık projenin önceliğidir.