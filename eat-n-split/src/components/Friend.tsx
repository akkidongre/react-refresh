import { FriendInterface } from "../types/FriendInterface";
import Button from "./UI/Button";

interface PropsInterface {
    friend: FriendInterface,
    onSelectFriend: (friend: FriendInterface) => void,
    selectedFriend: FriendInterface | null
}

export default function Friend({friend, onSelectFriend, selectedFriend}: PropsInterface) {
    const isSelected = selectedFriend?.id === friend.id;

    return (
        <li className={isSelected ? 'selected' : ''}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
            {friend.balance > 0 && <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}

            <Button onClick={() => onSelectFriend(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
        </li>
    )
}