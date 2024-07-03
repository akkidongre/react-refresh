import { useState } from "react";
import Form from "./components/Form";
import Logo from "./components/Logo";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { ItemInterface } from "./types/ItemInterface";

export default function App() {
  const [items, setItems] = useState<ItemInterface[]>([]);

  const handleAddItem = (item: ItemInterface) => {
    setItems(prevItems => [...prevItems, item]);
  }

  const handleDeleteItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }

  const handleToggleItemPacked = (id: number) => {
    setItems(prevItems => prevItems.map(item => {
      if (id === item.id) {
        return {...item, packed: !item.packed};
      }
      return item;
    }));
  }

  const clearItems = () => {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItemPacked={handleToggleItemPacked} onClear={clearItems} />
      <Stats items={items} />
    </div>
  )
}