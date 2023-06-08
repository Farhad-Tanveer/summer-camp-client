import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);

  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart", user.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/carts?email=${user?.email}`
      );
      return res.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
