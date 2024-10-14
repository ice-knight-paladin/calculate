const calc = document.querySelector(".buttons");
const result = document.querySelector("#result");
var step = false;
var p = false;
var grad = true;
var reset = false;
var a = false;
var scob = false;
var vp = false;
var zp = false;
var ip = false;
var x = "";
var reg = "";
var reg1 = "";
var reg2 = "";
var reg3 = "";
var x1 = "";


calc.addEventListener("click", function (event) {
    if (!event.target.classList.contains("calc_btn")) return;
    const value = event.target.innerText;
    console.log(value);
});