# SkillMatch JS - Simulador de Compatibilidade com Vaga Front-End Jr

O SkillMatch JS e uma aplicacao desenvolvida em JavaScript puro para analisar o perfil tecnico de um candidato e calcular o percentual de compatibilidade com vagas de emprego disponiveis.

## Como Executar o Projeto

### Pre-requisitos
- Node.js instalado (versao 14 ou superior).

### Passo a Passo
1. Clone este repositorio:
   git clone https://github.com/seu-usuario/skillmatch-js.git

2. Acesse a pasta do projeto:
   cd skillmatch-js

3. Execute o script principal:
   node skillmatch.js

## Regra de Calculo e Classificacao

### Calculo do Percentual
O calculo de aderencia e feito comparando as habilidades do candidato com a lista de requisitos exigidos por cada vaga:

$$\text{Percentual} = \left( \frac{\text{Requisitos Atendidos}}{\text{Total de Requisitos da Vaga}} \right) \times 100$$

### Classificacao de Compatibilidade
- **80% a 100%:** Alta compatibilidade
- **50% a 79%:** Media compatibilidade
- **0% a 49%:** Baixa compatibilidade

## Arquitetura e Recursos Tecnicos

- **Orientacao a Objetos (POO):** Classes Candidato, Vaga e subclasse VagaRemota utilizando heranca (extends, super) e metodos com this.
- **Assincronismo:** Simulacao de servidor de banco de dados utilizando Promise, setTimeout, async/await e tratamento de erros com try/catch.
- **Manipulacao de Arrays:** Uso dos metodos .filter() (identificacao de requisitos atendidos/faltantes), .map() (geracao do relatorio) e .reduce() (selecao da vaga mais compativel).
- **Conceitos Avancados:** 
  - **Closure:** Funcao criarContadorAnalises() preservando o estado interno do total de analises realizadas.
  - **Callback:** Funcao formatarRecomendacao() recebendo callback para geracao de plano de estudos personalizado.

## Estrutura de Branches (GitFlow)

- main: Codigo final estavel e consolidado.
- feature/modelagem-classes: Criacao da estrutura de POO (Candidato, Vaga, VagaRemota).
- feature/assincronismo: Implementacao da busca simulada via Promise e async/await.
- feature/motor-compatibilidade: Regras de negocio, calculos, metodos de array, callbacks e closures.
- feature/documentacao-readme: Documentacao tecnica e ajustes finais.