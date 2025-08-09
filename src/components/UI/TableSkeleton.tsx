export const TableSkeleton = () => {
  return (
    <div className="animate-pulse w-full h-screen bg-gray-100 flex flex-col p-4">
      <div className="flex space-x-4 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-300 rounded w-1/5"></div>
        ))}
      </div>

      <div className="flex-1 space-y-3">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-5 bg-gray-300 rounded w-1/5"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
