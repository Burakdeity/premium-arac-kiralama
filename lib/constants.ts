import type {
  Vehicle,
  BlogPost,
  Review,
  Campaign,
  FAQ,
  Location,
  ExtraService,
  Reservation,
  ReservationFormData,
  VehicleFilters,
  ContactFormData,
} from "./types";
import { img } from "./placeholders";

export const SITE_NAME = "RK Rent A Car";
export const SITE_TAGLINE = "Konforunuz, Bizim Yolculuğumuz";
export const SITE_DESCRIPTION =
  "RK Rent A Car ile konforlu ve güvenilir araç kiralama deneyimi. Premium filo, havalimanı teslimat ve 7/24 destek.";

export const CONTACT = {
  phone: "+90 538 833 67 34",
  email: "rkrentacars@gmail.com",
  address: "Karakamış Cad., No:9, Tekeler Mah., Adapazarı, Sakarya",
  lat: 40.7952,
  lng: 30.3912,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "905388336734",
  workingHours: "7/24 Hizmet",
};

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/premiumarackiralama",
  facebook: "https://facebook.com/premiumarackiralama",
  twitter: "https://twitter.com/premiumarackiralama",
  linkedin: "https://linkedin.com/company/premiumarackiralama",
};

export const VEHICLE_CATEGORIES = [
  { value: "economy", labelKey: "categories.economy" },
  { value: "compact", labelKey: "categories.compact" },
  { value: "sedan", labelKey: "categories.sedan" },
  { value: "suv", labelKey: "categories.suv" },
  { value: "luxury", labelKey: "categories.luxury" },
  { value: "van", labelKey: "categories.van" },
  { value: "premium", labelKey: "categories.premium" },
] as const;

export const MOCK_LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Sabiha Gökçen Havalimanı (SAW)",
    address: "Sabiha Gökçen Uluslararası Havalimanı, Pendik",
    city: "İstanbul",
    phone: "+90 216 555 00 02",
    isAirport: true,
  },
  {
    id: 2,
    name: "Sakarya",
    address: "Karakamış Cad., No:9, Tekeler Mah., Adapazarı, Sakarya",
    city: "Sakarya",
    phone: "+90 538 833 67 34",
    isAirport: false,
  },
];

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 1,
    slug: "mercedes-benz-e-class",
    name: "Mercedes-Benz E-Class",
    brand: "Mercedes-Benz",
    model: "E 200",
    year: 2024,
    category: "luxury",
    transmission: "automatic",
    fuel: "hybrid",
    seats: 5,
    doors: 4,
    luggage: 3,
    dailyPrice: 3500,
    weeklyPrice: 21000,
    monthlyPrice: 75000,
    image: img.car(1),
    images: [img.car(1, 1200), img.carExtra(1, 1), img.carExtra(1, 2)],
    features: ["GPS", "Bluetooth", "Deri Koltuk", "Sunroof", "Adaptif Cruise", "360° Kamera"],
    description:
      "Mercedes-Benz E-Class, lüks sedan segmentinin öncüsü. Konfor, teknoloji ve güvenliği bir arada sunan bu araç, iş seyahatleriniz ve özel günleriniz için ideal tercih.",
    isFeatured: true,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: 2,
    slug: "bmw-x5",
    name: "BMW X5",
    brand: "BMW",
    model: "xDrive40i",
    year: 2024,
    category: "suv",
    transmission: "automatic",
    fuel: "petrol",
    seats: 5,
    doors: 4,
    luggage: 4,
    dailyPrice: 4200,
    weeklyPrice: 25200,
    monthlyPrice: 90000,
    image: img.car(2),
    images: [img.car(2, 1200), img.carExtra(2, 1)],
    features: ["4x4", "Panoramik Cam Tavan", "Deri Koltuk", "Apple CarPlay", "Park Asistanı"],
    description:
      "BMW X5, SUV segmentinin en prestijli modellerinden biri. Geniş iç hacmi ve üstün sürüş dinamikleri ile aile ve iş seyahatleriniz için mükemmel.",
    isFeatured: true,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 95,
  },
  {
    id: 3,
    slug: "audi-a6",
    name: "Audi A6",
    brand: "Audi",
    model: "45 TFSI",
    year: 2023,
    category: "sedan",
    transmission: "automatic",
    fuel: "petrol",
    seats: 5,
    doors: 4,
    luggage: 3,
    dailyPrice: 2800,
    weeklyPrice: 16800,
    monthlyPrice: 60000,
    image: img.car(3),
    images: [img.car(3, 1200)],
    features: ["Quattro", "Virtual Cockpit", "Matrix LED", "Deri Koltuk", "Adaptif Süspansiyon"],
    description:
      "Audi A6, teknoloji ve zarafeti bir arada sunan executive sedan. Quattro dört tekerlekten çekiş sistemi ile her yol koşulunda güvenli sürüş.",
    isFeatured: true,
    isAvailable: true,
    rating: 4.7,
    reviewCount: 76,
  },
  {
    id: 4,
    slug: "volkswagen-passat",
    name: "Volkswagen Passat",
    brand: "Volkswagen",
    model: "1.5 TSI",
    year: 2023,
    category: "sedan",
    transmission: "automatic",
    fuel: "petrol",
    seats: 5,
    doors: 4,
    luggage: 3,
    dailyPrice: 1500,
    weeklyPrice: 9000,
    monthlyPrice: 32000,
    image: img.car(4),
    images: [img.car(4, 1200)],
    features: ["ACC", "Lane Assist", "Bluetooth", "Klima", "Cruise Control"],
    description:
      "Volkswagen Passat, geniş bagaj hacmi ve konforlu sürüşü ile uzun yol seyahatlerinin vazgeçilmezi.",
    isFeatured: false,
    isAvailable: true,
    rating: 4.5,
    reviewCount: 142,
  },
  {
    id: 5,
    slug: "range-rover-evoque",
    name: "Range Rover Evoque",
    brand: "Land Rover",
    model: "P250",
    year: 2024,
    category: "premium",
    transmission: "automatic",
    fuel: "petrol",
    seats: 5,
    doors: 4,
    luggage: 3,
    dailyPrice: 3800,
    weeklyPrice: 22800,
    monthlyPrice: 82000,
    image: img.car(5),
    images: [img.car(5, 1200)],
    features: ["Terrain Response", "Meridian Ses", "Deri Koltuk", "Panoramik Tavan", "4x4"],
    description:
      "Range Rover Evoque, kompakt SUV segmentinde lüksün tanımını yeniden yazıyor. Şık tasarım ve off-road yetenekleri bir arada.",
    isFeatured: true,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 63,
  },
  {
    id: 6,
    slug: "mercedes-vito",
    name: "Mercedes Vito",
    brand: "Mercedes-Benz",
    model: "Tourer",
    year: 2023,
    category: "van",
    transmission: "automatic",
    fuel: "diesel",
    seats: 8,
    doors: 4,
    luggage: 6,
    dailyPrice: 2500,
    weeklyPrice: 15000,
    monthlyPrice: 54000,
    image: img.car(6),
    images: [img.car(6, 1200)],
    features: ["8 Kişilik", "Klima", "Bluetooth", "Geniş Bagaj", "Kayar Kapı"],
    description:
      "Mercedes Vito Tourer, grup seyahatleri ve transfer hizmetleri için ideal. 8 kişilik konforlu iç mekan.",
    isFeatured: false,
    isAvailable: true,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: 7,
    slug: "toyota-corolla",
    name: "Toyota Corolla",
    brand: "Toyota",
    model: "1.6 Hybrid",
    year: 2023,
    category: "compact",
    transmission: "automatic",
    fuel: "hybrid",
    seats: 5,
    doors: 4,
    luggage: 2,
    dailyPrice: 900,
    weeklyPrice: 5400,
    monthlyPrice: 19000,
    image: img.car(7),
    images: [img.car(7, 1200)],
    features: ["Hybrid", "Toyota Safety Sense", "Bluetooth", "Klima", "Yakıt Tasarrufu"],
    description:
      "Toyota Corolla Hybrid, ekonomik ve çevre dostu sürüş deneyimi sunar. Şehir içi kullanım için mükemmel tercih.",
    isFeatured: false,
    isAvailable: true,
    rating: 4.4,
    reviewCount: 201,
  },
  {
    id: 8,
    slug: "porsche-cayenne",
    name: "Porsche Cayenne",
    brand: "Porsche",
    model: "S",
    year: 2024,
    category: "luxury",
    transmission: "automatic",
    fuel: "petrol",
    seats: 5,
    doors: 4,
    luggage: 4,
    dailyPrice: 6500,
    weeklyPrice: 39000,
    monthlyPrice: 140000,
    image: img.car(8),
    images: [img.car(8, 1200)],
    features: ["Sport Chrono", "Bose Ses", "Deri Koltuk", "Panoramik Tavan", "PDCC"],
    description:
      "Porsche Cayenne, spor otomobil DNA'sını SUV gövdesinde birleştiriyor. Performans ve lüksün zirvesi.",
    isFeatured: true,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 45,
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "istanbulda-arac-kiralama-rehberi",
    title: "İstanbul'da Araç Kiralama Rehberi: Bilmeniz Gereken Her Şey",
    excerpt:
      "İstanbul'da araç kiralarken dikkat etmeniz gereken noktalar, en iyi lokasyonlar ve pratik ipuçları.",
    content: `<p>İstanbul, Türkiye'nin en büyük şehri olarak araç kiralama hizmetlerinin en yoğun olduğu bölgelerden biridir. Bu rehberde, İstanbul'da araç kiralarken bilmeniz gereken tüm detayları bulacaksınız.</p>
    <h2>Havalimanı mı, Şehir Merkezi mi?</h2>
    <p>İstanbul Havalimanı (IST) ve Sabiha Gökçen (SAW) havalimanlarında 7/24 araç kiralama hizmeti sunulmaktadır. Uçuşunuzun varış saatine göre aracınız hazır olacaktır.</p>
    <h2>Gerekli Belgeler</h2>
    <p>Araç kiralamak için geçerli ehliyet, kimlik ve kredi kartı gereklidir. Uluslararası ehliyet yabancı müşteriler için zorunludur.</p>`,
    image: img.blog(1),
    author: "Premium Ekibi",
    publishedAt: "2024-11-15",
    category: "Rehber",
    readTime: 8,
  },
  {
    id: 2,
    slug: "kis-aylarinda-guvenli-suruculuk",
    title: "Kış Aylarında Güvenli Sürüş İpuçları",
    excerpt:
      "Karlı ve buzlu yollarda güvenli sürüş için uzman tavsiyeleri ve dikkat edilmesi gerekenler.",
    content: `<p>Kış aylarında sürüş, ekstra dikkat ve hazırlık gerektirir. İşte güvenli bir kış yolculuğu için ipuçları.</p>
    <h2>Kış Lastiği</h2>
    <p>Kış lastiği kullanımı, buzlu yollarda fren mesafesini %40'a kadar azaltabilir.</p>`,
    image: img.blog(2),
    author: "Premium Ekibi",
    publishedAt: "2024-12-01",
    category: "Güvenlik",
    readTime: 5,
  },
  {
    id: 3,
    slug: "luks-arac-kiralama-avantajlari",
    title: "Lüks Araç Kiralamanın Avantajları",
    excerpt:
      "İş seyahatlerinde ve özel günlerde lüks araç kiralamanın size sağlayacağı faydalar.",
    content: `<p>Lüks araç kiralama, sadece bir ulaşım tercihi değil, aynı zamanda bir yaşam tarzı ifadesidir.</p>`,
    image: img.blog(3),
    author: "Premium Ekibi",
    publishedAt: "2024-10-20",
    category: "Lifestyle",
    readTime: 6,
  },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Mehmet K.",
    rating: 5,
    comment:
      "SAW'dan indiğimde araç kapıda hazırdı. Fiat Egea tertemiz ve depo ful teslim edildi, evrak işi 10 dakikada bitti.",
    date: "2025-01-14",
    vehicleName: "Fiat Egea",
  },
  {
    id: 2,
    name: "Ayşe T.",
    rating: 5,
    comment:
      "Düğünümüz için Passat kiraladık. Adapazarı içi teslimat ücretsizdi, araç süslemeli ve zamanında geldi.",
    date: "2024-12-22",
    vehicleName: "Volkswagen Passat",
  },
  {
    id: 3,
    name: "Can Ö.",
    rating: 4,
    comment:
      "7 günlük kiralama yaptım. Fiyat telefonda söylenenle aynı çıktı. Teslimat 20 dk gecikti ama önceden haber verdiler.",
    date: "2025-02-03",
    vehicleName: "Renault Clio",
  },
  {
    id: 4,
    name: "Burcu A.",
    rating: 5,
    comment:
      "Sapanca hafta sonu için SUV aldık. Çocuk koltuğu takıldı, WhatsApp'tan gece bile cevap verdiler. Kesinlikle tavsiye.",
    date: "2025-01-28",
    vehicleName: "BMW X5",
  },
  {
    id: 5,
    name: "Hüseyin D.",
    rating: 5,
    comment:
      "Şirket adına aylık kiralama yaptık. Kurumsal fatura ve km takibi düzenli, Mercedes C200 sıfır ayarında.",
    date: "2024-11-08",
    vehicleName: "Mercedes-Benz C200",
  },
  {
    id: 6,
    name: "Emre Y.",
    rating: 5,
    comment:
      "Gece 01:00'de SAW'ya bıraktım, kapıda teslim aldılar. Rezervasyonu sabah arayıp 5 dakikada netleştirdik.",
    date: "2025-02-11",
    vehicleName: "Hyundai i20",
  },
  {
    id: 7,
    name: "Selin M.",
    rating: 4,
    comment:
      "Araç çok temizdi. Navigasyon biraz eskiydi ama CarPlay ile hallettik. Genel deneyim gayet iyiydi.",
    date: "2024-12-05",
    vehicleName: "Opel Corsa",
  },
  {
    id: 8,
    name: "Oğuzhan P.",
    rating: 5,
    comment:
      "Karasu tatiline gittik. Yakıt dolu teslim, dolu iade. Km sınırı ve depozito baştan şeffaf anlatıldı.",
    date: "2025-01-19",
    vehicleName: "Dacia Duster",
  },
  {
    id: 9,
    name: "Fatma Ş.",
    rating: 5,
    comment:
      "İlk kez araç kiraladım, çok endişeliydim. Ekip sabırla anlattı, ehliyet ve evrak işi çabuk bitti.",
    date: "2024-10-17",
    vehicleName: "Toyota Corolla",
  },
  {
    id: 10,
    name: "Kerem A.",
    rating: 5,
    comment:
      "Babamın hastane randevuları için 3 aydır aynı ekipten alıyoruz. Her seferinde aynı kalite, güven verdiler.",
    date: "2025-02-01",
    vehicleName: "Fiat Egea",
  },
  {
    id: 11,
    name: "Zehra K.",
    rating: 5,
    comment:
      "Sabiha Gökçen'den alıp Adapazarı'na döndük. Yol tarifi attılar, araçta su ve mendil bile vardı. İlgililer.",
    date: "2024-11-26",
    vehicleName: "Renault Megane",
  },
  {
    id: 12,
    name: "Murat E.",
    rating: 4,
    comment:
      "Depozito ertesi iş günü iade edildi. Kapıda küçük bir çizik vardı, önceden fotoğraflayıp not düşmüşler.",
    date: "2024-12-14",
    vehicleName: "Volkswagen Polo",
  },
  {
    id: 13,
    name: "Gizem L.",
    rating: 5,
    comment:
      "Serdivan'a teslimat istedim, ofisten getirdiler. İadeyi de kapıya bırakarak yaptım, çok pratik bir sistem.",
    date: "2025-01-07",
    vehicleName: "Peugeot 301",
  },
  {
    id: 14,
    name: "Yusuf B.",
    rating: 5,
    comment:
      "Yurt dışından gelen misafirim için kiraladık. Havalimanında isim tabelası vardı, İngilizce destek sağladılar.",
    date: "2024-10-30",
    vehicleName: "BMW 320i",
  },
  {
    id: 15,
    name: "Deniz R.",
    rating: 5,
    comment:
      "Yolda lastik sorunu yaşadık, 2 saat içinde yedek araç gönderdiler. Sakarya içi destek gerçekten hızlı.",
    date: "2025-02-15",
    vehicleName: "Audi A3",
  },
  {
    id: 16,
    name: "Hakan Ç.",
    rating: 4,
    comment:
      "Biraz pahalı geldi açıkçası ama araç yeni gibiydi. E-Class ile iş toplantısına gittim, kurumsal görünüm tam istediğim gibi.",
    date: "2024-11-12",
    vehicleName: "Mercedes-Benz E-Class",
  },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    title: "SAW Havalimanı Teslim",
    description:
      "İstanbul Sabiha Gökçen çıkışlı kiralamalarda araç teslimi ve iade kolaylığı — %10 indirim",
    discount: 10,
    code: "SAW10",
    validUntil: "2026-12-31",
    image: img.campaignCar(1),
  },
  {
    id: 2,
    title: "Haftalık Kiralama Avantajı",
    description:
      "7 gün ve üzeri kiralamalarda günlük fiyat %15 düşük — Sakarya ve çevresi gezileri için ideal",
    discount: 15,
    validUntil: "2026-12-31",
    image: img.campaignCar(2),
  },
  {
    id: 3,
    title: "Sakarya Yerel Müşteri",
    description:
      "Adapazarı ve Sakarya ilçelerinden rezervasyon yapanlara özel %10 indirim",
    discount: 10,
    code: "SAKARYA10",
    validUntil: "2026-12-31",
    image: img.campaignCar(3),
  },
];

export const MOCK_FAQS: FAQ[] = [
  {
    id: 1,
    question: "Araç kiralamak için hangi belgeler gereklidir?",
    answer:
      "Geçerli sürücü belgesi (en az 1 yıllık), kimlik veya pasaport ve kredi kartı gereklidir. Yabancı uyruklu müşteriler için uluslararası sürücü belgesi zorunludur.",
  },
  {
    id: 2,
    question: "Minimum kiralama süresi nedir?",
    answer:
      "Minimum kiralama süremiz 1 gündür. Günlük, haftalık ve aylık kiralama seçeneklerimiz mevcuttur.",
  },
  {
    id: 3,
    question: "Sigorta dahil mi?",
    answer:
      "Tüm araçlarımızda tam kasko sigortası dahildir. Ek olarak süper kasko ve mini hasar sigortası seçenekleri sunuyoruz.",
  },
  {
    id: 4,
    question: "Farklı şehirde teslim edebilir miyim?",
    answer:
      "Evet, tek yön kiralama hizmetimiz mevcuttur. Farklı lokasyonda teslim için ek ücret uygulanabilir.",
  },
  {
    id: 5,
    question: "İptal ve değişiklik politikası nedir?",
    answer:
      "Rezervasyonunuzu teslim tarihinden 24 saat öncesine kadar ücretsiz iptal edebilirsiniz. Değişiklikler için müşteri hizmetlerimizle iletişime geçin.",
  },
  {
    id: 6,
    question: "Havalimanı teslimatı yapılıyor mu?",
    answer:
      "Evet, İstanbul, Ankara, İzmir ve Antalya havalimanlarında 7/24 teslimat hizmeti sunuyoruz.",
  },
];

export const MOCK_EXTRA_SERVICES: ExtraService[] = [
  {
    id: 1,
    name: "Ek Sürücü",
    description: "Rezervasyona ek sürücü ekleyin",
    dailyPrice: 150,
    icon: "user-plus",
  },
  {
    id: 2,
    name: "Bebek Koltuğu",
    description: "0-13 kg bebek koltuğu",
    dailyPrice: 100,
    icon: "baby",
  },
  {
    id: 3,
    name: "GPS Navigasyon",
    description: "Türkiye haritalı GPS cihazı",
    dailyPrice: 75,
    icon: "navigation",
  },
  {
    id: 4,
    name: "Süper Kasko",
    description: "Muafiyetsiz tam kasko sigortası",
    dailyPrice: 200,
    icon: "shield",
    category: "insurance",
  },
  {
    id: 5,
    name: "Wi-Fi Hotspot",
    description: "Sınırsız mobil internet",
    dailyPrice: 50,
    icon: "wifi",
  },
  {
    id: 6,
    name: "Havalimanı Karşılama",
    description: "Terminal çıkışında karşılama",
    dailyPrice: 250,
    icon: "plane",
    category: "delivery",
  },
  {
    id: 7,
    name: "Full Kasko",
    description: "Muafiyetsiz tam kapsamlı kasko",
    dailyPrice: 280,
    icon: "shield-check",
    category: "insurance",
  },
  {
    id: 8,
    name: "HGS/OGS Paketi",
    description: "Otoyol geçiş cihazı dahil",
    dailyPrice: 80,
    icon: "credit-card",
    category: "tech",
  },
  {
    id: 9,
    name: "Yakıt Paketi (Full)",
    description: "Dolu depo teslim, boş iade",
    dailyPrice: 350,
    icon: "fuel",
    category: "fuel",
  },
  {
    id: 10,
    name: "VIP Teslimat",
    description: "Kapıda / adrese özel teslim",
    dailyPrice: 400,
    icon: "crown",
    category: "delivery",
  },
  {
    id: 11,
    name: "Wi-Fi Cihazı",
    description: "Taşınabilir 4G hotspot",
    dailyPrice: 60,
    icon: "wifi",
    category: "tech",
  },
];

export const MOCK_RESERVATION: Reservation = {
  reservationNumber: "PRM-2024-001234",
  vehicle: MOCK_VEHICLES[0],
  pickupLocation: "Sakarya",
  returnLocation: "Sakarya",
  pickupDate: "2024-12-20",
  returnDate: "2024-12-27",
  customerName: "Ahmet Yılmaz",
  customerEmail: "ahmet@example.com",
  customerPhone: "+90 532 123 4567",
  extras: [MOCK_EXTRA_SERVICES[3]],
  totalPrice: 25900,
  status: "confirmed",
  createdAt: "2024-12-01T10:30:00Z",
};

export type {
  Vehicle,
  BlogPost,
  Review,
  Campaign,
  FAQ,
  Location,
  ExtraService,
  Reservation,
  ReservationFormData,
  VehicleFilters,
  ContactFormData,
};
