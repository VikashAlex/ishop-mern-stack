import TopBanner from "../components/store/TopBanner";
import PopularProduct from "../components/store/PopularProduct";
import Category from "../components/store/Category";
import Fillter from "../components/store/Fillter";
import { getBrands, getCategory, getColors } from "../../../../library/api_calls";

async function layout({ children }) {

  const Categories = await getCategory(null);
  const Brands = await getBrands(null)
  const Colors = await getColors(null);
  
  return (
    <section>
      <TopBanner />
      <PopularProduct />

      <main className="bg-white px-4 py-6 my-4  flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <section className="flex flex-col gap-y-3 w-full lg:w-[302px]">
          <Category Categories={Categories.data} />
          <Fillter  Brands={Brands.data} Colors={Colors}/>
          <div className="h-[200px] sm:h-[250px] lg:h-[300px] bg-[url('/slider/addimg.png')] bg-center bg-cover rounded-[10px] p-6 sm:p-8">
            <h3 className="text-white text-lg sm:text-xl lg:text-[24px] mb-3 sm:mb-5 leading-snug">
              OKODo hero 11+ <br /> 5K wireless
            </h3>
            <p className="text-[#999999] uppercase text-sm sm:text-base">from</p>
            <p className="text-[#27FD27] text-xl sm:text-2xl lg:text-[30px]">
              $169
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="flex-1">
          {children}
        </section>
      </main>
    </section>
  );
}

export default layout;
