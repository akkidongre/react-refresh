import { ChangeEvent, FormEvent, useState } from "react"
import { ItemInterface } from "../types/ItemInterface";

export default function Form({onAddItem}: {onAddItem: (item: ItemInterface) => void}) {
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState("");

    const handleSelectQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
        setQuantity(+e.target.value);
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!description) {
            return;
        }

        const newItem: ItemInterface = {
            description, 
            quantity,
            packed: false,
            id: Date.now()
        };

        onAddItem(newItem);
        
        setQuantity(1);
        setDescription('');
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select value={quantity} onChange={handleSelectQuantity}>
                {Array.from({ length: 20 }).map((_, i) => i + 1).map(quantity => <option key={quantity} value={quantity}>{quantity}</option>)}
            </select>
            <input type="text" placeholder="Item..." value={description} onChange={handleDescriptionChange} />
            <button>Add</button>
        </form>
    )
}