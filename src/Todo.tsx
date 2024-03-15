import { useLoaderData, useNavigate } from "react-router-dom";
import { ListData, MockDB, TodoData } from "./db";
import React, { useEffect, useRef, useState } from "react";
import { LeftArrowIcon } from "./Icons";
import { EditableText } from "./EditableText";

export function TodoPage() {
    const id = useLoaderData() as string;
    const [db] = useState(MockDB.getInstance());
    const [list, setList] = useState(db.getList(id));
    const [todos, setTodos] = useState<TodoData[]>([]);
    const nav = useNavigate();
    const text = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTodos(db.getTodos(id) ?? [])
    }, [list])

    const onKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && text.current!.value !== '') {
            // add Todo
            db.addTodo(id, text.current!.value);
            setList(db.getList(id));
            text.current!.value = '';
            return;
        }

        if (e.key === 'Escape') {
            text.current!.value = '';
            return;
        }

    }

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
                onKeyUp={onKeyUp}
                ref={text}
                className="text-input"
                placeholder="Inserisci todo..." />

            <section className="todos">
                <ul>
                    {todos.map(t =>
                        <li key={t.id}>
                            <Todo
                                deleteTodo={(todoId) => {
                                    db.deleteTodo(list!.id, todoId);
                                    setList(db.getList(id));
                                }}
                                editTodo={(todoId, nt: Partial<TodoData>) => {
                                    db.editTodo(id, todoId, nt);
                                    setList(db.getList(id));
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
    deleteTodo: (id: string) => void;
}

function Todo({ listId, todo, editTodo, deleteTodo }: TodoProps) {
    const [editing, setEditing] = useState(false);

    return <>
        <div className="item">
            <div onDoubleClick={() => setEditing(true)}>
                <input type="checkbox"
                    onChange={() => {
                        const newTodo: Partial<TodoData> = {
                            state: todo.state === 'done' ? 'tbd' : 'done'
                        }
                        editTodo(todo.id, newTodo)
                    }}
                    checked={todo.state === 'done'} />
                <EditableText
                    classes={todo.state === 'done' ? 'completed' : ''}
                    editing={editing}
                    defaultValue={todo.label}
                    onCancel={() => setEditing(false)}
                    onChange={(v) => {
                        editTodo(todo.id, { label: v })
                        setEditing(false);
                    }}
                />

                <button onClick={() => deleteTodo(todo.id)}>&times;</button>
            </div>
        </div>
    </>
}