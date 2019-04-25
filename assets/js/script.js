

$("#submit").on("click", function (event) {

    //to save
    event.preventDefault();
    var train = $("#imputName").val().trim();
    var destination = $("#inputDest").val().trim();
    var time = moment($("#inputTime").val().trim(), "hh:mm").format("X");
    var frequency = $("#inputFrequency").val().trim();



    var newTrain = {
        train: train,
        destination: destination,
        time: time,
        frequency: frequency
    }


    database.ref("/trains").push(newTrain);

    $("#imputName").val("");
    $("#inputDest").val("");
    $("#inputTime").val("");
    $("#inputFrequency").val("");


});

//to show data saved
database.ref("/trains").on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());

    var train = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    //var usertime=moment(time, "hh:mm").format("X");
    
    console.log(moment.unix(time).format("hh:mm A"));
    console.log(moment().diff(moment(time, "X"), "hours"));

 getNext(moment(time, "X"),frequency);
   //console.log(moment.duration(moment(time, "X"),"minutes"));

 
  
    var newRow = $("<tr>").append(
        $("<td>").text(train),
        $("<td>").text(destination),
        $("<td>").text(frequency)
    );

    $("#trains-table > tbody").append(newRow);
});

function getNext(time,frequency){
 var currentTime = moment();
 var freq = parseInt(frequency);
 
}