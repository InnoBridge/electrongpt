import React from 'react';
import Model from './Model';

interface ModelsProps {
    models: string[];
    setModel: (model: string) => void;
}

const Models: React.FC<ModelsProps> = ({ models, setModel }) => {
    return (
        <div className="models-container">
            <h2>Select a Language Model</h2>
            <div className="models-dropdown">
                <select
                    onChange={(e) => setModel(e.target.value)}
                    defaultValue=""
                    className="model-select"
                >
                    <option value="" disabled>Choose a model</option>
                    {models.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Models;