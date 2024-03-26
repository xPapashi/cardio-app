import React, { useState, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faUtensils,
  faPlus,
  faMinus,
  faTimes,
  faWheatAwn,
  faDna,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import "./NutritionMeter.css";
import Modal from "./modal/Modal";
import MealsContainer from "./MealsContainer";

const NutritionMeter = ({ selectedDay }) => {
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
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setNewItem({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    });
    setEditItem(null);
    setInputError(false);
  };

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
    return totalCaloriesPercentage;

    // const root = document.documentElement;
    // root.style.setProperty("--progress-value", totalCaloriesPercentage);
  };

  const calculateTotalCarb = () => {
    //2500 calories multiply by 55% average daily carb intake
    //343.75 divied by 4 to get carb grams
    const carbCalories = calorieGoal * 0.55;
    const totalCarbGram = (carbCalories / 4).toFixed(0);

    return totalCarbGram;
  };

  const calculateTotalProtein = () => {
    //2500 calories multiply by 22.5% average daily protein intake
    //562.5 divide by 4 to get protein grams
    const proteinCalories = calorieGoal * 0.225;
    const totalProtienGram = (proteinCalories / 4).toFixed(1);

    return totalProtienGram;
  };

  const calculateTotalFat = () => {
    //2500 calories multiply by 27.5% average daily fat intake
    //687.5 divide by 9 to get fat grams
    const fatCalories = calorieGoal * 0.275;
    const totalFatGram = (fatCalories / 9).toFixed(0);

    return totalFatGram;
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
      setIsOpen(false);
    } else {
      setInputError(true);
    }
  };

  const removeAllItems = () => {
    setIsOpen(false);
    setNutritionItems([]);
  };

  const editItemFunction = (item) => {
    setIsOpen(true);
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
      setIsOpen(false);
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
        <h1 className="Title">{selectedDay}</h1>
        {showWarning && (
          <div className="warning">
            <FontAwesomeIcon icon={faTimes} className="icon-warning" />
            Total calories exceed recommended limit ({calorieGoal} calories)!
          </div>
        )}
        <div className="sides">
          <div className="left">
            <div className="nutrients-total">
              <div className="calorie-goal" style={{ width: 180, height: 180 }}>
                <CircularProgressbarWithChildren
                  value={caloriesProgress()}
                  strokeWidth={6}
                  styles={buildStyles({
                    textSize: "14px",
                    pathColor: `#646cff`,
                    textColor: "#131413",
                    trailColor: "#eceaea",
                  })}
                >
                  <span className="bold-text">{caloriesLeft()}</span>
                  <span className="regular-text">CALS LEFT</span>
                </CircularProgressbarWithChildren>
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
                    <progress max={calculateTotalCarb()} value={totalCarbs()}></progress>
                  </div>
                  <div className="amount-left">{totalCarbs()}g</div>
                </div>
                <div className="macro-item">
                  <div className="name">PROTEIN</div>
                  <div className="progress">
                    <progress max={calculateTotalProtein()} value={totalProtein()}></progress>
                  </div>
                  <div className="amount-left">{totalProtein()}g</div>
                </div>
                <div className="macro-item">
                  <div className="name">Fat</div>
                  <div className="progress">
                    <progress max={calculateTotalFat()} value={totalFat()}></progress>
                  </div>
                  <div className="amount-left">{totalFat()}g</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <MealsContainer
              nutritionItems={nutritionItems}
              editItemFunction={editItemFunction}
              deleteItemFunction={deleteItemFunction}
              updateItemQuantity={updateItemQuantity}
            />
            {isOpen && (
              <Modal handleClose={handleClose}>
                <div className="form-container">
                  <div className="form-title">
                    <h2>Log Foods</h2>
                    <button type="button" onClick={handleClose}>
                      X
                    </button>
                  </div>
                  <div className="food-name">
                    <label htmlFor="item">Food Name</label>
                    <div className="split">
                      <input
                        type="text"
                        placeholder="Item Name"
                        className={`item${inputError && !newItem.name ? "input-error" : ""}`}
                        style={inputError && !newItem.name ? inputErrorStyle : {}}
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      />
                      <div className="quantityInfo">
                        <button
                          className="quantity-Add"
                          onClick={() =>
                            setNewItem((prevItem) => ({
                              ...prevItem,
                              quantity: prevItem.quantity + 1,
                            }))
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <span className="quantity-Num">{newItem.quantity}</span>
                        <button
                          className="quantity-Take"
                          onClick={() =>
                            setNewItem((prevItem) => ({
                              ...prevItem,
                              quantity: Math.max(prevItem.quantity - 1, 1),
                            }))
                          }
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-inputs">
                    <div>
                      <label htmlFor="item">Calories (kcal)</label>
                      <input
                        type="number"
                        placeholder="Calories"
                        className={`item ${
                          inputError && newItem.calories < 0 ? "input-error" : ""
                        }`}
                        style={inputError && newItem.calories < 0 ? inputErrorStyle : {}}
                        value={newItem.calories}
                        onChange={(e) => setNewItem({ ...newItem, calories: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="item">Protein (g)</label>
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
                      <label htmlFor="item">Carbohydrates (g)</label>
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
                      <label htmlFor="item">Fats (g)</label>
                      <input
                        type="number"
                        placeholder="Fat (g)"
                        className={`item ${inputError && newItem.fat < 0 ? "input-error" : ""}`}
                        style={inputError && newItem.fat < 0 ? inputErrorStyle : {}}
                        value={newItem.fat}
                        onChange={(e) => setNewItem({ ...newItem, fat: e.target.value })}
                      />
                    </div>
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
              </Modal>
            )}
          </div>
        </div>
        <button onClick={() => setIsOpen(true)}>Add Food</button>
      </div>
    </div>
  );
};

export default NutritionMeter;
