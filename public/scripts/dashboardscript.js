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
            '<a href="#!" id ="book" class="btn btn-primary">Book</a></div><div class="card-footer text-muted"></div></div>'
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



function GetOwnerDetails(email)
{
    $.ajax({
        method: "GET",
        url: "/customerDashboard/getCustomerDetails/"+email,
        success: function (response) {
          if (response != null) {
             $("#mainbinder").empty();
             $("#mainbinder").append('<label><b>First Name*</label><br><input type="text" name="firstName" id="firstName" placeholder="First Name " value="'+response.firstName+'"><br><br><label><b>Last Name*</label><br>            <input type="text" name="lastName" id="lastName" placeholder="Last Name" value="'+response.lastName+'">            <br><br>            <label><b>Date of Birth*                           </label><br>            <input type="text" name="dob" id="dob" placeholder="MM/DD/YYYY" value="'+response.dob+'">            <br><br>            <label><b>E-mail*                           </label> <br>           <input type="email" name="email" id="email" placeholder="E-mail" value="'+response.email+'" disabled>            <br><br>            <label><b>Gender*                           </label> <br>           <select name="gender" id="gender">                <option value="m">Male</option>                <option value="f">Female</option>                <option value="o">other</option>            </select>            <br><br>            <label><b>Phone Number*                           </label> <br>           <input type="text" name="phone_number" id="phone_number" placeholder="Phone Number"                value="'+response.phone_number+'">            <br><br>            <label><b>Address*                           </label> <br>           <input type="text" name="address" id="address" placeholder="Address" value="'+response.address+'">            <br><br>            <label><b>Zipcode*                           </label> <br>           <input type="text" name="zipcode" id="zipcode" placeholder="Zipcode" value="'+response.zipcode+'">            <br><br><button class="btn btn-primary" id="update_user" onclick="updateowner(\''+response.email+'\')">Update</button>'); 
          } else {
            alert("Something went wrong");
          }
        },
      });
      //onclick="updateowner(\''+response.email+'\')"

}

function GetOwnerDogDetails(email)
{
    $.ajax({
        method: "GET",
        url: "/customerDashboard/getCustomerDetails/"+email,
        success: function (response) {
          if (response != null) {
             $("#mainbinder").empty();
             $("#mainbinder").append('<label><b>Dog name*                           </label><br>            <input type="text" name="dog_name" id="dog_name" placeholder="Dog Name" value="'+response.dog_name+'">            <br><br>            <label><b>Dog Gender*                           </label> <br>               <select name="dog_gender" id="dog_gender">                <option value="m">Male</option>                <option value="f">Female</option>            </select>            <br><br>            <label><b>Dog Breed*                           </label>   <br>         <input type="text" name="dog_breed" id="dog_breed" placeholder="Dog Breed" value="'+response.dog_breed+'">            <br><br>            <label><b>Dog Date of Birth*                           </label>    <br>        <input type="text" name="dog_dob" id="dog_dob" placeholder="MM/DD/YYYY" value="'+response.dog_dob+'">            <br><br>            <label><b>Dog Weight*                           </label>     <br>       <input type="number" name="weight" id="weight" placeholder="Dog Weight" value="'+response.weight+'">            <br><br>            <label><b>Dog Behavioral Information                           </label>    <br>        <textarea type="text" name="behavioral_information" id="behavioral_information"                placeholder="Dog Behavioral Information"></textarea>            <br><br>            <label><b>Veterinarian name                           </label>  <br>          <input type="text" name="vet_name" id="vet_name" placeholder="veterinarian name" value="'+response.vet_name+'">            <br><br>            <label><b>Veterinarian Phone Number                           </label>   <br>         <input type="text" name="vet_phn" id="vet_phn" placeholder="veterinarian name" value="'+response.vet_phn+'">            <br><br><button class="btn btn-primary" id="update_Dog" onClick="updatdog(\''+response.email+'\')">Update</button>');
             $('#behavioral_information').val(response.behavioral_information);
          } else {
            alert("Something went wrong")
          }
        },
      });  
}

$("#searchForm").submit((event) => {
  event.preventDefault();
  var serachterm =$('#search_term').val().trim();
  var zipcode=$('#Zipcode_term').val().trim();
  var rating=$('#rating_val').val().trim();
  var pricerange=$('#price_val').val().trim();
  var obj={
    serachterm:serachterm,
    zipcode:zipcode,
    rating:rating,
    pricerange,pricerange
  }
   var data= JSON.stringify(obj);
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
            '<a href="#!" id ="book" class="btn btn-primary">Book</a></div><div class="card-footer text-muted"></div></div>'
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
        $("#mainbinder").append('<p>No sitter found try again</p>');
      }
    },
   });
});


function updateowner(email) {
  var firstName = $("#firstName").val().trim();
  var lastName = $("#lastName").val().trim();
  var email = $("#email").val().trim();
  var phone_number = $("#phone_number").val().trim();
  var gender = $("#gender").val().trim();
  var address = $("#address").val().trim();
  var zipcode = $("#zipcode").val().trim();
  var dob = $("#dob").val().trim();

  if (firstName == "") {
    alert("First Name Cannot be empty");
  }
  if (lastName == "") {
    alert("Lats Name Cannot be empty");
  }
  if (email == "") {
    alert("Email Cannot be empty");
  }
  if (phone_number == "") {
    alert("Phone Number Cannot be empty");
  }
  if (gender == "") {
    alert("Select a gender be empty");
  }
  if (address == "") {
    alert("Address Cannot be empty");
  }
  if (zipcode == "") {
    alert("ZipCode Cannot be empty");
  }
  if (dob == "") {
    alert("Date of Birth Cannot be empty");
  }

  if (typeof firstName !== "string") {
    alert("First Name must be a string");
  }
  if (typeof lastName !== "string") {
    alert("Last Name must be a string");
  }
  if (typeof email !== "string") {
    alert("Email must be a string");
  }
  if (typeof phone_number !== "string") {
    alert("Phone Number must be a string");
  }
  if (typeof gender !== "string") {
    alert("gender must be string");
  }
  if (typeof address !== "string") {
    alert("Address must be string");
  }
  if (typeof zipcode !== "string") {
    alert("ZipCode must be string");
  }
  if (typeof dob !== "string") {
    alert("Date of Birth must be string");
  }

  var phnregex =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (!phone_number.valueOf().match(phnregex)) {
    alert("your phone number format is incorrect");
  }
  var dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!dob.valueOf().match(dobregex)) {
    alert("your date of bith format is incorrect");
  }

  var zipvalid = /^\d{5}$/;
  if (!zipcode.valueOf().match(zipvalid)) {
    alert("your zipcode is incorrect");
  }

  var ownerobj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone_number: phone_number,
    gender: gender,
    address: address,
    zipcode: zipcode,
    dob: dob,
  };
  var data = JSON.stringify(ownerobj);

  $.ajax({
    type: "POST",
    url: "customerDashboard/UpdateOwner",
    data: data,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      if (response.userUpdated == true) {
        alert("Your Profile is updated");
      } else {
        alert("Sorry somerthing went wrong ");
      }
    },
  });
}

function updatdog(email) {
  var dog_name = $("#dog_name").val().trim();
  var dog_gender = $("#dog_gender").val().trim();
  var dog_breed = $("#dog_breed").val().trim();
  var dog_dob = $("#dog_dob").val().trim();
  var vet_name = $("#vet_name").val().trim();
  var vet_phn = $("#vet_phn").val().trim();
  var weight = $("#weight").val().trim();
  var behavioral_information = $("#behavioral_information").val().trim();

  if (dog_name == "") {
    alert("Dog name Cannot be empty");
  }
  if (dog_gender == "") {
    alert("Dog gender Cannot be empty");
  }
  if (dog_breed == "") {
    alert("Dog breed Cannot be empty");
  }
  if (dog_dob == "") {
    alert("Dog date of birth Cannot be empty");
  }
  if (weight == "") {
    alert("Dog Weight Cannot be empty");
  }

  if (typeof dog_name !== "string") {
    alert("Dog Name must be a string");
  }
  if (typeof dog_gender !== "string") {
    alert("Dog gender must be a string");
  }
  if (typeof dog_breed !== "string") {
    alert("Dog breed must be a string");
  }
  if (typeof dog_dob !== "string") {
    alert("Dog date of birth must be a string");
  }

  var dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!dog_dob.valueOf().match(dobregex)) {
    alert("your date of bith format is incorrect");
  }

  var ownerobj = {
    email: email,
    dog_name: dog_name,
    dog_gender: dog_gender,
    dog_breed: dog_breed,
    dog_dob: dog_dob,
    vet_name: vet_name,
    vet_phn: vet_phn,
    weight: weight,
    behavioral_information: behavioral_information,
  };
  var data = JSON.stringify(ownerobj);

  $.ajax({
    type: "POST",
    url: "customerDashboard/UpdateDog",
    data: data,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      if (response.DogUpdated == true) {
        alert("Your dog's profile is updated");
      } else {
        alert("Sorry somerthing went wrong ");
      }
    },
  });
}
