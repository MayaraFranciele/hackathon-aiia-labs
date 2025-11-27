# RedHub

## Introdução
O **RedHub** é uma aplicação web desenvolvida para gerenciar finanças pessoais de forma prática e eficiente. Ele oferece funcionalidades como controle de gastos, cashback, seguros, e muito mais, tudo em um único lugar.

## Recursos
- **Dashboard**: Visualize rapidamente o saldo total, receitas e despesas.
- **Controle de Gastos**: Categorize e acompanhe suas transações.
- **Cashback**: Ganhe dinheiro de volta em compras e acompanhe seu histórico.
- **Seguros**: Contrate e gerencie seguros personalizados.
- **Pagamentos e PIX**: Realize transações financeiras com facilidade.
- **Relatórios**: Acesse extratos detalhados e categorizados.

## Estrutura do Projeto
```
red-finance-hub/
├── public/                # Arquivos públicos (ex: robots.txt)
├── src/                   # Código-fonte principal
│   ├── components/        # Componentes reutilizáveis
│   │   ├── ui/            # Componentes de interface (ex: botões, cards)
│   ├── hooks/             # Hooks personalizados
│   ├── lib/               # Funções utilitárias
│   ├── pages/             # Páginas principais da aplicação
│   ├── utils/             # Funções auxiliares e constantes
├── package.json           # Configurações do projeto e dependências
├── tailwind.config.ts     # Configuração do TailwindCSS
├── vite.config.ts         # Configuração do Vite
```

## Tecnologias Utilizadas
- **Frontend**: React, TypeScript
- **Estilização**: TailwindCSS
- **Gerenciamento de Estado**: React Query
- **Componentes**: Radix UI, Lucide React
- **Build Tool**: Vite
- **Validação**: Zod

## Instalação e Configuração
Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/hackathon-redhub.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd hackathon-redhub
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse a aplicação em [http://localhost:5173](http://localhost:5173).

## Scripts Disponíveis
- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção.
- `npm run preview`: Visualiza a versão de produção localmente.
- `npm run lint`: Executa o linter para verificar problemas no código.

## Contribuição
Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie suas alterações:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request no GitHub.

## Licença
Este projeto está licenciado sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo conforme necessário.

---

**RedHub** - Gerencie suas finanças de forma inteligente e prática!

