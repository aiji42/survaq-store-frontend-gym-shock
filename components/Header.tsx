import Image from "next/image";
import logo from "../public/logo.jpg";

export const Header = () => {
  return (
    <header className="item_header">
      <div className="item_logo">
        <Image src={logo} alt="SurvaQ Store" priority height={50} width={100} />
      </div>
    </header>
  );
};
