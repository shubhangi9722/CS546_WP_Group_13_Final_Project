function getsomebookings(email) {
  $("#mainbinder").empty();
  $.ajax({
    method: "GET",
    url: "/sitterbooking/getsomebookings/" + email,
    success: function (response) {
      //console.log(response);
      for (var i = 0; i < response.length; i++) {
        var count = 0;
        if (response[i].status == "Requested") {
          count = count + 1;
          $("#mainbinder").append(
            '<div class="card"><div class="card-header"></div><div class="card-body"><h1 class="card-title">' +
              response[i].firstName +
              "&nbsp;" +
              response[i].lastName +
              '</h1><p class="card-text">Pet Behavioral Information:' +
              response[i].behavioral_information +
              '</p><p class="card-text">Start Time:' +
              response[i].start_date_time +
              '</p><p class="card-text">End Time:' +
              response[i].end_date_time +
              '</p><p class="card-text">Dog Breed:' +
              response[i].dog_breed +
              '</p><p class="card-text">Customer Address:' +
              response[i].address +
              '</p><p class="card-text">Your Pay:' +
              response[i].service_charge +
              '</p><p class="card-text">Service:' +
              response[i].service +
              '</p><a href="#" class="btn btn-primary" onclick="Accept(\'' +
              response[i]._id +
              '\')">Accept</a>&nbsp;&nbsp;<a href="#" class="btn btn-primary" onclick="Rejected(\'' +
              response[i]._id +
              "')\">Deny</a> </div></div>"
          );
        }
      }
      if (count == 0) {
        $("#mainbinder").append(
          '<div class="card"><div class="card-header"></div><div class="card-body"><h1 class="card-title">No New Booking Request Found &nbsp;</div></div>'
        );
      }
    },
  });
}
function UpcommingBookings(email) {
  $("#mainbinder").empty();
  $.ajax({
    method: "GET",
    url: "/sitterbooking/getsomebookings/" + email,
    success: function (response) {
      let count = 0;
      $("#mainbinder").empty();
      // console.log(response);
      for (var i = 0; i < response.length; i++) {
        if (response[i].status == "Accepted") {
          var b = response[i];
          var n = moment(b.end_date_time);
          var m = moment();
          console.log(moment(m).isBefore(n));
          if (moment(m).isBefore(n)) {
            count = count + 1;
            $("#mainbinder").append(
              '<div class="card"><div class="card-header"></div><div class="card-body"><h1 class="card-title">' +
                response[i].firstName +
                "&nbsp;" +
                response[i].lastName +
                '</h1><p class="card-text">' +
                response[i].behavioral_information +
                '</p><p class="card-text">Start Time:' +
                response[i].start_date_time +
                '</p><p class="card-text">End Time:' +
                response[i].end_date_time +
                '</p><p class="card-text">Dog Breed:' +
                response[i].dog_breed +
                '</p><p class="card-text">Customer Address:' +
                response[i].address +
                '</p><p class="card-text">Your Pay:' +
                response[i].service_charge +
                '</p><p class="card-text">Service:' +
                response[i].service +
                "</p></div></div>"
            );
          }
        }
      }
      if (count == 0) {
        $("#mainbinder").append(
          '<div class="card"><div class="card-header"></div><div class="card-body"><h1 class="card-title">No Upcomming Booking Found &nbsp;</div></div>'
        );
      }
    },
  });
}

// function changestatus(bookingid) {
//   $.ajax({
//     method: "GET",
//     url: "/sitterbooking/getsomebookings/" + email,
//     success: function (response) {
//       for (x in response) {
//         if (x._id == bookingid) {
//           //$("#mainbinder").append(display this booking)
//           //Add accept/Reject button
//           //buttons will have x.id as parameter
//           //display this booking
//         }
//         //console.log(x);
//       }
//       console.log(response);
//       //Adding a button to completed accept and reject bookings button
//     },
//   });
// }

function Accept(bookingid) {
  console.log(`${bookingid}`);
  $.ajax({
    method: "GET",
    url: "/sitterbooking/accept/" + bookingid,
    success: function (response) {
      //console.log(response);
      if (response.updated == true) {
        alert("this booking has been accepted");
        setTimeout(function () {
          location.reload();
        }, 2000);
      } else {
        alert("something went wrong");
      }

      //Adding a button to completed accept and reject bookings button
    },
    error: function (response) {
      //console.log(response);
      alert(response.responseJSON);
    },
  });
}

function Rejected(bookingid) {
  $.ajax({
    method: "GET",
    url: "/sitterbooking/rejected/" + bookingid,
    success: function (response) {
      if (response.updated == true) {
        alert("this booking has been Rejected");
        setTimeout(function () {
          location.reload();
        }, 2000);
      } else {
        alert("something went wong");
      }

      //Adding a button to completed accept and reject bookings button
    },
    error: function (response) {
      alert(response.responseJSON);
    },
  });
}

function getsomebookingsHist(email) {
  $("#mainbinder").empty();
  $.ajax({
    method: "GET",
    url: "/sitterbooking/getsomebookings/" + email,
    success: function (response) {
      //console.log(response);
      let count = 0;
      for (var i = 0; i < response.length; i++) {
        var b = response[i];
        var n = moment(b.end_date_time);
        var m = moment();
        // console.log(moment(n).isBefore(m));
        if (moment(n).isBefore(m)) {
          count = count + 1;
          $("#mainbinder").append(
            '<div class="card"><div class="card-header"></div><div class="card-body"><h1 class="card-title">' +
              response[i].firstName +
              "&nbsp;" +
              response[i].lastName +
              '</h1><p class="card-text">' +
              response[i].behavioral_information +
              '</p><p class="card-text">Start Time:' +
              response[i].start_date_time +
              '</p><p class="card-text">End Time:' +
              response[i].end_date_time +
              '</p><p class="card-text">Dog Breed:' +
              response[i].dog_breed +
              '</p><p class="card-text">Customer Address:' +
              response[i].address +
              '</p><p class="card-text">Your Pay:' +
              response[i].service_charge +
              '</p><p class="card-text">Service:' +
              response[i].service +
              "</p></div></div>"
          );
        }
      }
      if (count == 0) {
        $("#mainbinder").append(
          '<div class="card"><div class="card-header"></div><div class="card-body"><h1 class="card-title">No Booking History Found &nbsp;</div></div>'
        );
      }
    },
  });
}
function review(email) {
  $.ajax({
    method: "GET",
    url: "/sitterbooking/review/" + email,
    success: function (response) {
      if (response) {
        console.log(response);
        $("#mainbinder").empty();
        for (x of response) {
          $("#mainbinder").append(
            '<div class="card"><div class="card-header"></div><div class="card-body"><h1 class="card-title">' +
              x.customerEmail +
              '</h1><p class="card-text"> Review:' +
              x.review +
              '</p><p class="card-text">Rating:' +
              x.rating +
              "</p></div></div>"
          );
        }
      } else {
        alert("Something went wong");
      }

      //Adding a button to completed accept and reject bookings button
    },
    error: function (response) {
      alert(response.responseJSON);
    },
  });
}
