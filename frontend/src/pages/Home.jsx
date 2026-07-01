import React from "react";
import HeroSlider from "../components/HomeSections/HeroSlider";
import ArticleSection from "../components/HomeSections/ArticleSection";
import FasilitasSection from "../components/HomeSections/FasilitasSection";
import DoctorSection from "../components/HomeSections/DoctorSection";
import ReelsSection from "../components/HomeSections/ReelsSection";
import MitraSection from "../components/HomeSections/MitraSection";
import LokasiSection from "../components/HomeSections/LokasiSection";

const Home = () => {
  return (
    <div className="font-sans w-full overflow-hidden">
      <HeroSlider />
      <ArticleSection />
      <FasilitasSection />
      <DoctorSection />
      <ReelsSection />
      <MitraSection />
      <LokasiSection />
    </div>
  );
};

export default Home;
