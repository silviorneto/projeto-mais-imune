import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import UserCardContainer from "../../components/UserCardContainer";
import jwt_decode from "jwt-decode";

import { Container } from "./styles";
import api from "../../services/api";
import MenuAside from "../../components/MenuAside";
import MenuProfile from "../../components/MenuProfile";
import { useHistory } from "react-router";
import { motion } from "framer-motion";

function Dashboard() {
  const [user, setUser] = useState();

  const token = localStorage.getItem("token") || "";

  const user_id = jwt_decode(token).sub;

  const history = useHistory();
  const permission = JSON.parse(localStorage.getItem("permission")) || 1;

  useEffect(() => {
    if (permission === 3) {
      history.push("/dashboard");
    }
    if (permission === 2) {
      history.push("/registro-vacina");
    }

    api
      .get(`/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="flex"
      initial={{ translateY: "-100%" }}
      animate={{ translateY: "0%" }}
      transition={{ duration: 0.5 }}
    >
      <MenuAside />
      <Container>
        <h2>Minhas Vacinas</h2>
        <Header />
        <UserCardContainer user={user} />
      </Container>
      <MenuProfile user={user} />
    </motion.div>
  );
}

export default Dashboard;
