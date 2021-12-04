function getSomeSitter()
{

    $.ajax({
        method: "GET",
        url: "/customerDashboard/getsitterfordashboard",
        success: function (response) {
          $("#mainbinder").empty();
          if (response != null || response.length !== 0) {
            for (var i = 0; i < response.length; i++) {
              $("#mainbinder").append('<div class="card text-center"><div class="card-header"></div><div class="card-body"><h5 class="card-title">'+response[i].firstName+' '+response[i].lastName+'</h5><p class="card-text">'+response[i].bio+'</p><label for="rating">Rating:'+response[i].overall_rating+' </label><br><label for="price">Price:'+response[i].price+'$</label><br><a href="#" class="btn btn-primary">Book</a></div><div class="card-footer text-muted"></div></div>');
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
             $("#mainbinder").append('<label><b>First Name*</label><input type="text" name="firstName" id="firstName" placeholder="First Name " value="'+response.firstName+'"><br><br><label><b>Last Name*</label>            <input type="text" name="lastName" id="lastName" placeholder="Last Name" value="'+response.lastName+'">            <br><br>            <label><b>Date of Birth*                           </label>            <input type="text" name="dob" id="dob" placeholder="MM/DD/YYYY" value="'+response.dob+'">            <br><br>            <label><b>E-mail*                           </label>            <input type="email" name="email" id="email" placeholder="E-mail" value="'+response.email+'" disabled>            <br><br>            <label><b>Gender*                           </label>            <select name="gender" id="gender">                <option value="m">Male</option>                <option value="f">Female</option>                <option value="o">other</option>            </select>            <br><br>            <label><b>Phone Number*                           </label>            <input type="text" name="phone_number" id="phone_number" placeholder="Phone Number"                value="'+response.phone_number+'">            <br><br>            <label><b>Address*                           </label>            <input type="text" name="address" id="address" placeholder="Address" value="'+response.address+'">            <br><br>            <label><b>Zipcode*                           </label>            <input type="text" name="zipcode" id="zipcode" placeholder="Zipcode" value="'+response.zipcode+'">            <br><br><button class="btn btn-primary" id="update_user">Update</button>'); 
          } else {
            alert("Something went wrong");
          }
        },
      });
}

function GetOwnerDogDetails(email)
{
    $.ajax({
        method: "GET",
        url: "/customerDashboard/getCustomerDetails/"+email,
        success: function (response) {
          if (response != null) {
             $("#mainbinder").empty();
             $("#mainbinder").append('<label><b>Dog name*                           </label>            <input type="text" name="dog_name" id="dog_name" placeholder="Dog Name" value="'+response.dog_name+'">            <br><br>            <label><b>Dog Gender*                           </label>                <select name="dog_gender" id="dog_gender">                <option value="m">Male</option>                <option value="f">Female</option>            </select>            <br><br>            <label><b>Dog Breed*                           </label>            <input type="text" name="dog_breed" id="dog_breed" placeholder="Dog Breed" value="'+response.dog_breed+'">            <br><br>            <label><b>Dog Date of Birth*                           </label>            <input type="text" name="dog_dob" id="dog_dob" placeholder="MM/DD/YY" value="'+response.dog_dob+'">            <br><br>            <label><b>Dog Weight*                           </label>            <input type="number" name="weight" id="weight" placeholder="Dog Weight" value="'+response.weight+'">            <br><br>            <label><b>Dog Behavioral Information                           </label>            <textarea type="text" name="behavioral_information" id="behavioral_information"                placeholder="Dog Behavioral Information" value="'+response.behavioral_information+'"></textarea>            <br><br>            <label><b>Veterinarian name                           </label>            <input type="text" name="vet_name" id="vet_name" placeholder="veterinarian name" value="'+response.vet_name+'">            <br><br>            <label><b>Veterinarian Phone Number                           </label>            <input type="text" name="vet_phn" id="vet_phn" placeholder="veterinarian name" value="'+response.vet_phn+'">            <br><br><button class="btn btn-primary" id="update_Dog">Update</button>'); 
          } else {
            alert("Something went wrong");
          }
        },
      });  
}