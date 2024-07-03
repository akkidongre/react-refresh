import { ItemInterface } from "../types/ItemInterface";

export default function Item({item, onDeleteItem, onToggleItem}: { item: ItemInterface, onDeleteItem: (id: number) => void, onToggleItem: (id: number) => void }) {
    return (
        <li>
            <input type="checkbox" checked={item.packed} onChange={() => {onToggleItem(item.id)}} />
            <span style={{textDecoration: item.packed ? 'line-through' : 'none'}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    )
}