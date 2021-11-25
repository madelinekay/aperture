import React, { FC } from "react";
import MainNavigation from "./MainNavigation";

const Layout: FC = (props) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
