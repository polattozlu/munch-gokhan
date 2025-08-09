
'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export default function About() {
  const { getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-orange-600 cursor-pointer" style={{fontFamily: 'var(--font-pacifico)'}}>
                Munch
              </Link>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/restaurants" className="text-gray-700 hover:text-orange-600 cursor-pointer">
                Restoranlar
              </Link>
              <Link href="/orders" className="text-gray-700 hover:text-orange-600 cursor-pointer">
                Siparişlerim
              </Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-orange-600 cursor-pointer">
                Giriş Yap
              </Link>
              {getTotalItems() > 0 && (
                <Link href="/cart" className="relative bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap">
                  Sepet ({getTotalItems()})
                </Link>
              )}
              <Link href="/register-restaurant" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap">
                Ortağımız Olun
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=modern%20food%20delivery%20team%20working%20together%20in%20a%20bright%20office%20space%20with%20computers%20and%20food%20delivery%20bags%2C%20professional%20atmosphere%20with%20warm%20lighting%20and%20diverse%20team%20members%20collaborating&width=1200&height=600&seq=about-hero&orientation=landscape)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Hakkımızda</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Munch, Türkiye'nin en güvenilir yemek sipariş platformu olarak 2023'ten beri milyonlarca müşteriye hizmet veriyor
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Hikayemiz</h2>
              <p className="text-lg text-gray-600 mb-6">
                Munch, üç arkadaşın üniversitede yaşadığı ortak bir sorundan doğdu. Geç saatlerde çalışırken kaliteli yemek bulmak zordu ve mevcut platformlar hem pahalı hem de güvenilir değildi.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Bu sorunu çözmek için 2023'te İstanbul'da kurduğumuz Munch, bugün 50+ şehirde 5000+ restoranla çalışıyor ve günlük 100.000+ siparişe ulaşmış durumda.
              </p>
              <p className="text-lg text-gray-600">
                Amacımız basit: Hem müşteriler hem de restoranlar için yemek siparişini en kolay, hızlı ve adil hale getirmek.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=three%20young%20entrepreneurs%20working%20on%20laptops%20in%20a%20modern%20startup%20office%2C%20diverse%20team%20members%20collaborating%20on%20food%20delivery%20app%20development%2C%20bright%20and%20inspiring%20workspace%20with%20plants%20and%20modern%20furniture&width=600&height=400&seq=story-image&orientation=landscape"
                alt="Munch Kurucu Ekibi"
                className="rounded-lg shadow-lg object-cover object-top w-full h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-target-line text-orange-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
              <p className="text-gray-600 text-lg">
                Türkiye'deki her eve ve ofise kaliteli yemekleri en hızlı, güvenilir ve ekonomik şekilde ulaştırmak. 
                Yerel işletmeleri destekleyerek hem müşteri hem de restoran memnuniyetini en üst düzeye çıkarmak.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-eye-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h3>
              <p className="text-gray-600 text-lg">
                2025'e kadar Türkiye'nin 1 numaralı yemek sipariş platformu olmak ve bölgesel expansion ile 
                Orta Doğu ve Balkanlar'da da hizmet veren global bir marka haline gelmek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Munch'ı bugünkü konumuna getiren ve gelecekte de yol gösterici olacak temel değerlerimiz
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-leaf-line text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sürdürülebilirlik</h3>
              <p className="text-gray-600">
                Çevre dostu ambalajlar ve yerel tedarikçiler ile sürdürülebilir bir gelecek için çalışıyoruz
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-heart-line text-orange-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Müşteri Odaklılık</h3>
              <p className="text-gray-600">
                Her kararımızı müşteri memnuniyetini artıracak şekilde alıyor, sürekli geri bildirimleri dinliyoruz
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-innovation-line text-purple-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">İnovasyon</h3>
              <p className="text-gray-600">
                Teknoloji ve yaratıcılığı birleştirerek yemek siparişi deneyimini sürekli geliştiriyoruz
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ekibimiz</h2>
            <p className="text-lg text-gray-600">
              Munch'ı başarıya ulaştıran deneyimli ve tutkulu ekibimizle tanışın
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <img
                src="https://readdy.ai/api/search-image?query=professional%20Turkish%20male%20CEO%20in%20business%20attire%20smiling%20confidently%20in%20modern%20office%20setting%2C%20clean%20background%20with%20warm%20lighting%2C%20executive%20portrait%20style&width=300&height=300&seq=ceo-portrait&orientation=squarish"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mehmet Kaya</h3>
              <p className="text-orange-600 mb-2">CEO & Kurucu Ortak</p>
              <p className="text-gray-600 text-sm">
                Boğaziçi Üniversitesi Endüstri Mühendisliği mezunu. 8 yıllık e-ticaret deneyimi.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <img
                src="https://readdy.ai/api/search-image?query=professional%20Turkish%20female%20CTO%20in%20casual%20business%20attire%20smiling%20warmly%20in%20tech%20office%20environment%2C%20modern%20background%20with%20computers%2C%20technology%20executive%20portrait&width=300&height=300&seq=cto-portrait&orientation=squarish"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ayşe Demir</h3>
              <p className="text-orange-600 mb-2">CTO & Kurucu Ortak</p>
              <p className="text-gray-600 text-sm">
                ODTÜ Bilgisayar Mühendisliği mezunu. Google ve Microsoft'ta 6 yıl çalıştı.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <img
                src="https://readdy.ai/api/search-image?query=professional%20Turkish%20male%20CMO%20in%20modern%20business%20attire%20smiling%20confidently%20in%20marketing%20office%20with%20creative%20elements%2C%20bright%20professional%20environment&width=300&height=300&seq=cmo-portrait&orientation=squarish"
                alt="CMO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Can Özkan</h3>
              <p className="text-orange-600 mb-2">CMO & Kurucu Ortak</p>
              <p className="text-gray-600 text-sm">
                Galatasaray Üniversitesi İşletme mezunu. Unilever ve P&G'de 5 yıl pazarlama deneyimi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2M+</div>
              <div className="text-orange-100">Aktif Kullanıcı</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-orange-100">Ortak Restoran</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-orange-100">Şehir</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-orange-100">Günlük Sipariş</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold" style={{fontFamily: 'var(--font-pacifico)'}}>Munch</h3>
              <p className="text-gray-400 mt-1">Lezzetli yemekler hızlıca kapınıza</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-gray-400 hover:text-white cursor-pointer">Hakkımızda</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white cursor-pointer">İletişim</Link>
              <Link href="/help" className="text-gray-400 hover:text-white cursor-pointer">Yardım</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; 2024 Munch. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}