import React from "react";
import Home from "./pages/Home";
import useLenis from "./hooks/useLenis";

const App = () => {
  // Smooth scrolling is app-wide, so it's initialized once at the root.
  useLenis();

  return <Home />;
};

export default App;
