import axios from "axios";
import Cookies from "universal-cookie";

import "./CardDirection.css";

const cookies = new Cookies();

const CardDirection = (props) => {
  const dropDirection = async (idDirection) => {
    const queryToDelete = { idDirection: idDirection };
    const queryToDrop = { idUser: cookies.get("id"), idDirection: idDirection };
    await axios.delete(`${process.env.REACT_APP_URI_PREFIX_USE}directions/`, {
      params: queryToDelete,
    });
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/dropDirection`,
      queryToDrop
    );
    props.getUser();
  };

  return (
    <div className="cardDirection-div">
      <h6 className="cardDirection-name">{props.direction.fullName}</h6>
      <h6 className="cardDirection-phone">{props.direction.phoneNumber}</h6>
      <div className="cardDirectiondirection-div">
        <p className="cardDirectiondirection-direction">{`${props.direction.streetNumber} Col. ${props.direction.suburb} C.P.${props.direction.CP}`}</p>
      </div>
      {props.from === "UserInfo" ? (
        <div className="cardDirectionButtons-div">
          <button
            className="cardDirectionButtons-edithButton"
            onClick={() => props.formDisplay(props.direction)}
          >
            Editar
          </button>
          <button
            className="cardDirectionButtons-dropButton"
            onClick={() => dropDirection(props.direction._id)}
          >
            Eliminar
          </button>
        </div>
      ) : (
        <button onClick={() => props.selectDirection(props.direction)}>
          A esta Direccion
        </button>
      )}
    </div>
  );
};

export default CardDirection;
