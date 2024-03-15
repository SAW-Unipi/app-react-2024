import { useNavigate } from "react-router-dom"
import { DeleteIcon, EditIcon, RightArrowIcon } from "./Icons"
import { ListData, useLists } from "./db";
import { useRef, useState } from "react";
import { EditableText } from "./EditableText";

export function ListsPage() {
    const { lists, addList, deleteList, editList } = useLists();

    return <>
        <h1>SAW TODO</h1>
        <div className="container">
            <EditableText
                editing={true}
                placeHolder={'Inserisci lista...'}
                defaultValue={''}
                onCancel={() => { }}
                onChange={(v) => {
                    addList(v);
                }}
            />

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

    return <div className="list" >
        <div className="list-title">
            <EditableText
                editing={editing}
                onCancel={() => setEditing(false)}
                onChange={(v) => {
                    editList(list.id, v);
                    setEditing(false);
                }}
                defaultValue={list.label} />
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