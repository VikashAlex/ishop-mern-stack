import { getProduct } from "../../../../library/api_calls";
import AllProduct from "../components/store/AllProduct";
import BestProduct from "../components/store/BestProduct";

async function StorePage({searchParams}) {
  const {brand} = await searchParams ?? null;
  const {color} = await searchParams ?? null;
   const products = await getProduct(null,null,brand,color);
   
   
  return (
    <>
      <BestProduct products={products} />
      <AllProduct />
    </>
  );
}

export default StorePage;
