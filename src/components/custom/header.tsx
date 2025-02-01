import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router";
import { Separator } from "../ui/separator";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="flex w-dvw gap-4 justify-between sticky top-0  bg-white">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <img src="./logo.svg" alt="logo" />
        </Button>

        <section className="flex gap-3 w-fit">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </section>
      </header>
      <Separator />
    </>
  );
};

export default Header;
