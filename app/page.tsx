"use client"

import { useState } from "react"
import { Search, ShoppingCart, Phone, MapPin, Clock, Plus, Minus, Star, Utensils, Coffee, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  description?: string
  image: string
  variants?: { name: string; price: number }[]
  isPopular?: boolean
  rating?: number
}

interface CartItem extends MenuItem {
  quantity: number
  selectedVariant?: { name: string; price: number }
}

const menuItems: MenuItem[] = [
  // Drinks
  {
    id: "black-coffee",
    name: "Black Coffee",
    price: 10,
    category: "Drinks",
    description: "Fresh brewed aromatic black coffee",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
  },
  {
    id: "milk-coffee",
    name: "Milk Coffee",
    price: 12,
    category: "Drinks",
    description: "Creamy coffee with fresh milk",
    image: "/placeholder.svg?height=200&width=300",
    isPopular: true,
    rating: 4.5,
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    price: 15,
    category: "Drinks",
    description: "Refreshing iced coffee perfect for hot days",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
  },
  {
    id: "milk-tea",
    name: "Milk Tea (Chai)",
    price: 8,
    category: "Drinks",
    description: "Traditional Indian masala chai",
    image: "/placeholder.svg?height=200&width=300",
    isPopular: true,
    rating: 4.7,
  },
  {
    id: "lassi",
    name: "Lassi",
    price: 20,
    category: "Drinks",
    description: "Creamy yogurt-based traditional drink",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
  },

  // Breakfast
  {
    id: "idli",
    name: "Idli",
    price: 25,
    category: "Breakfast",
    description: "Soft steamed rice cakes with sambhar & chutney",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
  },
  {
    id: "masala-dosa",
    name: "Masala Dosa",
    price: 35,
    category: "Breakfast",
    description: "Crispy crepe filled with spiced potato masala",
    image: "/placeholder.svg?height=200&width=300",
    isPopular: true,
    rating: 4.8,
  },
  {
    id: "samosa",
    name: "Samosa",
    price: 25,
    category: "Breakfast",
    description: "Golden crispy pastry with spiced potato filling",
    image: "/placeholder.svg?height=200&width=300",
    isPopular: true,
    rating: 4.5,
  },
  {
    id: "poha",
    name: "Poha",
    price: 20,
    category: "Breakfast",
    description: "Flattened rice with aromatic spices & herbs",
    image: "/placeholder.svg?height=200&width=300",
    variants: [
      { name: "Plain", price: 20 },
      { name: "With Chana", price: 25 },
    ],
    rating: 4.3,
  },
  {
    id: "aloo-paratha",
    name: "Aloo Paratha",
    price: 40,
    category: "Breakfast",
    description: "Stuffed flatbread with spiced mashed potatoes",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
  },

  // Thali & Snacks
  {
    id: "veg-thali",
    name: "Veg Thali",
    price: 60,
    category: "Thali & Snacks",
    description: "Complete meal: Dal, Rice, Roti, Sabji, Pickle, Papad",
    image: "/placeholder.svg?height=200&width=300",
    isPopular: true,
    rating: 4.7,
  },
  {
    id: "special-thali",
    name: "Special Thali",
    price: 99,
    category: "Thali & Snacks",
    description: "Premium thali with paneer curry & fresh salad",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
  },
  {
    id: "veg-maggi",
    name: "Veg Maggi",
    price: 40,
    category: "Thali & Snacks",
    description: "Instant noodles loaded with fresh vegetables",
    image: "/placeholder.svg?height=200&width=300",
    isPopular: true,
    rating: 4.4,
  },
  {
    id: "chowmein",
    name: "Chowmein",
    price: 60,
    category: "Thali & Snacks",
    description: "Stir-fried noodles with crunchy vegetables",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
  },
]

export default function DidiKiRasoiWebsite() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const categories = ["All", ...Array.from(new Set(menuItems.map((item) => item.category)))]

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (item: MenuItem, variant?: { name: string; price: number }) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.selectedVariant?.name === variant?.name,
    )

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id && cartItem.selectedVariant?.name === variant?.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      )
    } else {
      const newItem: CartItem = {
        ...item,
        quantity: 1,
        selectedVariant: variant,
        price: variant ? variant.price : item.price,
      }
      setCart([...cart, newItem])
    }
  }

  const updateQuantity = (itemId: string, variantName: string | undefined, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => !(item.id === itemId && item.selectedVariant?.name === variantName)))
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemId && item.selectedVariant?.name === variantName ? { ...item, quantity: newQuantity } : item,
        ),
      )
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handlePlaceOrder = () => {
    if (cart.length === 0) return

    // Create order summary
    const orderSummary = cart
      .map(
        (item) =>
          `${item.name}${item.selectedVariant ? ` (${item.selectedVariant.name})` : ""} x${item.quantity} - ₹${item.price * item.quantity}`,
      )
      .join("\n")

    const totalAmount = getTotalPrice()
    const phoneNumber = "7440683678"

    // Create WhatsApp message
    const message = `🍽️ *New Order from Didi ki Rasoi*\n\n${orderSummary}\n\n*Total: ₹${totalAmount}*\n\nPlease confirm my order. Thank you!`

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Clear cart after order
    setCart([])
    setIsCartOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Didi ki Rasoi
                </h1>
                <p className="text-sm text-gray-600 font-medium">CSVTU Campus Mess</p>
              </div>
            </div>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md bg-gradient-to-b from-white to-orange-50">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold text-gray-800">Your Order</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">Your cart is empty</p>
                      <p className="text-gray-400 text-sm">Add some delicious items!</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {cart.map((item) => (
                          <div
                            key={`${item.id}-${item.selectedVariant?.name || "default"}`}
                            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-orange-100"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{item.name}</h4>
                              {item.selectedVariant && (
                                <p className="text-sm text-orange-600 font-medium">{item.selectedVariant.name}</p>
                              )}
                              <p className="text-lg font-bold text-green-600">₹{item.price}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-8 h-8 rounded-full border-orange-200 hover:bg-orange-50 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.selectedVariant?.name, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-8 h-8 rounded-full border-orange-200 hover:bg-orange-50 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.selectedVariant?.name, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-orange-200 pt-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                        <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-4">
                          <span>Total Amount:</span>
                          <span className="text-green-600">₹{getTotalPrice()}</span>
                        </div>
                        <Button
                          onClick={handlePlaceOrder}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg"
                        >
                          Place Order via WhatsApp 📱
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Hungry? We've Got You Covered! 🍽️</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Order delicious homestyle food from your classroom and skip the long queues. Fresh, tasty, and delivered
              fast!
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="font-semibold">7440683678</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="font-semibold">Building 4, CSVTU Newai</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="font-semibold">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for your favorite dish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-xl border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              />
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "border-orange-200 text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  {category === "Drinks" && <Coffee className="w-4 h-4 mr-2" />}
                  {category === "Breakfast" && <Utensils className="w-4 h-4 mr-2" />}
                  {category === "Thali & Snacks" && <Award className="w-4 h-4 mr-2" />}
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-orange-100 hover:border-orange-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {item.isPopular && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-semibold">
                    🔥 Popular
                  </Badge>
                )}
                {item.rating && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">{item.rating}</span>
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-bold text-sm"
                  >
                    ₹{item.price}
                  </Badge>
                </div>
                {item.description && <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>}

                {item.variants ? (
                  <div className="space-y-2">
                    {item.variants.map((variant) => (
                      <div key={variant.name} className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          {variant.name} - ₹{variant.price}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(item, variant)}
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-4"
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Button
                    onClick={() => addToCart(item)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    Add to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Didi ki Rasoi
              </h3>
            </div>
            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Serving delicious, homestyle food to CSVTU students with love and care. Your favorite campus mess, now
              just a click away!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl">
                <Phone className="w-8 h-8 text-orange-400 mb-2" />
                <h4 className="font-semibold mb-1">Call Us</h4>
                <p className="text-gray-300">7440683678</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl">
                <MapPin className="w-8 h-8 text-red-400 mb-2" />
                <h4 className="font-semibold mb-1">Location</h4>
                <p className="text-gray-300">CSVTU, Newai, Building 4</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl">
                <Clock className="w-8 h-8 text-green-400 mb-2" />
                <h4 className="font-semibold mb-1">Service</h4>
                <p className="text-gray-300">Tiffin & Fast Delivery</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">© 2024 Didi ki Rasoi. Made with ❤️ for CSVTU students</p>
              <p className="text-orange-400 text-sm mt-2 font-medium">
                🚀 Order from your classroom and skip the wait!
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
