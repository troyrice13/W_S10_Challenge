import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '../state/pizzaApi';
import { setSizeFilter } from '../state/sizeFilterSlice';

export default function OrderList() {
  const { data: orders, error, isLoading } = useGetOrdersQuery();
  const sizeFilter = useSelector((state) => state.sizeFilter);
  const dispatch = useDispatch();

  const handleSizeFilterChange = (size) => {
    dispatch(setSizeFilter(size));
  };

  // Ensure this computation does not error out if orders is undefined
  const filteredOrders = orders && (sizeFilter === 'All' ? orders : orders.filter(order => order.size === sizeFilter));

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {isLoading && <div>Loading orders...</div>}
      {error && <div>Error fetching orders: {error.toString()}</div>}
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => {
          const className = `button-filter ${sizeFilter === size ? 'active' : ''}`;
          return (
            <button
              key={size}
              data-testid={`filterBtn${size}`}
              className={className}
              onClick={() => handleSizeFilterChange(size)}
            >
              {size}
            </button>
          );
        })}
      </div>
      {!isLoading && !error && filteredOrders && (
        <ol>
          {filteredOrders.map(order => (
            <li key={order.id}>
              {order.customer} ordered a size {order.size} with {order.toppings?.length || 'no'} toppings
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
