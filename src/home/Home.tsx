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
    if (site !== selectedSite) {
      dispatch(selectSite(site));
    }
  });

  return (
    <>
      <nav>
        <NavLink exact to="/hn">
          Hacker News
        </NavLink>
        <NavLink exact to="/lobsters">
          Lobsters
        </NavLink>
      </nav>
      <Stories />
    </>
  );
};

export default Home;
