
export const sampleProducts = [
  {
    _id: "1",
    name: "Premium Tractor Model X200",
    description: "A high-performance tractor with advanced features for modern farming needs",
    price: 125000,
    category: "tractors",
    stockQuantity: 15,
    images: [
      "https://images.unsplash.com/photo-1599898343901-38e8b5354385?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588784173336-2c374705a90d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536584754829-12214d404f32?w=800&auto=format&fit=crop"
    ],
    colors: ["Red", "Green", "Blue"],
    reviews: [
      {
        _id: "r1",
        userId: "u1",
        username: "Farmer123",
        rating: 4.5,
        comment: "Excellent tractor, very powerful and fuel-efficient.",
        createdAt: "2023-09-15T10:30:00Z"
      }
    ]
  },
  {
    _id: "2",
    name: "Smart Irrigation System",
    description: "Automated irrigation system with smart controls and weather adaptation",
    price: 45000,
    category: "irrigation",
    stockQuantity: 23,
    images: [
      "https://images.unsplash.com/photo-1601904340023-acdeed1f1dc9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613024314877-0663ade81e54?w=800&auto=format&fit=crop"
    ],
    colors: ["Black", "Green"],
    reviews: []
  },
  {
    _id: "3",
    name: "Advanced Seed Drill",
    description: "Precision seed drill for even distribution and optimal spacing",
    price: 78500,
    category: "seeders",
    stockQuantity: 10,
    images: [
      "https://images.unsplash.com/photo-1599580506193-fad57add3355?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?w=800&auto=format&fit=crop"
    ],
    colors: ["Red", "Yellow"],
    reviews: [
      {
        _id: "r2",
        userId: "u2",
        username: "AgriPro",
        rating: 5,
        comment: "Best seed drill I've ever used. Perfect spacing every time.",
        createdAt: "2023-10-20T14:15:00Z"
      }
    ]
  },
  {
    _id: "4",
    name: "Compact Harvester",
    description: "Space-efficient harvester suitable for small to medium farms",
    price: 230000,
    category: "harvesters",
    stockQuantity: 5,
    images: [
      "https://images.unsplash.com/photo-1591086429546-a6c55a8ed6bc?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&auto=format&fit=crop"
    ],
    colors: ["Orange", "Green"],
    reviews: []
  },
  {
    _id: "5",
    name: "Tractor Maintenance Kit",
    description: "Complete toolkit for regular maintenance of agricultural tractors",
    price: 12500,
    category: "parts",
    stockQuantity: 50,
    images: [
      "https://images.unsplash.com/photo-1593599224794-2188a625dd83?w=800&auto=format&fit=crop"
    ],
    colors: ["Black"],
    reviews: [
      {
        _id: "r3",
        userId: "u3",
        username: "MechanicFarmer",
        rating: 4,
        comment: "Has all the essential tools, good quality.",
        createdAt: "2023-11-05T09:45:00Z"
      }
    ]
  },
  {
    _id: "6",
    name: "Premium Quality Sprinklers",
    description: "High-efficiency sprinklers for even water distribution",
    price: 3500,
    category: "irrigation",
    stockQuantity: 100,
    images: [
      "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800&auto=format&fit=crop"
    ],
    colors: ["Blue", "Black"],
    reviews: []
  }
];

export const topSellingProducts = [
  {
    _id: "2",
    name: "Smart Irrigation System",
    description: "Automated irrigation system with smart controls and weather adaptation",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1601904340023-acdeed1f1dc9?w=800&auto=format&fit=crop"
    ],
    reviews: [
      { rating: 4.5 },
      { rating: 5 }
    ]
  },
  {
    _id: "1",
    name: "Premium Tractor Model X200",
    description: "A high-performance tractor with advanced features for modern farming needs",
    price: 125000,
    images: [
      "https://images.unsplash.com/photo-1599898343901-38e8b5354385?w=800&auto=format&fit=crop"
    ],
    reviews: [
      { rating: 4.5 }
    ]
  },
  {
    _id: "5",
    name: "Tractor Maintenance Kit",
    description: "Complete toolkit for regular maintenance of agricultural tractors",
    price: 12500,
    images: [
      "https://images.unsplash.com/photo-1593599224794-2188a625dd83?w=800&auto=format&fit=crop"
    ],
    reviews: [
      { rating: 4 }
    ]
  },
  {
    _id: "3",
    name: "Advanced Seed Drill",
    description: "Precision seed drill for even distribution and optimal spacing",
    price: 78500,
    images: [
      "https://images.unsplash.com/photo-1599580506193-fad57add3355?w=800&auto=format&fit=crop"
    ],
    reviews: [
      { rating: 5 }
    ]
  }
];
