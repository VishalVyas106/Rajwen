import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Clock, Scale, Flame, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FiPlusCircle } from 'react-icons/fi';



const FoodDetailPage = ({  }) => {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const { id } = useParams();
  const navigate = useNavigate();

  
  const { addToCart } = useCart();



  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`https://rajwen-backend.vercel.app/api/foods/${id}`);
        if (!response.ok) throw new Error('Food not found');
        const data = await response.json();
        setFood(data);
      } catch (error) {
        console.error('Error fetching food:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 relative">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 animate-spin border-t-blue-500"></div>
          <div className="w-8 h-8 absolute top-4 left-4 rounded-full bg-white"></div>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Food item not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" /> Go Back
        </button>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Menu
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-[500px] overflow-hidden group">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-4xl font-bold text-white mb-2">{food.name}</h1>
                <div className="flex items-center gap-2">
                  
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
            
              {/* Tabs */}
              <div className="flex gap-4 border-b mb-6">
                {['description'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 px-1 capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                        : 'text-gray-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mb-8 min-h-[200px]">
                {activeTab === 'description' && (
                  <p className="text-gray-600 leading-relaxed">{food.description}</p>
                )}
                {activeTab === 'ingredients' && (
                  <ul className="space-y-2">
                    {food.ingredients?.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 gap-4">
                    {food.nutritionalInfo && Object.entries(food.nutritionalInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 capitalize">{key}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price and Cart */}
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-3xl font-bold text-blue-500">₹{food.price}</p>
                </div>
                <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking the button
                  addToCart(food);
                  toast.success('Added to cart');
                }}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                <FiPlusCircle size={18} />
                Add to Cart
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;
