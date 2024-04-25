import React, { useReducer } from 'react';
import { useCreateOrderMutation } from '../state/pizzaApi';

const initialFormState = {
  fullName: '',
  size: '',
  '1': false, // Pepperoni
  '2': false, // Green Peppers
  '3': false, // Pineapple
  '4': false, // Mushrooms
  '5': false, // Ham
};

const CREATE_ORDER = 'CREATE_ORDER';
const TOGGLE_TOPPING = 'TOGGLE_TOPPING';
const RESET_FORM = 'RESET_FORM';


const reducer = (state, action) => {
  switch(action.type) {
    case CREATE_ORDER:
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    case TOGGLE_TOPPING:
      return { ...state, [action.payload]: !state[action.payload] };
    case RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [createOrder, { error: creationError, isLoading: creatingOrder }] = useCreateOrderMutation();

  const onNewOrder = evt => {
    evt.preventDefault();
    const { fullName, size, ...toppings } = state;
    const selectedToppings = Object.keys(toppings).filter(key => toppings[key]);

    createOrder({ fullName, size, toppings: selectedToppings })
      .unwrap()
      .then(response => {
        console.log('Order successful:', response);
        dispatch({ type: RESET_FORM });  // Reset form after successful POST
      })
      .catch(error => {
        console.error('Order failed:', error);
      });
  };

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    if (type === 'checkbox') {
      dispatch({ type: TOGGLE_TOPPING, payload: name });
    } else {
      dispatch({ type: CREATE_ORDER, payload: { name, value } });
    }
  };

  // Updated to use specific data-testid values
  const toppingsInfo = [
    { id: '1', label: 'Pepperoni', testId: 'checkPepperoni' },
    { id: '2', label: 'Green Peppers', testId: 'checkGreenpeppers' },
    { id: '3', label: 'Pineapple', testId: 'checkPineapple' },
    { id: '4', label: 'Mushrooms', testId: 'checkMushrooms' },
    { id: '5', label: 'Ham', testId: 'checkHam' },
  ];

  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress...</div>}
      {creationError && <div className='failure'>Order failed: {creationError.data.message}</div>}

      <div className="input-group">
        <label htmlFor="fullName">Full Name</label><br />
        <input
          data-testid="fullNameInput"
          id="fullName"
          name="fullName"
          placeholder="Type full name"
          type="text"
          value={state.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="size">Size</label><br />
        <select
          data-testid="sizeSelect"
          id="size"
          name="size"
          value={state.size}
          onChange={handleChange}
        >
          <option value="">----Choose size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="input-group">
        {toppingsInfo.map(topping => (
          <label key={topping.id}>
            <input
              data-testid={topping.testId}
              name={topping.id}
              type="checkbox"
              checked={state[topping.id]}
              onChange={handleChange}
            />
            {topping.label}<br />
          </label>
        ))}
      </div>

      <input data-testid="submit" type="submit" value="Submit Order" />
    </form>
  );
}