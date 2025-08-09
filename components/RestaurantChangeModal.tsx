
'use client';

import { useState } from 'react';

interface RestaurantChangeModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  currentRestaurant?: string;
  newRestaurant?: string;
}

export default function RestaurantChangeModal({
  isOpen,
  onConfirm,
  onCancel,
  currentRestaurant,
  newRestaurant
}: RestaurantChangeModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLoading) return; 

    setIsLoading(true);
    
    // Confirm işlemini gerçekleştir
    onConfirm();
    
    // Loading'i durdurup modal'ı kapat
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-restaurant-2-line text-3xl"></i>
            </div>
          </div>
          <h2 className="text-xl font-bold text-center">Restoran Değişikliği</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning Message */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-4">
              <i className="ri-alert-line text-amber-600 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sepetiniz Temizlenecek
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sepetinizde <span className="font-medium text-orange-600">{currentRestaurant}</span> restoranından ürünler var. 
              <span className="font-medium text-orange-600"> {newRestaurant}</span> restoranından ürün eklemek için 
              sepetinizi temizlememiz gerekiyor.
            </p>
          </div>

          {/* Current Cart Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <i className="ri-shopping-cart-line text-orange-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Mevcut Sepet</p>
                <p className="text-xs text-gray-500">{currentRestaurant}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Temizleniyor...</span>
                </>
              ) : (
                <>
                  <i className="ri-delete-bin-line"></i>
                  <span>Evet, Sepeti Temizle</span>
                </>
              )}
            </button>
            
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <i className="ri-arrow-left-line"></i>
              <span>İptal Et</span>
            </button>
          </div>

          {/* Info Text */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Farklı restoranlardan aynı anda sipariş veremezsiniz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
