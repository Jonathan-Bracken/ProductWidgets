import React from "react";
import ProductWidgets from "./ProductWidgets/ProductWidgets";

const App: React.FC = () => {
  return (
    <div className="app-page">
      <main>
        <ProductWidgets />
      </main>
    </div>
  );
};

export default App;