export function formatDate(dateStr = "") {
    return dateStr.slice(0, 10);
}


export function textTruncate(str = ""){
    if(str.length<=50){
return str;
}

return str.slice(0, 50)+"...";


}