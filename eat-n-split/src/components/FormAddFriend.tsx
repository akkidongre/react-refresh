import { FormEvent, useState } from "react";
import Button from "./UI/Button";
import { FriendInterface } from "../types/FriendInterface";

export default function FormAddFriend({onAddFriend}: {onAddFriend: (newFriend: FriendInterface) => void}) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('https://i.pravatar.cc/48?u=');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !image) {
            return;
        }

        const id = Date.now();

        const newFriend: FriendInterface = {
            id,
            name,
            image: image+id,
            balance: 0
        };

        onAddFriend(newFriend);

        setName('');
        setImage('');
    }

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label htmlFor="friendName">🧍🏻Friend name</label>
            <input type="text" name="friendName" value={name} onChange={(e) => setName(e.target.value)}/>

            <label htmlFor="imageUrl">🌁Image url</label>
            <input type="text" name="imageUrl" value={image} onChange={(e) => setImage(e.target.value)}/>

            <Button>Add</Button>
        </form>
    )
}