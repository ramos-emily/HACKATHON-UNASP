// Armazena os resultados dos questionários durante a sessão
let quizResults: Record<string, any> = {};

export const saveQuizResult = (quizName: string, result: any) => {
  quizResults[quizName] = result;
  console.log('Resultado salvo (mock):', quizName, result);
};

export const getQuizResults = () => {
  return { ...quizResults }; // Retorna cópia dos resultados
};

export const calculateTotalScore = () => {
  return Object.values(quizResults).reduce((total, quiz) => {
    return total + (quiz.score || 0);
  }, 0);
};