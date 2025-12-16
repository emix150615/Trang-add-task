# Trang-add-task
# Trang-th-m-task
 FUNCTION THÊM TASK (CREATE) Ở ĐÂU?
➡ File: routes/index.js
Đoạn: 
🧩 CODE XỬ LÝ (BACKEND)
router.post('/task', async (req, res) => {
    const { title, user } = req.body;

    await TaskModel.create({
        title,
        user,
        isDone: false
    });

    res.redirect('/');
});
🖱️ CODE GỌI FUNCTION (FRONTEND)

➡ File: views/task_new.ejs

<form action="/task" method="POST">
    <input name="title">
    <input name="user">
    <button type="submit">Add</button>
</form>

📌 Khi bấm Submit → gửi request POST /task → chạy function trên.

✅ 2️⃣ FUNCTION XÓA TASK (DELETE)
📍 Ở ĐÂU?

➡ File: routes/index.js

🧩 CODE XỬ LÝ (BACKEND)
router.get('/task/delete/:id', async (req, res) => {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.redirect('/');
});


📌 Đây chính là function xóa task.

🖱️ CODE GỌI FUNCTION (FRONTEND)

➡ File: views/index.ejs

<a href="/task/delete/<%= task._id %>">Delete</a>


📌 Click Delete → gửi GET /task/delete/:id → xóa task.

🔁 LUỒNG HOẠT ĐỘNG (NÊN THUỘC)
➕ Thêm task
Form (task_new.ejs)
→ POST /task
→ router.post('/task')
→ TaskModel.create()
→ redirect '/'

🗑️ Xóa task
Click Delete (index.ejs)
→ GET /task/delete/:id
→ router.get('/task/delete/:id')
→ TaskModel.findByIdAndDelete()
→ redirect '/'
1️⃣ KẾT NỐI DATABASE Ở ĐÂU?
📍 File: app.js
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://...";

mongoose.connect(mongoDB)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


📌 Ý nghĩa:

mongoose.connect() → kết nối MongoDB

Chỉ cần kết nối 1 lần duy nhất

Khi app chạy → DB sẵn sàng cho mọi route

👉 Đây là file duy nhất mở kết nối DB

2️⃣ FILE ĐỊNH NGHĨA DATABASE (MODEL)
📍 File: models/task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    user: String,
    isDone: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);


📌 Ý nghĩa:

Giống như bảng trong SQL

Task ↔ collection tasks

Quy định:

Có cột title

Có cột user

Có cột isDone

3️⃣ ROUTES LIÊN KẾT DB KIỂU GÌ?
📍 File: routes/index.js
const TaskModel = require('../models/task');


📌 Route không biết DB là gì
👉 Chỉ biết model.

➕ Thêm dữ liệu
TaskModel.create({
    title,
    user,
    isDone: false
});

🗑️ Xóa dữ liệu
TaskModel.findByIdAndDelete(id);

📄 Lấy dữ liệu
const tasks = await TaskModel.find();

🔁 LUỒNG KẾT NỐI DATABASE (PHẢI THUỘC)
app.js
│
├── mongoose.connect()   ← kết nối MongoDB
│
└── routes/index.js
      │
      └── require('../models/task')
            │
            └── TaskSchema
                  │
                  └── MongoDB (collection: tasks)
🟢 NÚT “DONE” Ở ĐÂU?

👉 Nút done nằm trong file giao diện

📍 views/index.ejs

1️⃣ CODE HIỂN THỊ NÚT DONE (FRONTEND)
<% if (!task.isDone) { %>
    <a href="/task/done/<%= task._id %>">done</a>
<% } %>
2️⃣ FUNCTION XỬ LÝ DONE (BACKEND)
router.get('/task/done/:id', async (req, res) => {
    await TaskModel.findByIdAndUpdate(
        req.params.id,
        { isDone: true }
    );
    res.redirect('/');
});
