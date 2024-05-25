import React from "react";
import ProductsMenu from "./ProductsMenu";
import FlavoursMenu from "./FlavoursMenu";
import ProductsTable from "./ProductsTable";

import FlavoursTable from "./FlavoursTable";
export default function Home() {
  return (
    <>
      <ProductsTable
        h1="Productos"
        route="products"
        schemaRoute="products/schema"
        Menu={ProductsMenu}
      />
      <ProductsTable
        h1="Sabores"
        route="flavours"
        schemaRoute="flavours/schema"
        Menu={FlavoursMenu}
      />
    </>
  );
}
