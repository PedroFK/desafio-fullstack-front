## Serviço de Assinaturas - Frontend
Este projeto é a interface frontend do sistema de gerenciamento de assinaturas de um serviço. Ele permite que o usuário visualize planos de assinatura, contrate um plano, simule um pagamento via "PIX", visualize o plano contratado e altere sua assinatura para outro plano.

### Tecnologias Utilizadas
TypeScript: Linguagem de programação utilizada para tipagem estática no JavaScript.
React: Biblioteca JavaScript para criação de interfaces de usuário.
Axios: Biblioteca para fazer requisições HTTP.
React Router: Utilizado para roteamento entre as páginas do sistema.
Tailwind CSS: Framework CSS utilizado para estilização da interface.
Context API: Gerenciamento de estado global, como informações do usuário e plano ativo.

### Funcionalidades
1. Exibição de Dados do Usuário
O sistema exibe os dados do usuário que está logado, incluindo seu nome e o plano de assinatura ativo (caso haja). Neste projeto, não foi implementada a parte de login e autenticação, por isso, o usuário é considerado logado por padrão.

2. Listagem de Planos
Todos os planos disponíveis para contratação são exibidos na tela de planos. O sistema consome uma API para buscar os planos cadastrados no banco de dados e os exibe de forma visualmente atraente, utilizando o Tailwind CSS para estilização.

3. Assinatura de Plano e Simulação de Pagamento PIX
O usuário pode selecionar um dos planos e realizar a contratação. O pagamento é simulado via "PIX", e o sistema gera uma página de confirmação de pagamento. Essa operação apenas simula o fluxo de pagamento sem realizar um PIX real.

4. Exibição do Plano Ativo
Na página principal, o sistema exibe o plano atualmente contratado pelo usuário, caso ele já tenha feito alguma assinatura anteriormente. A exibição é dinâmica e reflete qualquer alteração de plano realizada.

5. Alteração de Plano
Se o usuário já tiver um plano ativo, ele pode optar por trocar de plano. Ao fazer isso, o sistema recalcula o valor do crédito restante do plano anterior e ajusta o pagamento para o novo plano, seja ele de valor maior ou menor. Este cálculo considera os dias já utilizados do plano anterior.

## Instalação e Execução
Siga os passos abaixo para rodar o projeto localmente.

#### Pré-requisitos
Node.js (v16+)
npm ou yarn

#### Passo a Passo
1. Clone o repositório `git clone https://github.com/seu-usuario/seu-repositorio.git`
2. Navegue até o diretório do projeto `cd seu-repositorio/frontend`
3. Instale as dependências `npm install`
4. Configuração do .env `VITE_APP_API_URL=http://localhost:8000/api`
5. Execute o projeto `npm run dev`

### Rotas
/: Página que exibe todos os planos disponíveis para contratação.
/user: Página que mostra informações do usuário e plano atual contratado.

### Integração com Backend
Este frontend está integrado com um backend em Laravel que gerencia as operações de usuário, contratos e pagamentos. As requisições são feitas utilizando a biblioteca Axios para realizar operações como:
1. Buscar dados do usuário.
2. Listar planos disponíveis.
3. Registrar a contratação de planos.
4. Trocar de plano e recalcular créditos.