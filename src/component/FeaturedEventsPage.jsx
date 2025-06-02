import { useEffect, useState, useMemo } from "react"
import { Search, Calendar, MapPin, Clock, Users, Star } from "lucide-react"
import { fetchCryptoEvents } from "../api/fetchCryptoEvents"

// Mock event data for Islamabad
const eventsData = [
  {
    id: 1,
    title: "Tech Meetup Islamabad",
    description: "Join fellow developers and tech enthusiasts for networking and knowledge sharing.",
    date: "2024-06-15",
    time: "6:00 PM",
    location: "F-7 Markaz, Islamabad",
    category: "Technology",
    price: "Free",
    attendees: 45,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Lok Virsa Folk Festival",
    description: "Experience traditional Pakistani culture with folk music, dance, and crafts.",
    date: "2024-06-20",
    time: "4:00 PM",
    location: "Lok Virsa Museum, Shakarparian",
    category: "Culture",
    price: "PKR 500",
    attendees: 200,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Islamabad Food Festival",
    description: "Taste the best local and international cuisines from top restaurants.",
    date: "2024-06-25",
    time: "12:00 PM",
    location: "F-9 Park, Islamabad",
    category: "Food",
    price: "PKR 300",
    attendees: 500,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Art Exhibition: Modern Pakistan",
    description: "Contemporary art showcase featuring emerging Pakistani artists.",
    date: "2024-06-18",
    time: "10:00 AM",
    location: "Pakistan National Council of Arts",
    category: "Art",
    price: "PKR 200",
    attendees: 80,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Startup Pitch Competition",
    description: "Watch innovative startups pitch their ideas to investors and mentors.",
    date: "2024-06-22",
    time: "2:00 PM",
    location: "National Incubation Center, Islamabad",
    category: "Business",
    price: "Free",
    attendees: 120,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Margalla Hills Nature Walk",
    description: "Guided nature walk exploring the beautiful Margalla Hills trails.",
    date: "2024-06-16",
    time: "7:00 AM",
    location: "Trail 3, Margalla Hills",
    category: "Outdoor",
    price: "PKR 150",
    attendees: 30,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Qawwali Night at Saidpur",
    description: "Traditional Qawwali performance in the historic Saidpur Village.",
    date: "2024-06-28",
    time: "8:00 PM",
    location: "Saidpur Village, Islamabad",
    category: "Music",
    price: "PKR 800",
    attendees: 150,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Digital Marketing Workshop",
    description: "Learn the latest digital marketing strategies and tools from industry experts.",
    date: "2024-06-30",
    time: "9:00 AM",
    location: "Comstech Auditorium, Islamabad",
    category: "Education",
    price: "PKR 1500",
    attendees: 75,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function FeaturedEventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cryptoEvents, setCryptoEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCryptoEvents() {
      try {
        const data = await fetchCryptoEvents()
        // Flatten the nested eventlist from API response
        const flattenedEvents = data.data?.list?.flatMap((item) =>
          item.eventlist.map((event) => ({
            title: event.nativename,
            description: event.description,
            date: new Date(event.eventtime * 1000).toLocaleDateString(), // Convert UNIX timestamp to readable date
            location: event.tagnamelist.includes("Listing") ? "Online (Crypto Exchange)" : "Online", // Assume listings are online
            coin: event.coinname,
            symbol: event.coinsymbol,
            logo: event.coinlogo,
            price_usd: event.price_usd,
            confidence: event.confidence
          }))
        )
        setCryptoEvents(flattenedEvents || [])
      } catch (error) {
        console.error("Error processing crypto events:", error)
        setCryptoEvents([])
      } finally {
        setLoading(false)
      }
    }
    loadCryptoEvents()
  }, [])

  // Filter events based on search term and category
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(eventsData.map((event) => event.category)))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Crypto Events</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Events
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Events in Islamabad</h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            From tech meetups to cultural festivals, find your next adventure in Pakistan's capital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Events
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Create Event
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Crypto Events Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Crypto Events</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Curated cryptocurrency events from around the world
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading events...</p>
          ) : cryptoEvents.length === 0 ? (
            <p className="text-center text-gray-500">No crypto events found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cryptoEvents.map((event, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    {event.logo && (
                      <img
                        src={event.logo}
                        alt={`${event.coin} logo`}
                        className="w-12 h-12 mb-4"
                      />
                    )}
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{event.title || "No Title"}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description || "No Description"}</p>
                    <div className="space-y-2 mb-4 text-sm text-gray-500">
                      {event.date && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      )}
                      {event.coin && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-2" />
                          {event.coin} ({event.symbol})
                        </div>
                      )}
                      {event.price_usd !== undefined && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Price: ${event.price_usd.toFixed(4)} USD
                        </div>
                      )}
                      {event.confidence !== undefined && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-2" />
                          Confidence: {event.confidence}%
                        </div>
                      )}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4">ISB Events</h5>
              <p className="text-gray-400">Connecting people through amazing events in Islamabad, Pakistan.</p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Browse Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Create Event
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Categories</h6>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Technology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Culture
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Food
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Business
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contact Info</h6>
              <div className="space-y-2 text-gray-400">
                <p>📧 hello@isbevents.com</p>
                <p>📞 +92 51 123 4567</p>
                <p>📍 F-7 Markaz, Islamabad</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ISB Events. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}