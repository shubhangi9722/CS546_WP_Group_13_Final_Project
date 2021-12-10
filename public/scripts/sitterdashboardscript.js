
function GetSiiterDetails(email)
{
    $.ajax({
        method: "GET",
        url: "/sitterDashboard/getSitterDetails/"+email,
        success: function (response) {
          if (response != null) {
             $("#mainbinder").empty();
             $("#mainbinder").append('<label><b>First Name*</label><br><input type="text" name="firstName" id="firstName" placeholder="First Name " value="'+response.firstName+'"><br><br><label><b>Last Name*</label><br>            <input type="text" name="lastName" id="lastName" placeholder="Last Name" value="'+response.lastName+'">            <br><br>            <label><b>Date of Birth*                           </label><br>            <input type="text" name="dob" id="dob" placeholder="MM/DD/YYYY" value="'+response.dob+'">            <br><br>            <label><b>E-mail*                           </label> <br>           <input type="email" name="email" id="email" placeholder="E-mail" value="'+response.email+'" disabled>            <br><br>            <label><b>Gender*                           </label> <br>           <select name="gender" id="gender">                <option value="m">Male</option>                <option value="f">Female</option>                <option value="o">other</option>            </select>            <br><br>            <label><b>Phone Number*                           </label> <br>           <input type="text" name="phone_number" id="phone_number" placeholder="Phone Number"                value="'+response.phone_number+'">            <br><br>            <label><b>Address*                           </label> <br>           <input type="text" name="address" id="address" placeholder="Address" value="'+response.address+'">            <br><br>            <label><b>Zipcode*                           </label> <br>           <input type="text" name="zipcode" id="zipcode" placeholder="Zipcode" value="'+response.zipcode+'">            <br><br><button class="btn btn-primary" id="update_user" onclick="updateowner(\''+response.email+'\')">Update</button>'); 
          } else {
            alert("Something went wrong");
          }
        },
      });

}