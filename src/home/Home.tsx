import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { selectSite } from "../appSlice";
import Stories from "../posts/Stories";
import { RootState } from "../reducer";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedSite } = useSelector((state: RootState) => state.app);

  const { site } = useParams<{ site: string }>();

  React.useEffect(() => {
    if (site && site !== selectedSite) {
      dispatch(selectSite(site));
    }
  });

  function isActive(site: string) {
    return selectedSite === site;
  }

  return (
    <>
      <nav style={{ display: "flex", justifyContent: "space-evenly" }}>
        <NavLink
          exact
          to="/hn"
          isActive={() => isActive("hn")}
          style={isActive("hn") ? { color: "hsl(201, 23%, 47%)" } : undefined}
        >
          Hacker News
        </NavLink>
        <NavLink
          exact
          to="/lobsters"
          style={
            isActive("lobsters") ? { color: "hsl(201, 23%, 47%)" } : undefined
          }
          isActive={() => isActive("lobsters")}
        >
          Lobsters
        </NavLink>
      </nav>
      <Stories />
    </>
  );
};

export default Home;
