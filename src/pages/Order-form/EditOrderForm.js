import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../redux/ProductsQueries";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateOrderMutation } from "../../redux/OrdersQueries";

const EditOrderform = (props) => {
  const dispatch = useDispatch();
  const orderToEdit = useSelector((state) => state.product.EditOrder); // Select the product to edit from the Redux store

  console.log('orderToEdit: ',orderToEdit)

  // ============= Initial State Start here =============
  const [paymentMethod, setPaymentMethod] = useState(orderToEdit.payment_method || "");
  const [shippingAddress, setShippingAddress] = useState(orderToEdit.shipping_address || "");
  const [quantity, setQantity] = useState(orderToEdit.quantity || "");

  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errPaymentMethod, setErrPaymentMethod] = useState("");
  const [errShippingAddress, setErrShippingAddress] = useState("");
  const [errQuantity, setErrQuantity] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");

  const [updateOrder] = useUpdateOrderMutation();

  const navigate = useNavigate();

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    setErrPaymentMethod("");
  };

  const handleShippingAddress = (e) => {
    setShippingAddress(e.target.value);
    setErrShippingAddress("");
  };

  const handleQuantity = (e) => {
    setQantity(e.target.value);
    setErrQuantity("");
  };

  const handleUpdateOrder = () => {
    console.log("create product");
    let data = {
      id:orderToEdit.id,
      order_number: orderToEdit.order_number,
      product: orderToEdit.product,
      status: orderToEdit.status,
      quantity: quantity,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      total_price: orderToEdit.total_price,
    };
    updateOrder(data);
    navigate("/my-orders");
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with OREBI
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all OREBI services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © OREBI
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Edit Order
              </h1>
              <div className="flex flex-col gap-3">
                {/* Product name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Order Number
                  </p>
                  <input
                    value={orderToEdit.order_number}
                    readOnly
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. Iphone 15"
                  />
                </div>

                {/* Product name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Product Name
                  </p>
                  <input
                    value={orderToEdit.product_name}
                    readOnly
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. Iphone 15"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Payment Method
                  </p>
                  <input
                    onChange={handlePaymentMethod}
                    value={paymentMethod}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder=""
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Shipping shippingAddress
                  </p>
                  <input
                    onChange={handleShippingAddress}
                    value={shippingAddress}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder=""
                  />
                </div>


                {/* Quantity */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Quantity
                  </p>
                  <input
                    onChange={handleQuantity}
                    value={quantity}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder=""
                  />
                  {errQuantity && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errQuantity}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleUpdateOrder}
                  className={`${
                    true
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Update Order
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditOrderform;
