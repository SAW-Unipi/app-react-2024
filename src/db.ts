import { useState } from "react";

export interface TodoData {
    id: string;
    label: string;
    state: 'done' | 'tbd';
}

export interface ListData {
    id: string;
    label: string;
    todos: TodoData[]
}

export class MockDB {
    static instance: MockDB

    static getInstance() {
        if (!MockDB.instance) {
            MockDB.instance = new MockDB();
        }

        return MockDB.instance;
    }

    private lists: ListData[] = [
        { id: '1', label: 'HTML', todos: [] },
        { id: '2', label: 'CSS', todos: [] },
        {
            id: '3', label: 'Esame Saw', todos: [
                { id: '1', label: 'Concordare il progetto', state: 'done' },
                { id: '2', label: 'Sviluppare il progetto', state: 'tbd' },
                { id: '3', label: 'Consegnare il progetto', state: 'tbd' },
                { id: '4', label: 'Sostenere esame', state: 'tbd' },
            ]
        },
        {
            id: '4', label: 'Git', todos: [
                { id: '1', label: 'git add', state: 'done' },
                { id: '2', label: 'git commit', state: 'done' },
                { id: '3', label: 'git push', state: 'tbd' },
                { id: '4', label: 'leave building', state: 'tbd' },
            ]
        },
    ];

    getLists() {
        return this.lists;
    }

    getList(id: string) {
        return this.lists.find((l) => l.id === id);
    }

    getTodos(listId: string) {
        return this.getList(listId)?.todos ?? [];
    }

    addList(label: string) {
        const l: ListData = {
            id: window.crypto.randomUUID(),
            label,
            todos: [],
        }
        this.lists = [...this.lists, l];
    }

    addTodo(listId: string, label: string) {
        const todo: TodoData = {
            id: window.crypto.randomUUID(),
            label,
            state: 'tbd',
        }
        
        this.lists = this.lists.map(l => l.id === listId
            ? { ...l, todos: [...l.todos, todo] }
            : l);
    }

    deleteList(id: string) {
        this.lists = this.lists.filter((l) => l.id !== id);
    }

    deleteTodo(idList: string, id: string) {
        this.lists = this.lists.map(l => l.id === idList
            ? { ...l, todos: l.todos.filter(t => t.id !== id) }
            : l);
    }

    editList(id: string, label: string) {
        this.lists = this.lists.map((l) => l.id === id
            ? { ...l, label }
            : l);
    }

    editTodo(idList: string, id: string, todo: Partial<TodoData>) {
        this.lists = this.lists.map(l => l.id === idList
            ? ({ ...l, todos: l.todos.map(t => t.id === id ? ({ ...t, ...todo }) : t) })
            : l);
    }
}

export function useLists() {
    const db = MockDB.getInstance();
    const [lists, setLists] = useState(db.getLists());

    const addList = (label: string) => {
        db.addList(label);
        setLists(db.getLists());
    }

    const deleteList = (id: string) => {
        db.deleteList(id);
        setLists(db.getLists());
    }

    const editList = (id: string, label: string) => {
        db.editList(id, label);
        setLists(db.getLists());
    }

    return {
        lists,
        addList,
        deleteList,
        editList,
    }
}