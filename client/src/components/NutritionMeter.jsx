import React, { useState, useEffect, useContext } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faTimes,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import "./NutritionMeter.css";
import MealsContainer from "./MealsContainer";
import Modal from "./modal/Modal";
import { getCurrentYear, monthToNum, roundTwoDecimalPlaces } from "./utils/Utils";

const NutritionMeter = ({selectedDay, dowTitle}) => {
  const defaultItemsDisplayed = [
    {
      id: 1,
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      quantity: 0,
    },
  ];

  const [newItem, setNewItem] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    quantity: 1,
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editItem) {
      updateItemFunction();
    } else {
      addNutritionItem();
    }
  };

  const [userData, setUserData] = useState(0);
  const [editItem, setEditItem] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  //get user data from /profile and set calorieGoal to the user's calorieGoal
  useEffect(() => {
    axios
      .get("/profile")
      .then(({ data }) => {
        setCalorieGoal(data.calorieGoal);
        setUserData(data.id);
        getAllFoodsForUser(data.id, selectedDay, monthToNum(dowTitle));
      })
      .catch(() => {
        setCalorieGoal(0);
      });
  }, [selectedDay]);

  const [nutritionItems, setNutritionItems] = useState(defaultItemsDisplayed);

  const handleClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setNewItem({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      quantity: 1,
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
    // if (calculateTotalCalories > calorieGoal) {
    //   setShowWarning(true);
    // } else {
    //   setShowWarning(false);
    // }

    caloriesProgress();
  }, [nutritionItems, totalCalories]);

  const caloriesLeft = () => {
    const remainingCalories = calorieGoal - totalCalories;

    return remainingCalories >= 0 ? remainingCalories : 0;
  };

  const caloriesProgress = () => {
    return (totalCalories / calorieGoal) * 100;
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

  const getAllFoodsForUser = async (userData, day, month) => {
    const dayNumber = day.split(" ")[1];
    const date = `${getCurrentYear()}-${month}-${dayNumber}`;
    const { data } = await axios.post("/getAllFoods", { user_id: userData, createdAt: date});

    const newItems = data.map((item) => ({
      id: item._id,
      name: item.name,
      calories: item.calorie,
      protein: item.protein,
      carbs: item.carb,
      fat: item.fat,
      quantity: item.quantity,
    }));

    // setNutritionItems([...nutritionItems, ...newItems]);
    setNutritionItems(newItems);
  };

  const addNutritionItem = async () => {
    if (
      newItem.name &&
      newItem.calories >= 0 &&
      newItem.protein >= 0 &&
      newItem.carbs >= 0 &&
      newItem.fat >= 0
    ) {
      try {
        const { data } = await axios.post("/addFood", {
          name: newItem.name.toLowerCase(),
          quantity: newItem.quantity,
          calorie: newItem.calories,
          protein: newItem.protein,
          carb: newItem.carbs,
          fat: newItem.fat,
          createdAt: new Date(),
          user_id: userData,
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          console.log("Successfully added food");
        }
      } catch (error) {
        console.log(error);
      }
      // setNutritionItems([...nutritionItems, { ...newItem, id: Date.now() }]);
      getAllFoodsForUser(userData);
      setNewItem(() => ({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        quantity: 1,
      })); //clear input fields

      setInputError(false);
      setIsOpen(false);
    } else {
      setInputError(true);
    }
  };

  const removeAllItems = () => {
    setIsOpen(false);
    setNutritionItems([]);
    setNewItem({
      name: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      quantity: 1,
    });
  };

  const editItemFunction = (item) => {
    setIsOpen(true);
    setEditItem(item.id);
    setNewItem({ ...item });
  };

  const updateItemFunction = async () => {
    if (
      newItem.name &&
      newItem.calories >= 0 &&
      newItem.protein >= 0 &&
      newItem.carbs >= 0 &&
      newItem.fat >= 0
    ) {
      const fetchItem = nutritionItems.find((item) => item.id === editItem);
      try {
        const { data } = await axios.post("/updateFood", {
          _id: fetchItem.id,
          name: newItem.name.toLowerCase(),
          quantity: newItem.quantity,
          calorie: newItem.calories,
          protein: newItem.protein,
          carb: newItem.carbs,
          fat: newItem.fat,
        });
        if (data.error) {
          toast.error(data.error);
        } else {
          console.log("Successfully updated food");
        }
      } catch (error) {
        console.log(error);
      }

      setNewItem({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        quantity: 1,
      });
      getAllFoodsForUser(userData);

      setEditItem(null);
      setInputError(false);
      setIsOpen(false);
    } else {
      setInputError(true);
    }
  };

  // const updateItemFunction = () => {
  //   if (
  //     newItem.name &&
  //     newItem.calories >= 0 &&
  //     newItem.protein >= 0 &&
  //     newItem.carbs >= 0 &&
  //     newItem.fat >= 0
  //   ) {
  //     const updatedItems = nutritionItems.map((item) => (item.id === newItem.id ? newItem : item));
  //     setNutritionItems(updatedItems);
  //     setNewItem({
  //       name: "",
  //       calories: "",
  //       protein: "",
  //       carbs: "",
  //       fat: "",
  //       quantity: 1,
  //     });
  //     setEditItem(null);
  //     setInputError(false);
  //     setIsOpen(false);
  //   } else {
  //     setInputError(true);
  //   }
  // };

  const deleteItemFunction = async (id) => {
    try {
      const { data } = await axios.post("/deleteFood", { _id: id });
      if (data.error) {
        toast.error(data.error);
      } else {
        console.log("Successfully deleted food");
      }
    } catch (error) {
      console.log(error);
    }

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
      (total, item) => roundTwoDecimalPlaces(total + parseFloat(item.protein) * item.quantity),
      0
    );
  };

  const totalCarbs = () => {
    return nutritionItems.reduce(
      (total, item) => roundTwoDecimalPlaces(total + parseFloat(item.carbs) * item.quantity),
      0
    );
  };

  const totalFat = () => {
    return nutritionItems.reduce(
      (total, item) => roundTwoDecimalPlaces(total + parseFloat(item.fat) * item.quantity),
      0
    );
  };

  return (
    <div className="wrapper">
      {isOpen && (
        <form onSubmit={handleSubmit}>
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
                    placeholder="Name"
                    className={`item${inputError && !newItem.name ? "input-error" : ""}`}
                    style={inputError && !newItem.name ? inputErrorStyle : {}}
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                  <div className="quantityInfo">
                    <button
                      className="quantity-Add"
                      onClick={(e) => {
                        e.preventDefault();
                        setNewItem((prevItem) => ({
                          ...prevItem,
                          quantity: prevItem.quantity + 1,
                        }));
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <span className="quantity-Num">{newItem.quantity}</span>
                    <button
                      className="quantity-Take"
                      onClick={(e) => {
                        e.preventDefault();
                        setNewItem((prevItem) => ({
                          ...prevItem,
                          quantity: Math.max(prevItem.quantity - 1, 1),
                        }));
                      }}
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
                    className={`item ${inputError && newItem.calories < 0 ? "input-error" : ""}`}
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
                  <button type="submit" className="btn">
                    Update Item
                  </button>
                ) : (
                  <button type="submit" className="btn">
                    Add Item
                  </button>
                )}
                <button className="btn" onClick={removeAllItems}>
                  Clear All
                </button>
              </div>
            </div>
          </Modal>
        </form>
      )}
      <div className="container">
        <h1 className="Title">{`${selectedDay} ${dowTitle}`}</h1>
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
                  <div className="name">FAT</div>
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
          </div>
        </div>
        <button className="btn-addFood" onClick={() => setIsOpen(true)}>
          ADD FOOD
        </button>
      </div>
    </div>
  );
};

export default NutritionMeter;
