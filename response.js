Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}

const finalAnswer = "si quieres saber otro municipio, menciónalo, si no, dí salir";

const buenaQuality = [
    "puedes disfutar de tus actividades normales. ",
    "sal con toda la confianza del mundo. ",
    "disfruta de una actividad al aire libre. "
];
    
const moderadaQuality= [
    "toma precauciónes para tu bienestar. ",
    "todo bien, pero mantente alerta de posibles cambios. ",
    "si fuera tu, estaría al pendiente de posibles cambios. "
];
    
const malaQuality= [
    "para no perjudicar más al ambiente, trata de no utilizar el automóvil",
    "usa el transporte público, no hay que empeorar el aire",
    "si no hay necesidad de utilizar tu automóvil, usa una bicicleta",
];
    
const muyMalaQuality= [
   "trata de no salir si no es necesario",
"te recomiendo no salir de casa si no hay necesidad",
"salir el dia de hoy podría provocarte algún malestar",
];
    
const extremadamenteQuality= [
    "Porfavor mantente a salvo y usa cubrebocas",
"No salgas!, no me gustaría que el aire te haga daño",
"si no hay necesidad de salir, no te arriesgues",
];
    
const response = (value, municipio) => { 
    let calidad = 'normal';
    let mensaje = 'mensaje default';
    if (value > 0 && value <= 50) {
        calidad = 'buena';
        mensaje = buenaQuality.sample();
    } else
    if (value>50 && value <100) {
        calidad = 'moderada';
        mensaje = moderadaQuality.sample();
    } else 
    if (value >100 && value <= 150) {
        calidad = 'mala';
        mensaje = malaQuality.sample();
    } else
    if (value > 150 && value <= 200) {
        calidad = 'muy mala';
        mensaje = muyMalaQuality.sample();
    } else
    if (value > 200 ) {
        calidad = 'extremadamente mala';
        mensaje = extremadamenteQuality.sample();
    }
    return `La calidad del aire en ${municipio} es ${calidad}, ${mensaje}`;
};

module.export = {
    response: response
};