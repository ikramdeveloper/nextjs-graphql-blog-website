import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import { getCategories } from "../services";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <header className="container mx-auto px-10 mb-8">
      <div className="border-b w-full border-blue-400 py-8 flex justify-between items-center">
        <section className=" block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              Graph CMS
            </span>
          </Link>
        </section>

        <section className="hidden md:flex items-center">
          {categories.length > 0 &&
            categories.slice(0, 3).map((item) => (
              <Link key={item.slug} href={`/category/${item.slug}`}>
                <span className=" mt-2 text-white ml-4 font-semibold cursor-pointer">
                  {item.name}
                </span>
              </Link>
            ))}
        </section>
      </div>
    </header>
  );
};
export default Header;
