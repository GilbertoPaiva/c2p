import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import * as XLSX from 'xlsx';

const GraficoCombinado = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const processarDadosManualmente = () => {
    const duracaoAnos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const corporateDI = [1, 2.4, 3, 7, 5, 8, 9, 9, 9, 9, 9];
    const engieBrasil = [1, 2, 4, 6, 8, 8, 8, 8, 8, 8, 8];
    
    const scatterPoints = [
      { x: [1.3], y: [3], name: 'ENGIA0' },
      { x: [2.6], y: [4], name: 'ENGIA1' },
      { x: [3.7], y: [5], name: 'ENGIA2' },
      { x: [4.8], y: [2], name: 'ENGIB2' },
      { x: [7.9], y: [7], name: 'ENGIC3' }
    ];
    
    const boxPlots = [
      { x: 1.5, y: [1.5, 2.1, 2.4, 2.2, 1.9], name: 'ENGIA0' },
      { x: 2.7, y: [2.5, 2.8, 3.0, 2.7, 2.9], name: 'ENGIA1' },
      { x: 3.0, y: [3.5, 3.2, 3.7, 3.8, 3.6], name: 'ENGIA2' },
      { x: 4.6, y: [2.8, 3.3, 3.0, 3.5, 3.2], name: 'ENGIB2' },
      { x: 7.9, y: [2.8, 3.3, 3.0, 3.5, 4.5], name: 'ENGIC3' }
    ];
    
    prepararDadosGrafico(duracaoAnos, corporateDI, engieBrasil, scatterPoints, boxPlots);
  };
  
  const processarArquivoExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      
      const dados = XLSX.utils.sheet_to_json(ws, { header: 1 });
      
      let duracaoAnos = [];
      let corporateDI = [];
      let engieBrasil = [];
      
      for (let i = 0; i < dados.length; i++) {
        const row = dados[i];
        if (row && row[0] === "Duration Anos") {
          duracaoAnos = row.slice(1);
        } else if (row && row[0] === "Corporate DI") {
          corporateDI = row.slice(1);
        } else if (row && row[0] === "Engie Brasil") {
          engieBrasil = row.slice(1);
        }
      }
    
      const scatterPointsRows = [];
      const boxPlotsRows = [];
      
      let currentSection = null;
      for (let i = 0; i < dados.length; i++) {
        const row = dados[i];
        if (!row || row.length === 0) continue;
        
        if (row[0] === "Scatter Points") {
          currentSection = "scatter";
          continue;
        } else if (row[0] === "Box Plots") {
          currentSection = "boxplot";
          continue;
        }
        
        if (currentSection === "scatter" && row[0] !== "name") {
          scatterPointsRows.push(row);
        } else if (currentSection === "boxplot" && row[0] !== "name") {
          boxPlotsRows.push(row);
        }
      }
      
      const scatterPoints = scatterPointsRows.map(row => ({
        x: [parseFloat(row[1])],
        y: [parseFloat(row[2])],
        name: row[0]
      }));
      
      const boxPlotsByName = {};
      boxPlotsRows.forEach(row => {
        const name = row[0];
        const x = parseFloat(row[1]);
        const y = parseFloat(row[2]);
        
        if (!boxPlotsByName[name]) {
          boxPlotsByName[name] = { x, y: [] };
        }
        boxPlotsByName[name].y.push(y);
      });
      
      const boxPlots = Object.keys(boxPlotsByName).map(name => ({
        x: boxPlotsByName[name].x,
        y: boxPlotsByName[name].y,
        name
      }));
      
      prepararDadosGrafico(duracaoAnos, corporateDI, engieBrasil, scatterPoints, boxPlots);
      setIsLoading(false);
    };
    
    reader.readAsBinaryString(file);
  };
  
  const downloadModeloExcel = () => {
    const wb = XLSX.utils.book_new();
    
    const dados = [
      ["Duration Anos", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ["Corporate DI", 1, 2.4, 3, 7, 5, 8, 9, 9, 9, 9, 9],
      ["Engie Brasil", 1, 2, 4, 6, 8, 8, 8, 8, 8, 8, 8],
      [],
      ["Scatter Points"],
      ["name", "x", "y"],
      ["ENGIA0", 1.3, 3],
      ["ENGIA1", 2.6, 4],
      ["ENGIA2", 3.7, 5],
      ["ENGIB2", 4.8, 2],
      ["ENGIC3", 7.9, 7],
      [],
      ["Box Plots"],
      ["name", "x", "y"],
      ["ENGIA0", 1.5, 1.5],
      ["ENGIA0", 1.5, 2.1],
      ["ENGIA0", 1.5, 2.4],
      ["ENGIA0", 1.5, 2.2],
      ["ENGIA0", 1.5, 1.9],
      ["ENGIA1", 2.7, 2.5],
      ["ENGIA1", 2.7, 2.8],
      ["ENGIA1", 2.7, 3.0],
      ["ENGIA1", 2.7, 2.7],
      ["ENGIA1", 2.7, 2.9],
      ["ENGIA2", 3.0, 3.5],
      ["ENGIA2", 3.0, 3.2],
      ["ENGIA2", 3.0, 3.7],
      ["ENGIA2", 3.0, 3.8],
      ["ENGIA2", 3.0, 3.6],
      ["ENGIB2", 4.6, 2.8],
      ["ENGIB2", 4.6, 3.3],
      ["ENGIB2", 4.6, 3.0],
      ["ENGIB2", 4.6, 3.5],
      ["ENGIB2", 4.6, 3.2],
      ["ENGIC3", 7.9, 2.8],
      ["ENGIC3", 7.9, 3.3],
      ["ENGIC3", 7.9, 3.0],
      ["ENGIC3", 7.9, 3.5],
      ["ENGIC3", 7.9, 4.5]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(dados);
    XLSX.utils.book_append_sheet(wb, ws, "Dados");
    
    XLSX.writeFile(wb, "modelo_dados_grafico.xlsx");
  };
  
  const prepararDadosGrafico = (duracaoAnos, corporateDI, engieBrasil, scatterPoints, boxPlots) => {
    const colors = {
      'ENGIA0': '#3366cc',
      'ENGIA1': '#9900cc',
      'ENGIA2': '#ff6600',
      'ENGIB2': '#993300',
      'ENGIC3': '#000000'
    };
    
    const plotlyData = [
      {
        x: duracaoAnos,
        y: corporateDI,
        type: 'scatter',
        mode: 'lines',
        name: 'Corporate DI',
        line: {
          color: '#4169E1',
          width: 2
        }
      },
      {
        x: duracaoAnos,
        y: engieBrasil,
        type: 'scatter',
        mode: 'lines',
        name: 'Engie Brasil',
        line: {
          color: '#E69500',
          width: 2
        }
      }
    ];
    
    scatterPoints.forEach(point => {
      plotlyData.push({
        x: point.x,
        y: point.y,
        type: 'scatter',
        mode: 'markers',
        name: point.name,
        marker: {
          color: colors[point.name] || '#000000',
          size: 8
        }
      });
    });
    
    boxPlots.forEach(box => {
      plotlyData.push({
        x: Array(box.y.length).fill(box.x),
        y: box.y,
        type: 'box',
        name: box.name,
        marker: {
          color: colors[box.name] || '#000000'
        },
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: 0,
        boxmean: true,
        orientation: 'v'
      });
    });
    
    setData(plotlyData);
  };
  
  useEffect(() => {
    processarDadosManualmente();
  }, []);
  
  const layout = {
    title: '',
    xaxis: {
      title: 'Duration Anos',
      range: [-0.5, 10.5]
    },
    yaxis: {
      title: 'Spread a.a.',
      range: [0, 9]
    },
    legend: {
      x: 1.05,
      y: 1,
      xanchor: 'left'
    },
    margin: {
      l: 50,
      r: 150,
      b: 50,
      t: 30
    },
    width: 900,
    height: 500,
    hovermode: 'closest'
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Análise Comparativa de Investimentos</h2>
      
      <div className="mb-4 w-full">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium mb-2">
            Carregar dados do Excel (opcional)
          </label>
          <button 
            onClick={downloadModeloExcel} 
            className="download-btn text-sm"
          >
            Baixar modelo Excel
          </button>
        </div>
        <input
          type="file"
          onChange={processarArquivoExcel}
          className="block w-full text-sm border border-gray-300 rounded p-2"
          accept=".xlsx, .xls"
        />
      </div>
      
      <div className="w-full bg-white p-4 rounded shadow">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Carregando dados...</p>
          </div>
        ) : (
          <Plot
            data={data}
            layout={layout}
            config={{ responsive: true }}
          />
        )}
      </div>
      
      <div className="mt-6 text-left w-full">
        <h3 className="text-lg font-semibold mb-2">Análise do Gráfico:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>O Corporate DI apresenta maior volatilidade inicial mas tende a estabilizar em valores mais altos nos períodos finais.</li>
          <li>O Engie Brasil mostra um crescimento mais constante até estabilizar aos 4 anos.</li>
          <li>Os box plots demonstram a dispersão dos valores para cada ponto de amostragem.</li>
          <li>Os pontos ENGIC3 (7.9, 7) apresentam o maior spread em anos mais longos.</li>
        </ul>
      </div>
    </div>
  );
};

export default GraficoCombinado;
