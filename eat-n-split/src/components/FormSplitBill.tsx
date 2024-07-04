import { FormEvent, useState } from "react";
import { FriendInterface } from "../types/FriendInterface";
import Button from "./UI/Button";

export default function FormSplitBill({friend, onSplitBill}: {friend: FriendInterface, onSplitBill: (value: number) => void}) {
    const [bill, setBill] = useState<number | string>('');
    const [paidByUser, setPaidByUser] = useState<number | string>('');
    const paidByFriend = +bill - +paidByUser;
    const [whoIsPaying, setWhoIsPaying] = useState('user');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!bill || +paidByUser > +bill) {
            return;
        }

        onSplitBill(whoIsPaying === 'user' ? +paidByFriend : +paidByUser);
    }
    

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {friend.name}</h2>

            <label htmlFor="billValue">Bill Value</label>
            <input type="number" name="billValue" value={bill} onChange={(e) => setBill(Number(e.target.value))} />

            <label htmlFor="yourExpense">Your Expense</label>
            <input type="number" name="yourExpense" value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value))} min={0} />

            <label htmlFor="friendExpense">{friend.name}'s Expense</label>
            <input type="number" name="friendExpense" value={paidByFriend} disabled />

            <label htmlFor="payee">Who is paying the bill</label>
            <select name="payee" value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
                <option value="user">You</option>
                <option value="friend">{friend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    )
}