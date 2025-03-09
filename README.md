# Not Uygulaması

Electron ve Vue.js kullanılarak geliştirilmiş, basit ve kullanışlı bir not alma masaüstü uygulaması. Karanlık ve aydınlık tema desteği ile birlikte gelen bu uygulama, notlarınızı yerel olarak saklar.

## Özellikler

- 🌓 Karanlık/Aydınlık tema desteği ve tema tercihi hatırlama
- 💾 Notları otomatik kaydetme ve yerel depolama
- 📝 Basit ve kullanıcı dostu arayüz
- 🗑️ Not silme özelliği
- 📱 Duyarlı tasarım ve özelleştirilmiş scrollbar
- 🖥️ Cross-platform destek (Windows, macOS, Linux)

## Kurulum ve Çalıştırma

1. Gerekli bağımlılıkları yükleyin:
```bash
npm install
```

2. Uygulamayı başlatın:
```bash
npm start
```

## Kullanılan Teknolojiler

### Ana Teknolojiler
- [Electron](https://www.electronjs.org/) (v35.0.0) - Cross platform masaüstü uygulama geliştirme framework'ü
- [Vue.js](https://vuejs.org/) (v3.2.36) - Frontend framework'ü

### Yardımcı Kütüphaneler
- [electron-store](https://github.com/sindresorhus/electron-store) (v10.0.1) - Veri depolama
- [Font Awesome](https://fontawesome.com/) (v6.0.0) - İkonlar

## Gereksinimler

- Node.js (>= 12.0.0)
- npm (>= 6.0.0)

## Proje Yapısı

- `main.js` - Electron ana süreç
- `renderer.js` - Vue.js uygulama kodu
- `index.html` - Ana HTML dosyası
- `style.css` - Uygulama stilleri
