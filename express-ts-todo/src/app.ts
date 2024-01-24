import express, { Application } from "express";
import { todo } from "node:test";

const app: Application = express()
const port = 3000;

app.use(express.json())

interface Todo {
    id: number;
    title: string;
    completed: boolean
}

let todos: Todo[] = [
    { id: 1, title: 'Learn Express', completed: false },
    { id: 2, title: 'Build an express app', completed: false },
];

app.get('/', (req: any, res: any) => {
    res.json(todos)
})

app.post('/todos', (req: any, res: any)=> {
    const {title} = req.body;
    const newTodo: Todo = {
        id: todos.length + 1,
        title,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo)
})

app.put('/todos/:id', (req: any, res: any) => {
    const id = parseInt(req.params.id)
    const {title, completed} = req.body;
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if(todoIndex !== -1) {
        todos[todoIndex] = {
            ...todos[todoIndex],
            title: title || todos[todoIndex].title,
            completed: completed || todos[todoIndex].completed
        }
        res.json(todos[todoIndex])
        res.status(201).json({message: 'Update Successfully'})
    } else {
        res.status(404).json({error: 'Todo not Found'})
    }
});

app.delete('/todos/:id', (req: any, res:any) => {
    const id = parseInt(req.params.id)
    todos = todos.filter((todo) => todo.id !== id);
    res.json({message: 'Todo Deleted Successfully'})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})