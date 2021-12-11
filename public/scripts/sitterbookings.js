function getsomebookings(email) {
  //   console.log(req.session.user.email);
  //   let email = req.session.user.email;
  $.ajax({
    method: "GET",
    url: "/sitterbooking/getsomebookings/" + email,
    success: function (response) {
      for (x in response) {
        if (x.status == "Requested") {
        }
      }
      console.log(response);
      //Adding a button to completed accept and reject bookings button
    },
  });
}

function changestatus(bookingid) {
  $.ajax({
    method: "GET",
    url: "/sitterbooking/getsomebookings/" + email,
    success: function (response) {
      for (x in response) {
        if (x._id == bookingid) {
          //$("#mainbinder").append(display this booking)
          //Add accept/Reject button
          //buttons will have x.id as parameter
          //display this booking
        }
        //console.log(x);
      }
      console.log(response);
      //Adding a button to completed accept and reject bookings button
    },
  });
}
function Accept(bookingid) {
  $.ajax({
    method: "POST",
    url: "/booking/accept/" + bookingid,
    success: function (response) {
      if (response.updated == true) {
        alert("thhis booking has been accepted");
      }
      console.log(response);
      //Adding a button to completed accept and reject bookings button
    },
  });
}

function Rejected(bookingid) {
  $.ajax({
    method: "POST",
    url: "/booking/rejected/" + bookingid,
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
