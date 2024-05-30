// src/utils/csvReader.js
import Papa from 'papaparse';

export const readCSV = (file, column) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      download: true,
      header: true,
      complete: (results) => {
        const columnData = results.data.map(row => row[column]);
        // Filtrar duplicados
        const uniqueData = Array.from(new Set(columnData));
        resolve(uniqueData);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};
