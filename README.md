# CS546_WP_Group_13_Final_Project

Project Description

We are creating a website application where a dog owner can hire a nanny or sitter for a predetermined period of time to take care of their dogs. The motivation behind this project is if a dog owner needs to visit outside town for few hours or days, then by hiring a sitter for their dogs will relieve owners of mental stress about their dogs that stay back home. In this application, we will include features that will manage both dog owner’s and sitter’s profile. Both dog owner and sitter will be able to navigate through the web application where they can create, update or delete their information accordingly. As admins, we will have access to both dog owner and sitter databases and monitor their activities for record. 

In this web application dog owner can provide his/her experience by reviewing and rating the sitter after their service and the other way round where sitters can review dog owners to maintain conduct between both parties involved. This is a useful and friendly website for dog owners and dog sitter!


Directions to use this website without any inconvenience:

1. This is a public repository, so you can clone the GitHub link directly from here.
2. You will need VS Code software to run the program, MongoDB, and a good internet connection.

For the Backend part, you will need to:
---- (seed.js) file : In this file, you will need to uncomment any function you need to check separately. The file contains all the function calls, they are 
                      just commented. For checking each function separately, uncomment them
  
---- Reviewing and providing a rating to sitter : In this webiste, the dog owner can book a sitter on date or day after tomorrow/ Future dates. The dog owner would not be
                                                  able to book for previous or past dates. So, to check for review function, you will manually have to change the booking
                                                  information and change it to past dates. Only then, you will be able to review a sitter after visiting "Booking History" 
                                                  on the webiste. For example: The dog owner books a sitter for 12/13/2021. But, you need to check review function today, 
                                                  so for that in the databse you will need to change the date to 12/12/2021. So, you can check for the review function.
                                                 
                                                  In the website, user do not have to go through this tedious procedure. This is just for testing purposes on backend.
                                                 
For the Frontend part, you will need to:
---- (Sitter Dashboard) : On this dashboard, sitter have its entire information saved in "My Profile". Here, it will be able to update and delete its profile as per its
                          availability. After deleting the profile, the Sitter's "active_status" in databse will change to 0 instead of 1.
                          
                          
                          
These requirements are just for checking purposes. You can easily navigate through the webiste, create profile, update and delete it whenever required. Dog owners can easily review sitters and rate them. They can filter sitters by ratings and zipcode. Also, sitters can accept and reject dog owners requests according to their availability. 


Enjoy on our website. Hope you find a better sitter for your dogs. Happy Holidays!
                                                 
                                                 
                                 
