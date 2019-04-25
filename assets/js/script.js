

$("#submit").on("click", function (event) {

    //to save
    event.preventDefault();
    var train = $("#imputName").val().trim();
    var destination = $("#inputDest").val().trim();
    var time = moment($("#inputTime").val().trim(), "hh:mm").format("X");
    var frequency = $("#inputFrequency").val().trim();

    if (train !== "" && destination !== "" && time !== "" & frequency !== "") {
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

    }else{

        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    }




});

//to show data saved
database.ref("/trains").on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val());

    var train = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    var times = getNext(moment(time, "X"), frequency);

    var newRow = $("<tr>").append(
        $("<td>").text(train),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(times[1]),
        $("<td>").text(times[0] + " min")
    );

    $("#trains-table > tbody").append(newRow);
});

function getNext(time, frequency) {

    var frequency = parseInt(frequency);
    var times = [];

    var firstTrain = moment(time).format("HHmm");

    var timeFix = moment(firstTrain, "HHmm").subtract(1, "years");

    var difference = moment().diff(moment(timeFix), "minutes");

    var timeRemaining = difference % frequency;

    var timeLeft = frequency - timeRemaining;

    times.push(timeLeft);

    var nextArrival = moment().add(timeLeft, "minutes").format("HH:mm A");

    times.push(nextArrival);

    return times;
}