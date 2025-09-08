import CardUi from './CardUi'
function BestProduct({products}) {
 
  return (
   <div className="pb-6 border-gray-300 border-b-[1px] mb-6">
  <h3 className="font-bold uppercase text-[18px] mb-4 sm:mb-6 text-center sm:text-left">
    Best seller in this category
  </h3>

  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-3 gap-y-4">
    {/* Prev Button */}
    <div className="hidden sm:flex w-[18px] p-3 items-center justify-center text-[6px] bg-[#EDEFF6] rounded-[10px] break-words">
      Prev
    </div>

    {/* Cards Grid */}
    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map((item) => (
        <CardUi item={item} key={item._id} />
      ))}
    </div>

    {/* Next Button */}
    <div className="hidden sm:flex w-[17px] p-3 items-center justify-center text-[6px] bg-[#EDEFF6] rounded-[10px] break-words">
      Next
    </div>
  </div>
</div>

  )
}

export default BestProduct