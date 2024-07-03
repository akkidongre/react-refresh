import { ChangeEvent, useState } from "react";
import { ItemInterface } from "../types/ItemInterface";
import Item from "./Item";

interface PropsInterface { 
    items: ItemInterface[], 
    onDeleteItem: (id: number) => void, 
    onToggleItemPacked: (id: number) => void,
    onClear: () => void
}

export default function PackingList({ items, onDeleteItem, onToggleItemPacked, onClear }: PropsInterface) {
    const [sortBy, setSortBy] = useState("input");

    const handleSortByChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortBy(value);
    }

    let sortedItems = [...items];
    if (sortBy === 'description') {
        sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === 'packed') {
        sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    return (
        <div className="list">
            <ul>
                {sortedItems.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItemPacked} />)}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={handleSortByChange}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={onClear}>Clear list</button>
            </div>
        </div>
    );
}