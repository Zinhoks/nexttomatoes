import styles from "./Header.module.css";
import Link from "next/link";
import { accountService } from "../../_service";
import { useEffect, useState } from "react";
import Router from "next/router";
import { BiWindows } from "react-icons/bi";
import Searchbar from "../searchbar/Searchbar";

const Header = () => {
  const [log, setLog] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);
  const logout = () => {
    accountService.logout();
    Router.push("/public/login");
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    setLog(id);

    let admin = localStorage.getItem("statut");
    setIsAdmin(admin);
  }, []);

  return (
    <div className={styles.header}>
      <Link className={styles.logo} href="/">
        Rotten Tomatoes
      </Link>
      <div className={styles.menuContainer}>
        {!log && (
          <Link className={styles.login} href="/public/login">
            Login
          </Link>
        )}

        {log && (
          <Link className={styles.login} href="/" onClick={logout}>
            Signup
          </Link>
        )}
        {isAdmin === "admin" ? (
          <Link className={styles.login} href="./admin/user">
            admin
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
