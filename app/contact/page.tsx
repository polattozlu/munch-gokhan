
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

export default function Contact() {
  const { getTotalItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

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
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=modern%20customer%20service%20office%20with%20friendly%20staff%20helping%20customers%2C%20bright%20professional%20environment%20with%20computers%20and%20phones%2C%20warm%20welcoming%20atmosphere&width=1200&height=600&seq=contact-hero&orientation=landscape)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">İletişim</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Sorularınız, önerileriniz veya herhangi bir konuda destek almak için bizimle iletişime geçin
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Bize Yazın</h2>
              
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-check-circle-line text-green-600"></i>
                    </div>
                    <p className="text-green-700">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>
                  </div>
                </div>
              )}

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="E-posta adresinizi girin"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      placeholder="Telefon numaranızı girin"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Konu *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="">Konu seçin</option>
                      <option value="siparis">Sipariş Sorunu</option>
                      <option value="odeme">Ödeme Sorunu</option>
                      <option value="restoran">Restoran Başvurusu</option>
                      <option value="teknik">Teknik Destek</option>
                      <option value="oneri">Öneri/Şikayet</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none"
                    placeholder="Mesajınızı detaylı olarak yazın (maksimum 500 karakter)"
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.message.length}/500
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || formData.message.length > 500}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
                <p className="text-gray-600 mb-8">
                  Size en hızlı şekilde yardımcı olabilmek için aşağıdaki iletişim kanallarını kullanabilirsiniz.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="ri-map-pin-line text-orange-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                    <p className="text-gray-600">
                      Maslak Mahallesi, Büyükdere Caddesi<br />
                      No: 123, Kat: 15<br />
                      34485 Sarıyer, İstanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-phone-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-gray-600">
                      <a href="tel:+905551234567" className="hover:text-orange-600 cursor-pointer">
                        +90 555 123 45 67
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Pazartesi - Pazar: 08:00 - 24:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-mail-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                    <p className="text-gray-600">
                      <a href="mailto:bununlamunch@hotmail.com" className="hover:text-orange-600 cursor-pointer">
                        bununlamunch@hotmail.com
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      24 saat içinde yanıt veriyoruz
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-customer-service-line text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Canlı Destek</h3>
                    <p className="text-gray-600">
                      WhatsApp: +90 555 123 45 67
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Pazartesi - Pazar: 09:00 - 22:00
                    </p>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.2777!2d29.0174!3d41.0806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sMaslak%2C%20B%C3%BCy%C3%BCkdere%20Cd.%2C%2034485%20Sar%C4%B1yer%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1635123456789!5m2!1str!2str"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Munch Ofis Konumu"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-lg text-gray-600">
              En çok merak edilen sorular ve yanıtları
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Siparişim ne zaman gelir?
              </h3>
              <p className="text-gray-600">
                Ortalama teslimat süremiz 30-45 dakikadır. Sipariş durumunuzu uygulama üzerinden anlık olarak takip edebilirsiniz.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Minimum sipariş tutarı var mı?
              </h3>
              <p className="text-gray-600">
                Minimum sipariş tutarı restorana göre değişir. Genellikle 25-50 TL arasındadır ve restoran sayfasında belirtilir.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Hangi ödeme yöntemlerini kabul ediyorsunuz?
              </h3>
              <p className="text-gray-600">
                Nakit, kredi kartı, banka kartı, dijital cüzdanlar (Papara, BKM Express) ve food ticket'leri kabul ediyoruz.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Siparişimi iptal edebilir miyim?
              </h3>
              <p className="text-gray-600">
                Restoran henüz hazırlığa başlamamışsa siparişinizi iptal edebilirsiniz. Uygulama üzerinden iptal edebilir veya müşteri hizmetleri ile iletişime geçebilirsiniz.
              </p>
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
