const fs = require('fs');
const data = require('../task.json');

const updateFile = async (tasks) => {
    await fs.promises.writeFile('./task.json', JSON.stringify({ tasks }, null, 2));
}

module.exports = { tasks: data.tasks, updateFile };