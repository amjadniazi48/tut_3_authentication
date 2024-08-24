"use client";
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { API_URL } from "@/config/index";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import qs from "qs";
const strapiQuery = qs.stringify({
  populate: {
    posts: {
      fields: ["title", "description", "type"],
      populate: ["images"],
    },
  },
  pagination: {
    pageSize: 10,
    page: 1,
  },
  status: "published",
  locale: ["en"],
});
const CarouselComp = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getHighlights = async (path) => {
    const url = new URL(path, API_URL);
    url.search = strapiQuery;
    setLoading(true);
    try {
      const response = await fetch(
        url.href,
        //  `${API_URL}/api/slider?populate[posts][fields][0]=title&populate[posts][fields][1]=description&populate[posts][fields][2]=type&populate[posts][populate][0]=images&pagination[pageSize]=10&pagination[page]=1&status=published&locale[0]=en`
        {
          method: "GET",
        }
      );
      if (response) {
        const post = await response.json();
        if (post) setData(post);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
  
    getHighlights("/api/slider");
   
  }, []);

  if (!data) return <p>No profile data</p>;
  console.log("hello  i m here...", data);
  // console.log("this is the dhellata",strapiData)
  // const { title, description, type } = strapiData.data;
  return isLoading ? (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Skeleton count={500} height={400} />
      </SkeletonTheme>
    </>
  ) : (
    <Carousel>
      {data &&
        data.data.posts.map((post) => {
          return (
            <Carousel.Item>
              <Image
                width={1500}
                height={500}
                src={API_URL + post.images[0].url}
                alt={post.images[0].name}
              />
              <Carousel.Caption>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
};

export default CarouselComp;
