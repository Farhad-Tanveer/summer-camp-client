import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://summer-camp-server-seven.vercel.app/users/admin/${user?.email}`
        );
        if (!res.ok) {
          throw new Error("Error checking admin status");
        }
        const data = await res.json();
        // console.log("is admin response", data);
        return data.admin;
      } catch (error) {
        // console.error("Error checking admin status", error);
        throw new Error("Error checking admin status");
      }
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
