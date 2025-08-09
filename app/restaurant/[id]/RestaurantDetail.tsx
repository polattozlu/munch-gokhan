
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { api, Restaurant } from '@/lib/api';
import { useMenu } from '@/hooks/useMenu';
import { useCart } from '@/hooks/useCart';
import { useReviews } from '@/hooks/useReviews';
import { formatPrice, getCategoryName } from '@/lib/utils';
import RestaurantChangeModal from '@/components/RestaurantChangeModal';

export default function RestaurantDetail({ restaurantId }: { restaurantId: string }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);
  const [restaurantError, setRestaurantError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('tumunu');
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews'>('menu');
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  const { menuItems, loading: menuLoading, error: menuError, filterByCategory } = useMenu(parseInt(restaurantId));
  const { items: cartItems, addItem, removeItem, getTotalItems, getTotalPrice, getItemQuantity, clearCart, showModal, setShowModal, modalData, confirmCartChange } = useCart();
  const { reviews, loading: reviewsLoading, error: reviewsError, addReview, refreshReviews } = useReviews(parseInt(restaurantId));

  const categories = ['tumunu', 'anaYemek', 'salata', 'kahvalti', 'tatli'];

  const handleAddToCart = (item: any) => {
    const itemWithRestaurantId = {
      ...item,
      restaurantId: parseInt(restaurantId)
    };
    addItem(itemWithRestaurantId, restaurant?.name);
  };

  const handleModalConfirm = () => {
    confirmCartChange();
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setRestaurantLoading(true);
        setRestaurantError(null);
        const data = await api.getRestaurantById(parseInt(restaurantId));
        setRestaurant(data);
      } catch (err) {
        setRestaurantError('Restoran bilgileri yüklenirken bir hata oluştu');
        console.error('Error fetching restaurant:', err);
      } finally {
        setRestaurantLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  useEffect(() => {
    if (activeTab === 'menu') {
      filterByCategory(activeCategory);
    }
  }, [activeCategory, activeTab, filterByCategory]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.userName.trim() || !newReview.comment.trim()) return;

    const reviewData = {
      userId: Date.now(), // In real app, this would be the actual user ID
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      helpful: 0
    };

    const result = await addReview(reviewData);
    if (result) {
      setNewReview({ userName: '', rating: 5, comment: '' });
      setShowAddReview(false);
      // Refresh restaurant data to update average rating
      const updatedRestaurant = await api.getRestaurantById(parseInt(restaurantId));
      setRestaurant(updatedRestaurant);
    }
  };

  if (restaurantLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (restaurantError || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-error-warning-line text-red-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Bir hata oluştu</h3>
          <p className="text-gray-600 mb-4">{restaurantError || 'Restoran bulunamadı'}</p>
          <Link href="/" className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const deliveryFee = parseFloat(restaurant?.deliveryFee || '0');
  const serviceFee = 8.50;
  const total = getTotalPrice() + deliveryFee + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Change Modal */}
      <RestaurantChangeModal
        isOpen={showModal}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
        currentRestaurant={modalData.currentRestaurant}
        newRestaurant={modalData.newRestaurant}
      />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="cursor-pointer">
              <h1 className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'var(--font-pacifico)' }}>
                Munch
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Ana Sayfaya Dön
              </Link>
              {getTotalItems() > 0 && (
                <Link href="/cart" className="relative bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap">
                  Sepet ({getTotalItems()})
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-xl mb-2">{restaurant.cuisine} Mutfağı</p>
            <p className="text-lg mb-4 opacity-90">{restaurant.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="flex items-center">
                <div className="w-4 h-4 flex items-center justify-center mr-1">
                  <i className="ri-star-fill text-yellow-400"></i>
                </div>
                {restaurant.rating} ({restaurant.totalReviews} yorum)
              </span>
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
                ₺{restaurant.deliveryFee} teslimat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === 'menu'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Menü
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Yorumlar ({restaurant.totalReviews})
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'menu' && (
              <>
                {/* Category Filter */}
                <div className="flex space-x-2 mb-8 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer ${
                        activeCategory === category
                          ? 'bg-orange-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {getCategoryName(category)}
                    </button>
                  ))}
                </div>

                {/* Menu Items */}
                {menuLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                        <div className="flex">
                          <div className="flex-1 p-4">
                            <div className="h-6 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                          <div className="w-24 h-24 m-4 bg-gray-200 rounded-lg"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {menuError && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-error-warning-line text-red-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Bir hata oluştu</h3>
                    <p className="text-gray-600">{menuError}</p>
                  </div>
                )}

                {!menuLoading && !menuError && menuItems.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-restaurant-line text-gray-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Menü öğesi bulunamadı</h3>
                    <p className="text-gray-600">Bu kategoride henüz menü öğesi bulunmuyor</p>
                  </div>
                )}

                {!menuLoading && !menuError && menuItems.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuItems.map((item) => (
                      <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="flex">
                          <div className="flex-1 p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold text-orange-600">{formatPrice(item.price)}</span>
                              <div className="flex items-center space-x-2">
                                {getItemQuantity(item.id) > 0 ? (
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => removeItem(item.id)}
                                      className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 cursor-pointer"
                                    >
                                      <i className="ri-subtract-line text-sm"></i>
                                    </button>
                                    <span className="font-medium">{getItemQuantity(item.id)}</span>
                                    <button
                                      onClick={() => handleAddToCart(item)}
                                      className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700 cursor-pointer"
                                    >
                                      <i className="ri-add-line text-sm"></i>
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleAddToCart(item)}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 cursor-pointer whitespace-nowrap"
                                  >
                                    Sepete Ekle
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="w-24 h-24 m-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover object-top rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Add Review Button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Müşteri Yorumları</h3>
                  <button
                    onClick={() => setShowAddReview(!showAddReview)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 cursor-pointer whitespace-nowrap"
                  >
                    Yorum Yaz
                  </button>
                </div>

                {/* Add Review Form */}
                {showAddReview && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Yorum Yazın</h4>
                    <form onSubmit={handleAddReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adınız
                        </label>
                        <input
                          type="text"
                          value={newReview.userName}
                          onChange={(e) => setNewReview((prev) => ({ ...prev, userName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Adınızı girin"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Puan
                        </label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                              className={`w-8 h-8 flex items-center justify-center cursor-pointer ${
                                star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              <i className="ri-star-fill text-lg"></i>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yorumunuz
                        </label>
                        <textarea
                          value={newReview.comment}
                          onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Deneyiminizi paylaşın..."
                          required
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 cursor-pointer whitespace-nowrap"
                        >
                          Yorum Gönder
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddReview(false)}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                        >
                          İptal
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Reviews List */}
                {reviewsLoading && (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {reviewsError && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-error-warning-line text-red-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Bir hata oluştu</h3>
                    <p className="text-gray-600">{reviewsError}</p>
                  </div>
                )}

                {!reviewsLoading && !reviewsError && reviews.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-chat-3-line text-gray-400 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz yorum yok</h3>
                    <p className="text-gray-600">Bu restoran için ilk yorumu siz yazın!</p>
                  </div>
                )}

                {!reviewsLoading && !reviewsError && reviews.length > 0 && (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              <i className="ri-user-line text-orange-600"></i>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{review.userName}</h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={`ri-star-fill text-xs ${
                                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                      }`}
                                    ></i>
                                  ))}
                                </div>
                                <span>•</span>
                                <span>{new Date(review.date).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-orange-600 cursor-pointer">
                            <i className="ri-thumb-up-line"></i>
                            <span>Faydalı ({review.helpful})</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {getTotalItems() > 0 && (
            <div className="lg:w-80">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h3>
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ara Toplam:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Teslimat:</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hizmet Bedeli:</span>
                    <span>{formatPrice(serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Toplam:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Link href="/cart" className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 block text-center cursor-pointer whitespace-nowrap">
                    Sepete Git
                  </Link>
                  <button
                    onClick={() => window.location.href = '/cart?skipToPayment=true'}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                  >
                    Ödemeyi Geç (Kapıda Nakit)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
