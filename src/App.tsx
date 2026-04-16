import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './components/Home';
import Test from './components/Test';
import Result from './components/Result';
import Report from './components/Report';
import Card from './components/Card';
import { generateSessionId, saveTestResult } from './lib/api';

export type PageState = 'home' | 'test' | 'result' | 'report' | 'card';

export default function App() {
  const [page, setPage] = useState<PageState>('home');
  const [answers, setAnswers] = useState<{ questionId: number; optionIndex: number }[]>([]);
  const [resultPet, setResultPet] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
  const [testResultId, setTestResultId] = useState<string>('');

  // 生成会话ID
  useEffect(() => {
    const sid = generateSessionId();
    setSessionId(sid);
  }, []);

  const handleStart = () => setPage('test');

  const handleTestComplete = async (finalAnswers: { questionId: number; optionIndex: number }[], petId: string) => {
    setAnswers(finalAnswers);
    setResultPet(petId);

    // 保存到后端
    if (sessionId) {
      const result = await saveTestResult({
        session_id: sessionId,
        answers: finalAnswers,
        result_pet: petId,
        report_unlocked: false
      });
      if (result.success && result.id) {
        setTestResultId(result.id);
      }
    }

    setPage('result');
  };

  const handleUnlock = () => setPage('report');
  const handleGenerateCard = () => setPage('card');
  const handleRestart = () => {
    setAnswers([]);
    setResultPet('');
    setTestResultId('');
    // 生成新的会话ID
    const newSid = generateSessionId();
    setSessionId(newSid);
    setPage('home');
  };

  return (
    <div className="desktop-wrapper">
      <div className="min-h-screen w-full max-w-md mx-auto bg-[#fcf9f4] text-[#1c1c19] relative overflow-hidden shadow-2xl rounded-[2rem]">
        <AnimatePresence mode="wait">
          {page === 'home' && <Home key="home" onStart={handleStart} />}
          {page === 'test' && <Test key="test" onComplete={handleTestComplete} />}
          {page === 'result' && <Result key="result" petId={resultPet} onUnlock={handleUnlock} />}
          {page === 'report' && <Report key="report" petId={resultPet} onGenerateCard={handleGenerateCard} />}
          {page === 'card' && <Card key="card" petId={resultPet} onRestart={handleRestart} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
