
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

var database = firebase.database();


//Button for adding trains

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //Grabs user input
    var trName = $("#train-name-input").val().trim();
    var trDestination = $("#destination-input").val().trim();
    var firstTime = moment($("#start-input").val().trim(), "hh:mm").subtract(1, "years");
    // console.log(firstTime)
    var tFrequency = $("#frequency-input").val().trim()

    // gets current time
    var currentTime = moment();
    // console.log("CURRENT TIME: "+ moment(currentTime).format("hh:mm"))

    // Difference between the times
    var diffTime = moment().diff(moment(firstTime), "minutes");
    // console.log("Difference in time:" + diffTime)

    // Uses % operator to determine the time to for the next for the next train
    var tRemainder = diffTime % tFrequency
    // console.log(tRemainder)

    //Minutes Until Next Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("Minutes Till Next Train: " + tMinutesTillTrain)

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a")
    // console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"))

    var newTrain = {
      name: trName,
      destination: trDestination,
      frequency: tFrequency,
      nextArrival: nextTrain,
      minAway: tMinutesTillTrain
    };
    //upload train data to the database
    database.ref().push(newTrain);

    console.log(newTrain.name)
    console.log(newTrain.destination)
    console.log(newTrain.frequency)
    console.log(newTrain.nextArrival)
    console.log(newTrain.minAway)

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});
//use firebase to add employees to the database and display it on page
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val())

    var trName = childSnapshot.val().name;
    var trDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().nextArrival;
    var tMinutesTillTrain = childSnapshot.val().minAway;

    $("#train-table > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" +
        tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});