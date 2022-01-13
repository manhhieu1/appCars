import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ ...otherProps }) => {
  const [active, setActive] = useState(false);

  const onClick = () => {
    setActive(!active);
  };

  return (
    <header className="bg-white fixed shadow-md  z-50 w-full px-5 py-2 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-2.5">
        <div className="w-14">
          <img
            src="https://xehoangviet.galaxycloud.vn/template/xe_hoang_viet/images/logo.png"
            className="w-full"
          />
        </div>

        <div
          onClick={onClick}
          className={`
          md:hidden uppercase
        `}
        >
          Menu
        </div>

        <nav
          className={`
          ${!active && "hidden"}
          absolute flex flex-col bg-white top-full w-full left-0 z-20
          md:static md:w-auto md:flex
        `}
        >
          <ul className="md:flex-row md:flex">
            <li className="list-none md:mr-5">
              <a
                href="#4cho"
                className="flex w-full text-base uppercase hover:text-red-600 cursor-pointer
                pt-2.5 px-2.5
              "
              >
                Xe 4 chỗ
              </a>
            </li>

            <li className="list-none md:mr-5">
              <Link
                className="flex w-full text-base uppercase hover:text-red-600 cursor-pointer
                pt-2.5 px-2.5
              "
                to={"#5cho"}
              >
                xe 5 chỗ
              </Link>
            </li>

            <li className="list-none md:mr-5">
              <Link
                className="flex w-full text-base uppercase hover:text-red-600 cursor-pointer
                pt-2.5 px-2.5
              "
                to={"#7cho"}
              >
                Xe 7 chỗ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
