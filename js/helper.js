/* Library of helper functions used in app.js
*/
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Returns a random value between 20 and 200 in increments of 20
function randomSpeed() {
    return Math.ceil(Math.random() * 10) * 20;
}