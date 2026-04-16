import { questions } from '../data/questions';

export function calcResult(answers: { questionId: number; optionIndex: number }[]) {
  const totals = { dog: 0, cat: 0, rabbit: 0, small: 0, fish: 0, bird: 0 };
  answers.forEach(({ questionId, optionIndex }) => {
    const q = questions.find(q => q.id === questionId);
    if (q) {
      const scores = q.options[optionIndex].score;
      Object.keys(scores).forEach(pet => {
        totals[pet as keyof typeof totals] += scores[pet as keyof typeof scores];
      });
    }
  });
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
}
