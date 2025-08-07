import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="flex justify-between text-muted px-8 py-2">
      <Link>About</Link>
      <Link>Terms of use</Link>
      <Link>Contact us</Link>
    </div>
  );
}
