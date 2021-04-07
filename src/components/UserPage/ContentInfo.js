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
      <h1>{props.user.email}</h1>

      <form action="" onSubmit={handleSubmit}>
        {haveName ? (
          <h5>
            {`${props.user.name.name} ${props.user.name.lastName} ${props.user.name.secondLastName}`}
          </h5>
        ) : (
          <div className="notFount">
            <h5>Aun no sabemos como te llamas</h5>
          </div>
        )}
        {edithName ? (
          <div id="fullNameForm-div">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChange}
              id=""
              placeholder="Tu nombre"
            />
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={onChange}
              id=""
              placeholder="Tu Apellido Paterno"
            />
            <input
              type="text"
              name="secondLastName"
              value={data.secondLastName}
              onChange={onChange}
              id=""
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

        {havePhone ? (
          <h5>{`Telefono: ${props.user.phone}`}</h5>
        ) : (
          <div className="notFount">
            <h5>Aun no sabemos a que numero podemos contactarte</h5>
          </div>
        )}
        {edithPhone ? (
          <input
            type="number"
            name="phone"
            value={data.phone}
            onChange={onChange}
            id=""
            placeholder="Telefono"
          />
        ) : (
          <button
            className="addField-button"
            onClick={() => edithField("phone")}
          >
            Editar
          </button>
        )}
        {haveBirthDay ? (
          <h5>{`Cumpleaños: ${props.user.birthDay.day}/${props.user.birthDay.month}/${props.user.birthDay.year}`}</h5>
        ) : (
          <div className="notFount">
            <h5>
              Aun no sabemos a que dia podemos felicitarte por tu cumpleaños
            </h5>
          </div>
        )}
        {edithBirthDay ? (
          <div className="birthDayForm-div">
            <select
              name="birthDayDay"
              onChange={onChange}
              value={data.birthDayDay}
              id=""
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
        <br />
        {edithName || edithPhone || edithBirthDay ? (
          <button className="submit-button">Guardar</button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ContentInfo;
