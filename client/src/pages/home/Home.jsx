import { Button } from "@/components/ui/button";
import React from "react";
import { Herocart } from "./Herocart";

const Home = () => {
  const card = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <div className="heroSection w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-40 flex justify-center">
        <div className="max-w-7xl w-full mx-auto detail flex justify-center items-center flex-col text-center space-y-4 px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Find the Best Course for You
          </h1>
          <p className="text-lg max-w-md mx-auto">
            Discover tailored learning experiences with top courses that match
            your goals.
          </p>
          <div className="inputDetail flex space-x-2 bg-white rounded-lg p-2 shadow-md max-w-sm mx-auto">
            <input
              type="text"
              placeholder="Search for courses..."
              className="flex-1 p-2 rounded-l-lg text-gray-800 outline-none"
            />
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="card max-w-7xl mx-auto my-6">
        <h2 className="text-center font-bold py-4 text-lg sm:text-2xl">
          Top Rated Courses in the World
        </h2>
        <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  justify-self-center  gap-2">
          {card.map((_, index) => {
            return (
              <div key={index} className="w-full   ">
                <Herocart />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
