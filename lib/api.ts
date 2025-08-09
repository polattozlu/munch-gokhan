
interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  description: string;
  address: string;
  phone: string;
  isActive: boolean;
  reviews: Review[];
  totalReviews: number;
}

interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
}

interface Order {
  id: string;
  userId: string;
  restaurantId: number;
  items: OrderItem[];
  total: number;
  status: 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
  deliveryAddress: DeliveryAddress;
  paymentMethod: string;
}

interface OrderItem {
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
}

interface DeliveryAddress {
  title: string;
  fullAddress: string;
  district: string;
  city: string;
  phone: string;
  instructions: string;
}

interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface RestaurantRegistration {
  restaurantName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  cuisine: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Burger Sarayı",
    cuisine: "Amerikan",
    image: "https://readdy.ai/api/search-image?query=gourmet%20burger%20restaurant%20interior%20with%20professional%20kitchen%20staff%20preparing%20fresh%20burgers%2C%20modern%20clean%20design%20with%20warm%20lighting%20and%20appetizing%20burger%20displays&width=600&height=400&seq=rest1&orientation=landscape",
    rating: 4.8,
    deliveryTime: "20-30 dk",
    deliveryFee: "5.00",
    description: "En lezzetli burgerler ve çıtır patatesler",
    address: "Bağdat Cad. No:123, Kadıköy",
    phone: "0216 123 45 67",
    isActive: true,
    totalReviews: 247,
    reviews: [
      {
        id: 1,
        userId: 1,
        userName: "Ahmet Yılmaz",
        rating: 5,
        comment: "Muhteşem burger! Özellikle köftesi çok lezzetli ve taze malzemeler kullanılmış. Hızlı teslimat da cabası.",
        date: "2024-01-15",
        helpful: 12
      },
      {
        id: 2,
        userId: 2,
        userName: "Ayşe Demir",
        rating: 4,
        comment: "Burgerler güzel ama biraz pahalı. Yine de kaliteli malzemeler kullanılmış, tavsiye ederim.",
        date: "2024-01-10",
        helpful: 8
      },
      {
        id: 3,
        userId: 3,
        userName: "Mehmet Kaya",
        rating: 5,
        comment: "Harika! Sosları özellikle çok beğendim. Patatesler de süper kıtır.",
        date: "2024-01-08",
        helpful: 15
      }
    ]
  },
  {
    id: 2,
    name: "Pizza Köşesi",
    cuisine: "İtalyan",
    image: "https://readdy.ai/api/search-image?query=authentic%20italian%20pizza%20restaurant%20with%20wood-fired%20oven%20and%20fresh%20pizza%20ingredients%2C%20rustic%20italian%20decor%20with%20warm%20ambiance&width=600&height=400&seq=rest2&orientation=landscape",
    rating: 4.6,
    deliveryTime: "25-35 dk",
    deliveryFee: "4.50",
    description: "Geleneksel İtalyan pizzaları ve makarnalar",
    address: "İstiklal Cad. No:456, Beyoğlu",
    phone: "0212 987 65 43",
    isActive: true,
    totalReviews: 189,
    reviews: [
      {
        id: 4,
        userId: 4,
        userName: "Fatma Özkan",
        rating: 5,
        comment: "Margherita pizza mükemmeldi! Hamuru ince ve lezzetli. Kesinlikle tekrar sipariş vereceğim.",
        date: "2024-01-12",
        helpful: 10
      },
      {
        id: 5,
        userId: 5,
        userName: "Can Arslan",
        rating: 4,
        comment: "Pizzalar güzel ama biraz geç geldi. Lezzet konusunda şikayet yok.",
        date: "2024-01-05",
        helpful: 6
      }
    ]
  },
  {
    id: 3,
    name: "Sushi Evi",
    cuisine: "Japon",
    image: "https://readdy.ai/api/search-image?query=modern%20japanese%20sushi%20restaurant%20with%20sushi%20chef%20preparing%20fresh%20sushi%2C%20elegant%20minimalist%20design%20with%20bamboo%20elements%20and%20sushi%20counter&width=600&height=400&seq=rest3&orientation=landscape",
    rating: 4.9,
    deliveryTime: "30-45 dk",
    deliveryFee: "7.50",
    description: "Taze sushi ve Japon mutfağı lezzetleri",
    address: "Nişantaşı Mah. Teşvikiye Sok. No:789",
    phone: "0212 555 11 22",
    isActive: true,
    totalReviews: 156,
    reviews: [
      {
        id: 6,
        userId: 6,
        userName: "Kemal Şen",
        rating: 5,
        comment: "Sushi kalitesi gerçekten çok yüksek. Balık çok taze ve sunum harika. Fiyat da makul.",
        date: "2024-01-14",
        helpful: 20
      },
      {
        id: 7,
        userId: 7,
        userName: "Zeynep Aktaş",
        rating: 5,
        comment: "Mükemmel! Özellikle salmon roll çok lezzetliydi. Hızlı teslimat da ayrı bir artı.",
        date: "2024-01-09",
        helpful: 18
      }
    ]
  },
  {
    id: 4,
    name: "Taco Festivali",
    cuisine: "Meksikan",
    image: "https://readdy.ai/api/search-image?query=vibrant%20mexican%20taco%20restaurant%20with%20colorful%20decor%2C%20fresh%20tacos%20and%20mexican%20ingredients%2C%20festive%20atmosphere%20with%20authentic%20mexican%20styling&width=600&height=400&seq=rest4&orientation=landscape",
    rating: 4.4,
    deliveryTime: "15-25 dk",
    deliveryFee: "3.50",
    description: "Otantik Meksikan lezzetleri ve tacolar",
    address: "Etiler Mah. Nispetiye Cad. No:321",
    phone: "0212 333 44 55",
    isActive: true,
    totalReviews: 203,
    reviews: [
      {
        id: 8,
        userId: 8,
        userName: "Oğuz Yıldırım",
        rating: 4,
        comment: "Tacolar lezzetli ama biraz daha baharatlı olabilirdi. Genel olarak memnunum.",
        date: "2024-01-11",
        helpful: 7
      },
      {
        id: 9,
        userId: 9,
        userName: "Selin Koç",
        rating: 5,
        comment: "Harika! Özellikle beef taco çok güzeldi. Sosları da mükemmel.",
        date: "2024-01-06",
        helpful: 11
      }
    ]
  },
  {
    id: 5,
    name: "Kebap Ustası",
    cuisine: "Türk",
    image: "https://readdy.ai/api/search-image?query=traditional%20turkish%20kebab%20restaurant%20with%20chef%20preparing%20kebabs%20on%20grill%2C%20authentic%20turkish%20decor%20with%20warm%20hospitality%20atmosphere&width=600&height=400&seq=rest5&orientation=landscape",
    rating: 4.7,
    deliveryTime: "20-30 dk",
    deliveryFee: "4.00",
    description: "Geleneksel Türk mutfağı ve kebaplar",
    address: "Eminönü Mah. Tarihi Çarşı No:654",
    phone: "0212 777 88 99",
    isActive: true,
    totalReviews: 312,
    reviews: [
      {
        id: 10,
        userId: 10,
        userName: "Hasan Çelik",
        rating: 5,
        comment: "Adana kebap mükemmeldi! Çok lezzetli ve doyurucu. Fiyat performans olarak da çok iyi.",
        date: "2024-01-13",
        helpful: 16
      },
      {
        id: 11,
        userId: 11,
        userName: "Gülsüm Avcı",
        rating: 4,
        comment: "Kebaplar güzel ama pilav biraz kuru geldi. Yine de tavsiye ederim.",
        date: "2024-01-07",
        helpful: 9
      }
    ]
  },
  {
    id: 6,
    name: "Köri Ekspres",
    cuisine: "Hint",
    image: "https://readdy.ai/api/search-image?query=authentic%20indian%20curry%20restaurant%20with%20aromatic%20spices%20and%20traditional%20curry%20dishes%2C%20warm%20ethnic%20decor%20with%20indian%20cultural%20elements&width=600&height=400&seq=rest6&orientation=landscape",
    rating: 4.5,
    deliveryTime: "25-40 dk",
    deliveryFee: "6.00",
    description: "Otantik Hint mutfağı ve baharatlı yemekler",
    address: "Cihangir Mah. Akarsu Cad. No:147",
    phone: "0212 666 77 88",
    isActive: true,
    totalReviews: 128,
    reviews: [
      {
        id: 12,
        userId: 12,
        userName: "Emre Kılıç",
        rating: 5,
        comment: "Chicken curry harika! Baharatlar tam kıvamında. Naan ekmeği de çok lezzetli.",
        date: "2024-01-10",
        helpful: 14
      },
      {
        id: 13,
        userId: 13,
        userName: "Aylin Şahin",
        rating: 4,
        comment: "Lezzetli ama biraz geç geldi. Yemek kalitesi gayet iyi.",
        date: "2024-01-04",
        helpful: 5
      }
    ]
  }
];

let menuItems: MenuItem[] = [
  {
    id: 1,
    restaurantId: 5,
    name: 'Adana Kebap',
    description: 'Baharatlı kıyma kebabı, pilav ve salata ile servis',
    price: 45.00,
    image: 'https://readdy.ai/api/search-image?query=delicious%20adana%20kebab%20on%20a%20white%20plate%20with%20rice%20pilaf%20and%20fresh%20salad%2C%20garnished%20with%20grilled%20vegetables%20and%20lemon%2C%20restaurant%20presentation&width=300&height=200&seq=menu1&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 2,
    restaurantId: 5,
    name: 'Urfa Kebap',
    description: 'Az baharatlı kıyma kebabı, pilav ve salata ile',
    price: 43.00,
    image: 'https://readdy.ai/api/search-image?query=urfa%20kebab%20with%20rice%20and%20fresh%20salad%20on%20white%20plate%2C%20traditional%20turkish%20restaurant%20presentation%20with%20grilled%20vegetables&width=300&height=200&seq=menu2&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 3,
    restaurantId: 5,
    name: 'Türk Kahvaltısı',
    description: 'Peynir, zeytin, domates ve ekmekle geleneksel kahvaltı',
    price: 35.00,
    image: 'https://readdy.ai/api/search-image?query=traditional%20turkish%20breakfast%20spread%20with%20various%20cheeses%20olives%20tomatoes%20cucumbers%20bread%20and%20tea%2C%20beautifully%20arranged%20on%20white%20plates&width=300&height=200&seq=menu3&orientation=landscape',
    category: 'kahvalti',
    isAvailable: true
  },
  {
    id: 4,
    restaurantId: 5,
    name: 'Baklava',
    description: 'Bal ve fıstıklı geleneksel tatlı',
    price: 25.00,
    image: 'https://readdy.ai/api/search-image?query=golden%20baklava%20pieces%20with%20pistachios%20and%20honey%20syrup%20on%20an%20elegant%20plate%2C%20garnished%20with%20chopped%20nuts%2C%20restaurant%20dessert%20presentation&width=300&height=200&seq=menu4&orientation=landscape',
    category: 'tatli',
    isAvailable: true
  },
  {
    id: 5,
    restaurantId: 5,
    name: 'Çoban Salatası',
    description: 'Domates, salatalık, soğan ve peynir ile taze salata',
    price: 18.00,
    image: 'https://readdy.ai/api/search-image?query=fresh%20turkish%20shepherd%20salad%20with%20tomatoes%20cucumbers%20onions%20and%20cheese%2C%20served%20in%20a%20white%20bowl%20with%20olive%20oil%20dressing&width=300&height=200&seq=menu5&orientation=landscape',
    category: 'salata',
    isAvailable: true
  },
  {
    id: 6,
    restaurantId: 2,
    name: 'Margherita Pizza',
    description: 'Domates sosu, mozzarella ve taze fesleğenli klasik pizza',
    price: 42.00,
    image: 'https://readdy.ai/api/search-image?query=authentic%20margherita%20pizza%20with%20fresh%20mozzarella%20tomato%20sauce%20and%20basil%20leaves%20on%20a%20wooden%20board%2C%20restaurant%20quality%20presentation&width=300&height=200&seq=menu6&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 7,
    restaurantId: 2,
    name: 'Pepperoni Pizza',
    description: 'Pepperoni ve eritilmiş peynirli popüler pizza',
    price: 48.00,
    image: 'https://readdy.ai/api/search-image?query=pepperoni%20pizza%20with%20melted%20cheese%20and%20crispy%20pepperoni%20slices%20on%20a%20wooden%20serving%20board%2C%20restaurant%20presentation%20style&width=300&height=200&seq=menu7&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 8,
    restaurantId: 2,
    name: 'Quattro Stagioni',
    description: 'Dört mevsim malzemeleriyle özel pizza',
    price: 55.00,
    image: 'https://readdy.ai/api/search-image?query=quattro%20stagioni%20pizza%20with%20four%20different%20toppings%20in%20quarters%2C%20artichokes%20mushrooms%20ham%20and%20olives%2C%20restaurant%20presentation&width=300&height=200&seq=menu8&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 9,
    restaurantId: 2,
    name: 'Sezar Salatası',
    description: 'Taze marul, sezar sosu ve çıtır krutonlarla',
    price: 28.00,
    image: 'https://readdy.ai/api/search-image?query=fresh%20caesar%20salad%20with%20crisp%20romaine%20lettuce%20parmesan%20cheese%20croutons%20and%20dressing%20in%20a%20white%20bowl%2C%20restaurant%20presentation&width=300&height=200&seq=menu9&orientation=landscape',
    category: 'salata',
    isAvailable: true
  },
  {
    id: 10,
    restaurantId: 2,
    name: 'Tiramisu',
    description: 'Geleneksel İtalyan kahveli tatlı',
    price: 32.00,
    image: 'https://readdy.ai/api/search-image?query=elegant%20tiramisu%20dessert%20with%20cocoa%20powder%20dusting%20on%20a%20white%20plate%2C%20restaurant%20dessert%20presentation%20with%20coffee%20beans&width=300&height=200&seq=menu10&orientation=landscape',
    category: 'tatli',
    isAvailable: true
  },
  {
    id: 11,
    restaurantId: 1,
    name: 'Cheeseburger',
    description: 'Klasik cheeseburger, çıtır patates kızartması ile',
    price: 38.00,
    image: 'https://readdy.ai/api/search-image?query=classic%20cheeseburger%20with%20melted%20cheese%20lettuce%20tomato%20and%20fries%20on%20a%20wooden%20plate%2C%20restaurant%20presentation%20style&width=300&height=200&seq=menu11&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 12,
    restaurantId: 1,
    name: 'Bacon Burger',
    description: 'Çıtır bacon ve peynirli özel burger',
    price: 45.00,
    image: 'https://readdy.ai/api/search-image?query=bacon%20cheeseburger%20with%20crispy%20bacon%20lettuce%20tomato%20and%20melted%20cheese%2C%20served%20with%20fries%20on%20a%20dark%20wooden%20board&width=300&height=200&seq=menu12&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 13,
    restaurantId: 1,
    name: 'Tavuk Kanatları',
    description: 'Baharatlı soslu çıtır tavuk kanatları',
    price: 32.00,
    image: 'https://readdy.ai/api/search-image?query=spicy%20chicken%20wings%20with%20sauce%20and%20celery%20sticks%20on%20a%20white%20plate%2C%20restaurant%20presentation%20with%20dipping%20sauce&width=300&height=200&seq=menu13&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 14,
    restaurantId: 1,
    name: 'Soğan Halkaları',
    description: 'Altın sarısı çıtır soğan halkaları',
    price: 22.00,
    image: 'https://readdy.ai/api/search-image?query=crispy%20golden%20onion%20rings%20stacked%20on%20a%20white%20plate%20with%20dipping%20sauce%2C%20restaurant%20appetizer%20presentation&width=300&height=200&seq=menu14&orientation=landscape',
    category: 'salata',
    isAvailable: true
  },
  {
    id: 15,
    restaurantId: 3,
    name: 'California Roll',
    description: 'Avokado, salatalık ve yengeç çubuğu ile hazırlanmış sushi',
    price: 45.00,
    image: 'https://readdy.ai/api/search-image?query=california%20sushi%20roll%20with%20avocado%20cucumber%20and%20crab%20stick%20on%20a%20black%20slate%20plate%2C%20elegant%20japanese%20restaurant%20presentation&width=300&height=200&seq=menu15&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 16,
    restaurantId: 3,
    name: 'Salmon Teriyaki',
    description: 'Teriyaki soslu ızgara somon balığı',
    price: 65.00,
    image: 'https://readdy.ai/api/search-image?query=grilled%20salmon%20teriyaki%20with%20rice%20and%20vegetables%20on%20a%20white%20plate%2C%20japanese%20restaurant%20presentation%20with%20garnish&width=300&height=200&seq=menu16&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 17,
    restaurantId: 3,
    name: 'Miso Çorbası',
    description: 'Geleneksel Japon miso çorbası',
    price: 15.00,
    image: 'https://readdy.ai/api/search-image?query=traditional%20miso%20soup%20in%20a%20black%20bowl%20with%20tofu%20and%20seaweed%2C%20japanese%20restaurant%20presentation%20with%20wooden%20spoon&width=300&height=200&seq=menu17&orientation=landscape',
    category: 'salata',
    isAvailable: true
  },
  {
    id: 18,
    restaurantId: 3,
    name: 'Mochi Dondurma',
    description: 'Renkli mochi dondurma topları',
    price: 28.00,
    image: 'https://readdy.ai/api/search-image?query=colorful%20mochi%20ice%20cream%20balls%20on%20a%20white%20plate%2C%20japanese%20dessert%20presentation%20with%20mint%20garnish&width=300&height=200&seq=menu18&orientation=landscape',
    category: 'tatli',
    isAvailable: true
  },
  {
    id: 19,
    restaurantId: 4,
    name: 'Etli Taco',
    description: 'Baharatlı et, marul, domates ve peynirli taco',
    price: 35.00,
    image: 'https://readdy.ai/api/search-image?query=beef%20tacos%20with%20lettuce%20tomato%20and%20cheese%20on%20a%20colorful%20plate%2C%20mexican%20restaurant%20presentation%20with%20lime%20and%20salsa&width=300&height=200&seq=menu19&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 20,
    restaurantId: 4,
    name: 'Tavuklu Quesadilla',
    description: 'Tavuk parçaları ve peynirli quesadilla',
    price: 32.00,
    image: 'https://readdy.ai/api/search-image?query=chicken%20quesadilla%20cut%20into%20triangles%20with%20guacamole%20and%20sour%20cream%2C%20mexican%20restaurant%20presentation%20on%20a%20wooden%20board&width=300&height=200&seq=menu20&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 21,
    restaurantId: 4,
    name: 'Guacamole',
    description: 'Taze avokado ezmesi ve tortilla cipsleri',
    price: 18.00,
    image: 'https://readdy.ai/api/search-image?query=fresh%20guacamole%20with%20tortilla%20chips%20on%20a%20colorful%20mexican%20plate%2C%20restaurant%20presentation%20with%20lime%20wedges&width=300&height=200&seq=menu21&orientation=landscape',
    category: 'salata',
    isAvailable: true
  },
  {
    id: 22,
    restaurantId: 4,
    name: 'Churros',
    description: 'Tarçın şekerli geleneksel İspanyol tatlısı',
    price: 25.00,
    image: 'https://readdy.ai/api/search-image?query=golden%20churros%20with%20cinnamon%20sugar%20and%20chocolate%20sauce%20on%20a%20white%20plate%2C%20spanish%20dessert%20presentation&width=300&height=200&seq=menu22&orientation=landscape',
    category: 'tatli',
    isAvailable: true
  },
  {
    id: 23,
    restaurantId: 6,
    name: 'Tavuklu Biryani',
    description: 'Baharatlı tavuk ve basmati pilavı',
    price: 42.00,
    image: 'https://readdy.ai/api/search-image?query=aromatic%20chicken%20biryani%20with%20basmati%20rice%20and%20spices%20in%20a%20traditional%20serving%20bowl%2C%20indian%20restaurant%20presentation%20with%20raita&width=300&height=200&seq=menu23&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 24,
    restaurantId: 6,
    name: 'Butter Chicken',
    description: 'Kremalı tereyağlı tavuk köri',
    price: 38.00,
    image: 'https://readdy.ai/api/search-image?query=creamy%20butter%20chicken%20curry%20with%20rice%20and%20naan%20bread%20on%20a%20traditional%20indian%20plate%2C%20restaurant%20presentation%20with%20herbs&width=300&height=200&seq=menu24&orientation=landscape',
    category: 'anaYemek',
    isAvailable: true
  },
  {
    id: 25,
    restaurantId: 6,
    name: 'Samosa',
    description: 'Baharatlı patates dolgulu çıtır börek',
    price: 15.00,
    image: 'https://readdy.ai/api/search-image?query=crispy%20samosas%20with%20chutney%20dipping%20sauce%20on%20a%20white%20plate%2C%20indian%20appetizer%20presentation%20with%20mint%20garnish&width=300&height=200&seq=menu25&orientation=landscape',
    category: 'salata',
    isAvailable: true
  },
  {
    id: 26,
    restaurantId: 6,
    name: 'Gulab Jamun',
    description: 'Şerbetli geleneksel Hint tatlısı',
    price: 22.00,
    image: 'https://readdy.ai/api/search-image?query=traditional%20gulab%20jamun%20dessert%20balls%20in%20syrup%20on%20an%20elegant%20plate%2C%20indian%20dessert%20presentation%20with%20pistachios&width=300&height=200&seq=menu26&orientation=landscape',
    category: 'tatli',
    isAvailable: true
  }
];

let orders: Order[] = [
  {
    id: 'SİP-2024-001',
    userId: 'user-123',
    restaurantId: 5,
    items: [
      { menuItemId: 1, name: 'Adana Kebap', price: 45.00, quantity: 2 },
      { menuItemId: 4, name: 'Baklava', price: 25.00, quantity: 1 }
    ],
    total: 115.00,
    status: 'on-the-way',
    orderDate: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    deliveryAddress: {
      title: 'Ev',
      fullAddress: 'Atatürk Mahallesi, Cumhuriyet Caddesi No:123 D:5',
      district: 'Kadıköy',
      city: 'İstanbul',
      phone: '0532 123 45 67',
      instructions: 'Kapıcıya bırakabilirsiniz'
    },
    paymentMethod: 'card'
  },
  {
    id: 'SİP-2024-002',
    userId: 'user-123',
    restaurantId: 2,
    items: [
      { menuItemId: 6, name: 'Margherita Pizza', price: 42.00, quantity: 1 },
      { menuItemId: 9, name: 'Sezar Salatası', price: 28.00, quantity: 1 }
    ],
    total: 70.00,
    status: 'preparing',
    orderDate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
    deliveryAddress: {
      title: 'İş',
      fullAddress: 'Merkez Mahallesi, İş Caddesi No:456 K:3',
      district: 'Şişli',
      city: 'İstanbul',
      phone: '0532 123 45 67',
      instructions: 'Sekreterya bırakabilirsiniz'
    },
    paymentMethod: 'cash'
  }
];

let restaurantRegistrations: RestaurantRegistration[] = [];

export const api = {
  async getRestaurants(): Promise<Restaurant[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockRestaurants.filter(r => r.isActive));
      }, 300);
    });
  },

  async searchRestaurants(query: string): Promise<Restaurant[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockRestaurants.filter(r =>
          r.isActive && (
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.cuisine.toLowerCase().includes(query.toLowerCase())
          )
        );
        resolve(filtered);
      }, 300);
    });
  },

  async getRestaurantById(id: number): Promise<Restaurant | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const restaurant = mockRestaurants.find(r => r.id === id && r.isActive);
        resolve(restaurant || null);
      }, 200);
    });
  },

  async getMenuItems(restaurantId: number): Promise<MenuItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = menuItems.filter(item =>
          item.restaurantId === restaurantId && item.isAvailable
        );
        resolve(items);
      }, 300);
    });
  },

  async getMenuItemsByCategory(restaurantId: number, category: string): Promise<MenuItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = menuItems.filter(item =>
          item.restaurantId === restaurantId &&
          item.isAvailable &&
          (category === 'tumunu' || item.category === category)
        );
        resolve(items);
      }, 300);
    });
  },

  async getMenuItemById(id: number): Promise<MenuItem | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = menuItems.find(item => item.id === id && item.isAvailable);
        resolve(item || null);
      }, 200);
    });
  },

  async createOrder(orderData: Omit<Order, 'id' | 'orderDate'>): Promise<Order> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: Order = {
          ...orderData,
          id: `SİP-2024-${String(orders.length + 1).padStart(3, '0')}`,
          orderDate: new Date().toISOString()
        };
        orders.push(newOrder);
        resolve(newOrder);
      }, 500);
    });
  },

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userOrders = orders.filter(order => order.userId === userId);
        resolve(userOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()));
      }, 300);
    });
  },

  async getOrderById(id: string): Promise<Order | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = orders.find(order => order.id === id);
        resolve(order || null);
      }, 200);
    });
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderIndex = orders.findIndex(order => order.id === id);
        if (orderIndex !== -1) {
          orders[orderIndex].status = status;
          resolve(orders[orderIndex]);
        } else {
          resolve(null);
        }
      }, 200);
    });
  },

  async registerRestaurant(registration: Omit<RestaurantRegistration, 'status' | 'createdAt'>): Promise<RestaurantRegistration> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRegistration: RestaurantRegistration = {
          ...registration,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        restaurantRegistrations.push(newRegistration);
        resolve(newRegistration);
      }, 800);
    });
  },

  async getRestaurantRegistrations(): Promise<RestaurantRegistration[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(restaurantRegistrations);
      }, 300);
    });
  },

  async getRestaurantReviews(restaurantId: number): Promise<Review[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const restaurant = mockRestaurants.find(r => r.id === restaurantId);
    return restaurant?.reviews || [];
  },

  async addReview(restaurantId: number, review: Omit<Review, 'id' | 'date'>): Promise<Review> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newReview: Review = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    const restaurant = mockRestaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      restaurant.reviews.unshift(newReview);
      restaurant.totalReviews += 1;
      // Recalculate average rating
      const totalRating = restaurant.reviews.reduce((sum, r) => sum + r.rating, 0);
      restaurant.rating = Number((totalRating / restaurant.reviews.length).toFixed(1));
    }

    return newReview;
  },

  async calculateDeliveryFee(restaurantId: number, address: string): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const restaurant = mockRestaurants.find(r => r.id === restaurantId);
        const baseFee = restaurant ? parseFloat(restaurant.deliveryFee) : 5.00;
        // Distance-based calculation simulation
        const distanceMultiplier = Math.random() * 0.5 + 0.8; // 0.8-1.3x
        resolve(Number((baseFee * distanceMultiplier).toFixed(2)));
      }, 200);
    });
  },

  async validatePayment(paymentData: any): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate payment validation
        resolve(Math.random() > 0.1); // 90% success rate
      }, 1000);
    });
  }
};

export type { Restaurant, MenuItem, Order, OrderItem, DeliveryAddress, RestaurantRegistration, Review };
