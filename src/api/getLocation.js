

export const geoLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            // Now you can use these coordinates to fetch weather data or perform other tasks
          },
          function(error) {
            console.error("Error getting user's geolocation:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
}