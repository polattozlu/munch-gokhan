'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRestaurants } from '@/hooks/useRestaurants';
import { debounce } from '@/lib/utils';

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const { restaurants, loading, error, searchRestaurants, refreshRestaurants } = useRestaurants();

  const cuisineTypes = [
    { value: '', label: 'Tüm Mutfaklar' },
    { value: 'Türk', label: 'Türk' },
    { value: 'İtalyan', label: 'İtalyan' },
    { value: 'Amerikan', label: 'Amerikan' },
    { value: 'Japon', label: 'Japon' },
    { value: 'Meksikan', label: 'Meksikan' },
    { value: 'Hint', label: 'Hint' },
    { value: 'Çin', label: 'Çin' },
    { value: 'Akdeniz', label: 'Akdeniz' }
  ];

  // Debounced search function
  const debouncedSearch = debounce(async (query: string) => {
    if (query.trim()) {
      await searchRestaurants(query);
    } else {
      await refreshRestaurants();
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (selectedCuisine && restaurant.cuisine !== selectedCuisine) return false;
    return true;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'deliveryFee':
        return parseFloat(a.deliveryFee) - parseFloat(b.deliveryFee);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="cursor-pointer">
              <h1 className="text-2xl font-bold text-orange-600" style={{fontFamily: 'var(--font-pacifico)'}}>
                Munch
              </h1>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-orange-600 cursor-pointer">
                Ana Sayfa
              </Link>
              <Link href="/orders" className="text-gray-700 hover:text-orange-600 cursor-pointer">
                Siparişlerim
              </Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-orange-600 cursor-pointer">
                Giriş Yap
              </Link>
              <Link href="/register-restaurant" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap">
                Ortağımız Olun
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Restoran veya mutfak türü ara..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400"></i>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="px-4 py-3 pr-8 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                >
                  {cuisineTypes.map(cuisine => (
                    <option key={cuisine.value} value={cuisine.value}>
                      {cuisine.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 pr-8 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                >
                  <option value="rating">Puana Göre</option>
                  <option value="deliveryTime">Teslimat Süresine Göre</option>
                  <option value="deliveryFee">Teslimat Ücretine Göre</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `"${searchQuery}" için ${sortedRestaurants.length} restoran bulundu` : 
               selectedCuisine ? `${selectedCuisine} Mutfağı (${sortedRestaurants.length} restoran)` :
               `Tüm Restoranlar (${sortedRestaurants.length} restoran)`}
            </h2>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
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
              <button
                onClick={refreshRestaurants}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap"
              >
                Tekrar Dene
              </button>
            </div>
          )}

          {!loading && !error && sortedRestaurants.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-restaurant-line text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sonuç bulunamadı</h3>
              <p className="text-gray-600">
                {searchQuery ? `"${searchQuery}" için restoran bulunamadı` : 
                 selectedCuisine ? `${selectedCuisine} mutfağında restoran bulunamadı` :
                 'Şu anda aktif restoran bulunmuyor'}
              </p>
            </div>
          )}

          {!loading && !error && sortedRestaurants.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRestaurants.map((restaurant) => (
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
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
                      <p className="text-gray-600 mb-3">{restaurant.cuisine} Mutfağı</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <div className="w-4 h-4 flex items-center justify-center mr-1">
                            <i className="ri-time-line"></i>
                          </div>
                          {restaurant.deliveryTime}
                        </span>
                        <span className="flex items-center">
                          <div className="w-4 h-4 flex items-center justify-center mr-1">
                            <i className="ri-truck-line"></i>
                          </div>
                          ₺{restaurant.deliveryFee}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}