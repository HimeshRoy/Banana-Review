import { useEffect, useState } from "react";
import { GiPopcorn } from "react-icons/gi";
import Hero from "../components/Hero";
import RowSection from "../components/RowSection";
import Loader from "../components/Loader";
import { AiFillFire } from "react-icons/ai";
import { GoStarFill } from "react-icons/go";
import { endpoints } from "../services/tmdb";
import { MdMovieCreation } from "react-icons/md";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-black min-h-screen text-white">

      <Hero />

      <div className="relative z-20 py-8">

        <RowSection
        icon={<AiFillFire/>}
          title="Trending Movies"
          fetchUrl={endpoints.trending}
        />

        <RowSection
        icon={<GiPopcorn/>}
          title="Popular Movies"
          fetchUrl={endpoints.popular}
        />

        <RowSection
        icon={<GoStarFill/>}
          title="Top Rated"
          fetchUrl={endpoints.topRated}
        />

        <RowSection
        icon={<MdMovieCreation/>

        }
          title="Upcoming"
          fetchUrl={endpoints.upcoming}
        />

      </div>
    </div>
  );
};

export default Home;