import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home-instruments.styles.scss";
import instrumentQueryStore from "../../../instrumentStore.ts";
import useInstrumentQueryStore from "../../../instrumentStore.ts";
import HomeSection5Titles from "./home-section5-titles/home-section5-titles.component";
import { useMediaQuery } from "react-responsive";
import { Box, SimpleGrid, Image, Grid } from "@chakra-ui/react";
import HomeInstrumentPopUP from "./home-instrument-popUp/home-instrument-popUp";
import { useGetInstruments } from "../../../hooks/useGetInstruments";
const formatTitle = (title) => {
  return title
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const HomeInstruments = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 743px)" });
  const isIpad = useMediaQuery({
    query: "(min-width: 744px) and (max-width: 1132px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1133px)" });
  const isExtraLarge = useMediaQuery({ query: "(min-width: 1441px)" });
  const isMobileOrIpad = isMobile || isIpad;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState(false);
  let columns;
  if (isMobile) {
    columns = 3;
  } else if (isIpad) {
    columns = 5;
  } else if (isDesktop) {
    columns = 6;
  }
  const procedures_names_mobile = [
    "botox_injections",
    "breast_augmentation",
    "chemical_peels",
    "lip_augmentation",
    "teeth_whitening",
  ];
  const procedures_names = [
    "botox_injections",
    "breast_augmentation",
    "chemical_peels",
    "lip_augmentation",
    "teeth_whitening",
    "fox_eyes",
  ];
  const setInstruName = instrumentQueryStore((state) => state.setInstruName);
  const instruments_names = [
    "thermage",
    "inmode",
    "coolsculpting",
    "fraxel_laser",
  ];
  const { instrumentQuery } = useInstrumentQueryStore();
  const instruName = instrumentQuery.instruName;
  // const instrumentsData = [
  //     {
  //         name: "thermage",
  //         logo: require(`../../../assets/instrument/thermageLogo.png`),
  //         title: 'ADDRESS THE VISIBLE SIGNS OF AGING IN MINUTES',
  //         text: "The Thermage® system is a non-invasive radiofrequency (RF) therapy that can help smooth, tighten and contour skin for an overall younger-looking appearance.",
  //         subtext: "",
  //         procedure: require(`../../../assets/instrument/thermageProcessIcon.png`),
  //     },
  //     {
  //         name: "inmode",
  //         logo: require(`../../../assets/instrument/inmodeLogo.png`),
  //         title: 'InMode’s innovative technologies provide superior results for your patients.',
  //         text: 'InMode’s technological advancements began over two decades ago with state-of-the-art light, laser, and radiofrequency devices invented by leading doctors and scientists, who essentially launched and shaped the industry. Our technology continues that legacy to provide superior satisfaction for both the patient and the practice',
  //         subtext: "",
  //         procedure: ""
  //     },
  //     {
  //         name: "coolsculpting",
  //         logo:require(`../../../assets/instrument/coolsculptingLogo.png`),
  //         title: "Get rid of stubborn fat for good.",
  //         text: "CoolSculpting® is the treatment doctors usemost for nonsurgical fat reduction",
  //         subtext: "",
  //         procedure: ""
  //     },
  //     {
  //         name: "fraxel_laser",
  //         logo: require(`../../../assets/instrument/fraxel_laserLogo.png`),
  //         title: "A NOTICEABLY YOUNGER LOOK WITHOUT SURGERY",
  //         text: "Fraxel® treatment improves tone, texture and radiance for aging, sun-damaged or scarred skin.Fraxel® is for people who want to look younger without dramatic changes or extended downtime.",
  //         subtext: "FRAXEL® IS EFFECTIVE ON",
  //         procedure:require(`../../../assets/instrument/fraxel_laser_process_Icon.png`)
  //     },
  //     // ... other instruments
  // ];
  const { data, isLoading, error } = useGetInstruments();
  console.log("fetchdata", data);
  //   const proceduresToRender = isMobileOrIpad
  //     ? procedures_names_mobile
  //     : procedures_names;
  const openModal = (instrumentName) => {
    setSelectedInstrument(true);
    //const instrument = instrumentsData.find(i => i.name === instrumentName);
    setIsModalOpen(true);
  };
  // useEffect(() => {
  //     if (data && data.name === instruName) {
  //         setSelectedInstrument(data.data);
  //         console.log("seleteInstru", selectedInstrument);
  //     }
  // }, [data, instruName]);
  const proceduresGrid = procedures_names.map((name) => (
    <Box as="div" className="home-procedure" key={name}>
      <Link to={`/procedure/${name}`}>
        <Image
          src={require(`../../../assets/procedure/${name}.svg`)}
          alt={name}
          className="home-procedure-pic"
        />
        {!isMobileOrIpad && <div className="title">{formatTitle(name)}</div>}
      </Link>
    </Box>
  ));
  const instrumentsGrid = instruments_names.map((name) => {
    return (
      <Box as="div" className="home-instrument" key={name}>
        <Image
          src={require(`../../../assets/instrument/${name}.svg`)}
          alt={name}
          className="home-instrument-pic"
          onClick={() => {
            console.log("Image clicked:", name);
            setInstruName(name);
            openModal(name); // Ensure your openModal function utilizes the instrument data
          }}
        />
        {!isMobileOrIpad && <div className="title">{formatTitle(name)}</div>}
      </Box>
    );
  });
  return (
    <div className="home-section-container">
      {/* procedures */}
      <div className="home-instrument-container">
        <HomeSection5Titles
          title="Popular Cosmetic Procedures"
          type="Procedures"
        />
        <SimpleGrid
          style={{ marginTop: "10px", width: isExtraLarge ? "1440px" : "95vw" }}
          columns={columns}
          spacing={5}
        >
          {proceduresGrid}
        </SimpleGrid>
      </div>
      {/* instruments */}
      <div className="home-instrument-container">
        <HomeSection5Titles title="Featured Instruments" type="Instruments" />
        <div>
          <SimpleGrid
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              width: isExtraLarge ? "1440px" : "95vw",
            }}
            columns={isMobile ? 2 : 4}
            spacing={8}
          >
            {instrumentsGrid}
          </SimpleGrid>
        </div>
        {isModalOpen}
      </div>
      {selectedInstrument && (
        <HomeInstrumentPopUP
          show={isModalOpen}
          onClose={() => setSelectedInstrument(false)}
        />
      )}
    </div>
  );
};
export default HomeInstruments;
