
'use client';

import { useState, useEffect } from 'react';
import { useLocation } from '@/hooks/useLocation';

interface LocationSelectorProps {
  onLocationChange?: (location: any) => void;
  showMap?: boolean;
}

export default function LocationSelector({ onLocationChange, showMap = false }: LocationSelectorProps) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const { userLocation, loading, error, getCurrentLocation, searchLocation } = useLocation();

  useEffect(() => {
    if (userLocation && onLocationChange) {
      onLocationChange(userLocation);
    }
  }, [userLocation, onLocationChange]);

  const handleGetCurrentLocation = async () => {
    await getCurrentLocation();
  };

  const handleAddressSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      await searchLocation(addressInput.trim());
      setShowLocationModal(false);
      setAddressInput('');
    }
  };

  return (
    <>
      {/* Location Display */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-map-pin-line text-orange-600"></i>
              </div>
              <div>
                {userLocation ? (
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      {userLocation.district}, {userLocation.city}
                    </span>
                    <p className="text-xs text-gray-500 truncate max-w-md">
                      {userLocation.address}
                    </p>
                  </div>
                ) : (
                  <span className="text-sm text-gray-600">Teslimat adresinizi seçin</span>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowLocationModal(true)}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap"
            >
              Değiştir
            </button>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Teslimat Adresi</h3>
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-error-warning-line"></i>
                    </div>
                    {error}
                  </div>
                </div>
              )}

              {/* Current Location Button */}
              <button
                onClick={handleGetCurrentLocation}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 cursor-pointer whitespace-nowrap mb-4"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Konum alınıyor...</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-crosshair-line"></i>
                    </div>
                    <span>Mevcut Konumumu Kullan</span>
                  </>
                )}
              </button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">veya</span>
                </div>
              </div>

              {/* Address Search */}
              <form onSubmit={handleAddressSearch}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres Ara
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                      placeholder="Mahalle, sokak veya bina adı girin..."
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      disabled={loading}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                      <i className="ri-search-line text-gray-400"></i>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!addressInput.trim() || loading}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  Adresi Bul
                </button>
              </form>

              {/* Current Location Display */}
              {userLocation && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-check-line text-green-600"></i>
                    </div>
                    <span className="text-sm font-medium text-green-800">
                      Seçili Adres
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    {userLocation.address}
                  </p>
                  <p className="text-xs text-green-600">
                    {userLocation.district}, {userLocation.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}