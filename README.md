# TaskFlow

O **TaskFlow** é uma aplicação web desenvolvida para facilitar o gerenciamento de tarefas. Com ela, o usuário pode cadastrar, concluir, excluir e filtrar tarefas de maneira simples e organizada.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- Vitest
- Testing Library
- Git e GitHub
- GitHub Actions
- GitHub Pages

## Funcionalidades

- Cadastro de tarefas.
- Conclusão de tarefas.
- Exclusão de tarefas.
- Filtro de tarefas concluídas.

## Testes automatizados

O projeto utiliza Vitest e Testing Library para verificar o funcionamento das principais funcionalidades.

Atualmente, são realizados testes para:

1. Cadastro de uma nova tarefa.
2. Conclusão de uma tarefa.
3. Exclusão de uma tarefa.
4. Filtragem de tarefas concluídas.

## Integração e entrega contínuas (CI/CD)

O projeto utiliza GitHub Actions para automatizar o processo de integração e entrega contínuas.

- **Pull Request:** executa a verificação do código, os testes automatizados e a build.
- **Push na branch main:** executa as mesmas verificações e realiza a publicação da aplicação no GitHub Pages.

A branch `main` possui proteção para impedir alterações diretas e exigir que as verificações sejam aprovadas antes da integração.

## Como executar o projeto

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

Execute os testes:

```bash
npm run test:run
```

Verifique o código:

```bash
npm run lint
```

Gere a versão de produção:

```bash
npm run build
```

## Publicação

A aplicação está disponível em:

https://lohanyr.github.io/taskflow/

---

**Projeto acadêmico — ADS | FAETERJ**
