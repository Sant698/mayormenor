var intentos = 0; //Intentos realizados
const MAXIMO_INT = 20; //Máximo de intentos posibles
var limiteI = 0;
var limiteS = 127;
var punteroI = limiteI; //Puntero de búsqueda binaria
var punteroS = limiteS; //Puntero de búsqueda binaria
var nSecreto = 0; //Número secreto

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function modificarLim()
{
    let limite = prompt("Establezca el nuevo límite superior:", "127");

    limite = parseInt(limite);

    if (limite == NaN)
    {
        alert("El valor ingresado no es un número válido.");
        return;
    }
    else
    {
        if (limite >= 10 && limite <= 1000000 )
        {
            limiteS = limite;
            document.getElementById("mensajeRango").innerText = "Tenés que adivinar un número entre " + limiteI + " y " + limiteS + ", antes de que lo haga la computadora, para ganar la partida.";
        }
        else
        {
            alert("El valor del límite debe encontrarse entre 10 y 1.000.000.");
            return;
        }   
    }
}

function inicializar()
{
    //Prepara los aspectos gráficos de la partida
    document.getElementById("jugadas1").innerHTML = "";
    document.getElementById("jugadas2").innerHTML = "";

    document.getElementById("opciones").className = "inicial";
    
    document.getElementById("limiteB").style.display = "block";
    document.getElementById("arriesgarB").style.display = "none";

    document.getElementById("tituloOP").innerText = "Esperando a que inicies la partida";
    document.getElementById("mensajeRango").innerText = "Tendrás que adivinar un número entre " + limiteI + " y " + limiteS + ", antes de que lo haga la computadora, para ganar la partida.";
    document.getElementById("mensajeInt").innerText = "Se te dará un máximo de " + MAXIMO_INT + " intentos.";
}

function nuevoJuego()
{
    //Prepara las variables globales del juego
    intentos = 0;
    punteroI = limiteI;
    punteroS = limiteS;
    nSecreto = getRandomArbitrary(limiteI, limiteS);

    //Prepara los aspectos gráficos de la partida
    document.getElementById("jugadas1").innerHTML = "";
    document.getElementById("jugadas2").innerHTML = "";

    document.getElementById("opciones").className = "nuevo";

    document.getElementById("limiteB").style.display = "none";
    document.getElementById("arriesgarB").style.display = "block";

    document.getElementById("tituloOP").innerText = "¡¡ Nuevo Juego !!";
    document.getElementById("mensajeRango").innerText = "Tenés que adivinar un número entre " + limiteI + " y " + limiteS + ", antes de que lo haga la computadora, para ganar la partida.";
    document.getElementById("mensajeInt").innerText = "Usaste 0 de " + MAXIMO_INT + " intentos.";
}

//Genera el aleatorio que va a arriesgar la computadora (usando búsqueda binaria)
function generaAleatorioC()
{
    let apuntado =  Math.floor((punteroI + punteroS) / 2); //Búsqueda binaria
    if (apuntado > nSecreto)
        punteroS = apuntado;
    if (apuntado < nSecreto)
        punteroI = apuntado;
    return apuntado;
}

//Mostrar los números ocultos de la computadora al jugador
function mostrarOcultos()
{
    let datosFAL = document.getElementsByClassName("DatoNroFAL");
    let datosCompFAL = document.getElementsByClassName("DatoCompFAL");
    let datos = document.getElementsByClassName("DatoNro");
    let datosComp = document.getElementsByClassName("DatoComp");

    for (let i = 0; i < datosFAL.length; i++)
    {
        datosFAL[i].style.display = "none";
        datosCompFAL[i].style.display = "none";
    }

    for (let y = 0; y < datos.length; y++)
    {
            datos[y].style.display = "block";
            datosComp[y].style.display = "block";
    }
    
}

//Muestra los botones al final de la partida
function mostrarBotonesF()
{
    document.getElementById("arriesgarB").style.display = "none";
    document.getElementById("limiteB").style.display = "block";
}

function veredicto(numeroH, numeroC, nh, nc, datoComp, datoComp2)
{
    if (numeroH > nSecreto)
    {
        datoComp.innerText = "Mayor";
    }
    else if (numeroH < nSecreto){
        datoComp.innerText = "Menor";
    }
    else //GANADOR
    {
        nh.className = "numeroIGUAL";
        datoComp.innerText = "Igual";
        mostrarBotonesF();
    }

    if (nSecreto < numeroC)
    {
        datoComp2.innerText = "Mayor";
        punteroS = numeroC;
    }
    else if (nSecreto > numeroC){
        datoComp2.innerText = "Menor";
        punteroI = numeroC;
    }
    else //GANADOR 
    {
        nc.className = "numeroIGUAL";
        datoComp2.innerText = "Igual";
        mostrarBotonesF();
    }

    if (numeroC == numeroH)
    {
        if (numeroC == nSecreto) //Empate: ambos ganan
        {
            document.getElementById("tituloOP").innerText = "¡¡ Empate !! (Ambos ganaron)";
            document.getElementById("mensajeRango").innerText = "Ambos adivinaron entre: " + limiteI + " y " + limiteS + ", el número secreto.";
            document.getElementById("opciones").className = "empate";
            mostrarOcultos();
            mostrarBotonesF();
        }
    }
    else
    {
        if (numeroH == nSecreto)
        {
            document.getElementById("tituloOP").innerText = "¡¡ Ganaste !!";
            document.getElementById("mensajeRango").innerText = "Adivinaste entre: " + limiteI + " y " + limiteS + ", el número secreto.";
            document.getElementById("opciones").className = "ganador";
            mostrarOcultos();
            mostrarBotonesF();
        }
        else if (numeroC == nSecreto)
        {
            document.getElementById("tituloOP").innerText = "¡¡ Perdiste !!";
            document.getElementById("mensajeRango").innerText = "La computadora adivinó entre: " + limiteI + " y " + limiteS + ", el número secreto.";
            document.getElementById("opciones").className = "perdedor";
            mostrarOcultos();
            mostrarBotonesF();
        }
        else
        {
             if (intentos >= MAXIMO_INT) //Perdió por límite de intentos              
             {
                document.getElementById("tituloOP").innerText = "¡¡ Empate !! (Ambos perdieron)";
                document.getElementById("mensajeRango").innerText = "No lograron adivinar: " + limiteI + " y " + limiteS + ", el número secreto. Se acabaron los intentos.";
                document.getElementById("opciones").className = "empate";
                mostrarOcultos();
                mostrarBotonesF();
             }
        }
    }

}

function busquedaBinaria()
{
    return Math.floor((punteroI + punteroS) / 2);
}

function arriesgarNro()
{
    let numeroH = prompt("Arriesgá un número:", "0");

    if (numeroH != null)
    {
        numeroH = parseInt(numeroH);

        if (numeroH == NaN)
        {
            alert("El valor ingresado no es un número válido.");
            return;
        }

        if (numeroH >= limiteI && numeroH <= limiteS)
        {
            if (intentos == 0)
                document.getElementById("tituloOP").innerText = "Partida iniciada";
            
            ++intentos; //Aumenta el contador de intentos
            document.getElementById("mensajeInt").innerText = "Usaste " + intentos + " de " + MAXIMO_INT + " intentos.";
            
            //Agregar jugadas
            let jugadas1 = document.getElementById("jugadas1");
            let jugadas2 = document.getElementById("jugadas2");

            const nh = document.createElement("div");
            nh.className = "numero";
            nh.id = "nh" + intentos;

            const datoNro = document.createElement("span");
            datoNro.innerText = numeroH;
            datoNro.className = "DatoNro";
            datoNro.id = "nh" + intentos + "Val";

            const datoComp = document.createElement("span");
            datoComp.innerText = "-";
            datoComp.className = "DatoComp";
            datoComp.id = "nh" + intentos + "Comp";

            jugadas1.appendChild(nh);
            nh.appendChild(datoNro);
            nh.appendChild(datoComp);

            const nc = document.createElement("div");
            nc.className = "numero";
            nc.id = "nc" + intentos;

            const datoNro2 = document.createElement("span");
            datoNro2.innerText = "????";
            datoNro2.className = "DatoNro";
            datoNro2.id = "nc" + intentos + "Val";
            datoNro2.style.display = "none";

            const datoComp2 = document.createElement("span");
            datoComp2.innerText = "----";
            datoComp2.className = "DatoComp";
            datoComp2.id = "nc" + intentos + "Comp";
            datoComp2.style.display = "none";

            const datoNro2FAL = document.createElement("span");
            datoNro2FAL.innerText = "????";
            datoNro2FAL.className = "DatoNroFAL";
            datoNro2FAL.id = "nc" + intentos + "ValFAL";

            const datoComp2FAL = document.createElement("span");
            datoComp2FAL.innerText = "----";
            datoComp2FAL.className = "DatoCompFAL";
            datoComp2FAL.id = "nc" + intentos + "CompFAL";

            jugadas2.appendChild(nc);
            nc.appendChild(datoNro2);
            nc.appendChild(datoComp2);
            nc.appendChild(datoNro2FAL);
            nc.appendChild(datoComp2FAL); 

            let numeroC = busquedaBinaria();
            datoNro2.innerText = numeroC;

            veredicto(numeroH, numeroC, nh, nc, datoComp, datoComp2);
        }
        else
        {
            alert("El número debe encontrarse entre los valores: " + limiteI + " y " + limiteS + ".");
            return;
        }
    }
    else
    {
        alert("El valor ingresado no es un número válido.");
        return;
    }
}
