import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import "../CssComponents/ContentInfo.css";

const cookies = new Cookies();

export default class ContentInfo extends Component {
  state = {
    haveName: false,
    havePhone: false,
    haveBirthDay: false,
    edithName: false,
    edithPhone: false,
    edithBirthDay: false,
    name: "",
    lastName: "",
    secondLastName: "",
    phone: 0,
    days: [],
    months: [],
    years: [],
    birthDayDay: 0,
    birthDayMonth: 0,
    birthDayYear: 0,
  };

  componentDidMount() {
    this.initializeBolleans();
    this.fillDayMonthYearArray();
  }

  fillDayMonthYearArray = () => {
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
    this.setState({
      days,
      months,
      years,
    });
  };

  initializeBolleans = () => {
    const haveName = this.props.user.name.name.length > 0 ? true : false;
    const havePhone = this.props.user.phone.length > 0 ? true : false;
    const haveBirthDay = this.props.user.birthDay.day > 0;
    this.setState({
      haveName,
      havePhone,
      haveBirthDay,
      name: this.props.user.name.name,
      lastName: this.props.user.name.lastName,
      secondLastName: this.props.user.name.secondLastName,
      phone: this.props.user.phone,
      birthDayDay: this.props.user.birthDay.day,
      birthDayMonth: this.props.user.birthDay.month,
      birthDayYear: this.props.user.birthDay.year,
    });
  };

  edithField = (field) => {
    switch (field) {
      case "name":
        this.setState({
          edithName: true,
        });
        break;
      case "phone":
        this.setState({
          edithPhone: true,
        });
        break;
      case "birthDay":
        this.setState({
          edithBirthDay: true,
        });
        break;
      default:
        break;
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const infoToUpdate = {
      idUser: cookies.get("id"),
      userInfo: {
        name: {
          name: this.state.name,
          lastName: this.state.lastName,
          secondLastName: this.state.secondLastName,
        },
        phone: this.state.phone,
        birthDay: {
          day: this.state.birthDayDay,
          month: this.state.birthDayMonth,
          year: this.state.birthDayYear,
        },
      },
    };
    await axios.put(
      `${process.env.REACT_APP_URI_PREFIX_USE}users/user`,
      infoToUpdate
    );
    window.location.reload(true);
  };

  render() {
    return (
      <div id="contentOptionInfo-div">
        <h1>{this.props.user.email}</h1>

        <form action="" onSubmit={this.handleSubmit}>
          {this.state.haveName ? (
            <h5>
              {`${this.props.user.name.name} ${this.props.user.name.lastName} ${this.props.user.name.secondLastName}`}
            </h5>
          ) : (
            <div className="notFount">
              <h5>Aun no sabemos como te llamas</h5>
            </div>
          )}
          {this.state.edithName ? (
            <div id="fullNameForm-div">
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                id=""
                placeholder="Tu nombre"
              />
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.onChange}
                id=""
                placeholder="Tu Apellido Paterno"
              />
              <input
                type="text"
                name="secondLastName"
                value={this.state.secondLastName}
                onChange={this.onChange}
                id=""
                placeholder="Tu Apellido Materno"
              />
            </div>
          ) : (
            <button
              className="addField-button"
              onClick={() => this.edithField("name")}
            >
              Editar
            </button>
          )}

          {this.state.havePhone ? (
            <h5>{`Telefono: ${this.props.user.phone}`}</h5>
          ) : (
            <div className="notFount">
              <h5>Aun no sabemos a que numero podemos contactarte</h5>
            </div>
          )}
          {this.state.edithPhone ? (
            <input
              type="number"
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
              id=""
              placeholder="Telefono"
            />
          ) : (
            <button
              className="addField-button"
              onClick={() => this.edithField("phone")}
            >
              Editar
            </button>
          )}
          {this.state.haveBirthDay ? (
            <h5>{`Cumpleaños: ${this.props.user.birthDay.day}/${this.props.user.birthDay.month}/${this.props.user.birthDay.year}`}</h5>
          ) : (
            <div className="notFount">
              <h5>
                Aun no sabemos a que dia podemos felicitarte por tu cumpleaños
              </h5>
            </div>
          )}
          {this.state.edithBirthDay ? (
            <div className="birthDayForm-div">
              <select
                name="birthDayDay"
                onChange={this.onChange}
                value={this.state.birthDayDay}
                id=""
              >
                {this.state.days.map((day) => {
                  return (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  );
                })}
              </select>
              <select
                name="birthDayMonth"
                onChange={this.onChange}
                value={this.state.birthDayMonth}
                id=""
              >
                {this.state.months.map((month) => {
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
              <select
                name="birthDayYear"
                onChange={this.onChange}
                value={this.state.birthDayYear}
                id=""
              >
                {this.state.years.map((year) => {
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
              onClick={() => this.edithField("birthDay")}
            >
              Editar
            </button>
          )}
          <br />
          {this.state.edithName ||
          this.state.edithPhone ||
          this.state.edithBirthDay ? (
            <button className="submit-button">Guardar</button>
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}
