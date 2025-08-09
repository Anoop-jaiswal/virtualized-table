import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { TableSkeleton } from "../components/UI/TableSkeleton";

const VirtualizeTable = lazy(() => import("../components/Table/Table"));

const AppRouter = () => {
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <Routes>
          <Route path="/" element={<VirtualizeTable />} />
          <Route path="/home" element={<VirtualizeTable />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRouter;
