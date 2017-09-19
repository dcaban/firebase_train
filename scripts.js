
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBcpqzhLTHrdQZXp47vze6fN-opRanj0dQ",
    authDomain: "train-time-80754.firebaseapp.com",
    databaseURL: "https://train-time-80754.firebaseio.com",
    projectId: "train-time-80754",
    storageBucket: "",
    messagingSenderId: "641507768536"
};
firebase.initializeApp(config);

//Button for adding trains

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //Grabs user input
    var trName = $("#train-name-input")
});