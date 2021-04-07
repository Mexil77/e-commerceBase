import "./FormAddDirection.css";

const FormAddDirection = (props) => {
  return (
    <div id="formAddDirection-div">
      <h1>Form</h1>
      <form
        id="formAddDirection-form"
        action=""
        onSubmit={
          props.addDirection ? props.handleSubmitAdd : props.handleSubmitEdith
        }
      >
        <div className="formAddDirection-colum">
          <label htmlFor="fullName">Nombre:</label>
          <input
            type="text"
            name="fullName"
            value={props.state.fullName}
            placeholder="Juan Paredes Rios"
            onChange={props.onChange}
          />
          <label htmlFor="streetNumber">Calle y Numero:</label>
          <input
            type="text"
            name="streetNumber"
            value={props.state.streetNumber}
            placeholder="Ej. San Martin #35 int 3"
            onChange={props.onChange}
          />
          <label htmlFor="CP">Codigo Postal:</label>
          <input
            type="number"
            name="CP"
            value={props.state.CP !== 0 ? props.state.CP : ""}
            placeholder="Ej. 24536"
            onChange={props.onChange}
          />
          <label htmlFor="state">Estado:</label>
          <input
            type="text"
            name="state"
            value={props.state.state}
            placeholder="Ej. Michoacan"
            onChange={props.onChange}
          />
        </div>
        <div className="formAddDirection-colum">
          <label htmlFor="city">Ciudad/Municipio:</label>
          <input
            type="text"
            name="city"
            value={props.state.city}
            placeholder="Ej. Morelia"
            onChange={props.onChange}
          />
          <label htmlFor="suburb">Colonia:</label>
          <input
            type="text"
            name="suburb"
            value={props.state.suburb}
            placeholder="Ej. Chapultepec Norte"
            onChange={props.onChange}
          />
          <label htmlFor="phoneNumber">Telefono:</label>
          <input
            type="number"
            name="phoneNumber"
            value={props.state.phoneNumber !== 0 ? props.state.phoneNumber : ""}
            placeholder="4433568421"
            onChange={props.onChange}
          />
          <label htmlFor="instructions">Instrucciones:</label>
          <input
            type="text"
            name="instructions"
            value={props.state.instructions}
            placeholder="Entre las Calles avasolo y Av. Solidaridad"
            onChange={props.onChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default FormAddDirection;
