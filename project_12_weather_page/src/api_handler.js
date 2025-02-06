const key = 'QW2SWKMUVXF4VAJHREATKZCH2'

async function returnSearchData(searchField) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchField}?unitGroup=us&key=${key}&contentType=json`
    try {
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        return weatherData
    } catch(err) {
        console.log(err)
    }
};

function parseWeatherData(weatherJSON) {
    let formattedData = {};
    formattedData['location'] = weatherJSON.resolvedAddress;
    formattedData['desc'] = weatherJSON.description;

    const today = weatherJSON.days[0];
    ['datetime', 'temp', 'tempmin', 'tempmax', 'feelslike', 'feelslikemin', 'feelslikemax'].forEach( e => {
        formattedData[e] = today[e];
    });

    return formattedData;
};

export {returnSearchData, parseWeatherData}


