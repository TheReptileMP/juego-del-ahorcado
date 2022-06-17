//Declaracion de variables de uso global
//Variables asignadas a elementos de html
var pantalla = document.getElementById("tablero"); //Canvas
var btnComenzarPartida = document.getElementById("btn-comenzar-partida"); //Boton menu comenzar partida
var btnAgregarPalabra = document.getElementById("btn-agregar-palabra"); //Boton menu agregar palabra
var btnReglas = document.getElementById("btn-reglas"); //Boton menu reglas
var btnUno = document.getElementById("btn-1"); //Boton de opciones 1
var btnDos = document.getElementById("btn-2"); //Boton de opciones 2
var pincel = pantalla.getContext("2d"); //Contexto del canvas
//Fin variables asignadas a elementos html
var opcionMenu = 0;
var ancho = Math.round(pantalla.width);
var alto = Math.round(pantalla.height);
var formato = new RegExp('[a-zA-Z]+');
var formato2 = new RegExp('[A-Z]+');
var palabra = "";
var letras = [];
var cantGuiones = 0;
var errores = 0;
var aciertos = 0;
var j = 0; 
var n = 0;
var partidaFinalizada = 0;
var cantPalabrasAgregadas = 0;
var palabras = ["PRUEBA", "PROGRAMAR", "ALURA", "ONE", "CODIGO", "WEB", "ALGORITMO", "CIENCIA",
                    "IDEA", "DEDICACION", "PERSEVERAR"];

//Inicio funciones de los botones:
function comenzarPartida(){
    opcionMenu = 1;
    document.getElementById("caja-tablero").style.display = "flex";
    document.getElementById("menu-principal").style.display = "none";
    document.getElementById("caja-opciones").style.display = "flex";
    inicializar();
    mostrarGuiones();
    leerTecla();
    opcionBotones();
}

function menuPrincipal(){
    if(opcionMenu == 1){
        document.getElementById("caja-tablero").style.display = "none";
    } else if(opcionMenu == 2){
        document.getElementById("input-palabra").value = "";
        document.getElementById("agregar-palabra").style.display = "none";
    } else if(opcionMenu == 3){
        document.getElementById("reglas").style.display = "none";
        btnUno.style.display = "inline-block";
    }
    opcionMenu = 0;
    document.getElementById("menu-principal").style.display = "flex";
    document.getElementById("caja-opciones").style.display = "none";
}

function menuAgregarPalabra(){
    opcionMenu = 2;
    document.getElementById("menu-principal").style.display = "none";
    document.getElementById("agregar-palabra").style.display = "flex";
    document.getElementById("caja-opciones").style.display = "flex";
    document.getElementById("input-palabra").focus();
    document.getElementById("input-palabra").select();
    opcionBotones();
}

function mostrarReglas(){
    opcionMenu = 3;
    document.getElementById("menu-principal").style.display = "none";
    document.getElementById("reglas").style.display = "block";
    document.getElementById("caja-opciones").style.display = "flex";
    btnUno.style.display = "none";
    opcionBotones();
}

function opcionBotones(){
    switch(opcionMenu){
        case 1:
            btnUno.innerHTML = "Nuevo Juego";
            btnDos.innerHTML = "Abandonar";
            btnUno.onclick = comenzarPartida;
            btnDos.onclick = menuPrincipal;
            break;
        
        case 2:
            btnUno.innerHTML = "Agregar palabra";
            btnDos.innerHTML = "Regresar";
            btnUno.onclick = agregarPalabra;
            btnDos.onclick = menuPrincipal;
            break;

        case 3:
            btnDos.innerHTML = "Regresar";
            btnDos.onclick = menuPrincipal;
            break;

    }
}
//Fin funciones de los botones

//Inicio funcion inicializar juego
function inicializar(){
    palabra = "";
    letras = [];
    cantGuiones = 0;
    errores = 0;
    aciertos = 0;
    j = 0; 
    n = 0;
    partidaFinalizada = 0;

    if(localStorage.length > 0){
        for(var i=0; i < localStorage.length; i++){
            var key = localStorage.key(i);
            var item = localStorage.getItem(key);
            if(palabras.indexOf(item) == -1){
                palabras.push(item);
            }
        }
    }

    pincel.beginPath();
    pincel.clearRect(0,0,800,400);
    pincel.closePath();

    pincel.font = "15px fuente-tipo-crayon";
    pincel.fillStyle = "white";
    pincel.textAlign = "center";
    pincel.beginPath();
    pincel.fillText("Letras incorrectas", 690, 40);

    pincel.font = "25px fuente-tipo-crayon";
    pincel.fillStyle = "white";
    pincel.textAlign = "center";
    pincel.beginPath();
    pincel.fillText("El juego del ahorcado", 400, 30);
}
//Inicio funcion para generar palabra al azar
function generarPalabra(){
    palabra = palabras[Math.round(Math.random()*(palabras.length - 1))];
    return palabra;
}
//Fin funcion generar palabras al azar

//Inicio funcion generar guiones

function mostrarGuiones(){

    cantGuiones = generarPalabra().length;
    var anchoPalabra = Math.floor(400/cantGuiones);
    
    pincel.lineWidth = 4;
    pincel.lineCap = "round";
    pincel.lineJoin = "round";
    pincel.strokeStyle = "#FFFFFF";

    for(i=0; i < cantGuiones; i++){
        pincel.beginPath();
        pincel.moveTo((240 + (anchoPalabra * i)), 360);
        pincel.lineTo(270 + (anchoPalabra * i), 360);
        pincel.stroke();
        pincel.closePath();
    }
}

//Fin funcion generar guiones

//Inicio funcion detectar tecla

function leerTecla(){
    document.addEventListener('keydown', (event) => {
        var tecla = event.key;
        if(partidaFinalizada == 0){
            if(formato.test(tecla)){
                verificarLetra(tecla);
            }
        }        
      });
}

//Fin funcion detectar tecla

//Inicio funcion verificar letra
function verificarLetra(letra){
    var arrayPalabra = palabra.split('');
    var letra = letra.toUpperCase();    
    var posicion = 0;
    var posEncontrada = 0;
    var posiciones = [];
    if(arrayPalabra.indexOf(letra) != -1){
        if(letras.indexOf(letra) == -1){
            for(var i = 0; i < (arrayPalabra.length - 1); i++){
                if(posicion == 0){
                    posEncontrada = arrayPalabra.indexOf(letra);
                    if(posEncontrada != -1){
                        posiciones.push(posEncontrada);
                        posicion = posEncontrada + 1;
                    } else {
                        break;
                    }
                } else {
                    posEncontrada = arrayPalabra.indexOf(letra, posicion);
                    if(posEncontrada != -1){
                        posiciones.push(posEncontrada);
                        posicion = posEncontrada + 1;
                    } else {
                        break;
                    }
                }
            }
            dibujarLetraCorrecta(letra, posiciones);
            letras.push(letra);
            verificarGanador();
        }

    }  else {

        if(letras.indexOf(letra) == -1 && letra.length == 1){
            letras.push(letra);
            errores = errores + 1;
            dibujarLetraIncorrecta(letra, errores);
            dibujarHorca(errores);
        }
    }            
}

//Fin funcion verificar letra

//Inicio funcion dibujar letra correcta
function dibujarLetraCorrecta(letra, posiciones){
    
    pincel.font = "24px fuente-tipo-crayon";
    pincel.fillStyle = "white";
    var anchoPalabra = Math.floor(400/cantGuiones);

    if(letra == "I"){
        for(var i = 0; i < posiciones.length; i++){
            pincel.beginPath();
            pincel.fillText(letra, (253 + (anchoPalabra * posiciones[i])), 350);
            aciertos++;
        } 
    } else {
        for(var i = 0; i < posiciones.length; i++){
            pincel.beginPath();
            pincel.fillText(letra, (246 + (anchoPalabra * posiciones[i])), 350);
            aciertos++;
        }
    }
}
//Fin funcion dibujar letra correcta

//Inicio funcion dibujar letra incorrecta
function dibujarLetraIncorrecta(letra, errores){
    pincel.font = "24px fuente-tipo-crayon";
    pincel.fillStyle = "white";
    var errorX = [670, 700];
    var errorY = [90, 120, 150, 180];
    if(j >= 2){
        j = 0;
        n = n+1;
    }
    pincel.beginPath();
    pincel.fillText(letra, errorX[j], errorY[n]);
    j++;
}
//Fin funcion dibujar letra incorrecta

//Inicio funcion dibujar horca
function dibujarHorca(errores){
    pincel.lineWidth = 4;
    pincel.lineCap = "round";
    pincel.lineJoin = "round";
    pincel.strokeStyle = "#FFFFFF";
    switch(errores){
        case 1:
            pincel.beginPath();
            pincel.moveTo(50, 300);
            pincel.lineTo(280, 300);
            pincel.moveTo(100, 300);
            pincel.lineTo(100, 70);
            pincel.moveTo(100, 70);
            pincel.lineTo(190, 70);
            pincel.stroke();
            pincel.closePath();
            break;
        case 2:
            pincel.beginPath();
            pincel.moveTo(190, 70);
            pincel.lineTo(190, 100);
            pincel.stroke();
            pincel.closePath();
            break;
        case 3:
            pincel.beginPath();
            pincel.arc(190,120,20,0,2*Math.PI);
		    pincel.stroke();
            pincel.closePath();
            break;
        case 4:
            pincel.beginPath();
            pincel.moveTo(190, 140);
            pincel.lineTo(190, 200);
            pincel.stroke();
            pincel.closePath();
            break;
        case 5:
            pincel.beginPath();
            pincel.moveTo(190, 200);
            pincel.lineTo(210, 250);
            pincel.stroke();
            pincel.closePath();
            break;
        case 6:
            pincel.beginPath();
            pincel.moveTo(190, 200);
            pincel.lineTo(170, 250);
            pincel.stroke();
            pincel.closePath();
            break;
        case 7:
            pincel.beginPath();
            pincel.moveTo(190, 160);
            pincel.lineTo(220, 180);
            pincel.stroke();
            pincel.closePath();
            break;
        case 8:
            pincel.beginPath();
            pincel.moveTo(190, 160);
            pincel.lineTo(160, 180);
            pincel.stroke();
            pincel.closePath();
            finDelJuego();
            break;
    }
}
//Fin funcion dibujar horca

//Inicio funcion fin del juego

function finDelJuego(){
    partidaFinalizada = 1;
    pincel.font = "32px fuente-tipo-crayon";
    pincel.fillStyle = "white";
    pincel.textAlign = "center";
    pincel.beginPath();
    pincel.fillText("Has perdido.", 400, 200);
    pincel.fillStyle = "red";
    pincel.fillText("Fin del juego! :(", 400, 250);
}
//Fin funcion fin del juego

//Inicio funcion verificar ganador
function verificarGanador(){
    
    if(aciertos == palabra.length){
        partidaFinalizada = 1;
        pincel.font = "32px fuente-tipo-crayon";
        pincel.fillStyle = "white";
        pincel.textAlign = "center";
        pincel.beginPath();
        pincel.fillText("Adivinaste la palabra!", 400, 200);
        pincel.fillStyle = "green";
        pincel.fillText("Ganaste, felicidades! :)", 400, 250);
    }
}
//Fin funcion verificar ganador

//Inicio funcion agregar palabra
function agregarPalabra(){
    var palabraAgregada = document.getElementById("input-palabra").value;
    var charPalabraAgregada = palabraAgregada.split('');
    var condicion = true;
    for(var i = 0; i < palabraAgregada.length; i++){
        if(!formato2.test(charPalabraAgregada[i])){
            condicion = false;
            break;
        }
    }
    if(!condicion){
        alert("ERROR: La palabra agregada debe ser SOLO en mayusculas, sin numeros, simbolos o acentos!");
        document.getElementById("input-palabra").focus();
        document.getElementById("input-palabra").select();
    } else {
        if(palabras.indexOf(palabraAgregada) == -1){
            cantPalabrasAgregadas = localStorage.length;
            localStorage.setItem(cantPalabrasAgregadas, palabraAgregada);
            palabras.push(palabraAgregada);
            document.getElementById("input-palabra").value = "";
            alert("Palabra agregada exitosamente!");
        } else {
            alert("ERROR: Esa palabra ya se encuentra agregada!");
            document.getElementById("input-palabra").focus();
            document.getElementById("input-palabra").select();
        }
    }
}
//Fin codigo funcion agregar palabra
//Codigo que se ejecuta fuera de funciones "escucha de botones"
btnComenzarPartida.onclick = comenzarPartida;
btnAgregarPalabra.onclick = menuAgregarPalabra;
btnReglas.onclick = mostrarReglas;