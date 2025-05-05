README - Health8: Aplicativo dos 8 Remédios Naturais
📌 Visão Geral
O Health8 é um aplicativo de saúde desenvolvido para um hackathon, focado nos 8 remédios naturais que promovem bem-estar físico e mental. O app oferece uma jornada educativa interativa com questionários personalizados e um assistente virtual de saúde.

✨ Funcionalidades Principais
Fluxo de Usuário Completo: Welcome → Login/Cadastro → Home

8 Questionários Temáticos: Avaliação em cada um dos remédios naturais

Assistente Virtual de Saúde: Chatbot com recomendações personalizadas

Perfil e Histórico: Armazenamento de resultados e progresso

Navegação Intuitiva: Fluxo linear entre as telas

🛠 Stack Tecnológico
Frontend: React Native (TypeScript)

Framework: Expo

Gerenciamento de Estado: Context API + Hooks

Mock Services:

mockAuth.ts - Autenticação simulada

mockFirestore.ts - Banco de dados simulado

mockStorage.ts - Armazenamento local

mockUserService.ts - Serviço de usuário

🎨 Design System
Cores Principais:

Azul Primário: #007ED5

Azul Escuro: #003878

Fundo Claro: #d7f0ff

Tipografia:

Títulos: Bold 18px

Corpo de Texto: Regular 16px

Componentes Reutilizáveis:

Botões arredondados

Cards de informação

Modal de chat

📂 Estrutura do Projeto
/saude-app
├── /assets               # Recursos visuais (imagens, ícones)
├── /components           # Componentes reutilizáveis
│   ├── Favorito.tsx      # Componente de favoritos
│   ├── Footer.tsx        # Rodapé da aplicação
│   ├── SimpleHealthBot.tsx # Chatbot de saúde
│   └── ...              # Demais componentes
├── /pages                # Telas da aplicação
│   ├── /Quiz             # Questionários dos 8 remédios
│   │   ├── CleanAir.tsx  # Questionário - Ar Puro
│   │   ├── Exercise.tsx  # Questionário - Exercício
│   │   ├── Nutrition.tsx # Questionário - Nutrição
│   │   └── ...          # Outros questionários
│   ├── Favorites.tsx     # Tela de favoritos/histórico
│   ├── Home.tsx          # Dashboard principal
│   ├── Login.tsx         # Tela de login
│   ├── Profile.tsx       # Perfil do usuário
│   ├── Register.tsx      # Cadastro de usuário
│   └── Welcome.tsx       # Tela inicial
├── /services             # Serviços e lógica de negócio
│   ├── mockAuth.ts       # Autenticação simulada
│   ├── mockFirestore.ts  # Firestore simulado
│   ├── mockStorage.ts    # Armazenamento local
│   └── mockUserService.ts # Serviço de usuário
├── App.tsx               # Ponto de entrada principal
├── app.json              # Configuração do Expo
├── eas.json              # Configuração EAS Build
├── babel.config.js       # Configuração do Babel
├── tsconfig.json         # Configuração TypeScript
└── package.json          # Dependências do projeto
🔍 Destaques de Implementação
1. Chatbot Inteligente (SimpleHealthBot.tsx)
Funcionalidades:

Respostas contextualizadas baseadas nos resultados do usuário

Análise de saúde personalizada

Banco de dicas de saúde

Exemplo de Uso:

typescript
<SimpleHealthBot 
  userResults={healthData} 
  onClose={() => setShowBot(false)}
/>
2. Mock Services
Autenticação (mockAuth.ts):

Simula login/cadastro com dados mockados

Mantém estado do usuário atual

Banco de Dados (mockFirestore.ts):

Armazena perfil do usuário e resultados de questionários

Fornece dados fictícios para desenvolvimento

3. Gerenciamento de Questionários (quizStorage.ts)
Armazena resultados localmente durante a sessão

Calcula pontuação total agregada

🚀 Como Executar com Expo
Certifique-se de ter o Expo CLI instalado:

bash
npm install -g expo-cli
Instale as dependências:

bash
npm install
# ou
yarn install
Inicie o projeto:

bash
expo start
# ou
npm start
Escolha uma das opções:

Escanear QR code com app Expo Go (dispositivo físico)

Executar em emulador Android/iOS

Executar no navegador (funcionalidades limitadas)

🔄 Fluxo de Desenvolvimento com Expo
Modo desenvolvimento: expo start --dev-client

Build para produção: eas build -p android|ios

Publicar atualização: eas update

📝 Próximos Passos
Integrar com Firebase real

Adicionar gráficos de progresso

Implementar notificações de lembrete

Expandir base de conhecimento do chatbot

🤝 Contribuição
Contribuições são bem-vindas! Siga os passos:

Faça um fork do projeto

Crie sua branch (git checkout -b feature/nova-feature)

Commit suas mudanças (git commit -m 'Adiciona nova feature')

Push para a branch (git push origin feature/nova-feature)

Abra um Pull Request

Observação: Este projeto foi desenvolvido inicialmente com serviços mockados para permitir desenvolvimento sem dependências externas. A integração com Firebase real pode ser feita substituindo os arquivos na pasta services