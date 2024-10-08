const Router = require('express')
const { Op } = require('sequelize');
const router = new Router()
const TaskController = require('../controllers/taskController.js')
const { authMiddleware } = require('../middleware/authMiddleware.js');


router.post('/tasks', async (req, res) => {
    try {
        const newTask = await TaskController.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/tasks', authMiddleware, async (req, res) => {
    try {
        const subordinate = req.subordinates.map(sub => sub.id);
        // текущий пользователь + его подчинённые
        const userIds = [req.user.id];
        const subordinateIds = [...subordinate, userIds]
        const filter = {
            where: {
                [Op.or]: [
                    { creator_id: userIds },
                    { assignee_id: subordinateIds}
                ]
            }
        };
        const tasks = await TaskController.getTasks(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/tasks/statuses', async (req, res) => {
    try {
        const statuses = await TaskController.getTaskStatuses(req.body);
        res.status(200).json(statuses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/tasks/priorities', async (req, res) => {
    try {
        const priorities = await TaskController.getTaskPriorities(req.body);
        res.status(200).json(priorities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await TaskController.getOneTask(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await TaskController.updateTask(req.params.id, req.body);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router 