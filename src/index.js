// Global variables
let username = "";

/**
 * validateForm() - returns a boolean result depending on whether or not the user
 * supplies a valid name
 * @returns boolean
 */
function validateForm() {
    // Stop form default actions
    event.preventDefault();

    // Get form input
    let name = document.getElementById("name").value.trim();

    // Check for empty strings
    if (name === "") {
        alert("Please enter a name.");
        return false;
    }

    // Check for alphabetic characters only
    if (!/^[a-zA-Z ]*$/.test(name)) {
        alert("Enter only alphabetic characters.")
        return false;
    }

    // Assign the username of the player
    username = name;

    // Hide the name form
    document.getElementById('nameForm').style.display = "none";

    // Show the game
    document.getElementById('game').style.display = "block";

    // Start the game using our config settings
    new Phaser.Game(config);
    
    // Return successful form validation
    return true;
}

// Get the user's coordinates via the geolocation API
const successCallback = (position) => {
    // Create variables
    let lat = 0;
    let lon = 9;
    const geoKey = "380479ac2bcf46b6ab0bde19ffcfd3d6";

    // Assign the user's longitude and latitude coordinates
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // GeoAPI options
    var requestOptions = {
        method: 'GET',
    };
      
    // Reverse geocode the user's location using their longitude and latitude coordinates to find their city
    fetch("https://api.geoapify.com/v1/geocode/reverse?lat=" + lat + "&lon=" + lon + "&apiKey=" + geoKey, requestOptions)
        .then(response => response.json())
        .then(result => {
            // Get the user's city
            const address = result.features[0];
            let city = address.properties.city;

            // Update the background color if the city is: Cincinnati
            if (city === "Cincinnati") {
                document.body.style.backgroundColor = "AliceBlue";
            }
        })
        .catch(error => console.log('error', error));

    // Weather API options
    const weatherOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'eb610997e5mshfac572788fbd63bp1827ccjsn9fd82b2f69b0',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };
    
    // Using coordinates, get the player's current weather
    fetch('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=' + lat + '&lon=' + lon, weatherOptions)
        .then(response => response.json())
        .then(response => {
            // Get the weather
            let weather = response.data[0].weather.description;

            // Update the game title's color based on current weather
            if (weather === "Light shower rain") {
                document.getElementById("gameTitle").style.color = "blue";
            }
        })
        .catch(err => console.error(err));

};

// Log any errors to the console
const errorCallback = (error) => {
    console.error(error);
};

// Use the geolocation API to get a user's location and weather and update the DOM accordingly
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);