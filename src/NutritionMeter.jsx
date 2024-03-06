import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faUtensils,
  faPlus,
  faMinus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./NutritionMeter.css";

const NutritionMeter = () => {
  const defaultItemsDisplayed = [
    {
      id: 1,
      name: "Apple",
      calories: 52,
      protein: 0.26,
      carbs: 14,
      fat: 1,
      quantity: 1,
    },
    {
      id: 2,
      name: "Banana",
      calories: 89,
      protein: 1.09,
      carbs: 23,
      fat: 5,
      quantity: 1,
    },
    {
      id: 3,
      name: "Grapes",
      calories: 40,
      protein: 0.2,
      carbs: 20,
      fat: 2,
      quantity: 1,
    },
    {
      id: 4,
      name: "Orange",
      calories: 35,
      protein: 0.15,
      carbs: 25,
      fat: 4,
      quantity: 1,
    },
  ];

  const [nutritionItems, setNutritionItems] = useState(defaultItemsDisplayed);
  const [newItem, setNewItem] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [editItem, setEditItem] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState(2500);

  useEffect(() => {
    const calculateTotalCalories = nutritionItems.reduce(
      (total, item) => total + parseFloat(item.calories) * item.quantity,
      0
    );

    setTotalCalories(calculateTotalCalories);

    if (calculateTotalCalories > calorieGoal) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }

    caloriesProgress();

  }, [nutritionItems, totalCalories]);

  const caloriesLeft = () => {
    const remainingCalories = calorieGoal - totalCalories;

    return remainingCalories >= 0 ? remainingCalories : 0;
  };

  const caloriesProgress = () => {
    let totalCaloriesPercentage = ((totalCalories / calorieGoal) * 100).toFixed(0);

    const root = document.documentElement;
    root.style.setProperty("--progress-value", totalCaloriesPercentage);
  };


  const addNutritionItem = () => {
    if (
      newItem.name &&
      newItem.calories >= 0 &&
      newItem.protein >= 0 &&
      newItem.carbs >= 0 &&
      newItem.fat >= 0
    ) {
      setNutritionItems([...nutritionItems, { ...newItem, id: Date.now(), quantity: 1 }]);
      setNewItem({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
      

      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const removeAllItems = () => {
    setNutritionItems([]);
    
  };

  const editItemFunction = (item) => {
    setEditItem(item.id);
    setNewItem({ ...item });
  };

  const updateItemFunction = () => {
    if (
      newItem.name &&
      newItem.calories >= 0 &&
      newItem.protein >= 0 &&
      newItem.carbs >= 0 &&
      newItem.fat >= 0
    ) {
      const updatedItems = nutritionItems.map((item) => (item.id === newItem.id ? newItem : item));
      setNutritionItems(updatedItems);
      setNewItem({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
      });
      setEditItem(null);
      setInputError(false);
      
    } else {
      setInputError(true);
    }
  };

  const deleteItemFunction = (id) => {
    const updatedItems = nutritionItems.filter((item) => item.id !== id);
    setNutritionItems(updatedItems);
  };

  const inputErrorStyle = {
    borderColor: "red",
  };

  const updateItemQuantity = (id, change) => {
    const updatedItems = nutritionItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
    );
    setNutritionItems(updatedItems);
  };

  const totalProtein = () => {
    return nutritionItems.reduce(
      (total, item) => total + parseFloat(item.protein) * item.quantity,
      0
    );
  };

  const totalCarbs = () => {
    return nutritionItems.reduce(
      (total, item) => total + parseFloat(item.carbs) * item.quantity,
      0
    );
  };

  const totalFat = () => {
    return nutritionItems.reduce((total, item) => total + parseFloat(item.fat) * item.quantity, 0);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="Title">TODAY</h1>
        {showWarning && (
          <div className="warning">
            <FontAwesomeIcon icon={faTimes} className="icon-warning" />
            Total calories exceed recommended limit ({calorieGoal} calories)!
          </div>
        )}
        <div className="sides">
          <div className="left">
            <div className="nutrients-total">
              <div className="calorie-goal">
                <div className="progress-text">
                  <span className="bold-text">{caloriesLeft()}</span>
                  <span className="regular-text">CALS LEFT</span>
                </div>
              </div>
              <div className="calorie-summary">
                <p>Calories Consumed: {totalCalories}</p>
                <p>
                  Calories Goal: {calorieGoal}{" "}
                  <span id="nutrition-icon">
                    <FontAwesomeIcon icon={faUtensils} size="lg" />
                  </span>
                </p>
              </div>
              <div className="macro-list">
                <div className="macro-item">
                  <div className="name">CARB</div>
                  <div className="progress">
                    <progress max={100} value={30}></progress>
                  </div>
                  <div className="amount-left">{totalCarbs()}g</div>
                </div>
                <div className="macro-item">
                  <div className="name">PROTEIN</div>
                  <div className="progress">
                    <progress max={100} value={30}></progress>
                  </div>
                  <div className="amount-left">{totalProtein()}g</div>
                </div>
                <div className="macro-item">
                  <div className="name">Fat</div>
                  <div className="progress">
                    <progress max={100} value={30}></progress>
                  </div>
                  <div className="amount-left">{totalFat()}g</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
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
                        <li>Protein: {item.protein * item.quantity}g</li>
                        <li>Carbs: {item.carbs * item.quantity}g</li>
                        <li>Fat: {item.fat * item.quantity}g</li>
                        {/* <li className="meal-buttons">
                        <button className="meal-btn" onClick={() => updateItemQuantity(item.id, 1)}>
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <span className="meal-quantity">{item.quantity}</span>
                        <button
                          className="meal-btn"
                          onClick={() => updateItemQuantity(item.id, -1)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </li> */}
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
            <div className="form-container">
              <div className="form-inputs">
                <div>
                  <input
                    type="text"
                    placeholder="Item Name"
                    className={`item${inputError && !newItem.name ? "input-error" : ""}`}
                    style={inputError && !newItem.name ? inputErrorStyle : {}}
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Calories"
                    className={`item ${inputError && newItem.calories < 0 ? "input-error" : ""}`}
                    style={inputError && newItem.calories < 0 ? inputErrorStyle : {}}
                    value={newItem.calories}
                    onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Protein (g)"
                    className={`item ${inputError && newItem.protein < 0 ? "input-error" : ""}`}
                    style={inputError && newItem.protein < 0 ? inputErrorStyle : {}}
                    value={newItem.protein}
                    onChange={(e) => setNewItem({ ...newItem, protein: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Carbs (g)"
                    className={`item ${inputError && newItem.carbs < 0 ? "input-error" : ""}`}
                    style={inputError && newItem.carbs < 0 ? inputErrorStyle : {}}
                    value={newItem.carbs}
                    onChange={(e) => setNewItem({ ...newItem, carbs: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Fat (g)"
                    className={`item ${inputError && newItem.fat < 0 ? "input-error" : ""}`}
                    style={inputError && newItem.fat < 0 ? inputErrorStyle : {}}
                    value={newItem.fat}
                    onChange={(e) => setNewItem({ ...newItem, fat: e.target.value })}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1"></div>
              </div>
              <div className="form-buttons">
                {editItem ? (
                  <button className="btn" onClick={updateItemFunction}>
                    Update Item
                  </button>
                ) : (
                  <button className="btn" onClick={addNutritionItem}>
                    Add Item
                  </button>
                )}
                <button className="btn" onClick={removeAllItems}>
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionMeter;
