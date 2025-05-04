export const mockAuth = {
  currentUser: {
    uid: 'mock-user-123',
    email: 'usuario@exemplo.com',
    displayName: 'MARIA DA SILVA'
  },
  signInWithEmailAndPassword: (email: string, password: string) => {
    console.log(`Mock login com: ${email}`);
    return Promise.resolve({ user: { uid: 'mock-user-123' } });
  },
  createUserWithEmailAndPassword: (email: string, password: string) => {
    console.log(`Mock criar conta com: ${email}`);
    return Promise.resolve({ user: { uid: 'mock-user-123' } });
  }
};