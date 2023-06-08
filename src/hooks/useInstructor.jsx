import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useInstructor = () => {
  const { user, loading } = useAuth();
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor", user?.email],
    enabled: !loading,
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/users/instructor/${user?.email}`
        );
        if (!res.ok) {
          throw new Error("Error checking instructor status");
        }
        const data = await res.json();
        // console.log("is instructor response", data);
        return data.instructor;
      } catch (error) {
        // console.error("Error checking instructor status", error);
        throw new Error("Error checking instructor status");
      }
    },
  });

  return [isInstructor, isInstructorLoading];
};

export default useInstructor;
