const express = require('express');
const app = express();
const port = 3000;
const todos = require('./todos');
app.use(require('cors')())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('This is an API for a todo app. Use the /todos endpoint to get the todos.')
})



app.get('/todos', (req, res) => {
    res.send(todos)
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    const todo = todos.find(todo => todo.id === Number(id))
    if (todo) {
        res.send(todo)
    } else {
        res.status(404).send({ error: 'Todo not found' })
    }
})

app.post('/todos', (req, res) => {
    const todo = req.body
    if (todo.title) {
        todo.id = (() => {
            let id = 0
            todos.forEach(todo => {
                if (todo.id > id) {
                    id = todo.id
                }
            })
            return id + 1
        })()
        todos.push(todo)
        res.send(todo)
    } else {
        res.status(400).send({ error: 'Please provide todo title' })
    }
})

app.post('/todos/:id', (req, res) => {
    const id = req.params.id
    const todo = todos.find(todo => todo.id === Number(id))
    if (todo) {
        todo.title = req.body.title
        res.send(todo)
    } else {
        res.status(404).send({ error: 'Todo not found' })
    }
})

app.get('/delete-todo/:id', (req, res) => {
    const id = req.params.id
    const todo = todos.find(todo => todo.id === Number(id))
    const index = todos.indexOf(todo)
    if (todo) {
        const deletedTodo = todos.splice(index, 1)
        res.send(deletedTodo)
    } else {
        res.status(404).send({ error: 'Todo not found' })
    }
})

app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`)
})