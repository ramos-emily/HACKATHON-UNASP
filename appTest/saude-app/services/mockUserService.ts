import { mockFirestore } from './mockFirestore';

export const saveQuizResults = async (
  quizName: string, 
  answers: string[], 
  score: number
) => {
  console.log(`Mock: Salvando quiz ${quizName}`, { answers, score });
  return Promise.resolve();
};

export const getUserData = async () => {
  const doc = await mockFirestore.collection('users')
                .doc('mock-user-123').get();
  return doc.exists ? doc.data() : null;
};