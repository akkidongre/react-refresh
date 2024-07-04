import { FriendInterface } from "../types/FriendInterface";
import Friend from "./Friend";

interface PropsInterface {
    friends: FriendInterface[],
    onSelectFriend: (friend: FriendInterface) => void,
    selectedFriend: FriendInterface | null
}

export default function FriendsList({friends, onSelectFriend, selectedFriend}: PropsInterface) {
    return (
        <ul>
            {friends.map(friend => <Friend key={friend.id} friend={friend} onSelectFriend={onSelectFriend} selectedFriend={selectedFriend} />)}
        </ul>
    )
}