import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { useGetProductsQuery } from "../../../redux/ProductsQueries";

const NewArrivals = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  console.log('products: ',products)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  if (isLoading || !products) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {products?.map((product) => (
          <div key={product.id} className="px-2">
            <Product
              _id={product.id}
              img={newArrOne} // Assuming these properties are available in your product object
              productName={product.name}
              price={product.price}
              color={product.color}
              badge={product.badge}
              des={product.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
