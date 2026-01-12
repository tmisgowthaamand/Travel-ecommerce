import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '../../lib/utils';

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {/* Chat Toggle Button - Fixed on left side */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300',
          'bg-[#6B4E4E] text-white shadow-lg hover:bg-[#5A3F3F]',
          isOpen ? 'translate-x-80' : 'translate-x-0'
        )}
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="py-4 px-2 text-xs tracking-[0.2em] flex items-center gap-2">
          {isOpen ? <X className="w-4 h-4 rotate-90" /> : <MessageCircle className="w-4 h-4 rotate-90" />}
          {isOpen ? 'CLOSE' : 'CHAT WITH US'}
        </span>
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          'fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-40 transition-transform duration-500',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-[#6B4E4E] text-white p-6">
            <h3 className="font-serif text-xl">How can we help?</h3>
            <p className="text-white/70 text-sm mt-1">We typically reply within minutes</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#F8F5F2]">
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <p className="text-sm text-[#6B4E4E]">
                Welcome to Wanderlust & Co.! How may we assist you in planning your dream journey?
              </p>
              <span className="text-xs text-gray-400 mt-2 block">Travel Concierge</span>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A87C] transition-colors"
              />
              <button className="p-3 bg-[#6B4E4E] text-white rounded-lg hover:bg-[#5A3F3F] transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatButton;
