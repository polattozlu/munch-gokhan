
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { formatDate, formatTime, getStatusColor, getStatusText } from '@/lib/utils';

export default function Orders() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const { orders, loading, error, activeOrders, completedOrders, refreshOrders } = useOrders();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                <Link href="/restaurants" className="text-gray-700 hover:text-orange-600 cursor-pointer">
                  Restoranlar
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8 w-fit">
              <div className="h-10 bg-gray-200 rounded w-32"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
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
                <Link href="/restaurants" className="text-gray-700 hover:text-orange-600 cursor-pointer">
                  Restoranlar
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-red-600 text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bir hata oluştu</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={refreshOrders}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              <Link href="/restaurants" className="text-gray-700 hover:text-orange-600 cursor-pointer">
                Restoranlar
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Siparişlerim</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-md text-sm font-medium cursor-pointer whitespace-nowrap ${
              activeTab === 'active'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Aktif Siparişler ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-2 rounded-md text-sm font-medium cursor-pointer whitespace-nowrap ${
              activeTab === 'completed'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sipariş Geçmişi ({completedOrders.length})
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {(activeTab === 'active' ? activeOrders : completedOrders).map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {/* In a real app, we'd fetch restaurant name by ID */}
                    Restoran #{order.restaurantId}
                  </h3>
                  <p className="text-sm text-gray-500">Sipariş #{order.id}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <p className="text-lg font-bold text-gray-900 mt-2">₺{order.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Ürünler:</h4>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {item.name} x{item.quantity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-calendar-line"></i>
                    </div>
                    {formatDate(order.orderDate)}
                  </span>
                  {(order.status === 'preparing' || order.status === 'on-the-way') && (
                    <span className="flex items-center">
                      <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-time-line"></i>
                      </div>
                      Tahmini teslimat: {formatTime(order.estimatedDelivery)}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {order.status === 'delivered' && (
                    <button className="text-orange-600 hover:text-orange-700 font-medium cursor-pointer whitespace-nowrap">
                      Tekrar Sipariş Ver
                    </button>
                  )}
                  <button className="text-gray-600 hover:text-gray-700 font-medium cursor-pointer whitespace-nowrap">
                    Detayları Gör
                  </button>
                </div>
              </div>

              {/* Live Tracking for Active Orders */}
              {(order.status === 'preparing' || order.status === 'on-the-way') && (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-orange-800">Sipariş Durumu</span>
                    <span className="text-sm text-orange-600">
                      {order.status === 'preparing' ? '⏳ Hazırlanıyor' : '🚗 Yolda'}
                    </span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div 
                      className={`bg-orange-600 h-2 rounded-full transition-all duration-500 ${
                        order.status === 'preparing' ? 'w-1/3' : 'w-2/3'
                      }`}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {(activeTab === 'active' ? activeOrders : completedOrders).length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-restaurant-line text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'active' ? 'Aktif sipariş yok' : 'Sipariş geçmişi yok'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'active' 
                  ? 'Favori restoranlarınızdan sipariş vermeye başlayın!' 
                  : 'Tamamlanan siparişleriniz burada görünecek.'
                }
              </p>
              <Link href="/" className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 cursor-pointer whitespace-nowrap">
                Restoranları Gözat
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
