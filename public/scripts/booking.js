const { json } = require("express/lib/response");
const res = require("express/lib/response");

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
  } else {
    $("#checkin").show();
    $("#checkout").show();
    $("#checkinDate").hide();
    $("#info").show();
  }
}

function bookthissitter(data) {
  var df = {};

  $("#mainbinder").empty();
  var row = $("<div class='row'></div>");
  var center = $('<div class="card text-center" id="card"></div>'); //notice
  var c = $(`<div class="container"></div>`); //info
  var reviewscards = $("<div></div>"); //reviews
  $.ajax({
    method: "GET",
    url: "/booking/getsitterEmail/" + data,
    success: function (response) {
      df["sitteremail"] = response.email;
      df["service_charge"] = response.price;
      var res = JSON.stringify(response);
      //c.append(res);
      console.log(response);
      //info.append(center);
      var sitterinfo = $(
        '<div class="card-header"></div><div class="card-body"><h1 class="card-title">' +
          response.firstName +
          "&nbsp;" +
          response.lastName +
          '</h1><p class="card-text"> Bio:' +
          response.bio +
          '</p><p class="card-text">Price:' +
          response.price +
          '</p><p class="card-text">Ratings:' +
          response.overall_rating +
          "</p></div></div>"
      );
      c.append(sitterinfo);
      if (response.reviews.length > 0) {
        for (x of response.reviews) {
          reviewscards.append(
            '<div class="card"><div class="card-header"></div><div class="card-body"><h2 class="card-title">' +
              x.customerEmail +
              '</h2><p class="card-text"> Review:' +
              x.review +
              '</p><p class="card-text">Rating:' +
              x.rating +
              "</p></div></div>"
          );
        }
      }
    },
  });

  var now = moment();
  var now1 = now.add(2, "Hours");
  var now2 = moment(now1).format("YYYY-MM-DDTHH:mm");
  var now3 = now2.toString();
  var bookingform = $(
    '<form method="post" id="bookingform" class="col-sm-6"></div></form>'
  );
  var checkinDate = $(
    `<div id="checkinDate"><label for="checkin-date"><h2>Select a date for day and night care</h2><input type="date" id="checkin-date"  name="checkinDate" class ="form-control" required></label></div><br><br>`
  );
  checkinDate.hide();
  var checkin = $(
    `<div id="checkin"><label for="checkin-datetime"><h2>Start date and time</h2><input type="datetime-local" id="checkin-datetime" min ="${now3}" name="checkin" class ="form-control" required></label></div><br><br>`
  );
  var checkout = $(
    `<div id="checkout" ><label for="checkout" id ="checkout"><h2>End date and time</h2><input type="datetime-local" id="checkout" name="checkout" class ="form-control" required></label></div><br><br>`
  );
  var serviceoptions = $(
    '<label for="service-selection" id="bookinglable"><h1>Select Service</h1></label><select id="service-selection" onchange="alert1()" name="service_selection" class ="form-control" required><option value="">Choose a service from the List</option><option value="DogWalking">Dog Walking</option><option value="Housevisit">House Sitting</option><option value="Daycare">Day care</option><option value="Nightcare">Night care</option></select></div><br><br>'
  );
  var bookbutton = $(
    '<a href ="#!" class="btn btn-primary" type="submit" id="bookthis">Book The Sitter</button>'
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
    console.log(queryString);
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
    console.log(dataframe);
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
          alert("Please Select some Other Date");
        }
      },
    });
  });
  backbutton.attr("onclick", "getSomeSitter()");
  var info = $(`<div class="col-sm-6">
  <div class="card">
  <div class="card-header"><h1> Please note
  </h1></div><div class="card-body">
  <h2 class="card-title">
  <p>Day Care has fixed timing from 10am to 8pm and</p>
  <p>Night Care has fixed timing from 8pm to 8am</p>
  <p>Please select date</p></h2>
  </div>"
  </div>
  </div>`);
  row.append(info);
  backbutton.appendTo(bookingform);
  bookingform.appendTo(row);
  row.appendTo(center);
  $("#mainbinder").append(center);
  $("#mainbinder").append(c);
  $("#mainbinder").append(reviewscards);
}
/// Get My bookings Accepted future bookings
function GetMyBookings(email) {
  var data = {};
  data[email] = email;
  //get id from email
  $.ajax({
    method: "GET",
    url: "/booking/getOwnerEmail/" + email,
    success: function (response) {
      console.log(response._id);
      var id = response._id;
      if (id) {
        try {
          GetbookingsOwner(id);
        } catch (e) {
          alert(e.message);
        }
      }
    },
  });
}
//get all bookings from id
function GetbookingsOwner(id) {
  try {
    $.ajax({
      method: "GET",
      url: "/booking/owner/" + id,
      success: function (response) {
        console.log(response);
        if (response == "No Bookings Found") {
          alert("Please book a sitter first");
          getSomeSitter();
        }
        var count = 0;
        if (response) {
          var row = $('<div class="row"></div>');
          for (var i = 0; i < response.length; i++) {
            var b = response[i];

            if (b.status == "Accepted") {
              var n = moment(b.start_date_time);
              var m = moment();
              //console.log(moment(n).isBefore(m));
              if (moment(m).isBefore(n)) {
                var count = 1;
                var column = $(`<div class="column">`);
                var card = $(
                  `<div class="card text-center" id="card" id="bookingcard"></div>`
                );

                // {{#each trips}}
                var a = $(` <a href="#!">${b}</a>`);
                //card.append(a);
                var s = moment(b.start_date_time);
                var e = moment(b.end_date_time);
                var bookinginfo = $(`<div class="row"><div class="booking-info">
              <h1>Sitter:  ${b.firstName} ${b.lastName}</h1>
              <p> <h2>Rating:</h2> ${b.OverallRating}</p>
              <p><h2>Service:${b.service}<h2>Charge:${b.service_charge}</h2><p>
              <p><h2>Starts :</h2> ${s} <h2>   Ends :</h2>${e}</p>
              <p>Status:${b.status}</p>
              <a href="#!" class="button" hidden>Delete</a>
              </div></div>`);

                card.append(bookinginfo);
                column.append(card);
                column.appendTo(row);
              }
            }
          }
          if (count == 0) {
            alert("No Accepted booking found");
            getSomeSitter();
          }
          $("#mainbinder").empty();
          $("#mainbinder").append(row);
          console.log(response);
        } else {
          alert("Sorry somerthing went wrong ");
        }
      },
    });
  } catch (e) {
    alert(e.message);
    getSomeSitter();
  }
}
//////////////////////////////////////////////// Get Pendings bookings Requested bookings//////////////////////////////////////////////////////////////
function GetMyBookingsPending(email) {
  var data = {};
  data[email] = email;
  //get id from email
  $.ajax({
    method: "GET",
    url: "/booking/getOwnerEmail/" + email,
    success: function (response) {
      console.log(response._id);
      var id = response._id;
      if (id) {
        try {
          GetbookingsOwnerPending(id);
        } catch (e) {
          alert(e.message);
        }
      }
    },
  });
}

function GetbookingsOwnerPending(id) {
  try {
    $.ajax({
      method: "GET",
      url: "/booking/owner/" + id,
      success: function (response) {
        console.log(response);
        if (response == "No Bookings Found") {
          alert("Please book a sitter first");
          getSomeSitter();
        }
        if (response) {
          var row = $('<div class="row"></div>');
          var count = 0;
          $("#mainbinder").empty();
          for (var i = 0; i < response.length; i++) {
            var b = response[i];
            if (b.status != "Accepted") {
              var count = 1;
              var column = $(`<div class="column">`);
              var card = $(
                `<div class="card text-center" id="card" id="bookingcard"></div>`
              );

              // {{#each trips}}
              var a = $(` <a href="#!">${b}</a>`);
              //card.append(a);
              var s = moment(b.start_date_time);
              var e = moment(b.end_date_time);
              var bookinginfo = $(`<div class="row"><div class="booking-info">
              <h1>Sitter:  ${b.firstName} ${b.lastName}</h1>
              <p> </h6>Rating:</h6> ${b.OverallRating}</p>
              <p><h2>Service:${b.service}<h2>Charge:${b.service_charge}</h2><p>
              <p><h2>Starts :</h2> ${s} <h2>   Ends :</h2>${e}</p>
              <p>Status:${b.status}</p>
              <a href="#!" class="button" hidden>Delete</a>
              </div></div>`);

              card.append(bookinginfo);
              column.append(card);
              column.appendTo(row);
            }
            $("#mainbinder").append(row);
            console.log(response);
          }
          if (count == 0) {
            $("#mainbinder").empty();
            $("#mainbinder").append(
              '<div class="card"><div class="card-header"></div><div class="card-body"><h1 class="card-title">No Pending Request Found &nbsp;</h1></div></div>'
            );
          }
        } else {
          alert("Sorry somerthing went wrong ");
        }
      },
    });
  } catch (e) {
    alert(e.message);
    getSomeSitter();
  }
}
///////////////////////////////////////////////GET booking history past bookings///////////////////////////////////////////////////////

function GetMyBookingsHistory(email) {
  var data = {};
  data[email] = email;
  //get id from email
  $.ajax({
    method: "GET",
    url: "/booking/getOwnerEmail/" + email,
    success: function (response) {
      console.log(response._id);
      var id = response._id;
      if (id) {
        try {
          GetbookingsOwnerhistory(id);
        } catch (e) {
          alert(e.message);
        }
      }
    },
  });
}

function GetbookingsOwnerhistory(id) {
  try {
    $.ajax({
      method: "GET",
      url: "/booking/owner/" + id,
      success: function (response) {
        console.log(response);
        if (response == "No Bookings Found") {
          alert("Please book a sitter first");
          getSomeSitter();
        }
        if (response) {
          var row = $('<div class="row"></div>');
          var count = 0;
          for (var i = 0; i < response.length; i++) {
            console.log(response[i].Sitter_id);
            var b = response[i];
            var n = moment(b.end_date_time);
            var m = moment();
            console.log(moment(n).isBefore(m));
            if (moment(n).isBefore(m)) {
              if (b.status == "Accepted") {
                console.log("hello");
                count = 1;
                var column = $(`<div class="column">`);
                var card = $(
                  `<div class="card text-center" id="card${i}" id="bookingcard"></div>`
                );
                // {{#each trips}}
                var a = $(` <a href="#!">${b}</a>`);
                //card.append(a);
                var s = moment(b.start_date_time);
                var e = moment(b.end_date_time);
                var bookinginfo = $(`<div class="row"><div class="booking-info">
              <h1>Sitter:  ${b.firstName} ${b.lastName}</h1>
              <p> <h2>Rating:</h2> ${b.OverallRating}</p>
              <p><h2>Service:${b.service}<h2>Charge:${b.service_charge}</h2><p>
              <p><h2>Starts :</h2> ${s} <h2>   Ends :</h2>${e}</p>
              <p>Status:${b.status}</p>
              <button type="button" class="btn btn-primary" onclick="review('${i}', '${b._id}','${b.Sitter_id}')">Review</button>
              </div></div>`);
                card.append(bookinginfo);
                column.append(card);
                column.appendTo(row);
              }
            }
          }
          if (count == 0) {
            alert("No Previous Booking Found");
            getSomeSitter();
          }
          $("#mainbinder").empty();
          $("#mainbinder").append(row);
          console.log(response);
        } else {
          alert("Sorry Somerthing went wrong ");
        }
      },
    });
  } catch (e) {
    alert(e.message);
    getSomeSitter();
  }
}
function review(i, b_id, sitter_id) {
  console.log(i, sitter_id);
  console.log(b_id);
  let html = `
  <div class="form-group">
    <label for="exampleFormControlTextarea1"><h1>Add a Review</h1></label>
    <input type="hidden" id="sitterID" value="${sitter_id}">
    <input type="hidden" id="bookingID" value="${b_id}">
    
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    <br>
    <label class="rating-label">
    <strong>Rating</strong>
    <select name="Rating" id="Rating">
                                        <option value=1>1</option>
                                        <option value=2>2</option>
                                        <option value=3>3</option>
                                        <option value=4>4</option>
                                        <option value=5>5</option>
    </select>
    <button type="button" class="btn btn-primary" id="${b_id}" onclick="SendReview()">Review</button>
    <button type="button" class="btn btn-primary" onclick="getSomeSitter()">Back</button>
  </div>`;

  $(`#card${i}`).empty();
  $(`#card${i}`).append(html);
}

function SendReview() {
  let dataObj = {
    i: $(""),
    sitter_id: $("#sitterID").val(),
    ratingValue: $("#Rating").val(),
    reviewValue: $("#exampleFormControlTextarea1").val(),
  };
  $.ajax({
    method: "POST",
    url: "/booking/sittersReview/",
    contentType: "application/json",
    data: JSON.stringify(dataObj),
    success: function (response) {
      if (response.reviewInserted == true) {
        alert("Review Succesful");
        location.reload();
      }
      console.log(respose);
    },
  });
}
