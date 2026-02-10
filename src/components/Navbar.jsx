import { Link } from "react-router";

export const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-o bg-red-700 h-20 lg:px-40">
        <div className="text-red">
            <Link to='/'>
            <img src="logo-tp.png" className="flex items-start h-20 w-auto" alt="" /></Link>

        </div>
        <div>
          <nav className="hidden lg:flex items-center justify-center gap-10 text-white">
            <Link to="/" className="links">Home</Link>
            <Link to="" className="links">About</Link>
            <Link to="/menu" className="links">Menu</Link>
            <Link to="/blogs" className="links">Blogs</Link>
            <Link to="/reservaton" className="links">Reservation</Link>
            <Link to="/your_cart" className="links">Cart</Link>
            <Link to="/user" className="links p-3 bg-amber-500 text-center text-black rounded-xl font-medium">Customer Portal</Link>

          </nav>
        </div>
      </div>
    </div>
  );
};
