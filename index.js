// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const request = require('sync-request');

Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}

const getAirQ = (city) => {
    const res = request('GET', `https://api.weatherbit.io/v2.0/current?city=${city},mx&key=d0fca5e98bb24202b3ef3b3a50b532fc`);
    const resBody = res.getBody('utf8');
    return JSON.parse(resBody).data[0].aqi;
};

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
    return `La calidad del aire en ${municipio} es ${calidad}, ${mensaje}, ${finalAnswer}`;
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, bienvenido al medidor de contaminación de Nuevo León. ¿qué municipio deseas consultar?';
        const speakReprompt = '¿Sigues ahí?, ¿Me puedes decir un municipio de Nuevo León?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakReprompt)
            .getResponse();
    }
};

const municipiosNuevoLeonIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'municipiosNuevoLeonIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const municipio =  request.intent.slots.municipio.value;

        let value = 0
        switch(municipio) {
            case "san bernabe":
                value = getAirQ("san+bernabe");
                //speakOutput = "entre a 1";
                break;
            case "pueblo serena":
                value = getAirQ("santiago");
                //speakOutput = "entre a 2";
                break;
            case "cadereyta":
                value = getAirQ("cadereyta");
                //speakOutput = "entre a 3";
                break;
            case "juarez":
                value = getAirQ("juarez");
                //speakOutput = "entre a 4";
                break;
            case "guadalupe":
                value = getAirQ("guadalupe");
                //speakOutput = "entre a 5";
                break;
            case "san pedro":
                value = getAirQ("san+pedro+garza+garcia");
                //speakOutput = "entre a 6";
                break;
            case "santa catarina":
                value = getAirQ("garcia");
                //speakOutput = "entre a 7";
                break;
            case "monterrey":
                value = getAirQ("monterrey");
                //speakOutput = "entre a 8";
                break;
            case "san nicolas":
                value = getAirQ("san+nicolas+de+los+garza");
                //speakOutput = "entre a 9";
                break;
            case "apodaca":
                value = getAirQ("apodaca");
                //speakOutput = "entre a 10";
                break;
            case "escobedo":
                value = getAirQ("general+escobedo");
                //speakOutput = "entre a 11";
                break;
            default:
                speakOutput = 'no tenemos ese municipio';
                break;
        }
        
        let speakOutput = response(value, municipio);
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Sigues ahí?, ¿Me puedes decir un municipio de Nuevo León?')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        municipiosNuevoLeonIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
s