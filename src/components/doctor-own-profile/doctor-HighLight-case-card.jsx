import { useNavigate } from "react-router-dom";
import "./doctor-own-hightLight.styles.scss";
import { HighlightCases } from "../component-individual-doctor/doctor-about/doctor-about.component";
import { useGetHighlightPost } from "../../hooks/useGetPosts";
const DocotorOwnHightLight = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useGetHighlightPost();

  return (
    <HighlightCases
      selected={data?.data || []}
      //   moveBack={highlightMoveBack}
      //   moveForward={highlightMoveForward}
    />
  );
};

export default DocotorOwnHightLight;
