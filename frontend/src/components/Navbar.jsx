import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser } = useAuthStore();
  return <nav>Navbar</nav>;
};

export default Navbar;
