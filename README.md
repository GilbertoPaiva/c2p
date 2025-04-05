# Análise Engie Brasil vs Corporate DI

## Descrição do Projeto

Este projeto apresenta uma análise comparativa entre investimentos da Engie Brasil e o índice Corporate DI através de uma visualização interativa. O gráfico combinado inclui linhas de tendência, pontos específicos e box plots para uma análise detalhada dos dados financeiros.

## Tecnologias Utilizadas

- React 18.2.0
- Plotly.js 2.24.2
- React-Plotly.js 2.6.0
- TailwindCSS 3.3.2
- SheetJS (xlsx) 0.18.5

## Funcionalidades

- Visualização de séries temporais de investimentos
- Comparação direta entre Engie Brasil e Corporate DI
- Análise de volatilidade e tendências através de box plots
- Identificação de pontos específicos de interesse no gráfico
- Importação de dados via arquivo Excel
- Download de modelo de planilha para importação
- Interface responsiva e moderna

## Estrutura do Projeto

```
engie-grafico-case/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── GraficoCombinado.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```
git clone https://github.com/seu-usuario/engie-grafico-case.git
```

2. Navegue até a pasta do projeto:
```
cd engie-grafico-case
```

3. Instale as dependências:
```
npm install
```

4. Execute o projeto:
```
npm start
```

5. Acesse no navegador:
```
http://localhost:3000
```

## Análise dos Dados

O gráfico combinado demonstra:

- O Corporate DI apresenta maior volatilidade inicial, mas tende a estabilizar em valores mais altos nos períodos finais.
- O Engie Brasil mostra um crescimento mais constante até estabilizar aos 4 anos.
- Os box plots demonstram a dispersão dos valores para cada ponto de amostragem.
- Os pontos ENGIC3 (7.9, 7) apresentam o maior spread em anos mais longos.

## Dados Utilizados

### Dados para os gráficos de linha
- 'Corporate DI' = [1, 2.4, 3, 7, 5, 8, 9, 9, 9, 9, 9]
- 'Engie Brasil' = [1, 2, 4, 6, 8, 8, 8, 8, 8, 8, 8]
- 'Duration Anos' = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

### Dados dos Scatter Points
- ENGIA0: (1.3, 3)
- ENGIA1: (2.6, 4)
- ENGIA2: (3.7, 5)
- ENGIB2: (4.8, 2)
- ENGIC3: (7.9, 7)

### Dados para os Box Plots
- ENGIA0: x=1.5, y=[1.5, 2.1, 2.4, 2.2, 1.9]
- ENGIA1: x=2.7, y=[2.5, 2.8, 3.0, 2.7, 2.9]
- ENGIA2: x=3.0, y=[3.5, 3.2, 3.7, 3.8, 3.6]
- ENGIB2: x=4.6, y=[2.8, 3.3, 3.0, 3.5, 3.2]
- ENGIC3: x=7.9, y=[2.8, 3.3, 3.0, 3.5, 4.5]

## Funcionalidade de Importação Excel

O projeto suporta a importação de dados através de arquivos Excel. Para utilizar esta funcionalidade:

1. Clique no botão "Baixar modelo Excel" para obter um arquivo modelo com a estrutura correta
2. Preencha o arquivo com seus dados ou modifique os existentes
3. Clique no campo de upload e selecione o arquivo Excel preenchido
4. O gráfico será automaticamente atualizado com os novos dados

### Estrutura do Arquivo Excel

O arquivo Excel deve seguir a seguinte estrutura:

1. **Seção de Linhas** (linhas 1-3):
   - Linha 1: "Duration Anos" seguido pelos valores nos anos (0, 1, 2, ...)
   - Linha 2: "Corporate DI" seguido pelos valores correspondentes
   - Linha 3: "Engie Brasil" seguido pelos valores correspondentes

2. **Seção de Scatter Points** (a partir da linha 5):
   - Cabeçalho: "Scatter Points"
   - Colunas: "name", "x", "y" 
   - Dados: Uma linha para cada ponto com nome, coordenada x e coordenada y

3. **Seção de Box Plots** (após os scatter points):
   - Cabeçalho: "Box Plots"
   - Colunas: "name", "x", "y"
   - Dados: Múltiplas linhas para cada grupo de box plot com mesmo nome e coordenada x
