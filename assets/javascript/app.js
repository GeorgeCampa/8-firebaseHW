$( document ).ready(function() {


  var firebaseConfig = {
    apiKey: "AIzaSyAIuRP7yb2i2VPRMT-pPmqb4qaOyjzrR44",
    authDomain: "nyc-subway-train-schedule.firebaseapp.com",
    databaseURL: "https://nyc-subway-train-schedule.firebaseio.com",
    projectId: "nyc-subway-train-schedule",
    storageBucket: "nyc-subway-train-schedule.appspot.com",
    messagingSenderId: "645946961490",
    appId: "1:645946961490:web:31f7c14013ccad58"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // serve as a reference to firebase database
  var trainData = firebase.database();

// when Btn clicked information will be stored
 $("#addTrainBtn").on("click",function(event){
   event.preventDefault();
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
  var frequency = $("#frequencyInput").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
     firstTrain: firstTrain,
     frequency: frequency
  }
trainData.ref().push(newTrain);

alert("Train Added");

$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");

return false;
});
// collect data from firebase
trainData.ref().on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

});
});