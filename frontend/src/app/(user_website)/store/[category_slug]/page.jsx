
import { getProduct } from "../../../../../library/api_calls";
import AllProduct from "../../components/store/AllProduct";
import BestProduct from "../../components/store/BestProduct";


async function StorePage({params}) {
    const {category_slug}= await params;
   const products = await getProduct(null,category_slug);
  return (
    <>
      <BestProduct products={products} />
      <AllProduct />
    </>
  );
}

export default StorePage;
