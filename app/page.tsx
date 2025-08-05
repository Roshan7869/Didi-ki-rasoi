"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Search, ShoppingCart, Phone, MapPin, Clock, Plus, Minus, Star, Utensils, Coffee, Award, Loader2, AlertCircle, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export const dynamic = 'force-static'

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  description?: string
  variants?: { name: string; price: number }[]
  isPopular?: boolean
  rating?: number
  isAvailable?: boolean
  preparationTime?: number
}

interface CartItem extends MenuItem {
  quantity: number
  selectedVariant?: { name: string; price: number }
}

interface OrderStatus {
  isLoading: boolean
  error: string | null
  success: boolean
}

const menuItems: MenuItem[] = [
  // Drinks
  {
    id: "black-coffee",
    name: "Black Coffee",
    price: 10,
    category: "Drinks",
    description: "Fresh brewed aromatic black coffee",
    rating: 4.2,
    isAvailable: true,
    preparationTime: 5,
  },
  {
    id: "milk-coffee",
    name: "Milk Coffee",
    price: 12,
    category: "Drinks",
    description: "Creamy coffee with fresh milk",
    isPopular: true,
    rating: 4.5,
    isAvailable: true,
    preparationTime: 5,
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    price: 15,
    category: "Drinks",
    description: "Refreshing iced coffee perfect for hot days",
    rating: 4.3,
    isAvailable: true,
    preparationTime: 7,
  },
  {
    id: "milk-tea",
    name: "Milk Tea (Chai)",
    price: 8,
    category: "Drinks",
    description: "Traditional Indian masala chai",
    isPopular: true,
    rating: 4.7,
    isAvailable: true,
    preparationTime: 5,
  },
  {
    id: "lassi",
    name: "Lassi",
    price: 20,
    category: "Drinks",
    description: "Creamy yogurt-based traditional drink",
    rating: 4.4,
    isAvailable: true,
    preparationTime: 3,
  },

  // Breakfast
  {
    id: "idli",
    name: "Idli",
    price: 25,
    category: "Breakfast",
    description: "Soft steamed rice cakes with sambhar & chutney",
    rating: 4.6,
    isAvailable: true,
    preparationTime: 10,
  },
  {
    id: "masala-dosa",
    name: "Masala Dosa",
    price: 35,
    category: "Breakfast",
    description: "Crispy crepe filled with spiced potato masala",
    isPopular: true,
    rating: 4.8,
    isAvailable: true,
    preparationTime: 15,
  },
  {
    id: "samosa",
    name: "Samosa",
    price: 25,
    category: "Breakfast",
    description: "Golden crispy pastry with spiced potato filling",
    isPopular: true,
    rating: 4.5,
    isAvailable: true,
    preparationTime: 8,
  },
  {
    id: "poha",
    name: "Poha",
    price: 20,
    category: "Breakfast",
    description: "Flattened rice with aromatic spices & herbs",
    variants: [
      { name: "Plain", price: 20 },
      { name: "With Chana", price: 25 },
    ],
    rating: 4.3,
    isAvailable: true,
    preparationTime: 12,
  },
  {
    id: "aloo-paratha",
    name: "Aloo Paratha",
    price: 40,
    category: "Breakfast",
    description: "Stuffed flatbread with spiced mashed potatoes",
    rating: 4.6,
    isAvailable: true,
    preparationTime: 18,
  },

  // Thali & Snacks
  {
    id: "veg-thali",
    name: "Veg Thali",
    price: 60,
    category: "Thali & Snacks",
    description: "Complete meal: Dal, Rice, Roti, Sabji, Pickle, Papad",
    isPopular: true,
    rating: 4.7,
    isAvailable: true,
    preparationTime: 20,
  },
  {
    id: "special-thali",
    name: "Special Thali",
    price: 99,
    category: "Thali & Snacks",
    description: "Premium thali with paneer curry & fresh salad",
    rating: 4.9,
    isAvailable: true,
    preparationTime: 25,
  },
  {
    id: "veg-maggi",
    name: "Veg Maggi",
    price: 40,
    category: "Thali & Snacks",
    description: "Instant noodles loaded with fresh vegetables",
    isPopular: true,
    rating: 4.4,
    isAvailable: true,
    preparationTime: 10,
  },
  {
    id: "chowmein",
    name: "Chowmein",
    price: 60,
    category: "Thali & Snacks",
    description: "Stir-fried noodles with crunchy vegetables",
    rating: 4.5,
    isAvailable: true,
    preparationTime: 15,
  },
]

// Custom hooks for better state management
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    }
  }, [key])

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function DidiKiRasoiWebsite() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useLocalStorage<CartItem[]>('didi-ki-rasoi-cart', [])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    isLoading: false,
    error: null,
    success: false
  })

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const categories = useMemo(() => 
    ["All", ...Array.from(new Set(menuItems.map((item) => item.category)))],
    []
  )

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
      return matchesSearch && matchesCategory && item.isAvailable
    })
  }, [debouncedSearchTerm, selectedCategory])

  const addToCart = useCallback((item: MenuItem, variant?: { name: string; price: number }) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.selectedVariant?.name === variant?.name
    )

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += 1
      setCart(updatedCart)
    } else {
      const newItem: CartItem = {
        ...item,
        quantity: 1,
        selectedVariant: variant,
        price: variant ? variant.price : item.price,
      }
      setCart([...cart, newItem])
    }

    toast({
      title: "Added to cart",
      description: `${item.name}${variant ? ` (${variant.name})` : ""} has been added to your cart.`,
    })
  }, [cart, setCart])

  const updateQuantity = useCallback((itemId: string, variantName: string | undefined, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => !(item.id === itemId && item.selectedVariant?.name === variantName)))
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      })
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemId && item.selectedVariant?.name === variantName 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      )
    }
  }, [cart, setCart])

  const clearCart = useCallback(() => {
    setCart([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }, [setCart])

  const getTotalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  const getTotalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  const getEstimatedTime = useMemo(() => {
    if (cart.length === 0) return 0
    const maxTime = Math.max(...cart.map(item => item.preparationTime || 10))
    return maxTime + 5 // Add 5 minutes buffer
  }, [cart])

  const validateOrder = useCallback(() => {
    if (cart.length === 0) {
      throw new Error("Your cart is empty. Please add some items before placing an order.")
    }
    
    const unavailableItems = cart.filter(item => !item.isAvailable)
    if (unavailableItems.length > 0) {
      throw new Error(`Some items in your cart are no longer available: ${unavailableItems.map(item => item.name).join(', ')}`)
    }

    return true
  }, [cart])

  const handlePlaceOrder = useCallback(async () => {
    setOrderStatus({ isLoading: true, error: null, success: false })

    try {
      validateOrder()

      // Create order summary
      const orderSummary = cart
        .map(
          (item) =>
            `${item.name}${item.selectedVariant ? ` (${item.selectedVariant.name})` : ""} x${item.quantity} - ₹${item.price * item.quantity}`
        )
        .join("\n")

      const totalAmount = getTotalPrice
      const estimatedTime = getEstimatedTime
      const phoneNumber = "7440683678"

      // Create WhatsApp message
      const message = `🍽️ *New Order from Didi ki Rasoi*

📋 *Order Details:*
${orderSummary}

💰 *Total Amount: ₹${totalAmount}*
⏱️ *Estimated Time: ${estimatedTime} minutes*
📅 *Order Time: ${new Date().toLocaleString()}*

📍 *Delivery Location: CSVTU Campus*

Please confirm my order. Thank you! 🙏`

      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Open WhatsApp
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      // Clear cart and close sheet
      setCart([])
      setIsCartOpen(false)

      setOrderStatus({ isLoading: false, error: null, success: true })
      
      toast({
        title: "Order placed successfully! 🎉",
        description: "Your order has been sent via WhatsApp. We'll confirm it shortly.",
      })

      // Reset success state after 3 seconds
      setTimeout(() => {
        setOrderStatus(prev => ({ ...prev, success: false }))
      }, 3000)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again."
      setOrderStatus({ isLoading: false, error: errorMessage, success: false })
      
      toast({
        title: "Error placing order",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }, [cart, getTotalPrice, getEstimatedTime, validateOrder, setCart])

  // Clear error after 5 seconds
  useEffect(() => {
    if (orderStatus.error) {
      const timer = setTimeout(() => {
        setOrderStatus(prev => ({ ...prev, error: null }))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [orderStatus.error])

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
                  {getTotalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
                      {getTotalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md bg-gradient-to-b from-white to-orange-50">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold text-gray-800 flex items-center justify-between">
                    Your Order
                    {cart.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCart}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </SheetTitle>
                </SheetHeader>
                
                {orderStatus.error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{orderStatus.error}</AlertDescription>
                  </Alert>
                )}

                {orderStatus.success && (
                  <Alert className="mt-4 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Order placed successfully! Check WhatsApp for confirmation.
                    </AlertDescription>
                  </Alert>
                )}

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
                              {item.preparationTime && (
                                <p className="text-xs text-gray-500">~{item.preparationTime} min</p>
                              )}
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
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                            <span>Total Amount:</span>
                            <span className="text-green-600">₹{getTotalPrice}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Estimated Time:</span>
                            <span>{getEstimatedTime} minutes</span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Items:</span>
                            <span>{getTotalItems} item{getTotalItems !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        <Button
                          onClick={handlePlaceOrder}
                          disabled={orderStatus.isLoading || cart.length === 0}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-50"
                        >
                          {orderStatus.isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Placing Order...
                            </>
                          ) : (
                            "Place Order via WhatsApp 📱"
                          )}
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

      {/* Hero Section - Simplified without image */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-100 via-amber-50 to-red-100">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Hungry? We've Got You 
              <span className="block text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text">
                Covered! 🍽️
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
              Order delicious homestyle food from your classroom and skip the long queues.
            </p>
            <p className="text-lg text-gray-600 mb-10">
              Fresh, tasty, and delivered fast!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-orange-200">
                <Phone className="w-6 h-6 text-orange-500" />
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-medium">Call Us</p>
                  <p className="text-lg font-bold text-gray-800">7440683678</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-red-200">
                <MapPin className="w-6 h-6 text-red-500" />
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-lg font-bold text-gray-800">Building 4, CSVTU Newai</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-green-200">
                <Clock className="w-6 h-6 text-green-500" />
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-medium">Service</p>
                  <p className="text-lg font-bold text-gray-800">Fast Delivery</p>
                </div>
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
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-orange-100 hover:border-orange-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <Utensils className="w-16 h-16 text-orange-300 group-hover:scale-110 transition-transform duration-300" />
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
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">Out of Stock</span>
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
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.description}</p>
                  )}
                  {item.preparationTime && (
                    <p className="text-xs text-gray-500 mb-3 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      ~{item.preparationTime} min
                    </p>
                  )}

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
                            disabled={!item.isAvailable}
                            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-4 disabled:opacity-50"
                          >
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(item)}
                      disabled={!item.isAvailable}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {item.isAvailable ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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

      <Toaster />
    </div>
  )
}