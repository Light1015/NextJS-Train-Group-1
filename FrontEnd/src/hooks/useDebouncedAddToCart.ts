import { useEffect, useRef, useCallback } from "react";
import debounce from "lodash/debounce";
import Swal from "sweetalert2";
import { CartItem } from "@/context/CartContext";

export const useDebouncedAddToCart = (addToCart: (item: CartItem) => void) => {
  const addToCartRef = useRef(addToCart);
  const debouncedFnRef = useRef<(item: CartItem) => void>();

  // Luôn cập nhật addToCart mới nhất
  useEffect(() => {
    addToCartRef.current = addToCart;
  }, [addToCart]);

  // Tạo debounce 1 lần duy nhất
  useEffect(() => {
    const handler = debounce((item: CartItem) => {
      console.log("🔥 Debounced addToCart run:", item);
      addToCartRef.current(item);
      Swal.fire({
        icon: "success",
        title: "Added to cart!",
        showConfirmButton: false,
        timer: 1200,
      });
    }, 300);

    debouncedFnRef.current = handler;

    return () => handler.cancel(); // Cleanup khi unmount
  }, []);

  // Hàm wrap được return
  return useCallback((item: CartItem) => {
    debouncedFnRef.current?.(item);
  }, []);
};
