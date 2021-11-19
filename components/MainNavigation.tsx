import { FC, useContext } from "react";
import Link from "next/link";
import UserContext from "../store/user-context";
import { AppBar, Toolbar, makeStyles, IconButton, ClickAwayListener } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import FaceIcon from "@material-ui/icons/Face";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PublicIcon from "@material-ui/icons/Public";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AuthContext from "../store/auth-context";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "white",
    color: "black",
  },
  toolbar: {
    marginRight: theme.spacing(30),
    marginLeft: theme.spacing(30),
  },
  menu: {
    display: "flex",
  },
  title: {
    width: "15%",
  },
  navItem: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    marginLeft: theme.spacing(20),
    width: "100%",
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginLeft: theme.spacing(4),
  },
}));

const MainNavigation: FC = () => {
  const { username } = useContext(UserContext);
  const classes = useStyles();
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return (
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Link href="/"><div className={classes.title}>Aperture</div></Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div className={classes.input}>
              <InputBase placeholder="search..." />
            </div>
          </div>
          <div className={classes.menu}>
            <div className={classes.navItem}>
              <Link href="/my-feed">
                <HomeIcon />
              </Link>
            </div>
            <div className={classes.navItem}>
              <Link href={"/" + username.toString()}>
                <FaceIcon />
              </Link>
            </div>
            <div className={classes.navItem}>
              <FavoriteIcon />
            </div>
            <div className={classes.navItem}>
              <PublicIcon />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  } else {
    return null;
  }
};

export default MainNavigation;
