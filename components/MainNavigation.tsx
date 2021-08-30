import { FC, useContext } from "react";
import Link from "next/link";
import UserContext from "../store/user-context";

const MainNavigation: FC = () => {
  const { username } = useContext(UserContext);
  return (
    <header>
      <div>Aperture</div>
      <nav>
        <ul>
          <li>
            <Link href="/my-feed">Home</Link>
          </li>
          <li>
            <Link href={"/" + username.toString()}>Profile</Link>
          </li>
          <li>Likes</li>
          <li>World</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
