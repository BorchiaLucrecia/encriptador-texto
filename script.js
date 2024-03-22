
const ingresoTxt = document.getElementById("ingresoTxt");
const btEncriptar = document.getElementById("btEncriptar");
const btDesencriptar = document.getElementById("btDesencriptar");
const btCopiar = document.getElementById("btCopiar");
const mensajeIzq = document.getElementById("mensajeIzq");
const munheco = document.getElementById("munheco");
const info = document.getElementById("info");
const seccionSecundario = document.getElementById("seccionSecundario");

const regex = /[^a-z0-9\s]/;

let reemplazar = [
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"],
];

const replace = (txt) => {
    mensajeIzq.innerHTML = txt;

    munheco.classList.add("oculto");

    ingresoTxt.value = "";
    info.style.display = 'none';
    btCopiar.style.display = 'block';
    mensajeIzq.classList.add("ajustar");
}

const limpiar = () => {
    mensajeIzq.textContent = "";

    munheco.classList.remove("oculto");
    info.style.display = "block";
    btCopiar.style.display = "none";
    mensajeIzq.classList.remove("ajustar");
    ingresoTxt.focus();
}

btEncriptar.addEventListener("click", () => {
    const texto = ingresoTxt.value.toLowerCase();
    if(texto !=""){
        if(regex.test(texto)){
            Swal.fire({
             icon:"error", 
             title:"Oops...", 
             text:"El texto no debe contener caracteres especiales ni acentos."
            });
            return;
        }

        function encriptar (newTxt){
            let resultado = "";

            for (let i = 0; i < newTxt.length; i++){
                let letra = newTxt[i];
                let reemplazo = "";
                for (let j=0; j< reemplazar.length; j++){
                    if (letra === reemplazar [j][0]){
                    reemplazo = reemplazar [j][1];
                    break;
                    }
                }
                if ( reemplazo !== ""){
                    resultado += reemplazo;
                }else{
                    resultado += letra;
                }
            }
            return resultado;
        };
        replace (encriptar(texto));
    }else{
        Swal.fire({ 
            icon:"error", 
            title:"Oops...", 
            text:"Ingrese texto a encriptar, en minúscula y sin acento ."
        });
        limpiar();
    }
});

btDesencriptar.addEventListener("click", () =>{
    const texto = ingresoTxt.value.toLowerCase();
    if(texto != ""){
        if(regex.test(texto)){
            Swal.fire({ 
                icon:"error", 
                title:"Oops...",
                text:"El texto no debe contener caracteres especiales ni acentos."
            });
            return;
        }
        function desencriptar(newTxt) {
            for(let i = 0; i< reemplazar.length; i++) {
                if(newTxt.includes(reemplazar[i][1])){
                    newTxt = newTxt.replaceAll(reemplazar[i][1],reemplazar[i][0]);
                };
            };
            return newTxt
        };
        replace(desencriptar(texto));
    }else{
        Swal.fire({ 
            icon:"error", 
            title:"Oops...",
            text:"Ingrese texto a desencriptar"
        });
        limpiar();
    }
});

btCopiar.addEventListener("click",() =>{
    const txtCopiado = mensajeIzq.textContent;
    const tempTextArea = document.createElement("textarea");

    tempTextArea.value = txtCopiado;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    
    limpiar();
});

