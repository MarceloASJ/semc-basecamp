# 🏕️ SEMC BaseCamp

Aplicação web desenvolvida para o grupo **SEMC**, voltada ao gerenciamento e catalogação de equipamentos de sobrevivencialismo, planejamento de acampamentos, viagens e rotas de trilhas.

Projeto desenvolvido para a disciplina de **Desenvolvimento Web Front-End** do curso de Ciência da Computação — **Universidade FUMEC** (Prof. Dângelo Silva Miranda).

## 👤 Integrante
* **Marcelo Alexandrino de Souza Junior**

## 🎯 Tema
Sobrevivencialismo, viagens, acampamentos e trilhas (Grupo SEMC).

## 🖥️ Telas Previstas (7 Telas)
1. **Tela Inicial (Menu):** Apresentação do portal SEMC BaseCamp, destaques de expedições, guia rápido e contato.
2. **Tela Sobre Nós:** História do grupo SEMC, propósito, filosofia de sobrevivencialismo e perfil dos membros.
3. **Tela de Login:** Autenticação de usuários e controle de acesso a rotas administrativas.
4. **Tela de Cadastro de Usuário:** Formulário de registro integrado à API de CEP/DDD (ViaCEP/Correios).
5. **Tela de Equipamentos e Trilhas (Catálogo):** Listagem de equipamentos/trilhas e visualização de detalhes (especificações técnicas, peso, dificuldade e checklist).
6. **Tela de Cadastro de Equipamento/Trilha:** Formulário restrito para inclusão e edição de itens e rotas.
7. **Tela de Relatórios (Dashboard):** Indicadores sobre equipamentos por categoria, trilhas por nível de dificuldade e histórico de acampamentos.

## ⚙️ Requisitos e Tecnologias
* **Framework:** Angular
* **Funcionalidades Principais:**
  * Componentes de Listagem e Detalhe
  * Componentes de Formulários Reativos
  * Proteção de Rotas (`AuthGuard`) e Controle de Acesso
  * Otimização de Desempenho com *Lazy Loading*
  * Dashboard Gerencial de Relatórios
  * Consumo de Web APIs (`JSON-Server` e API ViaCEP/Correios)
* **Padrões de Versionamento:** GitFlow, Commits Atômicos e *Conventional Commits*.
