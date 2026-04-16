import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { pets } from '../data/pets';
import { Sparkles } from 'lucide-react';

export default function Result({ petId, onUnlock }: { petId: string, onUnlock: () => void }) {
  const [loading, setLoading] = useState(true);
  const pet = pets[petId as keyof typeof pets];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcf9f4]">
        <div className="w-16 h-16 border-4 border-[#e0c299] border-t-[#72553d] rounded-full animate-spin mb-4"></div>
        <p className="text-[#72553d] font-serif italic animate-pulse">灵魂频率分析中...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex flex-col bg-gradient-to-b ${pet.bgGradient} text-white relative`}
    >
      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        <div className="p-6 pt-12 flex flex-col items-center text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] opacity-60">你的宿命指引</span>
          <h2 className="text-4xl font-serif tracking-tight">命运之契</h2>
        </div>

        <div className="px-6 relative">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="relative h-72 overflow-hidden">
              <img 
                src={pet.image} 
                alt={pet.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-4xl font-serif italic mb-1">{pet.name}</h3>
                <p className="text-sm opacity-90 tracking-wide">{pet.title}</p>
              </div>
            </div>

            <div className="p-6 space-y-6 relative">
              <div className="flex gap-2">
                {pet.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-xs tracking-wider" style={{ color: pet.accentColor }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="relative">
                <p className="text-white/80 leading-relaxed text-sm">
                  {pet.shortDesc}
                </p>
                {/* Gradient mask to truncate text */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pb-10">
        <button
          onClick={onUnlock}
          className="w-full py-4 rounded-full text-lg font-bold shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
          style={{ backgroundColor: pet.accentColor, color: '#1c1c19' }}
        >
          <Sparkles className="w-5 h-5" />
          查看完整报告
        </button>
        <p className="text-center mt-3 text-[10px] opacity-60 uppercase tracking-widest">
          包含性格深度解析及喂养灵感
        </p>
      </div>
    </motion.div>
  );
}
