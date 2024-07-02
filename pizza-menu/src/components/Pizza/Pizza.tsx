import { PizzaInterface } from "../../types/PizzaInterface";

export default function Pizza(pizzaData: PizzaInterface) {
    // if (pizzaData.soldOut) {
    //     return null;
    // }

    return (
        <li className={`pizza ${pizzaData.soldOut ? 'sold-out' : ''}`}>
            <img src={pizzaData.photoName} alt={pizzaData.name} />
            <div>
                <h3>{pizzaData.name}</h3>
                <p>{pizzaData.ingredients}</p>
                <span>{pizzaData.soldOut ? 'SOLD OUT' : '$'+pizzaData.price }</span>
            </div>
        </li>
    );
}