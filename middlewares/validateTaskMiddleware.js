const validateTaskMiddleware = (req, res, next) => {
    const { title, description, completed } = req.body;
    if (!title) return res.status(400).send({ message: 'Invalid title provided' });
    if (!description) return res.status(400).send({ message: 'Invalid description provided' });
    if (typeof completed !== 'boolean') return res.status(400).send({ message: 'Invalid completed status provided' });
    next();
}

module.exports = { validateTaskMiddleware };