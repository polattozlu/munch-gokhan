
export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  district: string;
  city: string;
}

export interface DistanceCalculation {
  distance: number; // km
  duration: number; // dakika
  deliveryFee: number;
}

// Restoran lokasyonları (gerçek koordinatlar)
const restaurantLocations: { [key: number]: LocationData } = {
  1: {
    latitude: 40.9903,
    longitude: 29.0275,
    address: 'Bağdat Cad. No:123, Kadıköy',
    district: 'Kadıköy',
    city: 'İstanbul'
  },
  2: {
    latitude: 41.0367,
    longitude: 28.9840,
    address: 'İstiklal Cad. No:456, Beyoğlu',
    district: 'Beyoğlu',
    city: 'İstanbul'
  },
  3: {
    latitude: 41.0484,
    longitude: 29.0141,
    address: 'Nişantaşı Mah. Teşvikiye Sok. No:789',
    district: 'Şişli',
    city: 'İstanbul'
  },
  4: {
    latitude: 41.0766,
    longitude: 29.0634,
    address: 'Etiler Mah. Nispetiye Cad. No:321',
    district: 'Beşiktaş',
    city: 'İstanbul'
  },
  5: {
    latitude: 41.0183,
    longitude: 28.9639,
    address: 'Eminönü Mah. Tarihi Çarşı No:654',
    district: 'Fatih',
    city: 'İstanbul'
  },
  6: {
    latitude: 41.0344,
    longitude: 28.9844,
    address: 'Cihangir Mah. Akarsu Cad. No:147',
    district: 'Beyoğlu',
    city: 'İstanbul'
  }
};

export const mapsApi = {
  // Kullanıcının konumunu al
  async getCurrentLocation(): Promise<LocationData | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const address = await this.reverseGeocode(latitude, longitude);
            resolve({
              latitude,
              longitude,
              address: address.address,
              district: address.district,
              city: address.city
            });
          } catch {
            resolve({
              latitude,
              longitude,
              address: 'Konum alınamadı',
              district: '',
              city: 'İstanbul'
            });
          }
        },
        () => resolve(null),
        { timeout: 10000, maximumAge: 300000 }
      );
    });
  },

  // Adresi koordinatlara çevir
  async geocodeAddress(address: string): Promise<LocationData | null> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockCoordinates = [
        { lat: 40.9903, lng: 29.0275, district: 'Kadıköy' },
        { lat: 41.0367, lng: 28.9840, district: 'Beyoğlu' },
        { lat: 41.0484, lng: 29.0141, district: 'Şişli' },
        { lat: 41.0766, lng: 29.0634, district: 'Beşiktaş' },
        { lat: 41.0183, lng: 28.9639, district: 'Fatih' }
      ];
      
      const randomLocation = mockCoordinates[Math.floor(Math.random() * mockCoordinates.length)];
      
      return {
        latitude: randomLocation.lat,
        longitude: randomLocation.lng,
        address,
        district: randomLocation.district,
        city: 'İstanbul'
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  },

  async reverseGeocode(latitude: number, longitude: number): Promise<{ address: string; district: string; city: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const districts = ['Kadıköy', 'Beyoğlu', 'Şişli', 'Beşiktaş', 'Fatih', 'Üsküdar'];
      const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
      
      return {
        address: `${randomDistrict} Mahallesi, Örnek Sokak No:${Math.floor(Math.random() * 100) + 1}`,
        district: randomDistrict,
        city: 'İstanbul'
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return {
        address: 'Adres belirlenemedi',
        district: '',
        city: 'İstanbul'
      };
    }
  },

  // DÜZELTİLDİ: Gerçek mesafe hesaplama algoritması - Haversine formülü
  async calculateDistance(
    origin: LocationData,
    destination: LocationData
  ): Promise<DistanceCalculation> {
    try {
      // Haversine formülü ile gerçek mesafe hesaplama
      const R = 6371; // Dünya yarıçapı (km)
      const dLat = this.toRadians(destination.latitude - origin.latitude);
      const dLon = this.toRadians(destination.longitude - origin.longitude);
      
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.toRadians(origin.latitude)) * Math.cos(this.toRadians(destination.latitude)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      // Gerçek trafik koşulları hesaplama
      const baseSpeed = 25; // km/saat ortalama şehir içi hız
      const trafficFactor = this.getTrafficFactor();
      const preparationTime = 15; // restoran hazırlık süresi
      const deliveryTime = Math.ceil((distance / baseSpeed) * 60 * trafficFactor) + preparationTime;
      
      // Gerçek teslimat ücreti hesaplama
      const baseFee = 5.00;
      const perKmFee = 2.50;
      const deliveryFee = Number((baseFee + (distance * perKmFee)).toFixed(2));
      
      return {
        distance: Number(distance.toFixed(2)),
        duration: Math.max(20, deliveryTime),
        deliveryFee
      };
    } catch (error) {
      console.error('Distance calculation error:', error);
      return {
        distance: 5,
        duration: 30,
        deliveryFee: 8.00
      };
    }
  },

  // Trafik faktörü hesaplama (saat ve günlere göre)
  getTrafficFactor(): number {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // Hafta sonu daha az trafik
    if (day === 0 || day === 6) {
      return 1.1;
    }
    
    // Rush hours (08:00-10:00 ve 17:00-19:00)
    if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19)) {
      return 1.5;
    }
    
    // Öğle saatleri
    if (hour >= 12 && hour <= 14) {
      return 1.3;
    }
    
    // Normal saatler
    return 1.2;
  },

  getRestaurantLocation(restaurantId: number): LocationData | null {
    return restaurantLocations[restaurantId] || null;
  },

  getAllRestaurantLocations(): { [key: number]: LocationData } {
    return restaurantLocations;
  },

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  },

  // Platform otomatik hesaplama - kullanıcı sadece sonucu görür
  async getRestaurantsWithDistances(
    userLocation: LocationData,
    restaurantIds: number[]
  ): Promise<Array<{ 
    restaurantId: number; 
    distance: string; 
    deliveryTime: string; 
    deliveryFee: string;
    sortOrder: number;
  }>> {
    const results = [];
    
    for (const restaurantId of restaurantIds) {
      const restaurantLocation = this.getRestaurantLocation(restaurantId);
      if (restaurantLocation) {
        const calculation = await this.calculateDistance(userLocation, restaurantLocation);
        results.push({
          restaurantId,
          distance: `${calculation.distance} km`,
          deliveryTime: `${calculation.duration} dk`,
          deliveryFee: `₺${calculation.deliveryFee}`,
          sortOrder: calculation.distance
        });
      }
    }
    
    return results.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  // Toplu mesafe hesaplama - performans optimizasyonu
  async calculateBatchDistances(
    userLocation: LocationData,
    restaurantIds: number[]
  ): Promise<Map<number, DistanceCalculation>> {
    const results = new Map<number, DistanceCalculation>();
    
    // Paralel hesaplama için Promise.all kullan
    const calculations = restaurantIds.map(async (restaurantId) => {
      const restaurantLocation = this.getRestaurantLocation(restaurantId);
      if (restaurantLocation) {
        const calculation = await this.calculateDistance(userLocation, restaurantLocation);
        return { restaurantId, calculation };
      }
      return null;
    });
    
    const completedCalculations = await Promise.all(calculations);
    
    completedCalculations.forEach((result) => {
      if (result) {
        results.set(result.restaurantId, result.calculation);
      }
    });
    
    return results;
  },

  // Gerçek zamanlı mesafe güncelleme
  async updateDistanceRealTime(
    userLocation: LocationData,
    restaurantId: number
  ): Promise<DistanceCalculation | null> {
    const restaurantLocation = this.getRestaurantLocation(restaurantId);
    if (!restaurantLocation) return null;
    
    return await this.calculateDistance(userLocation, restaurantLocation);
  },

  // Google Maps embed URL
  generateMapEmbedUrl(
    restaurantLocation: LocationData,
    userLocation?: LocationData
  ): string {
    const center = `${restaurantLocation.latitude},${restaurantLocation.longitude}`;
    const zoom = userLocation ? 13 : 15;
    
    let markers = `markers=color:red%7C${center}`;
    
    if (userLocation) {
      markers += `&markers=color:blue%7C${userLocation.latitude},${userLocation.longitude}`;
    }
    
    return `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${center}&zoom=${zoom}&${markers}`;
  },

  generateDirectionsUrl(
    origin: LocationData,
    destination: LocationData
  ): string {
    return `https://www.google.com/maps/dir/${origin.latitude},${origin.longitude}/${destination.latitude},${destination.longitude}`;
  }
};
