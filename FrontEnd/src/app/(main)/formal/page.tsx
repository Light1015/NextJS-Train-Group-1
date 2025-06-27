"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import SidebarFilter from "@components/Layouts/SidebarFilter/SidebarFilter";
import ProductCard from "@components/UI/ProductCard/ProductCard";
import Pagination from "@components/UI/Pagination/Pagination";
import { useProducts } from "@/hooks/useProducts";

export default function Formal() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);

  const { products, loading } = useProducts();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(window.innerWidth < 768 ? 6 : 9);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory
      ? product.category.name.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const matchColor = selectedColor
      ? product.colors?.some((c) => c.name?.toLowerCase() === selectedColor.toLowerCase())
      : true;

    const matchSize = selectedSize
      ? product.sizes?.some((s) => s.name?.toLowerCase() === selectedSize.toLowerCase())
      : true;

    const matchPrice =
      Number(product.price) >= minPrice && Number(product.price) <= maxPrice;

    return matchCategory && matchColor && matchSize && matchPrice;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  return (
    <div className="container relative mx-auto py-4 px-6 md:px-5 flex gap-10">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block w-64">
        <SidebarFilter
          showSideBar={showSideBar}
          setshowSideBar={setShowSideBar}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleApplyFilter={() => {
            setCurrentPage(1);
            setShowSideBar(false);
          }}
        />

      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="w-full mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-lg md:text-2xl font-bold">Formal</h1>

            <div className="flex items-center gap-3">
              <div className="text-xs md:text-base text-gray-700">
                Showing {indexOfFirstProduct + 1}–
                {Math.min(indexOfLastProduct, filteredProducts.length)} of {" "}
                {filteredProducts.length} Products
              </div>
              <div className="hidden md:flex items-center gap-1 text-sm text-gray-700">
                Sort by: <span className="font-medium ml-1">Most Popular</span>
                <BsChevronDown className="text-gray-500" />
              </div>
              <button
                onClick={() => setShowSideBar(true)}
                className="flex md:hidden items-center gap-1 bg-gray-100 hover:bg-black hover:text-white text-gray-400 rounded-full py-2 px-2"
              >
                <Image src="/images/filter.png" alt="filter" width={16} height={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                image: product.image ?? "/images/default-product.png",
                price: Number(product.price),
              }}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="w-full mt-10 py-5 border-t border-gray-200">
          <Pagination
            cards={filteredProducts}
            numberOfProducts={productsPerPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Sidebar - Mobile */}
      {showSideBar && (
        <div className="fixed inset-0 z-50 flex items-start justify-center md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setShowSideBar(false)}
          />
          <div className="absolute left-1/2 -translate-x-1/2 w-[390px] h-[1066px] rounded-t-[20px] bg-[#00000033] z-50 overflow-y-auto">
            <SidebarFilter
              showSideBar={showSideBar}
              setshowSideBar={setShowSideBar}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              handleApplyFilter={() => {
                setCurrentPage(1);
                setShowSideBar(false);
              }}
            />

          </div>
        </div>
      )}
    </div>
  );
}
