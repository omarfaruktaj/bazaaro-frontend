import { Link } from "react-router";

export default function Logo() {
  return (
    <Link
      to="/"
      className=" text-xl font-bold p-1 cursor-pointer block transition-transform hover:scale-105"
    >
      Bazaro
    </Link>
  );
}
