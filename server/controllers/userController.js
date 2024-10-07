const { models } = require('../models/sequelize_connect');
const { users } = models;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateJwt(id) {
  return jwt.sign({ id }, 'secretKey', { expiresIn: '1h' });
}

class UserController {
  // Создание нового пользователя
  async createUser(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await users.create({
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name,
        login: data.login,
        password_hash: hashedPassword,
        supervisor_id: data.supervisor_id // связь с руководителем
      });
      return newUser;
    } catch (error) {
      console.error("Ошибка при создании пользователя:", error);
      throw error;
    }
  }

  // Получение списка всех пользователей
  async getUsers(filter = {}) {
    try {
      const usersAll = await users.findAll({...filter,
        include: [
          { model: users, as: 'supervisor'},   // Руководитель пользователя
          { model: users, as: 'subordinates'}  // Подчиненные пользователя
        ]
      });
      if (!usersAll) {
        throw new Error('Пользователи не найдены');
      }
      return usersAll;
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
      throw error;
    }
  }

  // Получение одного пользователя по ID
  async getOneUser(id) {
    try {
      const singleUser = await users.findByPk(id, {
        include: [
          { model: users, as: 'supervisor' },   // Руководитель пользователя
          { model: users, as: 'subordinates' }  // Подчиненные пользователя
        ]
      });
      if (!singleUser) {
        throw new Error('Пользователь не найден');
      }
      return singleUser;
    } catch (error) {
      console.error(`Ошибка при получении пользователя с ID ${id}:`, error);
      throw error;
    }
  }

  // Обновление данных пользователя
  async updateUser(id, data) {
    try {
      if (data.password) {
        data.password_hash = await bcrypt.hash(data.password, 10);
      }
      const [updated] = await users.update(data, {
        where: { id: id }
      });
      if (!updated) {
        throw new Error('Пользователь не найден или не был обновлен');
      }
      const updatedUser = await users.findByPk(id, {
        include: [
          { model: users, as: 'supervisor' },   // Руководитель пользователя
          { model: users, as: 'subordinates' }  // Подчиненные пользователя
        ]
      });
      return updatedUser;
    } catch (error) {
      console.error(`Ошибка при обновлении пользователя с ID ${id}:`, error);
      throw error;
    }
  }

  // Удаление пользователя
  async deleteUser(id) {
    try {
      const deleted = await users.destroy({
        where: { id: id }
      });
      if (!deleted) {
        throw new Error('Пользователь не найден или не был удален');
      }
      return { message: 'Пользователь успешно удален' };
    } catch (error) {
      console.error(`Ошибка при удалении пользователя с ID ${id}:`, error);
      throw error;
    }
  }

  // Регистрация пользователя
  async registration(data) {
    try {
      const existingUser = await users.findOne({
        where: { login: data.login }
      });
      if (existingUser) {
        throw new Error('Пользователь с таким логином уже существует');
      }
      return await this.createUser(data);
    } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
      throw error;
    }
  }

  // Вход пользователя 
  async login(data) {
    try {
      // Проверяем наличие данных для входа
      if (!data?.login || !data?.password) {
        throw new Error('Не все данные для входа предоставлены');
      }
  
      // Поиск пользователя по логину
      const existingUser = await users.findOne({
        where: { login: data.login },
      });
  
      // Проверяем существование пользователя
      if (!existingUser) {
        throw new Error('Пользователя с таким логином не существует');
      }
  
      // Проверка правильности пароля
      const validPassword = await bcrypt.compare(data.password, existingUser.password_hash);
      if (!validPassword) {
        throw new Error('Неправильный логин или пароль');
      }
  
      // Генерация токена
      const token = generateJwt(existingUser.id);
      return { token };
  
    } catch (error) {
      // Логирование ошибки для отладки
      console.error("Ошибка при входе пользователя:", error.message);
  
      // Обработка известных ошибок с возвратом оригинальных сообщений
      if (
        error.message === 'Не все данные для входа предоставлены' ||
        error.message === 'Пользователя с таким логином не существует' ||
        error.message === 'Неправильный логин или пароль'
      ) {
        throw error;
      }
  
      // Обработка непредвиденных ошибок
      throw new Error('Непредвиденная ошибка при входе пользователя');
    }
  }
  

  // Проверка токена пользователя
  async check(token) {
    try {
      const decoded = jwt.verify(token, 'secretKey');
      const existingUser = await users.findByPk(decoded.id);
      if (!existingUser) {
        throw new Error('Пользователь не найден');
      }
      return existingUser;
    } catch (error) {
      console.error("Ошибка при проверке токена пользователя:", error);
      throw error;
    }
  }
}

module.exports = new UserController();
