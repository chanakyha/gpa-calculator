import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="w-full border-t-2 p-1 flex justify-center bg-background">
      <Button asChild className="text-xs" variant={"link"}>
        <Link href={"https://github.com/chanakyha"} target="_blank">
          Designed and Developed by Chan
        </Link>
      </Button>
    </div>
  );
};

export default Footer;
