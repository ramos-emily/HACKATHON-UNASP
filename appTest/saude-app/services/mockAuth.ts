export const mockAuth = {
  currentUser: {
    uid: 'mock-user-123',
    email: 'usuario@exemplo.com',
    displayName: 'MARIA DA SILVA',
    phoneNumber: '(11) 98765-4321',
    birthDate: '15-05-1990',
    sex: 'F',
  },

  signInWithEmailAndPassword: (email: string, password: string) => {
    console.log(`Mock login com: ${email}`);
    return Promise.resolve({ 
      user: { 
        uid: 'mock-user-123',
        email,
        displayName: 'MARIA DA SILVA'
      } 
    });
  },

  createUserWithEmailAndPassword: (email: string, password: string) => {
    console.log(`Mock criar conta com: ${email}`);
    return Promise.resolve({ 
      user: { 
        uid: 'mock-user-123',
        email,
        displayName: 'Novo Usuário'
      } 
    });
  }
};
