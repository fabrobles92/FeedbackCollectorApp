import React from "react";
//Estamos pasando el props, pero unicamente capturando el object input que trae un monton de event handlers que determinan el funcionamiento de un input con redux-form, ahora este input recibe esas funciones, y esas funciones triggerean el valor capturado
//Esta es la forma para conectar un Field Component con un Custom componen hecho por nosotros.
export default ({input, title, meta: {error, touched}}) => {
    return(
        <div>            
            <label>{title}</label>
            <input {...input} style={{marginBottom:"2px"}}/>
            <div className="red-text" style={{marginBottom:"20px"}}>
                { touched && error } {/* Short circuit to display error in screen*/}
            </div>
            
        </div>
    );
}