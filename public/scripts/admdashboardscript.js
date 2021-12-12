function getSomeSitter() {
  $("#navbarform").show();
  $.ajax({
    method: "GET",
    url: "/customerDashboard/getsitterfordashboard",
    success: function (response) {
      $("#mainbinder").empty();
      if (response != null || response.length !== 0) {
        for (var i = 0; i < response.length; i++) {
          var center = $("<div/>", {
            class: "card text-center",
            id: "card" + i,
          });
          var center = $('<div class="card text-center" id="card"></div>');
          var main = $(
            '<div class="card-header"></div><div class="card-body"><h1 class="card-title">' +
              response[i].firstName +
              " " +
              response[i].lastName +
              '</h1><p class="card-text">' +
              response[i].bio +
              '</p><label for="rating">Rating:' +
              response[i].overall_rating +
              ' </label><br><label for="price">Price:' +
              response[i].price +
              "</label>"
          );

          var book = $(
            '<a href="#!" id ="book" class="btn btn-primary">More Info</a></div><div class="card-footer text-muted"></div></div>'
          );
          main.appendTo(center);
          book.appendTo(center);

          book.attr("onclick", `bookthissitter('${response[i].email}')`);
          $("#mainbinder").append(center);
        }
      } else {
        alert("Something went wrong");
      }
    },
  });
}

function getSomeOwner() {
  $("#navbarform").hide();
  // $("#privateNav").append(navbar);
  $.ajax({
    method: "GET",
    url: "/customerDashboard/getOwnerfordashboard",
    success: function (response) {
      console.log(response);
      $("#mainbinder").empty();
      if (response != null || response.length !== 0) {
        for (var i = 0; i < response.length; i++) {
          var center = $("<div/>", {
            class: "card text-center",
            id: "card" + i,
          });
          var center = $('<div class="card text-center" id="card"></div>');
          var main = $(
            '<div class="card-header"></div><div class="card-body"><h1 class="card-title">' +
              response[i].firstName +
              " " +
              response[i].lastName +
              '</h3><p class="card-text">' +
              "Dog name:" +
              " " +
              response[i].dog_name +
              '</p><label for="rating">Email: ' +
              response[i].email +
              "</label>"
          );

          var book = $(
            '<a href="#!" id ="book" class="btn btn-primary">Get Booking Info</a></div><div class="card-footer text-muted"></div></div>'
          );
          main.appendTo(center);
          book.appendTo(center);

          book.attr("onclick", `GetMyBookingsPending('${response[i].email}')`);
          //console.log(response[i].email);
          $("#mainbinder").append(center);
        }
      } else {
        alert("Something went wrong");
      }
    },
  });
}

$("#searchForm").submit((event) => {
  event.preventDefault();
  var serachterm = $("#search_term").val().trim();
  var zipcode = $("#Zipcode_term").val().trim();
  var rating = $("#rating_val").val().trim();
  var pricerange = $("#price_val").val().trim();
  var obj = {
    serachterm: serachterm,
    zipcode: zipcode,
    rating: rating,
    pricerange,
    pricerange,
  };
  var data = JSON.stringify(obj);
  $.ajax({
    type: "POST",
    url: "customerDashboard/getfiltersearchresult",
    data: data,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      $("#mainbinder").empty();
      if (response.length != 0) {
        for (var i = 0; i < response.length; i++) {
          var center = $("<div/>", {
            class: "card text-center",
            id: "card" + i,
          });
          var center = $('<div class="card text-center" id="card"></div>');
          var main = $(
            '<div class="card-header"></div><div class="card-body"><h1 class="card-title">' +
              response[i].firstName +
              " " +
              response[i].lastName +
              '</h1><p class="card-text">' +
              response[i].bio +
              '</p><label for="rating">Rating:' +
              response[i].overall_rating +
              ' </label><br><label for="price">Price:' +
              response[i].price +
              "</label>"
          );

          var book = $(
            '<a href="#!" id ="book" class="btn btn-primary">Book</a></div><div class="card-footer text-muted"></div></div>'
          );
          main.appendTo(center);
          book.appendTo(center);
          book.attr("onclick", `bookthissitter('${response[i].email}')`);
          $("#mainbinder").append(center);
        }
      } else {
        $("#mainbinder").append("<p>No sitter found try again</p>");
      }
    },
  });
});
