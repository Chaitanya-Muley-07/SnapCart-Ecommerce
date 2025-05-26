import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const HeaderDisplay = () => {
  const imagesData = [
    "https://images.pexels.com/photos/163117/keyboard-white-computer-keyboard-desktop-163117.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3459979/pexels-photo-3459979.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];
  return (
    <Carousel className="my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-x-visible">
      <CarouselContent>
        {imagesData.map((image) => (
          <CarouselItem key={image}>
            <img
              src={image}
              loading="lazy"
              className="object-cover w-full h-[60vh] rounded-3xl"
              alt=""
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HeaderDisplay;
