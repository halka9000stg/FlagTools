Math.isInteger = (n) => Math.trunc(n) == n;
Math.len = (n) => Math.lenInt(n) + (Math.isInteger(n) ? 0 : Math.lenFrac(n));
Math.lenInt =  (n) => (Math.abs(Math.floor(Math.log10(Math.trunc(n))) + 1) == Infinity) ? 1 : Math.floor(Math.log10(n)) + 1;
Math.lenFrac =  function(number) {
  if(Math.isInteger(n)) return 0;
	let numbers = String(number).split('.');
	return numbers[1] ? numbers[1].length : 0;
};
Math.gcd = (x, y) => x % y ? gcd(y, x % y) : y;
Math.rti = (x, y) => {
  let mxl = Math.max(x, y);
  let mxp = Math.pow(10, mxl);
  return {x: mxp * x, y: mxp * y};
}
Math.rcd = (x, y) => {
  let cs = (Math.isInteger(x) && Math.isInteger(y)) ? {x: x, y: y} : Math.rti(x, y);
  let gxy = Math.gcd(cs.x, cs.y);
  return {x: cs.x / gxy, y: cs.y / gxy};
}

// x height, y width
function buildSvg(x, y, hex){
  let sf = Math.rcd(x, y);
  let wf = sf.y;
  let hf = sf.x;
  
// width 700〜1000
  let scl = Math.trunc(wf / 700) + 1;
  let wfo =  wf * scl;
  let hfo =  hf * scl;

  return`<?xml version="1.0" encoding="UTF-8"?>
<!doctype svg>
<svg xmlns="http://www.w3.org/2000/svg" width="{wfo}" height="{hfo}" viewBox="0 0 {wf} {hf}">
  <path d="M 0 0  h {wf} v {hf} h -{wf} z" fill="{hex}" />
</svg>`;
}
function string2url(str){
  return "data:text/plain;charset=UTF-8," + encodeURIComponent(str);
}
function getInputs(){
  let h =document.querySelector("input#height").value;
  let w = document.querySelector("input#width").value;
  let c = document.querySelector("input#colour").value;
  return {height: h, width: w, colour: c};
}
document
  .querySelector("a")
  .addEventListener(
    "click",
    (event) => {
      let conf = getInputs();
      event.target.setAttribute("href",
        string2url(buildSvg(conf.height, conf.width, conf.colour)));
      event.target.setAttribute("download",
      `flag_{conf.colour.substring(1)}_{conf.height}x{conf.width}.svg`
    },
  );
