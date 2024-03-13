import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const link = [
    { label: "Dashboard", href: "/" },
    { label: "Issure", href: "/issure" },
  ];
  return (
    <nav className=" flex space-x-6 border-b mb-5 mx-6 h-14 items-center ">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6 ">
        {link.map((link) => (
          <Link key={link.href} className=" text-zinc-500 transition-colors hover:text-zinc-800" href={link.href}>
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
