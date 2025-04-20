import {
    getModels,
    getModel,
    setModel,
    createCompletion
} from './services/llm';

const handleGetModels = (ipcMain) => {
    ipcMain.handle('llm:get-models', async (event) => {
        const models = await getModels();
        return models;
    });
};

const handleGetModel = (ipcMain) => {
    ipcMain.handle('llm:get-model', (event) => {
        const model = getModel();
        return model;
    });
};

const handleSetModel = (ipcMain) => {
    ipcMain.handle('llm:set-model', async (event, model) => {
        await setModel(model);
        return model;
    });
};

const handleCreateCompletion = (ipcMain) => {
    ipcMain.handle('llm:create-completion', async (event, prompt) => {
        const completion = await createCompletion(prompt);
        return completion;
    });
};

const setupChatApis = (ipcMain) => {
    handleGetModels(ipcMain);
    handleGetModel(ipcMain);
    handleSetModel(ipcMain);
    handleCreateCompletion(ipcMain);
};

export default setupChatApis;