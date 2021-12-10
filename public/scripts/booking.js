function alert1() {
  var select = $("#service-selection");
  var value = select.val();
  $("#checkin").show();
  $("#checkout").show();
  $("#checkinDate").show();
  $("#info").show();
  if (value == "Daycare" || value == "Nightcare") {
    $("#checkout").hide();
    $("#checkin").hide();
    $("#checkinDate").show();
    $("#info").show();
    // $("#checkin").type = "date";
  } else if (value == "DogWalking") {
    $("#checkin").show();
    $("#checkinDate").hide();
    $("#checkout").hide();
    $("#info").show();
  } else if (value == "Housevisit") {
    $("#checkin").show();
    $("#checkout").show();
    $("#checkinDate").hide();
    $("#info").show();
  }
}

function bookthissitter(data) {
  var df = {};

  $("#mainbinder").empty();
  var row = $("<div class='row'>");
  var center = $('<div class="card text-center" id="card"></div>');

  $.ajax({
    method: "GET",
    url: "/booking/getsitterEmail/" + data,
    success: function (response) {
      df["sitteremail"] = response.email;
      df["service_charge"] = "$25";
      var res = JSON.stringify(response);
      var c = $(`<div class="col-sm-6">${res}</div>`);
      c.appendTo(row);
    },
  });

  var now = moment();
  var now1 = now.add(1, "Hours");
  var now2 = moment(now1).format("YYYY-MM-DDTHH:mm");
  var now3 = now2.toString();
  var bookingform = $(
    '<form method="post" id="bookingform" class="col-sm-6"></div></form>'
  );
  var checkinDate = $(
    `<div id="checkinDate"><label for="checkin-date">Check-in Date</label><input type="date" id="checkin-date"  name="checkinDate" required></div><br><br>`
  );
  checkinDate.hide();
  var checkin = $(
    `<div id="checkin"><label for="checkin-date">Check-in Date</label><input type="datetime-local" id="checkin-datetime" min ="${now3}" name="checkin" required></div><br><br>`
  );
  var checkout = $(
    `<div id="checkout" ><label for="checkout-date" id ="checkout">Check-out Date</label><input type="datetime-local" id="checkout-date" name="checkout" required></div><br><br>`
  );
  var serviceoptions = $(
    '<label for="service-selection" id="bookinglable">Select Service</label><select id="service-selection" onchange="alert1()" name="service_selection" required><option value="">Choose a service from the List</option><option value="DogWalking">Dog Walking</option><option value="Housevisit">House Sitting</option><option value="Daycare">Day care</option><option value="Nightcare">Night care</option></select></div><br><br>'
  );
  var bookbutton = $(
    '<a href ="#!" class="btn btn-primary" type="submit" id="bookthis">Book The Sitter</button><br>'
  );
  var backbutton = $(
    '<a href ="#!" class="btn btn-primary" type="submit" id="backbutton">Back</button>'
  );
  serviceoptions.appendTo(bookingform);
  checkin.appendTo(bookingform);
  checkinDate.appendTo(bookingform);
  checkout.appendTo(bookingform);
  bookbutton.appendTo(bookingform);

  $("#checkin-date").attr("min", now3);
  bookbutton.on("click", function (event) {
    var queryString = $("#bookingform").serializeArray();
    var dataframe = {};
    for (x of queryString) {
      if (x.value && x.name) {
        var name = x.name;
        var value = x.value;
        dataframe[name] = value;
      }
    }
    if (dataframe.service_selection == "") {
      alert("please select service");
      bookthissitter(`bookthissitter('${data}')`);
    }
    var now = moment();
    var service = dataframe.service_selection;
    var s = moment(dataframe.checkin);
    if (service == "DogWalking") {
      var s1 = moment(dataframe.checkin);
      var e1 = s1.add(30, "minutes");
      var e2 = moment(e1).format("MM/DD/YYYY HH:mm");
      var s3 = moment(s).format("MM/DD/YYYY HH:mm");
      var a = s3.toString();
      var b = e2.toString();
    } else if (service == "Daycare") {
      var s1 = moment(dataframe.checkinDate);
      var s2 = s1.add(10, "Hours");
      var s3 = moment(s2).format("MM/DD/YYYY HH:mm:ss");

      var s4 = moment(dataframe.checkinDate);
      var e1 = s4.add(22, "Hours");
      var e2 = moment(e1).format("MM/DD/YYYY HH:mm:ss");
      var a = s3.toString();
      var b = e2.toString();
    } else if (service == "Nightcare") {
      var s1 = moment(dataframe.checkinDate);
      var s2 = s1.add(22, "Hours");
      var s3 = moment(s2).format("MM/DD/YYYY HH:mm:ss");

      var s4 = moment(dataframe.checkinDate);
      var e1 = s1.add(12, "Hours");
      var e2 = moment(e1).format("MM/DD/YYYY HH:mm:ss");
      var a = s3.toString();
      var b = e2.toString();
    } else {
      var e1 = moment(dataframe.checkout);
      var s1 = moment(dataframe.checkin);
      if (e1.diff(s1) / 60000 < 60) {
        alert("Minimun 60 minutes of house visit");
        //bookthissitter(data);
      } else {
        if (dataframe.checkin == "") {
          alert("please select Start");
          bookthissitter(data);
        }
        if (dataframe.checkout == "") {
          alert("please select End");
          bookthissitter(data);
        }
        var e2 = moment(e1).format("MM/DD/YYYY HH:mm:ss");
        var s2 = moment(s1).format("MM/DD/YYYY HH:mm:ss");

        var a = s2.toString();
        var b = e2.toString();
        console.log(a);
      }
    }
    console.log(a);
    console.log(b);
    df["service"] = service;
    df["start_date_time"] = a;
    df["end_date_time"] = b;
    // console.log(s);
    // console.log(e);
    console.log(df);
    var dfstring = JSON.stringify(df);
    $.ajax({
      url: "booking/Createbooking",
      type: "POST",
      data: dfstring,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.booking == "Succesful") {
          alert("Your booking has been created");
        } else {
          alert("Sorry somerthing went wrong ");
        }
      },
    });
  });
  backbutton.attr("onclick", "getSomeSitter()");
  backbutton.appendTo(bookingform);
  bookingform.appendTo(row);
  row.appendTo(center);
  center.append(
    "<div id ='info'><p>Day Care has fixed timing from 10am to 8pm and</p><p>Night Care has fixed timing from 9pm to 9am</p><p>Please select date</p></div>"
  );
  $("#mainbinder").append(center);
}
