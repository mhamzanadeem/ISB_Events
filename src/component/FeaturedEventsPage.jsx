import { useEffect, useState, useMemo } from "react"
import { Search, Calendar, MapPin, Clock, Users, Star } from "lucide-react"
import { fetchCryptoEvents } from "../api/fetchCryptoEvents"

// Mock crypto event data for fallback
const eventsData = [
  {
    id: 1,
    nativename: "New Listing on Binance",
    description: "Binance announces the listing of CryptoCoin (CCN) for trading.",
    eventtime: 1759315200, // Mock timestamp: 2025-09-15 12:00 PM UTC
    tagnamelist: ["Listing"],
    coinname: "CryptoCoin",
    coinsymbol: "CCN",
    coinlogo: "https://example.com/coinlogo/ccn.png",
    price_usd: 1.25,
    confidence: 92,
  },
  {
    id: 2,
    nativename: "Airdrop Event for TokenX",
    description: "Participate in the TokenX airdrop to receive free tokens by staking.",
    eventtime: 1759401600, // Mock timestamp: 2025-09-16 12:00 PM UTC
    tagnamelist: ["Airdrop"],
    coinname: "TokenX",
    coinsymbol: "TKX",
    coinlogo: "https://example.com/coinlogo/tkx.png",
    price_usd: 0.85,
    confidence: 88,
  },
  {
    id: 3,
    nativename: "Blockchain Summit 2025",
    description: "Join industry leaders to discuss the future of blockchain technology.",
    eventtime: 1759488000, // Mock timestamp: 2025-09-17 12:00 PM UTC
    tagnamelist: ["Conference"],
    coinname: "BlockChain",
    coinsymbol: "BLC",
    coinlogo: "https://example.com/coinlogo/blc.png",
    price_usd: 3.10,
    confidence: 95,
  },
  {
    id: 4,
    nativename: "New Listing on KuCoin",
    description: "KuCoin lists MoonCoin (MOON) with trading starting soon.",
    eventtime: 1759574400, // Mock timestamp: 2025-09-18 12:00 PM UTC
    tagnamelist: ["Listing"],
    coinname: "MoonCoin",
    coinsymbol: "MOON",
    coinlogo: "https://example.com/coinlogo/moon.png",
    price_usd: 0.45,
    confidence: 90,
  },
]

export default function FeaturedEventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cryptoEvents, setCryptoEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCryptoEvents() {
      try {
        const data = await fetchCryptoEvents()
        // Flatten the nested eventlist from API response
        const flattenedEvents = data.flatMap((item) =>
          item.eventlist.map((event) => ({
            title: event.nativename,
            description: event.description,
            date: new Date(event.eventtime * 1000).toLocaleDateString(), // Convert UNIX timestamp to readable date
            time: new Date(event.eventtime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Add time
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

  // Filter crypto events based on search term
  const filteredCryptoEvents = useMemo(() => {
    // Use API data if available, otherwise use eventsData
    const dataSource = cryptoEvents.length > 0 ? cryptoEvents : eventsData.map((event) => ({
      title: event.nativename,
      description: event.description,
      date: new Date(event.eventtime * 1000).toLocaleDateString(),
      time: new Date(event.eventtime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: event.tagnamelist.includes("Listing") ? "Online (Crypto Exchange)" : "Online",
      coin: event.coinname,
      symbol: event.coinsymbol,
      logo: event.coinlogo,
      price_usd: event.price_usd,
      confidence: event.confidence
    }))
    return dataSource.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, cryptoEvents])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Crypto Events Hub</h1>
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Discover Exciting Crypto Events Worldwide</h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Explore the latest cryptocurrency listings, airdrops, and more from global exchanges
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
                placeholder="Search events by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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
            <p className="text-center text-gray-500 text-lg">Loading Crypto Events...</p>
          ) : filteredCryptoEvents.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No crypto events found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCryptoEvents.map((event, idx) => (
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
                      {event.date && event.time && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date} at {event.time}
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
                    <div className="flex space-x-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Learn More
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Register
                      </button>
                    </div>
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
              <h5 className="text-xl font-bold mb-4">Crypto Events Hub</h5>
              <p className="text-gray-400">Connecting you to the latest cryptocurrency events and opportunities worldwide.</p>
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
                    Listings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Airdrops
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blockchain
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trading
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contact Info</h6>
              <div className="space-y-2 text-gray-400">
                <p>📧 support@cryptoeventshub.com</p>
                <p>📞 +1 800 123 4567</p>
                <p>📍 Global (Online Platform)</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Crypto Events Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}