import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "axios";

function Home() {
  const { products } = useContext(ProductContext);

  // its give a category value from the url and
  const { search } = useLocation();

  // using this we decode the  url category into normal category
  //  [1] --> first index mila mean actual category
  const category = decodeURIComponent(search.split("=")[1]);

  // console.log(category);

  const [filteredProducts, setFilteredProducts] = useState(products);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setFilteredProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (category && category !== "undefined") {
      // getProductsByCategory();

      setFilteredProducts(products.filter((p) => p.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p) => (
            <Link
              to={`details/${p.id}`}
              key={p.id}
              className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center"
              style={{ maxWidth: "18%" }} // Added style for max width to control the size
            >
              <div
                className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <h1 className="hover:text-blue-300">{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
