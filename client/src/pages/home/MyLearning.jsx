import React from "react";
import { Herocart } from "./Herocart";

const MyLearning = () => {
  const data = [1, 2, 34, 5];
  const isLoading = false;

  return (
    <div>
      {data.length === 0 ? (
        <div className="max-w-7xl mx-auto my-10 md:my-0">
          <h1 className="font-bold">
            Sorry ! you are not Envoled in any course
          </h1>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto my-10 md:my-0">
          <h1 className="py-4 font-bold text-center md:text-left">
            My Learning
          </h1>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-300 rounded-lg h-40 md:h-48 lg:h-56"
                ></div>
              ))}
            </div>
          ) : (
            <div className="learningCard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-self-center gap-3">
              {data.map((_, index) => (
                <Herocart key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
