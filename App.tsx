import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import QueryLogs from "./components/QueryLogs";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <QueryLogs />
    </>
  );
};

export default App;
