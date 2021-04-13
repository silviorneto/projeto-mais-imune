import { useState, useEffect } from "react";

import Button from "../Button";
import api from "../../services/api";
import Modal from "../Modal";
import FormVacinaUser from "../form-vacina-user";
import { InputData } from "../form-vacina-user/style";
import { Conteiner, BoldText, TextConteiner, InputConteiner } from "./style";

const PatientSearch = () => {
  const [search, setSearch] = useState(false);
  const [cpf, setCpf] = useState();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  let token = localStorage.getItem("token") || "";

  const handleClick = () => {
    api
      .get(`/users?cpf=${cpf}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => console.log(e));
    setTimeout(function () {
      setSearch(true);
    }, 1000);
    console.log(user);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <InputConteiner>
        <InputData
          type="text"
          placeholder="digite seu cpf"
          onChange={(e) => setCpf(e.target.value)}
        ></InputData>
        <Button text="Buscar" handleClick={handleClick} />
      </InputConteiner>
      {search ? (
        cpf ? (
          <Conteiner>
            <TextConteiner>
              <h2>Dados do usuario</h2>
              <BoldText>Nome: {user[0]?.name}</BoldText>
              <BoldText>CPF: {user[0]?.cpf}</BoldText>
            </TextConteiner>

            <Modal open={open} handleClose={() => setOpen(!open)}>
              <FormVacinaUser userInfo={user}></FormVacinaUser>
            </Modal>
            <Button
              text="Registrar Vacinação"
              handleClick={() => setOpen(true)}
            ></Button>
          </Conteiner>
        ) : (
          <BoldText>pagina nao encontrada</BoldText>
        )
      ) : null}
    </div>
  );
};
export default PatientSearch;