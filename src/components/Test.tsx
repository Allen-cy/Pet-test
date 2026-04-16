import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { questions } from '../data/questions';
import { calcResult } from '../utils/score';

export default function Test({ onComplete }: { onComplete: (answers: any[], petId: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; optionIndex: number }[]>([]);
  const [direction, setDirection] = useState(1);

  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleOptionClick = (optionIndex: number) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === question.id);
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { questionId: question.id, optionIndex };
    } else {
      newAnswers.push({ questionId: question.id, optionIndex });
    }
    
    setAnswers(newAnswers);

    if (!isLastQuestion) {
      setTimeout(() => {
        setDirection(1);
        setCurrentIndex(currentIndex + 1);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    const petId = calcResult(answers);
    onComplete(answers, petId);
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? -100 : 100,
      opacity: 0
    })
  };

  const hasAnsweredCurrent = answers.some(a => a.questionId === question.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-white">
      {/* Header */}
      <header className="px-5 py-5 flex flex-col gap-2 mt-10">
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={handlePrev}
            className={`p-2 -ml-2 text-white/60 transition-opacity ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="text-[11px] text-white/60 mb-2">
          第 {currentIndex + 1} 题 / 共 {questions.length} 题
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#E8C9A0] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </header>

      {/* Question Content */}
      <div className="flex-1 relative overflow-hidden px-5">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute inset-0 px-5 pt-10 pb-5 flex flex-col"
          >
            <h2 className="text-[20px] leading-[1.5] mb-10 text-center">
              {question.text}
            </h2>

            <div className="flex flex-col gap-3 mt-auto mb-10">
              {question.options.map((option, idx) => {
                const isSelected = answers.find(a => a.questionId === question.id)?.optionIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full text-left p-[15px] rounded-[12px] transition-all duration-200 flex items-center gap-4 border ${
                      isSelected 
                        ? 'bg-[#E8C9A0]/10 border-[#E8C9A0]' 
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${
                      isSelected ? 'bg-[#E8C9A0] text-[#000]' : 'bg-white/10 text-white/60'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-[13px] flex-1">{option.text}</span>
                  </button>
                );
              })}
            </div>
            
            {isLastQuestion && hasAnsweredCurrent && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto mb-8"
              >
                <button 
                  onClick={handleFinish}
                  className="w-full py-[14px] bg-[#E8C9A0] text-[#000] rounded-[30px] font-bold text-[16px] active:scale-95 transition-transform"
                >
                  查看结果
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
