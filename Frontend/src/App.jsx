import React, { useState } from 'react';
import ChartComponent from './components/ChartComponent';
import InputModal from './components/InputModel';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [dataUpdated, setDataUpdated] = useState(0);

  const handleDataAdded = () => {
    setDataUpdated(prev => prev + 1);
  };
  return (
    <div className="App bg-gray-50 sm:w-screen sm:h-screen w-screen h-screen flex items-center justify-center flex-col gap-4">
    <div className='flex gap-2'>

      <select className='border-2 border-gray-300 rounded-md p-2' onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Data</option>
        <option value="10m">Last 10 Minutes</option>
        <option value="1h">Last 1 Hour</option>
      </select>
      <button className='bg-blue-500 px-4 py-2 rounded-xl' onClick={() => setModalOpen(true)}>Add New Price</button>
    </div>
      <ChartComponent filter={filter} dataUpdated={dataUpdated}/>
      <InputModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onDataAdded={handleDataAdded}  />
    </div>
  );
}

export default App;
