import Papa from 'papaparse';

export const loadCSVData = async (filePath) => {
  const response = await fetch(filePath);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = decoder.decode(result.value);
  
  return new Promise((resolve) => {
    Papa.parse(csv, {
      header: true,
      complete: (results) => resolve(results.data)
    });
  });
};

export const processData = {
  users: (data) => data.filter(u => u.age && u.country),
  subscriptions: (data) => data.filter(s => s.status === 'active')
};