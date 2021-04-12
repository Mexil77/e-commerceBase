import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "./ContentInfo.css";

const cookies = new Cookies();

const ContentInfo = (props) => {
  const [haveName, setHaveName] = useState(false);
  const [havePhone, setHavePhone] = useState(false);
  const [haveBirthDay, setHaveBirthDay] = useState(false);
  const [edithName, setEdithName] = useState(false);
  const [edithPhone, setEdithPhone] = useState(false);
  const [edithBirthDay, setedithBirthDay] = useState(false);
  const [data, setData] = useState({
    name: "",
    lastName: "",
    secondLastName: "",
    phone: 0,
    birthDayDay: 0,
    birthDayMonth: 0,
    birthDayYear: 0,
  });
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    initializeBolleans();
    fillDayMonthYearArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fillDayMonthYearArray = () => {
    let days = [];
    let months = [];
    let years = [];
    for (let i = 0; i < 31; i++) {
      days[i] = i + 1;
    }
    for (let i = 0; i < 12; i++) {
      months[i] = i + 1;
    }
    for (let i = 0; i < 102; i++) {
      years[i] = i + 1920;
    }
    setDays(days);
    setMonths(months);
    setYears(years);
  };

  const initializeBolleans = () => {
    const haveName = props.user.name.name.length > 0 ? true : false;
    const havePhone = props.user.phone.length > 0 ? true : false;
    const haveBirthDay = props.user.birthDay.day > 0;
    setHaveName(haveName);
    setHavePhone(havePhone);
    setHaveBirthDay(haveBirthDay);
    setData({
      name: props.user.name.name,
      lastName: props.user.name.lastName,
      secondLastName: props.user.name.secondLastName,
      phone: props.user.phone,
      birthDayDay: props.user.birthDay.day,
      birthDayMonth: props.user.birthDay.month,
      birthDayYear: props.user.birthDay.year,
    });
  };

  const edithField = (field) => {
    switch (field) {
      case "name":
        setEdithName(true);
        break;
      case "phone":
        setEdithPhone(true);
        break;
      case "birthDay":
        setedithBirthDay(true);
        break;
      default:
        break;
    }
  };

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  /* const imprimeState = () => {
    console.log(data);
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const infoToUpdate = {
      idUser: cookies.get("id"),
      userInfo: {
        name: {
          name: data.name,
          lastName: data.lastName,
          secondLastName: data.secondLastName,
        },
        phone: data.phone,
        birthDay: {
          day: data.birthDayDay,
          month: data.birthDayMonth,
          year: data.birthDayYear,
        },
      },
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/user`,
      infoToUpdate
    );
    setEdithName(false);
    setEdithPhone(false);
    setedithBirthDay(false);
    props.getUser();
  };

  return (
    <div id="contentOptionInfo-div">
      <h1 className="text-5xl">Tu info</h1>

      <form id="contentOptionInfo-form" action="" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="textUserInfo-div">
            {haveName ? (
              <h5>
                {`${props.user.name.name} ${props.user.name.lastName} ${props.user.name.secondLastName}`}
              </h5>
            ) : (
              <h5>Aun no sabemos como te llamas</h5>
            )}
          </div>
          <div className="formInput-div">
            {edithName ? (
              <div id="fullNameForm-div">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={onChange}
                  id=""
                  className="fullNameForm-input"
                  placeholder="Tu nombre"
                />
                <input
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={onChange}
                  id=""
                  className="fullNameForm-input"
                  placeholder="Tu Apellido Paterno"
                />
                <input
                  type="text"
                  name="secondLastName"
                  value={data.secondLastName}
                  onChange={onChange}
                  id=""
                  className="fullNameForm-input"
                  placeholder="Tu Apellido Materno"
                />
              </div>
            ) : (
              <button
                className="addField-button"
                onClick={() => edithField("name")}
              >
                Editar
              </button>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="textUserInfo-div">
            {havePhone ? (
              <h5>{`Telefono: ${props.user.phone}`}</h5>
            ) : (
              <h5>Aun no sabemos a que numero podemos contactarte</h5>
            )}
          </div>
          <div className="formInput-div">
            {edithPhone ? (
              <div id="phoneForm-div">
                <input
                  type="number"
                  name="phone"
                  value={data.phone}
                  onChange={onChange}
                  id=""
                  placeholder="Telefono"
                  className="fullNameForm-input"
                />
              </div>
            ) : (
              <button
                className="addField-button"
                onClick={() => edithField("phone")}
              >
                Editar
              </button>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="textUserInfo-div">
            {haveBirthDay ? (
              <h5>{`Cumpleaños: ${props.user.birthDay.day}/${props.user.birthDay.month}/${props.user.birthDay.year}`}</h5>
            ) : (
              <h5>
                Aun no sabemos a que dia podemos felicitarte por tu cumpleaños
              </h5>
            )}
          </div>
          <div className="formInput-div">
            {edithBirthDay ? (
              <div id="birthDayForm-div">
                <select
                  name="birthDayDay"
                  onChange={onChange}
                  value={data.birthDayDay}
                  id=""
                  className="fullNameForm-input"
                >
                  {days.map((day) => {
                    return (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="birthDayMonth"
                  onChange={onChange}
                  value={data.birthDayMonth}
                  id=""
                  className="fullNameForm-input"
                >
                  {months.map((month) => {
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="birthDayYear"
                  onChange={onChange}
                  value={data.birthDayYear}
                  id=""
                  className="fullNameForm-input"
                >
                  {years.map((year) => {
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <button
                className="addField-button"
                onClick={() => edithField("birthDay")}
              >
                Editar
              </button>
            )}
          </div>
        </div>
        <br />
        {edithName || edithPhone || edithBirthDay ? (
          <div id="submitButton-div">
            <button id="submit-button">Guardar</button>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ContentInfo;
