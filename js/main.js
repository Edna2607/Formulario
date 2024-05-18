import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import { tiposError, mensajes } from "./customErrors.js";

/*En esta constante de campoDeFormulario vamos a guardar todos los elementos HTML que tengan el atributo required */
const campoDeFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]")
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); /*prevenir el comportamiento por defecto en un formulario lo cual es recargar la pagina cuando este se procesa y se envia y con esto vamos a evitar que el formulario se recargue o la pagina se recargue cuando le damos en el boton enviar*/

    const listaRespuestas = {
        /*aqui se guarda cada uno de los elementos o campos de nuestro formularioa traves del elemento e y su target y sus elements que vamos a pasarle cada uno de los valores de los campos de nuestro formulario y vamos a traernos su valor y vamos a guardarlo  */
        nombre: e.target.elements["nombre"].value,
        email: e.target.elements["email"].value,
        identificacion: e.target.elements["identificacion"].value,
        cuil: e.target.elements["cuil"].value,
        fecha_nacimiento: e.target.elements["fecha_nacimiento"].value,

    }
    localStorage.setItem("registro", JSON.stringify(listaRespuestas))

    window.location.href = "./abrir-cuenta-form-2.html"; /*si todo es valido se dirige a la nueva ventana de reconocimiento facial */
})


campoDeFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault()) /*Este metodo preventDefault lo que hace es que cuando escuche el evento "invalid" (o cuando el campo sea invalido) entonces va disparar esta funcion y este evento va prevenir el comportamiento por defecto */
});




function verificarCampo(campo) {
    let mensaje = "";
    campo.setCustomValidity("")

    if (campo.name == "cuil" && campo.value.length >= 11) {
        esUnCuil(campo)
    }
    if (campo.name == "fecha_nacimiento" && campo.value != "") {
        esMayorDeEdad(campo)
    }
    //console.log(campo.validity);
    tiposError.forEach(error => {

        if (campo.validity[error]) {
            mensaje = mensajes[campo.name][error]
            console.log(mensaje);
        }
    })

    const mensajeError = campo.parentNode.querySelector(".mensaje-error");
    const validarInputCheck = campo.checkValidity()

    if (!validarInputCheck) {
        mensajeError.textContent = mensaje
    } else {
        mensajeError.textContent = "";
    }
}