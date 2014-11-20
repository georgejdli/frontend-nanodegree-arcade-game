/**
 * Created by Hellfire on 11/19/14.
 */
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomSpeed() {
    return Math.ceil(Math.random() * 10) * 20;
}