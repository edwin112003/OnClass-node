//Intentar poner las horas con js 
for(let i=0; i<25; i++){
    let a = document.createElement("a");
    a.setAttribute("class", "dropdown-item");
    if(i.toString().length == 1){
        a.appendChild(document.createTextNode("0",i));
        a.setAttribute("value", ("0",i));
        document-getElementById("inhoras").appendChild(a);
    }else{
        a.appendChild(document.createTextNode(i));
        a.setAttribute("value", (i));
        document-getElementById("inhoras").appendChild(a);
    }

}
let divhoras = document.getElementById("inhoras");