import { useNavigate } from "react-router-dom"
import { DeleteIcon, EditIcon, RightArrowIcon } from "./Icons"
import { ListData, useLists } from "./db";

export function ListsPage() {
    const { lists, addList } = useLists();

    return <>
        <h1>SAW TODO</h1>
        <div className="container">
            <input type="text"
                className="text-input"
                placeholder="Inserisci lista..." />

            {lists.map(l => <List list={l} />)}

        </div>
    </>
}

function List({ list }: { list: ListData }) {
    const navigate = useNavigate();
    const completedTodos = list.todos.filter(({ state }) => state === 'done');
    const percentage = `${(100 * completedTodos.length / list.todos.length) || 0}%`;

    return <div className="list">
        <div className="list-title">
            <span className="title">{list.label}</span>
            <div>
                <button className="btn">
                    <EditIcon />
                </button>
                <button className="btn" onClick={() => navigate(`/lists/${list.id}`)}>
                    <RightArrowIcon />
                </button>
                <button className="btn">
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