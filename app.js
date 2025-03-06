const express = require('express');
const { tasksRouter } = require('./routers');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tasks', tasksRouter);

if (require.main === module) {
    app.listen(port, (err) => {
        if (err) {
            return console.error('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
}

module.exports = app;