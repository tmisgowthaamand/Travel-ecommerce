import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import ShopHeader from '../components/shop/ShopHeader';
import { ShoppingCart, Star, ArrowLeft, Search as SearchIcon, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const SearchPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    useEffect(() => {
        if (query) {
            fetchResults();
        }
    }, [query]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/products?search=${encodeURIComponent(query)}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (product) => {
        if (!isAuthenticated) {
            toast.error('Please sign in to add items to cart');
            return;
        }
        const success = await addToCart(product.id);
        if (success) {
            toast.success(`${product.name} added to cart!`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <ShopHeader />

            <div className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">

                    <div className="mb-12">
                        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 mb-8 transition-colors text-[10px] tracking-[0.2em] font-black uppercase italic">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Collection
                        </Link>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <p className="text-[#C9A87C] text-[10px] tracking-[0.4em] mb-4 font-black uppercase italic">Search Results</p>
                                <h1 className="font-serif text-5xl italic text-gray-900 flex items-center gap-4">
                                    Query: <span className="text-[#C9A87C] underline decoration-amber-100 uppercase not-italic font-sans font-black tracking-tighter decoration-4 underline-offset-8">"{query}"</span>
                                </h1>
                            </div>
                            <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase font-black">{products.length} Items Found</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="animate-pulse space-y-4">
                                    <div className="bg-gray-200 aspect-square rounded-[32px]" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-32 bg-white rounded-[48px] shadow-sm border border-gray-50 max-w-2xl mx-auto">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                <SearchIcon className="w-8 h-8 text-gray-200" />
                            </div>
                            <h2 className="font-serif text-3xl italic text-gray-900 mb-4">No matches found</h2>
                            <p className="text-gray-400 font-light mb-12 px-12 leading-relaxed">We couldn't find any results for your query. Try searching for broader terms like "luggage", "backpack", or "premium".</p>
                            <Link
                                to="/shop"
                                className="inline-block px-12 py-5 bg-[#1A1A1A] text-white text-[10px] tracking-[0.4em] font-black uppercase hover:bg-[#C9A87C] transition-all duration-500 rounded-xl shadow-xl"
                            >
                                Clear Search
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {products.map((product) => (
                                <div key={product.id} className="group bg-white rounded-[40px] p-6 shadow-sm hover:shadow-2xl transition-all duration-700 border border-transparent hover:border-gray-50 flex flex-col">
                                    <Link to={`/shop/product/${product.id}`} className="block relative overflow-hidden rounded-[32px] mb-6 aspect-square grayscale group-hover:grayscale-0 transition-all duration-1000">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {product.original_price && (
                                            <span className="absolute top-6 left-6 px-4 py-2 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                                -{Math.round((1 - product.price / product.original_price) * 100)}%
                                            </span>
                                        )}
                                    </Link>
                                    <div className="space-y-4 flex-1 flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-[#C9A87C] uppercase tracking-[0.2em] italic">
                                                {product.category}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                <span className="text-[10px] text-gray-400 font-black">{product.rating}</span>
                                            </div>
                                        </div>

                                        <Link to={`/shop/product/${product.id}`} className="block">
                                            <h3 className="font-serif text-xl italic text-gray-900 group-hover:text-[#C9A87C] transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>
                                        </Link>

                                        <p className="text-gray-400 text-xs font-light line-clamp-2 leading-relaxed italic">
                                            {product.description}
                                        </p>

                                        <div className="pt-6 mt-auto border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="font-serif text-2xl italic text-gray-900">${product.price}</span>
                                                {product.original_price && (
                                                    <span className="text-[10px] text-gray-300 line-through font-bold">${product.original_price}</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="w-12 h-12 bg-[#1A1A1A] hover:bg-[#C9A87C] text-white rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg group-hover:shadow-amber-100"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
