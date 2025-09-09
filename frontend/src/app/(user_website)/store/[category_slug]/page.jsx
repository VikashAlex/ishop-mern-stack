
import { getProduct } from "../../../../../library/api_calls";
import AllProduct from "../../components/store/AllProduct";
import BestProduct from "../../components/store/BestProduct";


async function StorePage({ params,searchParams }) {
  const { category_slug } = await params;
  const { brand,color } = await searchParams ?? null;
  const products = await getProduct(null, category_slug,brand,color);
  return (
    <>
      <BestProduct products={products} />
      <AllProduct />
    </>
  );
}

export default StorePage;
