// services/mockFirestore.ts
export const mockFirestore = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      set: (data: any) => {
        console.log(`Mock: Salvando em ${name}/${id}`, data);
        return Promise.resolve();
      },
      get: () => Promise.resolve({
        exists: true,
        data: () => mockUserData
      })
    })
  }),
  
  // Adicionando nova função para obter resultados de saúde
  getHealthResults: () => ({
    stressLevel: 5,
    sleepQuality: 7,
    nutritionScore: 45,
    exerciseScore: 30,
    waterIntake: 3,
    // Adicione outros dados conforme seus questionários
  })
};

const mockUserData = {
  profile: {
    nome: 'Maria da Silva',
    email: 'usuario@exemplo.com',
    dataNascimento: '01/01/1990'
  },
  quizzes: {
    nutrition: {
      respostas: ['Sempre', 'Vegetariano Estrito', 'Nenhuma'],
      pontuacao: 45,
      dataConclusao: { toDate: () => new Date() }
    },
    exercise: {
      respostas: ['3-4 vezes', '30-60 minutos'],
      pontuacao: 30,
      dataConclusao: { toDate: () => new Date() },
      bodyAnalysis: {
        pressureClassification: 'Normal',
        imcClassification: 'Saudável',
        imc: '22.5',
        rcqClassification: 'Normal',
        rcq: '0.78',
        frame: 'Médio'
      }
    }
  }
};