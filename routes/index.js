var express = require('express');
var router = express.Router();
const TaskModel = require('../models/task');

/* =========================
   GET /
========================= */
router.get('/', async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.render('index', {
            title: 'Todo List',
            tasks: tasks
        });
    } catch (err) {
        console.log(err);
        // ⚠ vẫn truyền tasks để EJS không lỗi
        res.render('index', {
            title: 'Todo List',
            tasks: []
        });
    }
});

/* =========================
   GET /task/new
========================= */
router.get('/task/new', (req, res) => {
    res.render('task_new');
});

/* =========================
   POST /task
========================= */
router.post('/task', async (req, res) => {
    try {
        const { title, user } = req.body;
        await TaskModel.create({
            title,
            user,
            isDone: false
        });
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

/* =========================
   MARK DONE
========================= */
router.get('/task/done/:id', async (req, res) => {
    await TaskModel.findByIdAndUpdate(req.params.id, {
        isDone: true
    });
    res.redirect('/');
});

/* =========================
   DELETE
========================= */
router.get('/task/delete/:id', async (req, res) => {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;

