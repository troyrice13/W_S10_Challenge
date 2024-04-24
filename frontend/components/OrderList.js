import React from 'react';
import { useGetOrdersQuery } from '../state/pizzaApi';

export default function OrderList() {
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error fetching orders: {error.toString()}</div>;
  if (!orders || orders.length === 0) return <div>No orders available.</div>;

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders.map(order => (
          <li key={order.id}>
            {order.customer} ordered a size {order.size} with {order.toppings?.length || 0} toppings
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => {
          const className = `button-filter${size === 'All' ? ' active' : ''}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
