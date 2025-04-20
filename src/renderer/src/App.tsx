// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'
import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import Models from './components/llm/Models';

const App: React.FC = () => {
  const [model, setModel] = useState<string | null>(null)
  const [models, setModels] = useState<string[]>([])

  useEffect(() => {
    const fetchModel = async () => {
      const model = await window.api.llm.getModel()
      setModel(model)
    }
    const fetchModels = async () => {
      const models = await window.api.llm.getModels()
      setModels(models)
    }

    fetchModel();
    fetchModels();
  }, [])

  const handleSetModel = async (model: string) => {
    await window.api.llm.setModel(model)
    setModel(model)
  }

  return (
    <div className="Application">
      {model  ? 
        <Chat />
        : 
        <Models models={models} setModel={handleSetModel} />
      }
    </div>
  );
};

export default App
