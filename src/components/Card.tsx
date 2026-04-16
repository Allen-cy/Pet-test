import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { pets } from '../data/pets';
import { Download, Share2, RotateCcw } from 'lucide-react';

export default function Card({ petId, onRestart }: { petId: string, onRestart: () => void }) {
  const pet = pets[petId as keyof typeof pets];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions (320x520 as requested)
    // We scale it up for retina displays
    const width = 320;
    const height = 520;
    const scale = window.devicePixelRatio || 2;
    
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    // Parse gradient colors from tailwind classes (simplified)
    const bgColors: Record<string, [string, string]> = {
      cat: ['#2C2420', '#6B4E37'],
      dog: ['#1A2E1A', '#4A7040'],
      rabbit: ['#2A1F2E', '#5E4480'],
      small: ['#2E2010', '#7A5830'],
      fish: ['#0D1E2E', '#1A4A6A'],
      bird: ['#1A2A10', '#4A7020'],
    };
    const [color1, color2] = bgColors[petId] || ['#2C2420', '#6B4E37'];
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw emoji background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.arc(width / 2, 200, 80, 0, Math.PI * 2);
    ctx.fill();

    // Draw emoji
    ctx.fillStyle = '#ffffff';
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pet.emoji, width / 2, 200);

    // Draw text
    ctx.fillStyle = pet.accentColor;
    ctx.font = '14px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('The Fated Match', width / 2, 320);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(pet.name, width / 2, 370);

    ctx.font = '14px "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(pet.title, width / 2, 410);

    // Draw tags
    ctx.font = '12px "Helvetica Neue", Arial, sans-serif';
    const tagY = 460;
    const tagSpacing = 10;
    let totalWidth = 0;
    const tagWidths = pet.tags.map(tag => {
      const w = ctx.measureText(tag).width + 24;
      totalWidth += w;
      return w;
    });
    totalWidth += (pet.tags.length - 1) * tagSpacing;
    
    let currentX = (width - totalWidth) / 2;
    pet.tags.forEach((tag, i) => {
      const w = tagWidths[i];
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(currentX, tagY - 14, w, 28, 14);
      } else {
        ctx.rect(currentX, tagY - 14, w, 28);
      }
      ctx.fill();
      
      ctx.fillStyle = '#ffffff';
      ctx.fillText(tag, currentX + w / 2, tagY);
      currentX += w + tagSpacing;
    });

    // Draw header
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '10px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('🐾 宠物缘分测试', width / 2, 40);

  }, [pet, petId]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-5"
    >
      <div className="relative w-[320px] h-[520px] rounded-[36px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-[8px] border-[#222] mb-8">
        <canvas 
          ref={canvasRef} 
          style={{ width: '100%', height: '100%' }}
          className="block"
        />
      </div>

      <div className="flex gap-4 w-full max-w-[320px]">
        <button className="flex-1 py-3.5 bg-[#2A2A2A] text-white rounded-[12px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform text-[14px]">
          <Download className="w-4 h-4" />
          保存到相册
        </button>
        <button className="flex-1 py-3.5 bg-[#E8C9A0] text-[#000] rounded-[12px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform text-[14px]">
          <Share2 className="w-4 h-4" />
          分享给朋友
        </button>
      </div>
      
      <button 
        onClick={onRestart}
        className="mt-6 text-white/40 text-[13px] flex items-center gap-1 hover:text-white transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        重新测试
      </button>
    </motion.div>
  );
}
