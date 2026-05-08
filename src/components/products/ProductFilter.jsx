import { useState } from "react";
import { LuFilter, LuChevronDown } from "react-icons/lu";

const categories = [
  { id: 1, category: "Home-decoration" },
  { id: 2, category: "Groceries" },
  { id: 3, category: "Fragrances" },
  { id: 4, category: "Kitchen-accessories" },
  { id: 5, category: "Furniture" },
  { id: 6, category: "Laptops" },
  { id: 7, category: "Tablets" },
  { id: 8, category: "Smartphones" },
  { id: 9, category: "Mobile-accessories" },
  { id: 10, category: "Sports-accessories" },
  { id: 11, category: "Skin-care" },
  { id: 12, category: "Beauty" },
  { id: 13, category: "Sunglasses" },
  { id: 14, category: "Mens-shirts" },
  { id: 15, category: "Mens-shoes" },
  { id: 16, category: "Mens-watches" },
  { id: 17, category: "Tops" },
  { id: 18, category: "Womens-bags" },
  { id: 19, category: "Womens-dresses" },
  { id: 20, category: "Womens-jewellery" },
  { id: 21, category: "Womens-shoes" },
  { id: 22, category: "Womens-watches" },
  { id: 23, category: "Motorcycle" },
  { id: 24, category: "Vehicle" },
];

const emptyFilters = {
  category: "",
  rating: "",
  minPrice: "",
  maxPrice: "",
};

function ProductFilter({ value = emptyFilters, onApply }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [temp, setTemp] = useState(value);

  const hasActiveFilter = Object.values(value).some(Boolean);

  function toggleMenu() {
    if (!openFilter) {
      setTemp(value);
    }

    setOpenFilter((prev) => !prev);
  }

  function applyFilter() {
    onApply(temp);
    setOpenFilter(false);
  }

  function clearFilter() {
    setTemp(emptyFilters);
    onApply(emptyFilters);
    setOpenFilter(false);
    setOpenCategory(false);
  }

  return (
    <div className="relative flex items-center justify-start gap-4">
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="toggle filter menu"
        className="relative cursor-pointer rounded-lg bg-gradient-to-r from-cyan-600 to-fuchsia-950 px-4 py-2 transition duration-300 hover:from-cyan-500 hover:to-fuchsia-900"
      >
        <LuFilter size={20} className="text-cyan-300" />

        {hasActiveFilter && (
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-cyan-400" />
        )}
      </button>

      <span>
        <span className="text-red-400">Ar</span>
        <span className="text-blue-400">M</span>
        <span className="text-amber-400">All</span>
      </span>

      <span className="text-cyan-50">nested search</span>

      <div
        className={`absolute top-full z-50 mt-2 w-72 origin-top rounded-lg border border-slate-700 bg-slate-900 shadow-2xl shadow-slate-950/60 transition-all duration-300 ease-in-out
        ${
          openFilter
            ? "scale-y-100 opacity-100"
            : "pointer-events-none scale-y-0 opacity-0"
        }`}
      >
        <div className="space-y-3 p-3">
          <button
            type="button"
            onClick={() => setOpenCategory((prev) => !prev)}
            className="flex w-full items-center justify-between border-b border-slate-700 py-1 pb-2 text-sm text-slate-300"
          >
            <span>
              Category{" "}
              {temp.category && (
                <span className="text-xs text-cyan-400">• {temp.category}</span>
              )}
            </span>

            <LuChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                openCategory ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`origin-top overflow-y-auto transition-all duration-300
            ${openCategory ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="space-y-2 py-1 pr-1">
              {categories.map((cat) => {
                const categoryValue = cat.category.toLowerCase();

                return (
                  <label
                    key={cat.id}
                    className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 hover:bg-slate-800"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={temp.category === categoryValue}
                      onChange={() =>
                        setTemp((prev) => ({
                          ...prev,
                          category: categoryValue,
                        }))
                      }
                      className="accent-cyan-500"
                    />

                    <span className="text-sm text-slate-200">
                      {cat.category}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-slate-200 hover:bg-slate-800">
            <input
              type="checkbox"
              checked={temp.rating === "4.5"}
              onChange={(e) =>
                setTemp((prev) => ({
                  ...prev,
                  rating: e.target.checked ? "4.5" : "",
                }))
              }
              className="accent-cyan-500"
            />

            <span className="text-sm">4.5+ Rating</span>
          </label>

          <div className="space-y-2 rounded-lg border border-slate-700 bg-slate-950/60 p-2">
            <h3 className="text-sm font-medium text-cyan-300">Price range</h3>

            <input
              type="number"
              min="0"
              value={temp.minPrice}
              onChange={(e) =>
                setTemp((prev) => ({
                  ...prev,
                  minPrice: e.target.value,
                }))
              }
              placeholder="Min price"
              className="w-full rounded-md border border-slate-700 bg-cyan-50 px-3 py-1.5 text-sm text-slate-950 outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />

            <input
              type="number"
              min="0"
              value={temp.maxPrice}
              onChange={(e) =>
                setTemp((prev) => ({
                  ...prev,
                  maxPrice: e.target.value,
                }))
              }
              placeholder="Max price"
              className="w-full rounded-md border border-slate-700 bg-cyan-50 px-3 py-1.5 text-sm text-slate-950 outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="flex gap-2 px-3 pb-3">
          <button
            type="button"
            onClick={clearFilter}
            className="flex-1 rounded-lg border border-slate-600 py-1.5 text-sm text-slate-400 transition-colors hover:border-slate-500 hover:text-slate-300"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={applyFilter}
            className="flex-1 rounded-lg bg-cyan-600 py-1.5 text-sm text-white transition-colors hover:bg-cyan-500"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilter;
