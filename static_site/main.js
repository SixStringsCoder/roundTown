/*
Wanderlust is an app that requests information from the Foursquare API
and APIXU to create a travel website.
Steve Hanlon Oct 30, 2017
*/

// Foursquare API Info
const clientId = 'ZCNOO2SK3USWMUXPMBM5WR3ALMNEZAFJBZDFPEVSDLTDKOYI';
const clientSecret = 'FQWXQHYW2E5SJIOWNWEXMYHRSZZN2Y401TXYHRPTP5XOTM0E';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
const imgPrefix = 'https://igx.4sqi.net/img/general/150x200';

// APIXU Info
const apiKey = '08a7fc1afc044d27a9a34310181301';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5"), $("#venue6"), $("#venue7"), $("#venue8"), $("#venue9"), $("#venue10")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4"), $("#weather5"), $("#weather6"), $("#weather7")];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// AJAX functions
// Return venues based on Search value input
async function getVenues() {
  const city = $input.val();
  const urlToFetch = url + city + '&venuePhotos=1&limit=10&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20171030';

  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let venues = jsonResponse.response.groups[0].items.map(location => location.venue);
      return venues;
    }
  }
  catch (error) {
    console.log(error);
  }
};

// Return weatherforecast based on Search input value
async function getForecast() {
  const urlToFetch = forecastUrl + apiKey + '&q=' + $input.val() + '&days=7'
  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      console.log(jsonResponse);
      let days = jsonResponse.forecast.forecastday;
      return days;
    }
  }
  catch (error) {
    console.log(error);
  }
}

// Render functions
function renderVenues(venues) {
  $venueDivs.forEach(($venue, index) => {
    let venueContent =
      '<div class="topInfo"><h2>' + venues[index].name + '</h2>' +
      '<img class="venueimage" src="' + imgPrefix +
      venues[index].photos.groups[0].items[0].suffix + '"/>' +
      '<h4>' + venues[index].categories[0].name +  '<br>'  + 'Rating: ' + venues[index].rating + '&nbsp; &#10084;' + '</h4></div>' +
      '<div class="bottomInfo">' +
      '<p>' + venues[index].location.address + '</p>' +
      '<p>' + venues[index].location.city + ', ' +  venues[index].location.state + '</p>' +
      '<p>' + venues[index].location.country + '</p>' +
      '<button id="venueMap">' + '<a href=' + venues[index].url + ' target="_blank">' + "Website" + '</a>' + '</button></div>';
    $venue.append(venueContent);
  });
  $destination.append('<h2>' + venues[0].location.city + ', ' + venues[0].location.state + ', ' + venues[0].location.country +'</h2>');
}

function renderForecast(days) {
  $weatherDivs.forEach(($day, index) => {
    let weatherContent =
    '<div class="weatherLeft"><h2>' + weekDays[(new Date(days[index].date)).getDay()] + '</h2>' +
    '<img src="http:' + days[index].day.condition.icon + '" class="weathericon" />' +
    '<p>' + days[index].day.condition.text + '</p><div>' +
    '<h2><span> High:</span> ' + days[index].day.maxtemp_f + '</h2> ' +
    '<h2><span> Wind:</span> ' + days[index].day.maxwind_mph + ' mph</h2> ' +
    '<h2><span> Low:</span> ' + days[index].day.mintemp_f + '</h2> ' +
    '<h2><span> Humidity:</span> ' + days[index].day.avghumidity + '</h2> ' ;
    $day.append(weatherContent);
  });
}

function executeSearch() {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
