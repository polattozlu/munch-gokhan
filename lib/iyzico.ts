'use client';

interface IyzicoConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
}

interface IyzicoPaymentRequest {
  locale: string;
  conversationId: string;
  price: string;
  paidPrice: string;
  currency: string;
  installment: number;
  basketId: string;
  paymentChannel: string;
  paymentGroup: string;
  paymentCard: {
    cardHolderName: string;
    cardNumber: string;
    expireMonth: string;
    expireYear: string;
    cvc: string;
    registerCard: number;
  };
  buyer: {
    id: string;
    name: string;
    surname: string;
    gsmNumber: string;
    email: string;
    identityNumber: string;
    lastLoginDate: string;
    registrationDate: string;
    registrationAddress: string;
    ip: string;
    city: string;
    country: string;
    zipCode: string;
  };
  shippingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  billingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  basketItems: Array<{
    id: string;
    name: string;
    category1: string;
    category2: string;
    itemType: string;
    price: string;
  }>;
}

interface IyzicoPaymentResponse {
  status: string;
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
  locale: string;
  systemTime: number;
  conversationId: string;
  paymentId?: string;
  paymentStatus?: string;
  fraudStatus?: number;
  merchantCommissionRate?: number;
  merchantCommissionRateAmount?: number;
  iyziCommissionRateAmount?: number;
  iyziCommissionFee?: number;
  cardType?: string;
  cardAssociation?: string;
  cardFamily?: string;
  binNumber?: string;
  lastFourDigits?: string;
  basketId?: string;
  currency?: string;
  price?: number;
  paidPrice?: number;
  installment?: number;
  authCode?: string;
  phase?: string;
  hostReference?: string;
}

interface IyzicoInstallmentRequest {
  locale: string;
  conversationId: string;
  binNumber: string;
  price: string;
}

interface IyzicoInstallmentInfo {
  binNumber: string;
  price: number;
  cardType: string;
  cardAssociation: string;
  cardFamily: string;
  force3ds: number;
  installmentDetails: Array<{
    installmentNumber: number;
    installmentPrice: number;
    totalPrice: number;
    installmentRate: number;
  }>;
}

// Iyzico konfigürasyonu
const iyzicoConfig: IyzicoConfig = {
  apiKey: 'sandbox-your-api-key', // Gerçek API key'i buraya yazın
  secretKey: 'sandbox-your-secret-key', // Gerçek secret key'i buraya yazın
  baseUrl: 'https://sandbox-api.iyzipay.com' // Production için: https://api.iyzipay.com
};

class IyzicoPaymentService {
  private config: IyzicoConfig;

  constructor(config: IyzicoConfig) {
    this.config = config;
  }

  // Ödeme isteği oluşturma
  async createPayment(paymentData: IyzicoPaymentRequest): Promise<IyzicoPaymentResponse> {
    try {
      // Bu gerçek uygulamada backend'de çalışmalı
      // Client-side'da güvenlik nedeniyle API key'leri kullanmayın
      console.warn('Bu işlem backend tarafında yapılmalıdır!');
      
      const response = await fetch('/api/iyzico/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result: IyzicoPaymentResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Iyzico payment error:', error);
      throw new Error('Ödeme işlemi sırasında bir hata oluştu');
    }
  }

  // Taksit bilgilerini getirme
  async getInstallmentInfo(installmentData: IyzicoInstallmentRequest): Promise<IyzicoInstallmentInfo> {
    try {
      const response = await fetch('/api/iyzico/installment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(installmentData)
      });

      const result: IyzicoInstallmentInfo = await response.json();
      return result;
    } catch (error) {
      console.error('Iyzico installment error:', error);
      throw new Error('Taksit bilgileri alınırken bir hata oluştu');
    }
  }

  // Ödeme durumunu sorgulama
  async checkPaymentStatus(paymentId: string): Promise<IyzicoPaymentResponse> {
    try {
      const response = await fetch('/api/iyzico/payment/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId })
      });

      const result: IyzicoPaymentResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Iyzico payment status error:', error);
      throw new Error('Ödeme durumu sorgulanırken bir hata oluştu');
    }
  }

  // 3D Secure ödeme başlatma
  async initiate3DSecurePayment(paymentData: IyzicoPaymentRequest, callbackUrl: string): Promise<string> {
    try {
      const response = await fetch('/api/iyzico/3dsecure/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentData,
          callbackUrl
        })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        return result.threeDSHtmlContent;
      } else {
        throw new Error(result.errorMessage);
      }
    } catch (error) {
      console.error('3D Secure initialization error:', error);
      throw new Error('3D Secure ödeme başlatılırken bir hata oluştu');
    }
  }

  // 3D Secure callback işleme
  async complete3DSecurePayment(token: string): Promise<IyzicoPaymentResponse> {
    try {
      const response = await fetch('/api/iyzico/3dsecure/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      });

      const result: IyzicoPaymentResponse = await response.json();
      return result;
    } catch (error) {
      console.error('3D Secure completion error:', error);
      throw new Error('3D Secure ödeme tamamlanırken bir hata oluştu');
    }
  }
}

// Utility fonksiyonlar
export const iyzicoUtils = {
  // Kart numarasını formatla
  formatCardNumber: (cardNumber: string): string => {
    return cardNumber.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  },

  // CVV doğrulama
  validateCVV: (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv);
  },

  // Kart numarası doğrulama (Luhn algoritması)
  validateCardNumber: (cardNumber: string): boolean => {
    const number = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  },

  // Son kullanma tarihi doğrulama
  validateExpiry: (expiry: string): boolean => {
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;

    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10) + 2000;
    const now = new Date();
    const expiryDate = new Date(year, month - 1);

    return month >= 1 && month <= 12 && expiryDate > now;
  },

  // Sipariş verilerini Iyzico formatına dönüştür
  convertOrderToIyzicoFormat: (orderData: any): IyzicoPaymentRequest => {
    return {
      locale: 'tr',
      conversationId: `order-${Date.now()}`,
      price: orderData.total.toFixed(2),
      paidPrice: orderData.total.toFixed(2),
      currency: 'TRY',
      installment: 1,
      basketId: orderData.basketId || `basket-${Date.now()}`,
      paymentChannel: 'WEB',
      paymentGroup: 'PRODUCT',
      paymentCard: {
        cardHolderName: orderData.cardInfo.name,
        cardNumber: orderData.cardInfo.number.replace(/\s/g, ''),
        expireMonth: orderData.cardInfo.expiry.split('/')[0],
        expireYear: '20' + orderData.cardInfo.expiry.split('/')[1],
        cvc: orderData.cardInfo.cvv,
        registerCard: 0
      },
      buyer: {
        id: orderData.userId,
        name: orderData.buyerInfo?.name || 'Ad',
        surname: orderData.buyerInfo?.surname || 'Soyad',
        gsmNumber: orderData.deliveryAddress.phone,
        email: orderData.buyerInfo?.email || 'test@test.com',
        identityNumber: orderData.buyerInfo?.identityNumber || '11111111111',
        lastLoginDate: new Date().toISOString(),
        registrationDate: new Date().toISOString(),
        registrationAddress: orderData.deliveryAddress.fullAddress,
        ip: '192.168.1.1',
        city: orderData.deliveryAddress.city,
        country: 'Turkey',
        zipCode: orderData.deliveryAddress.zipCode || '34000'
      },
      shippingAddress: {
        contactName: `${orderData.buyerInfo?.name || 'Ad'} ${orderData.buyerInfo?.surname || 'Soyad'}`,
        city: orderData.deliveryAddress.city,
        country: 'Turkey',
        address: orderData.deliveryAddress.fullAddress,
        zipCode: orderData.deliveryAddress.zipCode || '34000'
      },
      billingAddress: {
        contactName: `${orderData.buyerInfo?.name || 'Ad'} ${orderData.buyerInfo?.surname || 'Soyad'}`,
        city: orderData.deliveryAddress.city,
        country: 'Turkey',
        address: orderData.deliveryAddress.fullAddress,
        zipCode: orderData.deliveryAddress.zipCode || '34000'
      },
      basketItems: orderData.items.map((item: any, index: number) => ({
        id: `item-${item.menuItemId}`,
        name: item.name,
        category1: 'Food',
        category2: 'Restaurant',
        itemType: 'PHYSICAL',
        price: (item.price * item.quantity).toFixed(2)
      }))
    };
  }
};

// Singleton instance
const iyzicoService = new IyzicoPaymentService(iyzicoConfig);

export { iyzicoService, IyzicoPaymentService };
export type { 
  IyzicoConfig, 
  IyzicoPaymentRequest, 
  IyzicoPaymentResponse, 
  IyzicoInstallmentRequest, 
  IyzicoInstallmentInfo 
};