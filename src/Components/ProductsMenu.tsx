import React from "react";
import template from "../assets/products-template.png";

export default function ProductsMenu({ data }) {
  const sortedProductsList = data.sort((a, b) => b.price - a.price);

  function getPriceByFlavoursQuantity(number) {
    return sortedProductsList.find((obj) => obj.flavours === number)?.price;
  }

  return (
    <div id="products-menu" className="menu">
      <img src={template} alt="" style={{ width: "100%" }} />

      <div className="uls-container">
        <ul className="first">
          {sortedProductsList.map(
            (product) =>
              !product.outOfStock && (
                <li key={product._id}>
                  <span>{product.name}</span> <span>${product.price}</span>
                </li>
              )
          )}
        </ul>
        <h2>Combos con descuento:</h2>
        <ul>
          <li>
            <span>2u 1 kg</span>
            <p>
              <span className="line-through">
                ${getPriceByFlavoursQuantity(4) * 2}
              </span>
              <span> ${getPriceByFlavoursQuantity(4) * 2 - 300}</span>
            </p>
          </li>
          <li>
            <span>2u 1/2 kg</span>
            <p>
              <span className="line-through">
                ${getPriceByFlavoursQuantity(3) * 2}
              </span>
              <span> ${getPriceByFlavoursQuantity(3) * 2 - 200}</span>
            </p>
          </li>
          <li>
            <span>2u 1/4 kg</span>
            <p>
              <span className="line-through">
                ${getPriceByFlavoursQuantity(2) * 2 || "undefined"}
              </span>
              <span>
                {" "}
                ${getPriceByFlavoursQuantity(2) * 2 - 200 || "undefined"}
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
