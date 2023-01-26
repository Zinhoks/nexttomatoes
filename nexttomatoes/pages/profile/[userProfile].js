import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import stylos from "../../styles/[userProfile].module.css";
import { accountService } from "../../_service/account_service";
import axios from "axios";
import Favlist from "../../components/favlist/Favlist";

export default function SingleUser() {
  const [userId, setUserid] = useState([]);
  const [user, setUser] = useState([]);
  const [userUpdate, setUserUpdate] = useState([]);

  useEffect(
    () => {
      (async () => {
        setUserid(accountService.getToken());
        var config = {
          method: "get",
          url: `http://localhost:3000/api/users/${userId}`,
          headers: {},
        };

        await axios(config)
          .then(function (res) {
            setUser(res.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })();
    },
    [
      /*user*/
    ]
  );
  const onSubmit = async (e) => {
    e.preventDefault();
    const Options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userUpdate),
    };
    const response = await fetch(
      `http://localhost:3000/api/users/${userId}`,
      Options
    );
    const json = await response.json();
    return json;
  };
  return (
    <div>
      <Head>
        <title>User profile page</title>
      </Head>
      <main className={stylos.container}>
        <div className={stylos.card}>
          <div className="card-body d-flex justify-content-evenly align-items-center fs-6 border">
            <section>
              <h1>User information</h1>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </section>
            <section className={stylos.editForm}>
              <h3>Edit user information</h3>
              <form onSubmit={onSubmit}>
                <div className={stylos.inputDiv}>
                  <h5 className={stylos.cardHead}>Name:</h5>
                  <input
                    name="name"
                    type="text"
                    placeholder={user.name}
                    onChange={(e) =>
                      setUserUpdate({ ...userUpdate, name: e.target.value })
                    }
                    className={stylos.input}
                  />
                  <br />
                </div>
                <div className={stylos.inputDiv}>
                  <h5>Email:</h5>
                  <input
                    name="email"
                    type="email"
                    placeholder={user.email ? user.email : undefined}
                    onChange={(e) =>
                      setUserUpdate({ ...userUpdate, email: e.target.value })
                    }
                    className={stylos.input}
                  />
                  <br />
                </div>
                <div className={stylos.inputDiv}>
                  <h5>Favoris:</h5>
                  <div>
                    <Favlist resulty={userId} />
                  </div>
                </div>
                <button type="submit" value="Submit" className={stylos.btn}>
                  Submit
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
