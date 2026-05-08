import React from "react";

const Loader = () => {
  return (
    <div className="animate-pulse">

      {/* Hero Skeleton */}
      <div className="h-screen bg-zinc-900"></div>

      {/* Movie Rows */}
      <div className="px-6 md:px-10 -mt-40 relative z-20">

        {[1, 2, 3].map((section) => (
          <div key={section} className="mb-14">

            {/* Title */}
            <div className="w-52 h-8 bg-zinc-800 rounded mb-6"></div>

            {/* Cards */}
            <div className="flex gap-6 overflow-hidden">

              {[1, 2, 3, 4, 5, 6].map((card) => (
                <div
                  key={card}
                  className="min-w-[180px] md:min-w-[220px]"
                >

                  <div className="w-full h-[270px] md:h-[330px] bg-zinc-800 rounded-2xl"></div>

                  <div className="w-40 h-5 bg-zinc-800 rounded mt-4"></div>

                  <div className="w-20 h-4 bg-zinc-800 rounded mt-2"></div>

                </div>
              ))}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Loader;