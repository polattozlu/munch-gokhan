
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePhone } from '@/lib/utils';

export default function RegisterBusinessPage() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerFirstName: '',
    ownerLastName: '',
    businessEmail: '',
    businessPhone: '',
    taxNumber: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    cuisineType: '',
    businessType: '',
    establishmentYear: '',
    capacity: '',
    description: '',
    bankName: '',
    iban: '',
    password: '',
    confirmPassword: '',
    agreedToBusinessTerms: false,
    agreedToCommission: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Restaurant Info
    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'Restoran adı gerekli';
    }

    if (!formData.ownerFirstName.trim()) {
      newErrors.ownerFirstName = 'İşletme sahibi adı gerekli';
    }

    if (!formData.ownerLastName.trim()) {
      newErrors.ownerLastName = 'İşletme sahibi soyadı gerekli';
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'İş e-postası gerekli';
    } else if (!validateEmail(formData.businessEmail)) {
      newErrors.businessEmail = 'Geçerli bir e-posta adresi girin';
    }

    if (!formData.businessPhone.trim()) {
      newErrors.businessPhone = 'İş telefonu gerekli';
    } else if (!validatePhone(formData.businessPhone)) {
      newErrors.businessPhone = 'Geçerli bir telefon numarası girin';
    }

    if (!formData.taxNumber.trim()) {
      newErrors.taxNumber = 'Vergi numarası gerekli';
    } else if (formData.taxNumber.length !== 10) {
      newErrors.taxNumber = 'Vergi numarası 10 haneli olmalı';
    }

    // Address Info
    if (!formData.address.trim()) {
      newErrors.address = 'Restoran adresi gerekli';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Şehir gerekli';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'İlçe gerekli';
    }

    if (!formData.cuisineType.trim()) {
      newErrors.cuisineType = 'Mutfak türü seçimi gerekli';
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = 'İşletme türü seçimi gerekli';
    }

    // Bank Info
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Banka adı gerekli';
    }

    if (!formData.iban.trim()) {
      newErrors.iban = 'IBAN gerekli';
    } else if (formData.iban.length !== 26) {
      newErrors.iban = 'IBAN 26 karakter olmalı';
    }

    // Password
    if (!formData.password.trim()) {
      newErrors.password = 'Şifre gerekli';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Şifre en az 8 karakter olmalı';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Şifre tekrarı gerekli';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
    }

    // Agreements
    if (!formData.agreedToBusinessTerms) {
      newErrors.agreedToBusinessTerms = 'İş ortaklığı şartlarını kabul etmelisiniz';
    }

    if (!formData.agreedToCommission) {
      newErrors.agreedToCommission = 'Komisyon yapısını kabul etmelisiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store business data
      const businessData = {
        id: Date.now(),
        type: 'business',
        restaurantName: formData.restaurantName,
        ownerName: `${formData.ownerFirstName} ${formData.ownerLastName}`,
        email: formData.businessEmail,
        phone: formData.businessPhone,
        taxNumber: formData.taxNumber,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        cuisineType: formData.cuisineType,
        businessType: formData.businessType,
        status: 'pending_approval'
      };

      localStorage.setItem('businessApplication', JSON.stringify(businessData));
      router.push('/auth/register-business/success');
    } catch (error) {
      setErrors({ general: 'Başvuru gönderilirken bir hata oluştu' });
    } finally {
      setIsLoading(false);
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
            <div className="flex items-center space-x-4">
              <Link href="/auth/register" className="text-orange-600 hover:text-orange-700 cursor-pointer">
                Müşteri Kayıt
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🔥 ÖZEL FIRSAT - SINIRLI SÜRE!
              </span>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Sabit ₺10 Komisyon = <span className="text-orange-600">Büyük Kazançlar</span>
              </h1>
              <p className="text-2xl text-gray-600 mb-4">
                <strong>"Yüksek Cirodan Düşük Komisyon"</strong>
              </p>
              <p className="text-xl text-orange-600 font-semibold mb-6">
                200₺ sipariş = 190₺ sizin, sadece 10₺ komisyon!
              </p>
            </div>

            {/* Powerful Statistics */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">₺10</div>
                  <div className="text-lg font-semibold text-gray-800">Her Siparişte Sabit</div>
                  <div className="text-sm text-gray-600">Tutar ne olursa olsun</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24sa</div>
                  <div className="text-lg font-semibold text-gray-800">Hızlı Onay</div>
                  <div className="text-sm text-gray-600">Hemen kazanmaya başla!</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">5000+</div>
                  <div className="text-lg font-semibold text-gray-800">Aktif Restoran</div>
                  <div className="text-sm text-gray-600">Zaten bizimle kazanıyor</div>
                </div>
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💬 Başarı Hikayeleri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      AK
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold">Ahmet Kaya</div>
                      <div className="text-sm text-gray-600">Kaya Kebap - Beyoğlu</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "Günde 50 sipariş alıyorum. Eski platformda %15 komisyon ödüyordum, şimdi sadece ₺10! 
                    Aylık 15.000₺ ekstra kazanç yapıyorum."
                  </p>
                  <div className="text-green-600 font-semibold mt-2">⚡ Aylık +₺15.000 kazanç</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      MÖ
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold">Mehmet Özkan</div>
                      <div className="text-sm text-gray-600">Lezzet Durağı - Kadıköy</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "200₺\'lik siparişlerimde sadece ₺10 komisyon! Diğer uygulamalarda 30₺ ödüyordum. 
                    Fark çok büyük, hemen geçiş yaptım."
                  </p>
                  <div className="text-blue-600 font-semibold mt-2">💰 Sipariş başına ₺20 daha fazla</div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">⚔️ Rakip Karşılaştırması</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left py-3 px-4">Platform</th>
                      <th className="text-center py-3 px-4">50₺ Sipariş</th>
                      <th className="text-center py-3 px-4">100₺ Sipariş</th>
                      <th className="text-center py-3 px-4">200₺ Sipariş</th>
                      <th className="text-center py-3 px-4">Onay Süresi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-orange-50 border-b">
                      <td className="py-4 px-4 font-bold text-orange-600">🔥 Munch</td>
                      <td className="py-4 px-4 text-center font-bold text-green-600">40₺ + ₺10 komisyon</td>
                      <td className="py-4 px-4 text-center font-bold text-green-600">90₺ + ₺10 komisyon</td>
                      <td className="py-4 px-4 text-center font-bold text-green-600">190₺ + ₺10 komisyon</td>
                      <td className="py-4 px-4 text-center font-bold text-green-600">24 saat</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4">Diğer Platform A</td>
                      <td className="py-4 px-4 text-center text-red-600">42.5₺ + ₺7.5 komisyon</td>
                      <td className="py-4 px-4 text-center text-red-600">85₺ + ₺15 komisyon</td>
                      <td className="py-4 px-4 text-center text-red-600">170₺ + ₺30 komisyon</td>
                      <td className="py-4 px-4 text-center">1-2 hafta</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 px-4">Diğer Platform B</td>
                      <td className="py-4 px-4 text-center text-red-600">40₺ + ₺10 komisyon + ₺5 ek</td>
                      <td className="py-4 px-4 text-center text-red-600">82₺ + ₺18 komisyon</td>
                      <td className="py-4 px-4 text-center text-red-600">164₺ + ₺36 komisyon</td>
                      <td className="py-4 px-4 text-center">3-5 gün</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-6">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                  ✨ Yüksek siparişlerde çok daha karlısınız!
                </span>
              </div>
            </div>

            {/* Urgent Call to Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-fire-line text-3xl"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">Hızlı Başla, Hızlı Kazan</h3>
                <p className="text-sm opacity-90 mb-3">24 saat onay, hemen kazanmaya başla!</p>
                <div className="bg-white/20 px-3 py-2 rounded-lg">
                  <span className="font-bold">⏰ BUGÜN BAŞVUR</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-money-dollar-circle-line text-3xl"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">Haftalık Garanti Ödeme</h3>
                <p className="text-sm opacity-90 mb-3">Her hafta düzenli gelir, nakit akışı sorunu yok!</p>
                <div className="bg-white/20 px-3 py-2 rounded-lg">
                  <span className="font-bold">💰 GARANTİLİ</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-group-line text-3xl"></i>
                </div>
                <h3 className="font-bold text-lg mb-2">Binlerce Restoran Kazanıyor</h3>
                <p className="text-sm opacity-90 mb-3">Sen de aramıza katıl!</p>
                <div className="bg-white/20 px-3 py-2 rounded-lg">
                  <span className="font-bold">🚀 ŞİMDİ KATIL</span>
                </div>
              </div>
            </div>

            {/* Main Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Her Siparişte Sadece ₺10</h3>
                <p className="text-gray-600 text-sm mb-3">Yemek tutarından bağımsız sabit komisyon</p>
                <div className="bg-green-50 px-3 py-2 rounded text-xs text-green-700 font-semibold">
                  💡 100₺ sipariş = 90₺ kazanç
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-customer-service-line text-blue-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Özel Destek</h3>
                <p className="text-gray-600 text-sm mb-3">İş ortaklarımıza 7/24 öncelikli destek</p>
                <div className="bg-blue-50 px-3 py-2 rounded text-xs text-blue-700 font-semibold">
                  ⚡ Anında çözüm
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-rocket-line text-purple-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Hızlı Onay</h3>
                <p className="text-gray-600 text-sm mb-3">24-48 saat içinde başvuru değerlendirmesi</p>
                <div className="bg-purple-50 px-3 py-2 rounded text-xs text-purple-700 font-semibold">
                  🚀 Express işlem
                </div>
              </div>
            </div>

            {/* Final CTA with Urgency */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8 rounded-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">🔥 Şimdi Katıl, Hemen Kazan!</h2>
              <p className="text-xl mb-4">Başvuru sadece <strong>2 dakika</strong> sürer!</p>
              <p className="text-lg mb-6 opacity-90">
                Bugün başvur, yarın kazanmaya başla. Binlerce restoran zaten bizimle kazanıyor!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <i className="ri-check-line text-green-300 mr-2"></i>
                  <span>Ücretsiz başvuru</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-300 mr-2"></i>
                  <span>24 saat onay</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-check-line text-green-300 mr-2"></i>
                  <span>Anında kazanç</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İş Ortaklığı Başvuru Formu</h2>

            {errors.general && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-error-warning-line text-red-400"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Restaurant Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Restoran Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-2">
                      Restoran Adı *
                    </label>
                    <input
                      type="text"
                      id="restaurantName"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.restaurantName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Restoran adını girin"
                    />
                    {errors.restaurantName && <p className="mt-1 text-sm text-red-600">{errors.restaurantName}</p>}
                  </div>

                  <div>
                    <label htmlFor="ownerFirstName" className="block text-sm font-medium text-gray-700 mb-2">
                      İşletme Sahibi Adı *
                    </label>
                    <input
                      type="text"
                      id="ownerFirstName"
                      name="ownerFirstName"
                      value={formData.ownerFirstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.ownerFirstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Adınız"
                    />
                    {errors.ownerFirstName && <p className="mt-1 text-sm text-red-600">{errors.ownerFirstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="ownerLastName" className="block text-sm font-medium text-gray-700 mb-2">
                      İşletme Sahibi Soyadı *
                    </label>
                    <input
                      type="text"
                      id="ownerLastName"
                      name="ownerLastName"
                      value={formData.ownerLastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.ownerLastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Soyadınız"
                    />
                    {errors.ownerLastName && <p className="mt-1 text-sm text-red-600">{errors.ownerLastName}</p>}
                  </div>

                  <div>
                    <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      İş E-posta Adresi *
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.businessEmail ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="is@ornekrestoran.com"
                    />
                    {errors.businessEmail && <p className="mt-1 text-sm text-red-600">{errors.businessEmail}</p>}
                  </div>

                  <div>
                    <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      İş Telefonu *
                    </label>
                    <input
                      type="tel"
                      id="businessPhone"
                      name="businessPhone"
                      value={formData.businessPhone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.businessPhone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="05XX XXX XX XX"
                    />
                    {errors.businessPhone && <p className="mt-1 text-sm text-red-600">{errors.businessPhone}</p>}
                  </div>

                  <div>
                    <label htmlFor="taxNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Vergi Numarası *
                    </label>
                    <input
                      type="text"
                      id="taxNumber"
                      name="taxNumber"
                      value={formData.taxNumber}
                      onChange={handleInputChange}
                      maxLength={10}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.taxNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="1234567890"
                    />
                    {errors.taxNumber && <p className="mt-1 text-sm text-red-600">{errors.taxNumber}</p>}
                  </div>

                  <div>
                    <label htmlFor="cuisineType" className="block text-sm font-medium text-gray-700 mb-2">
                      Mutfak Türü *
                    </label>
                    <div className="relative">
                      <select
                        id="cuisineType"
                        name="cuisineType"
                        value={formData.cuisineType}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm appearance-none ${
                          errors.cuisineType ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Mutfak türünü seçin</option>
                        <option value="Türk">Türk Mutfağı</option>
                        <option value="İtalyan">İtalyan Mutfağı</option>
                        <option value="Amerikan">Amerikan Mutfağı</option>
                        <option value="Japon">Japon Mutfağı</option>
                        <option value="Meksikan">Meksikan Mutfağı</option>
                        <option value="Hint">Hint Mutfağı</option>
                        <option value="Çin">Çin Mutfağı</option>
                        <option value="Akdeniz">Akdeniz Mutfağı</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <i className="ri-arrow-down-s-line text-gray-400"></i>
                      </div>
                    </div>
                    {errors.cuisineType && <p className="mt-1 text-sm text-red-600">{errors.cuisineType}</p>}
                  </div>

                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                      İşletme Türü *
                    </label>
                    <div className="relative">
                      <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm appearance-none ${
                          errors.businessType ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">İşletme türünü seçin</option>
                        <option value="Restoran">Restoran</option>
                        <option value="Kafe">Kafe</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Pastane">Pastane</option>
                        <option value="Dönerci">Dönerci</option>
                        <option value="Pizzacı">Pizzacı</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <i className="ri-arrow-down-s-line text-gray-400"></i>
                      </div>
                    </div>
                    {errors.businessType && <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Adres Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Restoran Adresi *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Tam adres bilgisi"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      Şehir *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.city ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="İstanbul"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                      İlçe *
                    </label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.district ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Beyoğlu"
                    />
                    {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                      Posta Kodu
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      placeholder="34000"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Banka Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                      Banka Adı *
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.bankName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Türkiye İş Bankası"
                    />
                    {errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>}
                  </div>

                  <div>
                    <label htmlFor="iban" className="block text-sm font-medium text-gray-700 mb-2">
                      IBAN *
                    </label>
                    <input
                      type="text"
                      id="iban"
                      name="iban"
                      value={formData.iban}
                      onChange={handleInputChange}
                      maxLength={26}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.iban ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="TR123456789012345678901234"
                    />
                    {errors.iban && <p className="mt-1 text-sm text-red-600">{errors.iban}</p>}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ek Bilgiler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="establishmentYear" className="block text-sm font-medium text-gray-700 mb-2">
                      Kuruluş Yılı
                    </label>
                    <input
                      type="number"
                      id="establishmentYear"
                      name="establishmentYear"
                      value={formData.establishmentYear}
                      onChange={handleInputChange}
                      min="1900"
                      max="2024"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      placeholder="2020"
                    />
                  </div>

                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                      Kişi Kapasitesi
                    </label>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                      placeholder="50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Restoran Açıklaması
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      maxLength={500}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none"
                      placeholder="Restoranınızın özelliklerini, menü çeşitlerini ve hizmet anlayışınızı tanıtın (maksimum 500 karakter)"
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 karakter</p>
                  </div>
                </div>
              </div>

              {/* Login Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Giriş Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Şifre *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="En az 8 karakter"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Şifre Tekrarı *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm ${
                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Şifreyi tekrar girin"
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Commission Structure Info */}
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Komisyon Yapısı</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Her siparişten <strong>₺10 sabit komisyon</strong> alınır</p>
                  <p>• Sipariş tutarı ne olursa olsun <strong>komisyon değişmez</strong></p>
                  <p>• Yemek fiyatının <strong>geri kalanının %100'ü sizin</strong> kalır</p>
                  <p>• Teslimat ücreti <strong>tamamen sizin</strong></p>
                  <p>• <strong>Haftalık ödemeler</strong> doğrudan hesabınıza</p>
                  <p>• Minimum sipariş tutarı veya ek ücret <strong>yoktur</strong></p>
                  <p>• <strong>Örnek:</strong> 50₺ sipariş = 40₺ sizin + 10₺ komisyon</p>
                </div>
              </div>

              {/* Agreements */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreedToBusinessTerms"
                    name="agreedToBusinessTerms"
                    checked={formData.agreedToBusinessTerms}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="agreedToBusinessTerms" className="text-sm text-gray-600">
                    <Link href="/business-terms" className="text-orange-600 hover:text-orange-500 cursor-pointer">
                      İş Ortaklığı Şartları ve Koşulları
                    </Link>
                    'nı okuyup kabul ediyorum ve verilen tüm bilgilerin doğru olduğunu onaylıyorum.
                  </label>
                </div>
                {errors.agreedToBusinessTerms && <p className="text-sm text-red-600">{errors.agreedToBusinessTerms}</p>}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreedToCommission"
                    name="agreedToCommission"
                    checked={formData.agreedToCommission}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="agreedToCommission" className="text-sm text-gray-600">
                    Her siparişten ₺10 sabit komisyon alınacağını kabul ediyorum ve bu ücretin sipariş tutarından bağımsız olduğunu anlıyorum.
                  </label>
                </div>
                {errors.agreedToCommission && <p className="text-sm text-red-600">{errors.agreedToCommission}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 whitespace-nowrap ${
                  isLoading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700 cursor-pointer'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Başvuru Gönderiliyor...
                  </div>
                ) : (
                  'İş Ortaklığı Başvurusunu Gönder'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
