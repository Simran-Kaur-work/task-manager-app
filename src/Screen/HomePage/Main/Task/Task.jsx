import React from "react";
import Header from "./Components/Header/Header";
import TabBar from "./Components/TabBar/TabBar";

export default function Task() {
  return (
    <div className="container mx-auto py-4">
      <Header />
      <TabBar />
    </div>
  );
}