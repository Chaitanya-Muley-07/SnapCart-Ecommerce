import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { starsGenerator } from "../../constants/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReviewComponent = () => {
  return (
    <div className="my-10 sm:my-20 w-[93vw] lg:w-[73vw] mx-auto">
      <h3 className="font-extrabold text-2xl text-gray-800 dark:text-white mb-8 text-center ">
        Reviews
      </h3>

      {/* WRITE REVIEW SECTION*/}
      <div className="rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
          Write a review
        </h2>

        <Textarea className="mb-4" placeholder="Your Review" />
        <div className="flex gap-5">
          <Input
            type="number"
            max="5"
            min="1"
            className="mb-4 w-[10rem]"
            placeholder="Rating (1-5)"
          />
          <Button>Submit Review</Button>
        </div>
      </div>
      {/* REVIEW LIST*/}
      <div className="space-y-6 my-10">
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg dark:bg-zinc-900 dark:border-none">
          {/* Reviewe info */}
          <div className="flex items-center mb-4">
            <Avatar className="w-10 h-10 rounded-full mr-4 border border-gray-300">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h4>Chaitanya Muley</h4>
              <div className="flex items-center mt-1">
                {starsGenerator(4.5, "0", 15)}
              </div>
            </div>
          </div>
          {/*review content */}
          <p className="text-gray-600 text-sm dark:text-customGray">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ex
            illo alias vero, sed autem tempora soluta ut odit commodi.
          </p>
          {/*review section */}
          <div className="mt-5 bg-gray-50 p-4 rounded-lg border dark:bg-zinc-800">
            <h3 className="font-bold text-sm text-gray-700 mb-3 dark:text-customYellow">
              Replies (2)
            </h3>
            <div className="space-y-4 ">
              <div className="flex items-start space-x-4 border-b pb-3 last:border-none">
                <Avatar className="w-8 h-8 rounded-full  border border-gray-300">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h6 className="font-medium text-gray-800 text-sm dark:text-white capitalize">Yatharth Shivhare</h6>
                  <p className="text-gray-400 text-sm dark:text-customGray">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, itaque.</p>
                </div>
              </div>
            </div>
          </div>
          {/*reply form */}
          <div className="mt-4">
          <Textarea placeholder="Write Your Reply"/>
          <Button size="sm" className="mt-4">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
