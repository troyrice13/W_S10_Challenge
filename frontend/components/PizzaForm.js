import React, { useReducer } from 'react';
import { useCreateOrderMutation } from '../state/pizzaApi';

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const CREATE_ORDER = 'CREATE_ORDER'
const TOGGLE_TOPPING = 'TOGGLE_TOPPING'

const reducer = (state, action) => {
  switch(action.type){
    case CREATE_ORDER: {
      const { name, value } = action.payload
      return { ...state, [name]: value };
    }
    case TOGGLE_TOPPING:
      return { ...state, [action.payload]: !state[action.payload] };

    default: return state
    
  }
}

export default function PizzaForm() {

const [state, dispatch] = useReducer(reducer, initialFormState)

const [createOrder, {
  error: creationError,
  isLoading: creatingOrder
}] = useCreateOrderMutation()

const onNewOrder = evt => {
  evt.preventDefault()
  const {fullName, size, ...toppings} = state
const selectedToppings = Object.keys(toppings).filter(key => toppings[key])

  createOrder({ fullName, size, toppings: selectedToppings })
    .unwrap()
    .then(res => {
      console.log('Order Successful', res)
    })
    .catch(err => {
      console.log('Order Failed', err)
    })
}

const onChange = evt => {
  const { name, type, value, checked } = evt.target;
  if (type === 'checkbox') {
    dispatch({ type: TOGGLE_TOPPING, payload: name })
  } else {
    dispatch({ type: CREATE_ORDER, payload: { name, value } })
  }
}



  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress...</div>}
      {creationError && <div className='failure'>Order failed: fullName is required</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
          data-testid="sizeSelect"
          id="size"
          name="size"
          value={state.size}
          onChange={onChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
