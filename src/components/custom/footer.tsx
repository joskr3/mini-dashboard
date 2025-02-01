import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router";
import { Separator } from "../ui/separator";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <Separator />
      <footer className="flex w-dvw gap-4 justify-between ">
        <section className="flex flex-col gap-3 w-fit h-fit">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </section>
        <Button variant="ghost" onClick={() => navigate("/")}>
          <img src="./logo.svg" alt="logo" className="h-16 grayscale" />
        </Button>
      </footer>
    </>
  );
};

export default Footer;
