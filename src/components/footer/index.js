import React from "react";

const Footer = ({ ...otherProps }) => {
  return (
    <footer className="bg-gray-600">
      <div className="w-full max-w-7xl mx-auto py-14 px-2.5">
        <span className="text-base text-black">
          COPYRIGHT © 2021 - Đinh Mạnh Hiếu
        </span>
      </div>
    </footer>
  );
};

export default Footer;
