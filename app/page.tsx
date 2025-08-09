
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useLocation } from '@/hooks/useLocation';
import { mapsApi } from '@/lib/maps';
import LocationSelector from '@/components/LocationSelector';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayRestaurants, setDisplayRestaurants] = useState<any[]>([]);
  const { restaurants, loading, error, searchRestaurants } = useRestaurants();
  const { userLocation } = useLocation();

  // Platform otomatik mesafe hesaplaması
  useEffect(() => {
    const updateRestaurantDisplay = async () => {
      if (restaurants.length === 0) {
        setDisplayRestaurants([]);
        return;
      }

      if (!userLocation) {
        // Konum yoksa varsayılan sıralama
        const defaultDisplay = restaurants.slice(0, 6).map(restaurant => ({
          ...restaurant,
          displayDistance: null,
          displayTime: restaurant.deliveryTime,
          displayFee: `₺${restaurant.deliveryFee}`
        }));
        setDisplayRestaurants(defaultDisplay);
        return;
      }

      try {
        const restaurantIds = restaurants.map(r => r.id);
        const distanceData = await mapsApi.getRestaurantsWithDistances(userLocation, restaurantIds);

        const updatedRestaurants = restaurants.map(restaurant => {
          const distInfo = distanceData.find(d => d.restaurantId === restaurant.id);
          return {
            ...restaurant,
            displayDistance: distInfo?.distance || null,
            displayTime: distInfo?.deliveryTime || restaurant.deliveryTime,
            displayFee: distInfo?.deliveryFee || `₺${restaurant.deliveryFee}`,
            sortOrder: distInfo?.sortOrder || 999
          };
        }).sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 6);

        setDisplayRestaurants(updatedRestaurants);
      } catch (error) {
        console.error('Platform mesafe hesaplama hatası:', error);
        // Hata durumunda varsayılan görünüm
        const defaultDisplay = restaurants.slice(0, 6).map(restaurant => ({
          ...restaurant,
          displayDistance: null,
          displayTime: restaurant.deliveryTime,
          displayFee: `₺${restaurant.deliveryFee}`
        }));
        setDisplayRestaurants(defaultDisplay);
      }
    };

    updateRestaurantDisplay();
  }, [userLocation, restaurants]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchRestaurants(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="cursor-pointer">
              <h1 className="text-2xl font-bold text-orange-600" style={{fontFamily: 'var(--font-pacifico)'}}>
                Munch
              </h1>
            </Link>
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
              <Link href="/auth/register" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap">
                Müşteri Kayıt
              </Link>
              <Link href="/auth/register-business" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap">
                Restoran Kayıt
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Location Selector */}
      <LocationSelector />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              En Lezzetli Yemekler
              <br />
              Kapınıza Kadar
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Binlerce restoran arasından seç, hızlı teslimat al
            </p>

            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="flex">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Restoran veya yemek ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-r-lg font-semibold cursor-pointer whitespace-nowrap"
                >
                  Ara
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {userLocation ? 'Size En Yakın Restoranlar' : 'Popüler Restoranlar'}
            </h3>
            <p className="text-gray-600">
              {userLocation ? `${userLocation.district} bölgesindeki en iyi restoranlar` : 'En çok tercih edilen lezzetler'}
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-error-warning-line text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Bir hata oluştu</h3>
              <p className="text-gray-600 mb-4">{error}</p>
            </div>
          )}

          {!loading && !error && displayRestaurants.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayRestaurants.map((restaurant) => (
                <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`} className="cursor-pointer">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
                        <div className="w-3 h-3 flex items-center justify-center mr-1">
                          <i className="ri-star-fill text-yellow-400 text-xs"></i>
                        </div>
                        {restaurant.rating}
                      </div>
                      {userLocation && restaurant.displayDistance && (
                        <div className="absolute top-4 left-4 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {restaurant.displayDistance}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{restaurant.name}</h4>
                      <p className="text-gray-600 mb-4">{restaurant.cuisine} Mutfağı</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <div className="w-4 h-4 flex items-center justify-center mr-1">
                            <i className="ri-time-line"></i>
                          </div>
                          {restaurant.displayTime}
                        </span>
                        <span className="flex items-center">
                          <div className="w-4 h-4 flex items-center justify-center mr-1">
                            <i className="ri-truck-line"></i>
                          </div>
                          {restaurant.displayFee}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/restaurants" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 cursor-pointer whitespace-nowrap">
              Tüm Restoranları Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Why Munch Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Neden Munch?</h3>
            <p className="text-gray-600">Size en iyi deneyimi sunmak için buradayız</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-time-line text-orange-600 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Otomatik Hesaplama</h4>
              <p className="text-gray-600">Platform size en yakın restoranları otomatik hesaplar ve gösterir</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-orange-600 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Akıllı Sıralama</h4>
              <p className="text-gray-600">Restoranlar mesafeye göre akıllıca sıralanır, hiçbir hesaplama yapmaya gerek yok</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-orange-600 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Doğru Bilgi</h4>
              <p className="text-gray-600">Teslimat süreleri ve ücretleri platform tarafından doğru hesaplanır</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Restoran Sahipleri İçin Büyük Fırsat!</h3>
            <p className="text-gray-600 mb-8">
              Munch'a katılın ve müşterilerinize daha kolay ulaşın. Dijital menünüz ve sipariş sisteminiz hazır!
            </p>
            <Link href="/auth/register-business" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 cursor-pointer whitespace-nowrap">
              Hemen Başvur
            </Link>
            <div className="mt-6 text-sm text-gray-500">
              İletişim: <a href="mailto:info@munch.com" className="text-orange-600">info@munch.com</a> | 
              <a href="tel:+902121234567" className="text-orange-600 ml-2">0212 123 45 67</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-orange-600 mb-4" style={{fontFamily: 'var(--font-pacifico)'}}>
                Munch
              </h3>
              <p className="text-gray-300">
                En lezzetli yemekleri kapınıza kadar getiriyoruz.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li><Link href="/restaurants" className="text-gray-300 hover:text-white cursor-pointer">Restoranlar</Link></li>
                <li><Link href="/orders" className="text-gray-300 hover:text-white cursor-pointer">Siparişler</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white cursor-pointer">Hakkımızda</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white cursor-pointer">İletişim</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Destekleyici</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Yardım Merkezi</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">İade Koşulları</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Gizlilik Politikası</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Kullanım Şartları</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <p className="text-gray-300 mb-2">0212 123 45 67</p>
              <p className="text-gray-300 mb-4">info@munch.com</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white cursor-pointer">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-facebook-fill"></i>
                  </div>
                </a>
                <a href="#" className="text-gray-300 hover:text-white cursor-pointer">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-twitter-fill"></i>
                  </div>
                </a>
                <a href="#" className="text-gray-300 hover:text-white cursor-pointer">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-instagram-fill"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Munch. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
