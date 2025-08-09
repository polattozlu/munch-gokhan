
'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import { formatPrice, validateEmail, validatePhone, isValidTextarea } from '@/lib/utils';

function CartContent() {
  const searchParams = useSearchParams();
  const skipToPayment = searchParams.get('skipToPayment') === 'true';

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [deliveryAddress, setDeliveryAddress] = useState({
    title: '',
    fullAddress: '',
    district: '',
    city: 'İstanbul',
    phone: '',
    instructions: ''
  });
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>( {});

  const { items: cartItems, clearCart, getTotalItems, getTotalPrice, updateQuantity } = useCart();
  const { createOrder } = useOrders();

  const deliveryFee = 5.00;
  const serviceFee = 8.50;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee + serviceFee;

  // Set default payment method based on URL parameter
  useEffect(() => {
    if (skipToPayment) {
      setPaymentMethod('cash');
    } else {
      setPaymentMethod('card');
    }
  }, [skipToPayment]);

  const handleAddressChange = (field: string, value: string) => {
    setDeliveryAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCardChange = (field: string, value: string) => {
    setCardInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!deliveryAddress.fullAddress.trim()) {
      newErrors.fullAddress = 'Teslimat adresi gerekli';
    }

    if (!deliveryAddress.phone.trim()) {
      newErrors.phone = 'Telefon numarası gerekli';
    } else if (!validatePhone(deliveryAddress.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası girin';
    }

    if (deliveryAddress.instructions && !isValidTextarea(deliveryAddress.instructions)) {
      newErrors.instructions = 'Teslimat notu 500 karakterden fazla olamaz';
    }

    if (paymentMethod === 'card') {
      if (!cardInfo.number.trim()) {
        newErrors.cardNumber = 'Kart numarası gerekli';
      }
      if (!cardInfo.expiry.trim()) {
        newErrors.cardExpiry = 'Son kullanma tarihi gerekli';
      }
      if (!cardInfo.cvv.trim()) {
        newErrors.cardCvv = 'CVV gerekli';
      }
      if (!cardInfo.name.trim()) {
        newErrors.cardName = 'Kart sahibinin adı gerekli';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      setErrors({ general: 'Sepetiniz boş' });
      return;
    }

    setIsProcessing(true);
    setErrors({});

    try {
      const orderData = {
        restaurantId: cartItems[0].restaurantId,
        items: cartItems.map(item => ({
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total,
        status: 'preparing' as const,
        estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        deliveryAddress,
        paymentMethod
      };

      const order = await createOrder(orderData);

      if (order) {
        clearCart();
        setOrderSuccess(true);
      } else {
        throw new Error('Sipariş oluşturulamadı');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      setErrors({ general: 'Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-2xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Siparişiniz Alındı!</h2>
          <p className="text-gray-600 mb-4">
            Siparişiniz başarıyla oluşturuldu.{' '}
            {paymentMethod === 'cash' ? ' Kapıda nakit olarak ödenecek.' : ' Ödeme işlemi tamamlandı.'}
          </p>
          {paymentMethod === 'cash' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-yellow-600"></i>
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-yellow-800">Kapıda Nakit Ödeme</p>
                  <p className="text-sm text-yellow-700">Toplam: {formatPrice(total)}</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-3">
            <Link href="/orders" className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 block text-center cursor-pointer whitespace-nowrap">
              Siparişlerimi Görüntüle
            </Link>
            <Link href="/" className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 block text-center cursor-pointer whitespace-nowrap">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="cursor-pointer">
                <h1 className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'var(--font-pacifico)' }}>
                  Munch
                </h1>
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shopping-cart-line text-gray-400 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sepetiniz Boş</h2>
            <p className="text-gray-600 mb-6">Lezzetli yemekler için restoranlarımızı keşfedin</p>
            <Link href="/" className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap">
              Restoranları Gözat
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="cursor-pointer">
              <h1 className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'var(--font-pacifico)' }}>
                Munch
              </h1>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 cursor-pointer">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {skipToPayment ? 'Kapıda Nakit Ödeme' : 'Sepetim'}
        </h1>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{errors.general}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Taraf - Sipariş Detayları ve Adres */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sepet Öğeleri */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sipariş Detayları</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover object-top rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-500">Adet: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-sm text-gray-600">{formatPrice(item.price)} / adet</p>
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, 0)}
                        className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors cursor-pointer"
                        title="Ürünü sepetten çıkar"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teslimat Adresi */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Teslimat Adresi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adres Başlığı</label>
                  <input
                    type="text"
                    value={deliveryAddress.title}
                    onChange={(e) => handleAddressChange('title', e.target.value)}
                    placeholder="Örn: Ev, İş"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numarası *</label>
                  <input
                    type="tel"
                    value={deliveryAddress.phone}
                    onChange={(e) => handleAddressChange('phone', e.target.value)}
                    placeholder="0 (5xx) xxx xx xx"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tam Adres *</label>
                  <textarea
                    value={deliveryAddress.fullAddress}
                    onChange={(e) => handleAddressChange('fullAddress', e.target.value)}
                    placeholder="Mahalle, Sokak, Bina No, Daire No..."
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      errors.fullAddress ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullAddress && <p className="text-red-500 text-sm mt-1">{errors.fullAddress}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">İlçe</label>
                  <input
                    type="text"
                    value={deliveryAddress.district}
                    onChange={(e) => handleAddressChange('district', e.target.value)}
                    placeholder="İlçe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                  <div className="relative">
                    <select
                      value={deliveryAddress.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="İstanbul">İstanbul</option>
                      <option value="Ankara">Ankara</option>
                      <option value="İzmir">İzmir</option>
                      <option value="Bursa">Bursa</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <i className="ri-arrow-down-s-line text-gray-400"></i>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teslimat Notu</label>
                  <textarea
                    value={deliveryAddress.instructions}
                    onChange={(e) => handleAddressChange('instructions', e.target.value)}
                    placeholder="Kurye için özel talimatlar..."
                    rows={2}
                    maxLength={500}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${
                      errors.instructions ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  <p className="text-xs text-gray-500 mt-1">{deliveryAddress.instructions.length}/500 karakter</p>
                  {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
                </div>
              </div>
            </div>

            {/* Ödeme Yöntemi */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ödeme Yöntemi</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="card" className="flex items-center cursor-pointer">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-bank-card-line text-lg"></i>
                    </div>
                    Kredi/Banka Kartı
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kart Üzerindeki İsim *</label>
                      <input
                        type="text"
                        value={cardInfo.name}
                        onChange={(e) => handleCardChange('name', e.target.value)}
                        placeholder="Kart sahibinin adı soyadı"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          errors.cardName ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kart Numarası *</label>
                      <input
                        type="text"
                        value={cardInfo.number}
                        onChange={(e) => handleCardChange('number', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Son Kullanma Tarihi *</label>
                      <input
                        type="text"
                        value={cardInfo.expiry}
                        onChange={(e) => handleCardChange('expiry', e.target.value)}
                        placeholder="AA/YY"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          errors.cardExpiry ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                      <input
                        type="text"
                        value={cardInfo.cvv}
                        onChange={(e) => handleCardChange('cvv', e.target.value)}
                        placeholder="123"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          errors.cardCvv ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardCvv && <p className="text-red-500 text-sm mt-1">{errors.cardCvv}</p>}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="cash"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="cash" className="flex items-center cursor-pointer">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-money-dollar-circle-line text-lg"></i>
                    </div>
                    Kapıda Nakit Ödeme
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Ara Toplam ({getTotalItems()} ürün)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Teslimat Ücreti</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Hizmet Bedeli</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span className="text-orange-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-4 h-4 flex items-center justify-center mt-0.5">
                      <i className="ri-time-line text-orange-600 text-sm"></i>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-orange-800">Tahmini Teslimat</p>
                      <p className="text-orange-600">25-40 dakika</p>
                    </div>
                  </div>
                </div>
              </div>

              {paymentMethod === 'cash' && (
                <div className="mb-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-4 h-4 flex items-center justify-center mt-0.5">
                        <i className="ri-money-dollar-circle-line text-yellow-600 text-sm"></i>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800">Kapıda Nakit Ödeme</p>
                        <p className="text-yellow-600">Teslimat sırasında {formatPrice(total)} ödeyeceksiniz</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white whitespace-nowrap ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-orange-600 hover:bg-orange-700 cursor-pointer'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>İşleniyor...</span>
                    </div>
                  ) : (
                    'Siparişi Tamamla'
                  )}
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-500 text-center">
                Siparişinizi tamamlayarak{' '}
                <Link href="/terms" className="text-orange-600 hover:underline cursor-pointer">
                  Kullanım Şartları
                </Link>
                {` `} ve{' '}
                <Link href="/privacy" className="text-orange-600 hover:underline cursor-pointer">
                  Gizlilik Politikası
                </Link>
                'nı kabul etmiş olursunuz.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <CartContent />
    </Suspense>
  );
}
