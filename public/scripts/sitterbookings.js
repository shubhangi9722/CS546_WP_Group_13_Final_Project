function getsomebookings(email) {
  $.ajax({
    method: "GET",
    url: "/sitterbooking/getsomebookings/" + email,
    success: function (response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        if (response[i].status == "Requested") {
          $("#mainbinder").append(
            '<div class="card"><div class="card-header"></div><div class="card-body"><h5 class="card-title">' +
              response[i].firstName +
              "&nbsp;" +
              response[i].lastName +
              '</h5><p class="card-text">' +
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
              '</p><a href="#" class="btn btn-primary" onclick="Accept(\'' +
              response[i]._id +
              '\')">Accept</a>&nbsp;&nbsp;<a href="#" class="btn btn-primary" onclick="Rejected(\'' +
              response[i]._id +
              "')\">Deny</a> </div></div>"
          );
        }
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
    method: "POST",
    url: "/sitterbooking/accept/" + bookingid,
    success: function (response) {
      console.log(response);
      if (response.updated == true) {
        alert("this booking has been accepted");
      }
      console.log(response);
      //Adding a button to completed accept and reject bookings button
    },
  });
}

function Rejected(bookingid) {
  $.ajax({
    method: "POST",
    url: "/sitterbooking/rejected/" + bookingid,
    success: function (response) {
      if (response.updated == true) {
        alert("thhis booking has been Rejected");
      }
      console.log(response);
      //Adding a button to completed accept and reject bookings button
    },
  });
}

function upcommingbookings(email) {
  $.ajax({
    method: "GET",
    url: "/sitterbooking/getsomebookings/" + email,
    success: function (response) {
      for (x in response) {
        if (x.status == "Accepted") {
          //make cards here
        }
      }
      console.log(response);
      //Adding a button to completed accept and reject bookings button
    },
  });
}
