import React from "react";
import { Route, Routes } from "react-router";
import Error404 from "@/pages/Error404";

const DApps: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Error404 hideBackButton />} />
        <Route path="/corporations" element={<div>Corporations</div>} />
        <Route path="*" element={<Error404 hideBackButton />} />
      </Routes>
    </>
  );
};

export default DApps;
