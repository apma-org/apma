import React, {useState} from "react";

export const Expenses = () => {
  const [expenses, setExpenses] = useState([{item: 1, cost: 40}, {item: 2, cost: 20}, {item: 3, cost: 60}, {item: 4, cost: 200}]);

  return (
    <div>
      Expenses
      {expenses.map((e) => {
        <div> {e.item}:{e.cost} </div> 
      })}
    </div>
  );
};

