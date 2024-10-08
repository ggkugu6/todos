const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

// Создание нового пользователя
router.post('/users', async (req, res) => {
  try {
    const newUser = await userController.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Получение всех пользователей
router.get('/users', authMiddleware, async (req, res) => {
  try {
    const subordinateIds = req.subordinates.map(sub => sub.id);

    // текущий пользователь + его подчинённые
    const userIds = [req.user.id, ...subordinateIds];

    const filter = {
      where: { id: userIds },
    };
    const users = await userController.getUsers(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Получение одного пользователя по ID
router.get('/users/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    const user = await userController.getOneUser(userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Обновление данных пользователя
router.put('/users/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    const updatedUser = await userController.updateUser(userId, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Удаление пользователя
router.delete('/users/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  try {
    const result = await userController.deleteUser(userId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Регистрация пользователя
router.post('/registration', async (req, res) => {
  try {
    const newUser = await userController.registration(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Вход пользователя
router.post('/login', async (req, res) => {
  try {
    const result = await userController.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Проверка токена пользователя
router.get('/auth', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }
    const user = await userController.check(req.headers.authorization);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
