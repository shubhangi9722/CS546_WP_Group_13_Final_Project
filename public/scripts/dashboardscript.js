function getSomeSitter() {
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
            '<div class="card-header"></div><div class="card-body"><h5 class="card-title">' +
              response[i].firstName +
              " " +
              response[i].lastName +
              '</h5><p class="card-text">' +
              response[i].bio +
              '</p><label for="rating">Rating:' +
              response[i].overall_rating +
              ' </label><br><label for="price">Price:' +
              response[i].price +
              "</label>"
          );

          var book = $(
            '<a href="#!" id ="book" class="btn btn-primary")">Book</a></div><div class="card-footer text-muted"></div></div>'
          );
          main.appendTo(center);
          book.appendTo(center);
          // book.on("click", function (e) {
          //   bookthissitter(response[i].email);
          // });
          book.attr("onclick", `bookthissitter('${response[i].email}')`);
          $("#mainbinder").append(center);
        }
      } else {
        alert("Something went wrong");
      }
    },
  });
}

function bookthissitter(data) {
  $("#mainbinder").empty();

  //$("#mainbinder").append(data);
  var center = $('<div class="card text-center" id="card"></div>');
  var bookingform = $('<form method="post"></form>');
  var checkinout = $(
    '<div id = "datetime"><label for="checkin-date" id ="bookinglable">Check-in Date</label><input type="datetime-local" id="checkin-date" name="checkin" required></div><br><br><label for="checkout-date" >Check-out Date</label><input type="datetime-local" id="checkout-date" name="checkout" required></div></div><br><br>'
  );
  var serviceoptions = $(
    '<label for="service-selection" id="bookinglable">Select Service</label><select id="service-selection" name="service_selection" required><option value="">Choose a service from the List</option><option value="DogWalking">Dog Walking</option><option value="HouseSitting">House Sitting</option><option value="Daycare">Day care</option><option value="night care">night care</option></select></div><br><br>'
  );
  var textarea = $(
    '<label for="message" id="bookinglable">Anything Else?</label><textarea id="bookingtextarea" name="visitor_message" placeholder="Tell us anything else that might be important." required></textarea></div><br><br>'
  );
  var bookbutton = $(
    '<a href ="#!" class="btn btn-primary" type="submit" id="bookthis">Book The Sitter</button><br>'
  );
  var backbutton = $(
    '<a href ="#!" class="btn btn-primary" type="submit" id="backbutton">Back</button>'
  );
  serviceoptions.appendTo(bookingform);
  checkinout.appendTo(bookingform);
  textarea.appendTo(bookingform);
  bookbutton.appendTo(bookingform);
  bookbutton.on("click", function (event) {
    $("#mainbinder").append(data);
    var formData = {};
    $.ajax({
      method: "POST",
      url: "/customerDashboard/Createbooking/",
      data: formData,
      success: function (response) {},
    });
  });
  backbutton.attr("onclick", "getSomeSitter()");
  backbutton.appendTo(bookingform);
  bookingform.appendTo(center);
  $("#mainbinder").append(center);
}

function GetOwnerDetails(email) {
  $.ajax({
    method: "GET",
    url: "/customerDashboard/getCustomerDetails/" + email,
    success: function (response) {
      if (response != null) {
        $("#mainbinder").empty();
        $("#mainbinder").append(
          '<label><b>First Name*</label><input type="text" name="firstName" id="firstName" placeholder="First Name " value="' +
            response.firstName +
            '"><br><br><label><b>Last Name*</label>            <input type="text" name="lastName" id="lastName" placeholder="Last Name" value="' +
            response.lastName +
            '">            <br><br>            <label><b>Date of Birth*                           </label>            <input type="text" name="dob" id="dob" placeholder="MM/DD/YYYY" value="' +
            response.dob +
            '">            <br><br>            <label><b>E-mail*                           </label>            <input type="email" name="email" id="email" placeholder="E-mail" value="' +
            response.email +
            '" disabled>            <br><br>            <label><b>Gender*                           </label>            <select name="gender" id="gender">                <option value="m">Male</option>                <option value="f">Female</option>                <option value="o">other</option>            </select>            <br><br>            <label><b>Phone Number*                           </label>            <input type="text" name="phone_number" id="phone_number" placeholder="Phone Number"                value="' +
            response.phone_number +
            '">            <br><br>            <label><b>Address*                           </label>            <input type="text" name="address" id="address" placeholder="Address" value="' +
            response.address +
            '">            <br><br>            <label><b>Zipcode*                           </label>            <input type="text" name="zipcode" id="zipcode" placeholder="Zipcode" value="' +
            response.zipcode +
            '">            <br><br><button class="btn btn-primary" id="update_user">Update</button>'
        );
      } else {
        alert("Something went wrong");
      }
    },
  });
}

function GetOwnerDogDetails(email) {
  $.ajax({
    method: "GET",
    url: "/customerDashboard/getCustomerDetails/" + email,
    success: function (response) {
      if (response != null) {
        $("#mainbinder").empty();
        $("#mainbinder").append(
          '<label><b>Dog name*                           </label>            <input type="text" name="dog_name" id="dog_name" placeholder="Dog Name" value="' +
            response.dog_name +
            '">            <br><br>            <label><b>Dog Gender*                           </label>                <select name="dog_gender" id="dog_gender">                <option value="m">Male</option>                <option value="f">Female</option>            </select>            <br><br>            <label><b>Dog Breed*                           </label>            <input type="text" name="dog_breed" id="dog_breed" placeholder="Dog Breed" value="' +
            response.dog_breed +
            '">            <br><br>            <label><b>Dog Date of Birth*                           </label>            <input type="text" name="dog_dob" id="dog_dob" placeholder="MM/DD/YY" value="' +
            response.dog_dob +
            '">            <br><br>            <label><b>Dog Weight*                           </label>            <input type="number" name="weight" id="weight" placeholder="Dog Weight" value="' +
            response.weight +
            '">            <br><br>            <label><b>Dog Behavioral Information                           </label>            <textarea type="text" name="behavioral_information" id="behavioral_information"                placeholder="Dog Behavioral Information" value="' +
            response.behavioral_information +
            '"></textarea>            <br><br>            <label><b>Veterinarian name                           </label>            <input type="text" name="vet_name" id="vet_name" placeholder="veterinarian name" value="' +
            response.vet_name +
            '">            <br><br>            <label><b>Veterinarian Phone Number                           </label>            <input type="text" name="vet_phn" id="vet_phn" placeholder="veterinarian name" value="' +
            response.vet_phn +
            '">            <br><br><button class="btn btn-primary" id="update_Dog">Update</button>'
        );
      } else {
        alert("Something went wrong");
      }
    },
  });
}
