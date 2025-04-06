import React, { useState } from 'react';
import { ShoppingCart, Eye, EyeOff, AlertCircle, Facebook, Mail, Lock, User, ArrowLeft, X, CreditCard, Truck, Wallet } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}


interface ValidationErrors {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

type AuthMode = 'login' | 'register' | 'forgot-password';
type PaymentMethod = 'cod' | 'online' | 'upi';

const products: Product[] = [
  {
    id: 1,
    name: "Vintage Japanese T Shirt",
    description: "Classic distressed Dragon styled T Shirt  with authentic wear patterns",
    price: 499,
   image: "https://i.pinimg.com/474x/dc/c4/11/dcc411ba9dd650401bea290d5643eedc.jpg"
  },
  {
    id: 2,
    name: "Retro Jersey",
    description: "Retro Red Jersey With Authentic Vibe ",
    price: 499,
    image: "https://i.pinimg.com/474x/46/36/1a/46361aafdf0fb714f1cbc1c72c024d25.jpg"
  },
  {
    id: 3,
    name: "Bohemian Leather Jacket",
    description: "OG Leather Jacket For Riders",
    price: 499,
    image: "https://i.pinimg.com/474x/46/2c/6e/462c6e2619a4828451bc98f62611b3be.jpg"
  },
  {
    id: 4,
    name: "Classic Denim Insipired Shacket ",
    description: "A Shirt Inspired By Denim Jacket",
    price: 499,
    image: "https://i.pinimg.com/474x/1a/5a/34/1a5a34cc33ae2db8091c4d5058da1c83.jpg"
  },
  {
    id: 5,
    name: "Heritage Waxed Fixed Jacket",
    description: "Rugged,Vintage Style Outdoor Jacket  ",
    price: 499,
    image: "https://i.pinimg.com/474x/57/8b/af/578baf1204238317c8be3123a120ddb1.jpg"
  },
  {
    id: 6,
    name: "Printed Denim Black Jeans",
    description: "Classic Black  Jeans With A Stylish Print. ",
    price: 499,
    image: "https://i.pinimg.com/474x/8a/e6/ff/8ae6ff4290f587bc1ba400549893ab71.jpg"
  },
  {
    id: 7,
    name: "Indigo Wide Leg Denims ",
    description: "Classic Fit With Bold Vintage Fade.",
    price: 499,
    image: "https://i.pinimg.com/474x/b9/f7/ec/b9f7ecb337c862db5112f3a3608f6034.jpg"
  },
  {
    id: 8,
    name: "Faded Straight Cut Jeans",
    description: "Retro Wash With Timeless Appeal.",
    price: 499,
    image: "https://i.pinimg.com/474x/c8/77/e9/c877e976a54b41ad955042b32c510a7c.jpg"
  },
  {
    id: 9,
    name: "Vintage Wash Wide Leg Jeans ",
    description: "Classic Retro Denim With Faded Design.",
    price: 499,
    image: "https://i.pinimg.com/474x/50/05/76/5005763b7cf7d24abd52e16a89abfe4b.jpg"
  },
  {
    id: 10,
    name: "Dessert Breeze Camp Shirt",
    description: "Lightweight Shirt With Utility Pockets And Laid Back Vibe. ",
    price: 499,
    image: "https://i.pinimg.com/736x/c8/03/32/c80332edbdb0572a4483bb669ddcaf73.jpg"
  },
  {
    id: 11,
    name: "Earth Lined Stripped Shirt",
    description: "Breezy Short Sleeved Work Shirt With Dual Tone Collar. ",
    price: 499,
    image: "https://i.pinimg.com/474x/c6/ec/09/c6ec09fbb5aca90598592c5923853a44.jpg"
  },
  {
    id: 12,
    name: "Retro Cafe Vibe Shirt ",
    description: "Brown Buttonup With A beige Collar And Embroidered Chest Patches. ",
    price: 499,
    image: "https://i.pinimg.com/474x/28/72/c9/2872c9678c35c3f57171fb4bf0810521.jpg"
  },
  {
    id: 13,
    name: "Sgt.Pepper Cap ",
    description: "Distressed Black Denim Cap With Bold SERGEANT Embroided.",
    price: 499,
    image: "https://i.pinimg.com/474x/da/2f/46/da2f4623ff9f24bda2cc967138471602.jpg"
  },
  {
    id: 14,
    name: "Burnt Rust D.A.R.E Cap",
    description: "Heavily Torn Brown Cap Feautring D.A.R.E Text.",
    price: 499,
    image: "https://i.pinimg.com/474x/f9/d2/10/f9d2105885e7d5988dc43f807467c9cd.jpg"
  },
  {
    id: 15,
    name: "Major Head Trauma Cap",
    description: "Beige Cap With Dramatic Blood Print And Edgy MAJOR HEAD TRAUMA Text." ,
    price: 499,
    image: "https://i.pinimg.com/474x/e8/78/01/e878011d6ed8008b02b1e1b1451a1a99.jpg"
  },
  {
    id: 16,
    name: "Deadbeat High Tops ",
    description: "Grungy Black Sneakers With Rugged.",
    price: 499,
    image: "https://i.pinimg.com/474x/0e/76/93/0e769336cf32460fee5e055c4f17039a.jpg"
  },
  {
    id: 17,
    name: "Chomp Kicks",
    description: "Green High Tops Turned Beastly.",
    price: 499,
    image: "https://i.pinimg.com/474x/76/9d/9b/769d9b2e065ed93506a29e9118058bc3.jpg"
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({ email: '', password: '' });
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success('Item removed from cart!');
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      switch (paymentMethod) {
        case 'cod':
          toast.success('Order placed successfully! You can pay at delivery.');
          break;
        case 'online':
         
      }

      // Clear cart after successful order
      setCart([]);
      setIsCheckout(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  React.useEffect(() => {
    let interval: number;
    if (isLocked && lockTimer > 0) {
      interval = window.setInterval(() => {
        setLockTimer((prev) => prev - 1);
      }, 1000);
    } else if (lockTimer === 0) {
      setIsLocked(false);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimer]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (authMode === 'register') {
      if (!name) {
        newErrors.name = 'Name is required';
        isValid = false;
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
    }

    if (authMode !== 'forgot-password') {
      if (!password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) return;
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      switch (authMode) {
        case 'login':
          if (email === 'kundanjoshi.in@gmail.com' && password === '123456789') {
            if (rememberMe) {
              localStorage.setItem('rememberedEmail', email);
            } else {
              localStorage.removeItem('rememberedEmail');
            }
            setIsLoggedIn(true);
          } else {
            const newAttempts = loginAttempts + 1;
            setLoginAttempts(newAttempts);
            
            if (newAttempts >= 3) {
              setIsLocked(true);
              setLockTimer(30);
              setLoginAttempts(0);
            }
            throw new Error('Invalid credentials');
          }
          break;

        case 'register':
          toast.success('Registration successful! Please check your email to verify your account.');
          setAuthMode('login');
          break;

        case 'forgot-password':
          toast.success('Password reset link sent to your email!');
          setAuthMode('login');
          break;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (authMode === 'login') {
        setErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.error(`${provider} login is not implemented yet`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (authMode) {
      case 'register':
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Enter your name"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.name}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.email}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Create a password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.password}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && (
                <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </>
        );

      case 'forgot-password':
        return (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.email}
              </div>
            )}
          </div>
        );

      default: // login
        return (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition-colors
                    ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your email"
                  disabled={isLoading || isLocked}
                />
              </div>
              {errors.email && (
                <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none transition-colors
                    ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your password"
                  disabled={isLoading || isLocked}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading || isLocked}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.password}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                  disabled={isLoading || isLocked}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setAuthMode('forgot-password')}
                className="text-sm text-black hover:underline"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>
          </>
        );
    }
  };

  const renderCart = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 my-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total:</span>
                <span className="text-xl font-bold">₹{getTotalAmount().toLocaleString()}</span>
              </div>
              <button
                onClick={() => {
                  setShowCart(false);
                  setIsCheckout(true);
                }}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderCheckout = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={() => setIsCheckout(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={checkoutForm.email}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={checkoutForm.city}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={checkoutForm.state}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                <input
                  type="text"
                  value={checkoutForm.pincode}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  required
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-3">
                  <span className="text-sm">{item.name}</span>
                  <span className="font-medium">₹{item.price.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>₹{getTotalAmount().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="text-black focus:ring-black"
                  />
                  <Truck size={20} />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="text-black focus:ring-black"
                  />
                  <CreditCard size={20} />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="text-black focus:ring-black"
                  />
                  <Wallet size={20} />
                  <span>UPI</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                `Pay ₹${getTotalAmount().toLocaleString()}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <Toaster position="top-center" />

          {authMode !== 'login' && (
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="mb-6 text-gray-600 hover:text-black flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Login
            </button>
          )}

          <div className="text-center mb-8">
            <h2 className="welcome-heading text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {authMode === 'register' && 'Create Account'}
              {authMode === 'login' && 'Welcome to ThriftZilla'}
              {authMode === 'forgot-password' && 'Reset Password'}
            </h2>
            <p className="text-gray-600">
              {authMode === 'register' && 'Sign up to get started'}
              {authMode === 'login' && 'Your One-Stop Thrift Shop 🦖'}
              {authMode === 'forgot-password' && 'Enter your email to reset password'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderForm()}

            {isLocked && (
              <div className="text-center p-3 bg-red-50 text-red-600 rounded-lg">
                Too many failed attempts. Please wait {lockTimer} seconds before trying again.
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full bg-black text-white p-3 rounded-lg font-medium
                hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {authMode === 'register' ? 'Creating Account...' : 'Signing in...'}
                </span>
              ) : (
                <>
                  {authMode === 'register' && 'Create Account'}
                  {authMode === 'login' && 'Sign In'}
                  {authMode === 'forgot-password' && 'Reset Password'}
                </>
              )}
            </button>

            {authMode === 'login' && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
                         alt="Google" 
                         className="w-5 h-5" />
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Facebook size={20} className="text-blue-600" />
                    Facebook
                  </button>
                </div>
              </>
            )}

            {authMode === 'login' ? (
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-black font-medium hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : authMode === 'register' ? (
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-black font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            ) : null}

            {authMode === 'login' && (
              <div className="mt-6 text-center text-sm text-gray-600">
                <p>Demo Credentials:</p>
                <p>Email: kundanjoshi.in@gmail.com</p>
                <p>Password: 123456789</p>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">𝘛𝘩𝘳𝘪𝘧𝘵𝘡𝘪𝘭𝘭𝘢
🦖</h1>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="relative"
              >
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Navigation Menu */}
<nav className="bg-gray-100 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-sm sm:text-base">
    <ul className="flex space-x-6 font-medium text-gray-700">
      <li className="hover:text-gray-900 cursor-pointer">Home</li>
      <li className="hover:text-gray-900 cursor-pointer">Shop</li>
      <li className="hover:text-gray-900 cursor-pointer">About</li>
      <li className="hover:text-gray-900 cursor-pointer">Contact</li>
    </ul>
  </div>
</nav>

{/* Welcome Section */}
<section className="bg-white py-10">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold text-gray-900">Welcome to ThriftZilla 🦖</h2>
    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
      Discover stylish, sustainable fashion at unbeatable prices. <br />
      <span className="text-indigo-600 font-semibold">We sell all our products at ₹499.</span>
    </p>
  </div>
</section>

{/* Filter and Size Selector */}
<section className="max-w-7xl mx-auto px-4 py-6">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Filter by Category */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
      <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-60">
        <option>All</option>
        <option>Tops</option>
        <option>Bottoms</option>
        <option>Dresses</option>
        <option>Accessories</option>
      </select>
    </div>

    {/* Select Size */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Select Size</label>
      <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-60">
        <option>All Sizes</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
      </select>
    </div>
  </div>
</section>

      </header>

      {/* Products Grid */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Modal */}
      {showCart && renderCart()}

      {/* Checkout Modal */}
      {isCheckout && renderCheckout()}

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}

export default App;
