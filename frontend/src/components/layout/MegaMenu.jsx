import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const MegaMenu = ({ items, isOpen, onClose }) => {
    const [activeId, setActiveId] = useState(items[0]?.id);

    if (!isOpen) return null;

    const activeItem = items.find(item => item.id === activeId) || items[0];

    return (
        <div
            className="absolute top-full left-0 w-full bg-white shadow-2xl z-50 overflow-hidden animate-reveal-up"
            onMouseLeave={onClose}
            style={{ height: '600px' }}
        >
            <div className="flex h-full">
                {/* Left Sidebar - Navigation */}
                <div className="w-1/4 bg-white z-10 relative flex flex-col p-8 border-r border-gray-100">
                    <div className="space-y-2">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setActiveId(item.id)}
                                className="group cursor-pointer relative"
                            >
                                <div className={cn(
                                    "flex items-center justify-between p-4 rounded-sm transition-all duration-300",
                                    activeId === item.id
                                        ? "bg-[#F8F5F2] text-[#6B4E4E]"
                                        : "text-gray-500 hover:text-[#6B4E4E]"
                                )}>
                                    <span className="text-sm tracking-[0.2em] font-medium uppercase font-serif">
                                        {item.label}
                                    </span>
                                    <ChevronRight className={cn(
                                        "w-4 h-4 transition-transform duration-300",
                                        activeId === item.id ? "opacity-100 translate-x-1" : "opacity-0 -translate-x-2"
                                    )} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-gray-100">
                        <Link
                            to="/all-experiences"
                            className="text-xs font-semibold tracking-widest text-[#C9A87C] hover:text-[#B08D55] flex items-center gap-2"
                        >
                            VIEW ALL <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="w-3/4 relative overflow-hidden bg-gray-900 group">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                                activeId === item.id ? "opacity-100 z-10" : "opacity-0 z-0"
                            )}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 block overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.label}
                                    className={cn(
                                        "w-full h-full object-cover transition-transform duration-[20s] ease-linear",
                                        activeId === item.id ? "scale-110" : "scale-100"
                                    )}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-16 flex flex-col justify-end">
                                <div className="max-w-2xl transform transition-all duration-700 translate-y-0 opacity-100">
                                    <span className="text-[#C9A87C] tracking-[0.2em] text-sm font-semibold mb-4 block animate-fade-in">
                                        {item.subtitle}
                                    </span>
                                    <h2 className="text-5xl text-white font-serif mb-6 leading-tight animate-reveal-up">
                                        {item.label}
                                    </h2>
                                    <p className="text-white/80 text-lg font-light leading-relaxed mb-10 max-w-lg">
                                        {item.description}
                                    </p>

                                    {/* Featured Links Grid */}
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 border-t border-white/20 pt-8">
                                        {item.featured?.map((link, idx) => (
                                            <Link
                                                key={idx}
                                                to={link.href}
                                                className="flex items-center gap-3 text-white/90 hover:text-[#C9A87C] group/link transition-colors"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A87C] opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                <span className="font-light tracking-wide text-sm">{link.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
