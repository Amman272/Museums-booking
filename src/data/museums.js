export const museums = [
  {
    id: "national-museum-delhi",
    name: "National Museum, New Delhi",
    description: "One of the largest museums in India with over 200,000 works of art spanning 5,000 years of Indian cultural heritage.",
    location: "Janpath, New Delhi",
    image: "/src/assets/hero-museum.jpg",
    totalSlots: 200,
    availableSlots: 45,
    ticketPrice: 100,
    timings: ["10:00-11:00 AM", "11:00-12:00 PM", "2:00-3:00 PM", "3:00-4:00 PM", "4:00-5:00 PM"],
    features: ["Ancient Artifacts", "Sculpture Gallery", "Miniature Paintings", "Coin Collection"]
  },
  {
    id: "indian-museum-kolkata",
    name: "Indian Museum, Kolkata",
    description: "The oldest and largest multipurpose museum in India and the Asia-Pacific region.",
    location: "Park Street, Kolkata",
    image: "/src/assets/museum-interior.jpg",
    totalSlots: 150,
    availableSlots: 78,
    ticketPrice: 100,
    timings: ["10:00-11:00 AM", "11:00-12:00 PM", "2:00-3:00 PM", "3:00-4:00 PM"],
    features: ["Natural History", "Egyptian Mummies", "Fossil Collection", "Buddhist Art"]
  },
  {
    id: "prince-wales-mumbai",
    name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai",
    description: "Formerly Prince of Wales Museum, showcasing ancient Indian history, fine arts, and natural history.",
    location: "Fort District, Mumbai",
    image: "/src/assets/hero-museum.jpg",
    totalSlots: 180,
    availableSlots: 12,
    ticketPrice: 100,
    timings: ["10:00-11:00 AM", "11:00-12:00 PM", "2:00-3:00 PM", "4:00-5:00 PM"],
    features: ["Miniature Paintings", "Decorative Arts", "Arms & Armour", "Natural History"]
  },
  {
    id: "government-museum-chennai",
    name: "Government Museum, Chennai",
    description: "Second oldest museum in India with rich collections of archaeological and numismatic sections.",
    location: "Egmore, Chennai",
    image: "/src/assets/museum-interior.jpg",
    totalSlots: 120,
    availableSlots: 95,
    ticketPrice: 100,
    timings: ["10:00-11:00 AM", "2:00-3:00 PM", "3:00-4:00 PM", "4:00-5:00 PM"],
    features: ["Bronze Gallery", "Archaeology", "Anthropology", "Botany"]
  },
  {
    id: "salar-jung-hyderabad",
    name: "Salar Jung Museum, Hyderabad",
    description: "One of India's three National Museums with the world's largest one-man collection of antiques.",
    location: "Darushifa, Hyderabad",
    image: "/src/assets/hero-museum.jpg",
    totalSlots: 160,
    availableSlots: 134,
    ticketPrice: 100,
    timings: ["10:00-11:00 AM", "11:00-12:00 PM", "2:00-3:00 PM", "3:00-4:00 PM"],
    features: ["Jade Collection", "Manuscripts", "Clocks", "Textiles"]
  }
];

export const sampleUser = {
  id: "user123",
  name: "John Doe",
  email: "a",
  bookings: [
    {
      id: "booking1",
      museumId: "national-museum-delhi",
      museumName: "National Museum, New Delhi",
      date: "2024-01-15",
      timeSlot: "10:00-11:00 AM",
      members: [
        { name: "John Doe", age: 28 },
        { name: "Jane Doe", age: 26 }
      ],
      totalAmount: 200,
      status: 'confirmed'
    },
    {
      id: "booking2",
      museumId: "indian-museum-kolkata",
      museumName: "Indian Museum, Kolkata",
      date: "2024-02-20",
      timeSlot: "2:00-3:00 PM",
      members: [
        { name: "John Doe", age: 28 }
      ],
      totalAmount: 100,
      status: 'confirmed'
    }
  ]
};