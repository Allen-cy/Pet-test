import React from 'react';
import { motion } from 'motion/react';
import { pets } from '../data/pets';
import { Sparkles, BookOpen, Heart, Info } from 'lucide-react';

export default function Report({ petId, onGenerateCard }: { petId: string, onGenerateCard: () => void }) {
  const pet = pets[petId as keyof typeof pets];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] overflow-y-auto pb-32 no-scrollbar"
    >
      <header className="p-5 pt-10 text-center border-b border-[#1c1c19]/10 bg-[#fcf9f4]">
        <h1 className="text-[18px] font-medium text-[#1c1c19]/80 pb-4">
          你的专属缘分报告
        </h1>
      </header>

      <div className="p-5 space-y-6">
        <div className="relative rounded-[16px] overflow-hidden aspect-[4/5] shadow-lg border border-[#1c1c19]/10">
          <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent text-white">
            <h2 className="text-[24px] font-bold mb-1">缘分对象：{pet.name}</h2>
            <p className="text-[13px] opacity-80">{pet.title}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {pet.tags.map(tag => (
            <div key={tag} className="bg-[#f6f3ee] px-4 py-1.5 rounded-[20px]">
              <span className="text-[#72553d] text-[12px]">{tag}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-4">
          <section className="bg-[#f6f3ee] p-5 rounded-[16px] border border-[#1c1c19]/10">
            <div className="flex items-center gap-2 mb-3 text-[#72553d]">
              <BookOpen className="w-5 h-5" />
              <h3 className="text-[16px] font-bold">为什么适合你</h3>
            </div>
            <p className="text-[#1c1c19]/80 leading-[1.6] text-[14px]">
              {pet.whySuitable}
            </p>
          </section>

          <section className="bg-[#f6f3ee] p-5 rounded-[16px] border border-[#1c1c19]/10 relative overflow-hidden">
            <Heart className="absolute -right-4 -top-4 w-24 h-24 text-[#E8C9A0] opacity-10" />
            <h3 className="text-[16px] font-bold mb-3 text-[#72553d] relative z-10">你们在一起的样子</h3>
            <p className="italic text-[14px] text-[#1c1c19]/90 leading-[1.6] mb-2 relative z-10">
              &quot;{pet.dailyScene}&quot;
            </p>
          </section>

          <section className="bg-[#f6f3ee] p-5 rounded-[16px] border border-[#1c1c19]/10">
            <div className="flex items-center gap-2 mb-3 text-[#72553d]">
              <Info className="w-5 h-5" />
              <h3 className="text-[16px] font-bold">一个小提醒</h3>
            </div>
            <p className="text-[#1c1c19]/80 leading-[1.6] text-[14px]">
              {pet.advice}
            </p>
          </section>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#fcf9f4] via-[#fcf9f4] to-transparent">
        <button
          onClick={onGenerateCard}
          className="w-full py-[14px] bg-[#72553d] text-white rounded-[12px] font-bold text-[15px] active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          生成我的专属卡片
        </button>
      </div>
    </motion.div>
  );
}
