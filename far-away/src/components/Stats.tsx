import { ItemInterface } from "../types/ItemInterface";

export default function Stats({items}: {items: ItemInterface[]}) {
    if (items.length === 0) {
        return <footer className="stats">
            <em>Add some items to your packing list</em>
        </footer>;
    }

    const packed = items.filter(item => item.packed).length;
    const total = items.length;
    const percentage = Math.round((packed / total) * 100);

    return (
        <footer className="stats">
            <em>
                {percentage === 100 ? "You got everything! Let's go" : `You have packed ${packed} out of ${total} items from your list (${percentage}%).`}
            </em>
        </footer>
    );
}