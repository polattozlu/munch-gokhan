'use client';

import Link from 'next/link';

export default function BusinessRegistrationSuccess() {
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
            <Link href="/" className="text-gray-600 hover:text-gray-900 cursor-pointer">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-green-600 text-3xl"></i>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Başvuru Başarıyla Gönderildi!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Munch ile iş ortaklığı için gösterdiğiniz ilgi için teşekkür ederiz. 
            Başvurunuzu inceleyip <strong>24-48 saat</strong> içinde sizinle iletişime geçeceğiz.
          </p>

          <div className="bg-orange-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Bir Sonraki Adımlar:</h3>
            <ul className="text-sm text-gray-700 text-left space-y-1">
              <li>• Başvuru değerlendirmesi (24-48 saat)</li>
              <li>• Doküman kontrolü ve onay</li>
              <li>• Munch paneline erişim bilgileri</li>
              <li>• Menü yükleme desteği</li>
              <li>• İlk siparişlerin alınmaya başlanması</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link href="/" className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap block">
              Ana Sayfaya Dön
            </Link>
            
            <Link href="/contact" className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 cursor-pointer whitespace-nowrap block">
              Sorularınız İçin İletişim
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Başvuru durumunuz hakkında bilgi almak için: <br />
              <span className="font-medium text-gray-700">info@munch.com</span> veya 
              <span className="font-medium text-gray-700"> 0850 123 45 67</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}