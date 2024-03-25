import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faDna, faWheatAwn, faDroplet } from "@fortawesome/free-solid-svg-icons";

const MealsContainer = ({ nutritionItems, editItemFunction, deleteItemFunction, updateItemQuantity }) => {
  return (
    <div className="meals-container">
      <div className="foods-title">FOODS</div>
      {nutritionItems.map((item) => (
        <div key={item.id} className="meal">
          <div className="meal-info">
            <div className="meal-top-section">
              <h2 className="meal-title">{item.name} - </h2>
              <li>Calories: {item.calories * item.quantity}</li>
            </div>
            <div className="meal-bottom-section">
              <ul className="meal-nutrients">
                <li>
                  <FontAwesomeIcon icon={faDna} className="icon-warning" />
                  Protein: {item.protein * item.quantity}g
                </li>
                <li>
                  <FontAwesomeIcon icon={faWheatAwn} className="icon-warning" />
                  Carbs: {item.carbs * item.quantity}g
                </li>
                <li>
                  <FontAwesomeIcon icon={faDroplet} className="icon-warning" />
                  Fat: {item.fat * item.quantity}g
                </li>
              </ul>
            </div>
          </div>
          <div className="meal-edit-buttons">
            <button className=".meal-edit-btn" onClick={() => editItemFunction(item)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className=".meal-edit-btn" onClick={() => deleteItemFunction(item.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealsContainer;