const jwt = require('jsonwebtoken');
const { models } = require('../models/sequelize_connect');
const { users } = models;

const DB_TOKEN = process.env.DB_TOKEN;

async function authMiddleware(req, res, next) {
    try {
        // Проверка наличия токена
        const token = req.headers?.authorization;
        if (!token) {
            return res.status(401).json({ error: 'Токен не предоставлен' });
        }

        // Верификация токена
        const decoded = jwt.verify(token, 'secretKey');
        const user = await users.findByPk(decoded.id, {
            include: [{ model: users, as: 'subordinates' }]

        });

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        subordinates = user.subordinates;
        req.user = user;
        req.subordinates = subordinates;
        next();
    } catch (error) {
        console.error("Ошибка аутентификации:", error.message);
        res.status(403).json({ error: 'Недействительный токен' });
    }
}

module.exports = { authMiddleware };
