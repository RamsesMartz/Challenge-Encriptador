/*Autor: Ramses Martinez*/


const llaveA = ["ai","enter","imes","ober","ufat"];
const llaveB = ["a","e","i","o","u"];

function inicio(){
    console.log("c");
    let areatexto = document.getElementById("texto-a-encriptar"); 
    if(window.screen.availWidth <= 375){        
        areatexto.addEventListener("input",tipear);
        tipearResultado = ()=>{masAltura("texto-resultado",432);};
        tipear();
        tipearResultado();
        }else{
        areatexto.removeEventListener("input",tipear);
        tipearResultado = ()=>{};
        areatexto.style="height:''";
        document.getElementById("texto-resultado").style="height:''";
    }
}

function masAltura(ide,maxh){
    let h = document.getElementById(ide);    
    let hc = h.clientHeight;
    let hs = h.scrollHeight;        
    console.log(hs);
    console.log(hc);    
    // console.log("actual "+h.style.height);    
    if(hs != hc && hs <= maxh){                
        h.style.height = h.scrollHeight + "px";                
    }else if(hs > maxh){
        h.style.height = maxh + "px";                
    }else{
        if(capturar() == ''){
            console.log("vacio");
            h.style="height:''";
        }
    }
}

function tipear(){
    masAltura("texto-a-encriptar",624);
}

function tipearResultado(){      
        
}

function capturar(){ /*captura el texto del contenedor*/
    return document.getElementById("texto-a-encriptar").value;
}

function escribir(texto){
    document.getElementById("id-mensaje").style.display="none";
    document.getElementById("id-resultado").style.display="block";
    document.getElementById("texto-resultado").value = texto;

}

function sinTexto(){
    document.getElementById("id-mensaje").style.display="block";
    document.getElementById("id-resultado").style.display="none";
    document.getElementById("texto-resultado").value = "";

}

function validar(texto){    
    return /[^a-z !]/.test(texto); /*si es válido regresa si no termina*/
}

function convertirToArreglo(texto){    /*devuelve el arreglo de la cadena de texto*/
    return texto.split('');
}

function getLlave(termino){ /*devuelve el término o llave*/ 
    let res = "";
    let encriptadas = llaveA
    let aEncriptar = llaveB
    for(let i = 0; i < aEncriptar.length; i++){
        if(termino == aEncriptar[i]){
            res = encriptadas[i];
            break;
        }else if(termino == encriptadas[i]){
            res = aEncriptar[i];
            break;
        }else{
            res = 0;
        }
    }
    return res;
}

function getTermino(arreglo, indice, llave){
    let res = -1;
    let temp = [];
    let contador = [];    
    for(let i = 0; i < llave.length; i++){   //recorre llaves 
        temp = convertirToArreglo(llave[i]);  //recorre determinada llave     
        for(let j = 0; j < temp.length; j++){   //recorre caracteres de llave
            if(arreglo[indice + j] == temp[j]){  //compara char a char de arreglo                                                    
                contador.push(temp[j]);     //guarda coincidencias 
                if(contador.length == temp.length){
                    res = contador.toString().replace(/,/g, '');  // = llave == mayor                  
                    contador = [];     // borra para testear siguiente                   
                }  
            }else{                   
                break;      //temina for si no coincide termino
            }
        }                
    }
    if(res.length > 0){   //modifica e imprime resultado
        arreglo.splice(indice,res.length,getLlave(res));
    }
    return;
}

function encAmbivalente(llave){   //recorre cada letra del area de texto    
    let capturado = capturar();
    if(capturado != ""){
        if(!validar(capturado)){
            let arreglo = convertirToArreglo(capturado);
            for(let i = 0; i < arreglo.length; i++){
                getTermino(arreglo,i,llave);        
            }
            escribir(arreglo.toString().replace(/,/g,''));
        }else{
            Swal.fire({
                title: "Solo letras minúsculas y sin acentos",
                icon:"warning",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });   
        }
    }else{
        sinTexto();
    }
    return;
}

function desencriptar(){
    encAmbivalente(llaveA);        
    tipearResultado();
    return;
}

function encriptar(){
    encAmbivalente(llaveB);  
    tipearResultado();   
    return;
}

function copiarAPortapapeles(){
    let resultado = document.getElementById("texto-resultado");    
    resultado.select();    
    navigator.clipboard.writeText(resultado.value);
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Copiado al Portapapeles"
      });
}

inicio();


