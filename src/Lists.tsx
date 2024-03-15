import { useNavigate } from "react-router-dom"
import { DeleteIcon, EditIcon, RightArrowIcon } from "./Icons"
import { ListData, useLists } from "./db";
import { useRef, useState } from "react";

export function ListsPage() {
    const { lists, addList, deleteList, editList } = useLists();
    const text = useRef<HTMLInputElement>(null);

    const onKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addList(text.current!.value);
            text.current!.value = '';
            return;
        }

        if (e.key === 'Escape') {
            text.current!.value = '';
            return;
        }
    }

    return <>
        <h1>SAW TODO</h1>
        <div className="container">
            <input type="text"
                className="text-input"
                ref={text}
                onKeyUp={onKeyUp}
                placeholder="Inserisci lista..." />

            {lists.map(l => <List key={l.id} list={l} editList={editList} deleteList={deleteList} />)}

        </div>
    </>
}

interface ListProps {
    list: ListData;
    deleteList: (id: string) => void;
    editList: (id: string, label: string) => void;
}


function List({ list, deleteList, editList }: ListProps) {
    const navigate = useNavigate();
    const completedTodos = list.todos.filter(({ state }) => state === 'done');
    const percentage = `${(100 * completedTodos.length / list.todos.length) || 0}%`;
    const [editing, setEditing] = useState(false);
    const text = useRef<HTMLInputElement>(null);

    const onKeyUp = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && text.current!.value !== '') {
            editList(list.id, text.current!.value);
            setEditing(false);
            return;
        }

        if (e.key === 'Escape') {
            setEditing(false);
            return;
        }
    }

    return <div className="list" >
        <div className="list-title">
            {editing
                ? <input ref={text} onKeyUp={onKeyUp} type="text" defaultValue={list.label} className="text-input" />
                : <span className="title">{list.label}</span>
            }
            <div>
                <button className="btn" onClick={() => { setEditing(true) }}>
                    <EditIcon />
                </button>
                <button className="btn" onClick={() => navigate(`/lists/${list.id}`)}>
                    <RightArrowIcon />
                </button>
                <button className="btn" onClick={() => { deleteList(list.id) }}>
                    <DeleteIcon />
                </button>
            </div>
        </div>

        <div className="bar">
            <span className="percentage"
                style={{ width: percentage }}
                data-value="90%">
                <span className="tooltip">{percentage}</span>
            </span>
        </div>
    </div >
}