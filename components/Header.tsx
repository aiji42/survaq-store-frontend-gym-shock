import Image from "next/image";
import logo from "../public/logo_black.png";

export const Header = () => {
  return (
    <header className="item_header">
      <div className="item_logo">
        <Image src={logo} alt="Furez" priority />
      </div>
    </header>
  );
};
