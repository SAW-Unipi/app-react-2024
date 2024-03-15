import { useLoaderData, useNavigate } from "react-router-dom";
import { ListData, MockDB, TodoData } from "./db";
import { useEffect, useState } from "react";
import { LeftArrowIcon } from "./Icons";

export function TodoPage() {
    const id = useLoaderData() as string;
    const [db] = useState(MockDB.getInstance());
    const [list, setList] = useState(db.getList(id));
    const [todos, setTodos] = useState<TodoData[]>([]);
    const nav = useNavigate();

    return <>
        <header>
            <h1>SAW TODO</h1>
            <h2>{list!.label}</h2>
            <button className="btn" onClick={() => nav('/lists')}>
                <LeftArrowIcon />
            </button>
        </header>
        <div className="container">
            <input type="text"
                className="text-input"
                placeholder="Inserisci todo..." />

            <section className="todos">
                <ul>
                    {todos.map(t =>
                        <li key={t.id}>
                            <Todo
                                editTodo={(todoId, nt: Partial<TodoData>) => {
                                    db.editTodo(id, todoId, nt)
                                }}
                                listId={list!.id}
                                todo={t} />
                        </li>)}
                </ul>
            </section>
        </div>
    </>
}

interface TodoProps {
    listId: string;
    todo: TodoData;
    editTodo: (id: string, t: Partial<TodoData>) => void;
}

function Todo({ listId, todo, editTodo }: TodoProps) {
    return <>
        <div className="item">
            <div>
                <input type="checkbox"
                    onChange={() => {
                        const newTodo: Partial<TodoData> = {
                            state: todo.state === 'done' ? 'tbd' : 'done'
                        }
                        editTodo(todo.id, newTodo)
                    }}
                    checked={todo.state === 'done'} />
                <span className={todo.state === 'done' ? "completed" : ''}>{todo.label}</span>
                <button>&times;</button>
            </div>

            <input className="text-input hidden"
                type="text" />
        </div>
    </>
}