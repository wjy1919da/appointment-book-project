import HomeLink from "../../home-link/home-link.component";
import DropdownMenu from "../../../dropdown-menu/dropdown-menu";
import "./home-section5-titles.styles.scss";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useState } from "react";
const HomeSectionTitles = ({ type, title }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const href =
    type === "Procedures"
      ? "/procedure"
      : type === "Instruments"
      ? "/instrument"
      : `/${type.toLowerCase()}`;
  return (
    <div className="home-section5-titles-container">
      <div className="home-grid-title" onClick={() => setIsModalOpen(true)}>
        {title}
      </div>
      <HomeLink title={`view more ${type}`} href={href} />
      {IsModalOpen && (
        <DropdownMenu show={IsModalOpen} onHide={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomeSectionTitles;
