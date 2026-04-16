import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function Home({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-5 relative bg-gradient-to-b from-[#1a1a1a] to-[#000000]"
    >
      <div className="z-10 flex flex-col items-center text-center w-full h-full">
        <div className="flex items-center gap-2 text-white/80 mb-4 mt-8">
          <Sparkles className="w-5 h-5" />
          <span className="text-[18px] font-medium tracking-tight">Your Pet Fate</span>
        </div>

        <div className="relative w-48 h-48 mb-4 mt-8">
          <div className="absolute inset-0 bg-[#E8C9A0]/5 rounded-full animate-pulse"></div>
          <img 
            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" 
            alt="Cat"
            className="w-full h-full object-cover rounded-full border-4 border-[#222] shadow-xl"
          />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-4 border-[#222] overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200" 
              alt="Dog"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <h1 className="text-[24px] font-bold text-white leading-[1.4]">
            测测你和哪种<br/>宠物最有缘
          </h1>
          <p className="text-[13px] text-white/60 mt-2.5">18道题，AI生成专属宠物缘分报告</p>
        </div>

        <div className="w-full mt-auto mb-10 flex flex-col items-center">
          <p className="text-[11px] text-white/40 mb-5">已有 8,847 人测过</p>
          <button 
            onClick={onStart}
            className="w-full py-[14px] bg-[#E8C9A0] text-[#000] rounded-[30px] font-bold text-[16px] active:scale-95 transition-transform"
          >
            开始测试
          </button>
        </div>
      </div>
    </motion.div>
  );
}
