import React from "react";
import { useDispatch } from "react-redux";
import { setOrderToEdit } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { useDeleteOrderMutation } from "../../redux/OrdersQueries";

const MyOrderCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = () => {
    dispatch(setOrderToEdit(item));
    navigate("/edit-order");
  };

  const handleDeleteOrder = () => {
    deleteOrder(item.id);
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <h1 className="font-titleFont font-semibold">{item.order_number}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          {item.product_name}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <p>{item.quantity}</p>
        </div>
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ${item.total_price}
        </div>
        <button onClick={handleEditOrder}>Edit</button>
        <button onClick={handleDeleteOrder}>Delete</button>
      </div>
    </div>
  );
};

export default MyOrderCard;
