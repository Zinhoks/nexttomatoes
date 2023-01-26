import { accountService } from "../_service";
import { useEffect } from "react";
import Router from "next/router";



const AuthGuard = ({ children }) => {
  useEffect(() => {
    if (!accountService.isLogged()) {
      Router.push("/public/Login");
     
    }
if(!accountService.isAdmin()){
  Router.push("/")
}
  });

  return children;
};

export default AuthGuard;
