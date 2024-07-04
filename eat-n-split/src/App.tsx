import { useState } from "react";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import FriendsList from "./components/FriendsList";
import Button from "./components/UI/Button";
import { FriendInterface } from "./types/FriendInterface";

const initialFriends: FriendInterface[] = [
  {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
  },
  {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
  },
  {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendInterface | null>(null);
  
  const handleShowAddFriend = () => {
    setShowAddFriend(show => !show);
  }

  const handleAddFriend = (newFriend: FriendInterface) => {
    setFriends((prevFriends) => [...prevFriends, newFriend]);
    setShowAddFriend(false);
  }

  const handleSelectFriend = (friend: FriendInterface) => {
    setSelectedFriend(selected => selected?.id === friend.id ? null : friend);
  }

  const handleSplitBill = (value: number) => {
    setFriends((prevFriends) => prevFriends.map(friend => {
      if (friend.id === selectedFriend!.id) {
        return {
          ...friend,
          balance: friend.balance + value
        }
      }

      return friend;
    }));

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelectFriend={handleSelectFriend} selectedFriend={selectedFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add Friend'}</Button>
      </div>

      {selectedFriend && <FormSplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />}
    </div>
  );
}