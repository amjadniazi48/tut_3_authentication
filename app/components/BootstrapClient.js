"use client";
import { useEffect } from "react";
import React from "react";

const BoostrapClient = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (null);
};

export default BoostrapClient;
