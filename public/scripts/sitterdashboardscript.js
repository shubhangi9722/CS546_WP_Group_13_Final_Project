
function GetSiiterDetails(email)
{
    $.ajax({
        method: "GET",
        url: "/sitterDashboard/getSitterDetails/"+email,
        success: function (response) {
          if (response != null) {
             $("#mainbinder").empty();
             $("#mainbinder").append('<label><b>First Name*</label><br><input type="text" name="firstName" id="firstName" placeholder="First Name " value="'+response.firstName+'"><br><br><label><b>Last Name*</label><br>            <input type="text" name="lastName" id="lastName" placeholder="Last Name" value="'+response.lastName+'">            <br><br>            <label><b>Date of Birth*                           </label><br>            <input type="text" name="dob" id="dob" placeholder="MM/DD/YYYY" value="'+response.dob+'">            <br><br>            <label><b>E-mail*                           </label> <br>           <input type="email" name="email" id="email" placeholder="E-mail" value="'+response.email+'" disabled>            <br><br>            <label><b>Gender*                           </label> <br>           <select name="gender" id="gender">                <option value="m">Male</option>                <option value="f">Female</option>                <option value="o">other</option>            </select>            <br><br>            <label><b>Phone Number*                           </label> <br>           <input type="text" name="phone_number" id="phone_number" placeholder="Phone Number"                value="'+response.phone_number+'"><br><br><label><b>Address*</label> <br><input type="text" name="address" id="address" placeholder="Address" value="'+response.address+'"><br><br><label><b>Zipcode* </label> <br> <input type="text" name="zipcode" id="zipcode" placeholder="Zipcode" value="'+response.zipcode+'">            <br><br><label><b>Price*</label><br><input type="text" name="price" id="price" placeholder="price " value="'+response.price+'"><br><br><label><b>Short Bio </label><br><textarea type="text" name="bio" id="bio" placeholder="Please write something about your self"></textarea><br><br><button class="btn btn-primary" id="update_user" onclick="updateSitter(\''+response.email+'\')">Update</button> &nbsp;&nbsp;<button class="btn btn-primary" id="delet_user" onclick="deleteSitter(\''+response.email+'\')">Delete</button>'); 
             $('#bio').val(response.bio);
          } else {
            alert("Something went wrong");
          }
        },
      });

}



function updateSitter(email) {
  var firstName = $("#firstName").val().trim();
  var lastName = $("#lastName").val().trim();
  var email = $("#email").val().trim();
  var phone_number = $("#phone_number").val().trim();
  var gender = $("#gender").val().trim();
  var address = $("#address").val().trim();
  var zipcode = $("#zipcode").val().trim();
  var dob = $("#dob").val().trim();
  var price = $("#price").val().trim();
  var bio = $("#bio").val().trim();

  if (firstName == "") {
    alert("First Name Cannot be empty");
    return
  }
  if (lastName == "") {
    alert("Lats Name Cannot be empty");
    return
  }
  if (email == "") {
    alert("Email Cannot be empty");
    return
  }
  if (phone_number == "") {
    alert("Phone Number Cannot be empty");
    return
  }
  if (gender == "") {
    alert("Select a gender be empty");
    return
  }
  if (address == "") {
    alert("Address Cannot be empty");
    return
  }
  if (zipcode == "") {
    alert("ZipCode Cannot be empty");
    return
  }
  if (dob == "") {
    alert("Date of Birth Cannot be empty");
    return
  }
  if (price == "") {
    alert("Date of Birth Cannot be empty");
    return
  }
  if (bio == "") {
    alert("Date of Birth Cannot be empty");
    return
  }

  if (typeof firstName !== "string") {
    alert("First Name must be a string");
    return
  }
  if (typeof lastName !== "string") {
    alert("Last Name must be a string");
    return
  }
  if (typeof email !== "string") {
    alert("Email must be a string");
    return
  }
  if (typeof phone_number !== "string") {
    alert("Phone Number must be a string");
    return
  }
  if (typeof gender !== "string") {
    alert("gender must be string");
    return
  }
  if (typeof address !== "string") {
    alert("Address must be string");
    return
  }
  if (typeof zipcode !== "string") {
    alert("ZipCode must be string");
    return
  }
  if (typeof dob !== "string") {
    alert("Date of Birth must be string");
    return
  }
  if (typeof bio !== "string") {
    alert("Date of Birth must be string");
    return
  }

  var phnregex =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (!phone_number.valueOf().match(phnregex)) {
    alert("your phone number format is incorrect");
    return
  }
  var dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!dob.valueOf().match(dobregex)) {
    alert("your date of bith format is incorrect");
    return
  }

  var zipvalid = /^\d{5}$/;
  if (!zipcode.valueOf().match(zipvalid)) {
    alert("your zipcode is incorrect");
    return
  }

  var sitterobj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone_number: phone_number,
    gender: gender,
    address: address,
    zipcode: zipcode,
    dob: dob,
    price:price,
    bio:bio
  };
  var data = JSON.stringify(sitterobj);

  $.ajax({
    type: "POST",
    url: "sitterDashboard/updateSitter",
    data: data,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      if (response.sitterUpdated == true) {
        alert("Your Profile is updated");
      } else {
        alert("Sorry somerthing went wrong ");
      }
    },
    error: function(response){
      alert(response.responseJSON);
  }
  });
}

function deleteSitter(email)
{
    $.ajax({
        method: "GET",
        url: "/sitterDashboard/deleteSitterProfile/"+email,
        success: function (response) {
          if (response.sitterDeleted==true) 
          {
            window.location.href = "/logout";
          } else {
            alert("Something went wrong");
          }
        },
      });

}
