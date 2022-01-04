claimant development steps
used tailwindcss
secrutity is a main concern

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

About Us
Claimat is a free software under health and nutrition category which enables easy identification of pharmacies with required medication.
We provide a non physical interaction between patients and pharmacies so as to monimise movements and wastage of time when consulting for presciptions and specific drugs.We are a bridge  between the society and all the medical help and drug information they require

Services
--for end user, Claimant has a mobile platform which is compartible on both android and iOS. If medication is so needed, we will provie the nearest pharmacy with the required medication. The mobile platform also provides a way for a patient to communicate with the pharmacy and get feedback on when certain medication need be taken

--for pharmacies, Claimant has a admin inventory management dashboard.. where the pharmacy can manage their stock, and orders from end users.  we ensure security of information between user and pharmacists will remain confidential.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------
Diclaimer
Medical content on this platform is for informational purposes only, And is not intended to be substituted for professional medical advice, diagnosis, or treatment, please seek the advice of a physician or other qualified health personnel with any questions you may have regarding a medical condition. 


How to use:
for end users-- 
you can either download the app from app and play store to have more features
    or u can just search and find needed pharmacy from the platform and 

-----------------------------------------------for backend ----------------------------------------------------------
--all routes are in routes folder
--all controllers are in controllers folder
--all schemas are in models folder
--used the mvc architucture

-Day1
    *-server created .. up on port 5050
    *-database name is claimantdatabase
    *-authentication for user done
    *-tken created for user
    *-authenticated route created
    *-user route created
        *-get all users
        *-get a single user
        *-update user using req.params
-Day2
    *-authenticate routes
    *-create pharmacy
     *   -pharmacyname,
      *  -phonenumber,
       * -identity = "pharmcay",
        *-address,
        *-password,
        *-email,
        *-website,
        *-logo/picture,
        *-longitude,
        *-latitude
    *-get a pharmacy
    *-get all pharmacies without authentication
    *-create route for configuring pharmacy info
    *-create drug route... should have:
    *    -drug name,
     *   -description
      *  -dosage
       * -drug type
        *-barcode
        *-sku
        *-drugpicture
        *-category
        *-created_at,
        *-updated_at
        *    -add drug
            -delete drug
         *   -update drug
          *  -get drug
           * -get all drugs of that pharmacy using owner id
            *-get all drugs for selling to user
    
-----------------------------------------For Users--------------------------------------
schema defination
    name
    address
    prescription
    firstname
    lastname
    username
    password
    orders
    todos
*schema for order:
 *   items
  *  quantity
   * price
    *date 

routes needed
    user is created on register 
    --update user info
    -delete user
    -get single user
    -get all users 

route for orders
    -create an order
    -edit an order
    -delete an order


-----------------------------------------------for fronend ---------------------------------------------------
day 1:
    *-dashboard layout
    *-dashboard routes
        *-dashboard
        *-orders
        *-inventory
        *-settings
        -analytics
        -notifications
    -----------to be done tommorrow
        *-state management with context api
        *-manage auth
            *-login page
            *-register page
                -if user is a pharmacy redirect to create pharmacy oage
            -logout and redirect to home
        *-edit pharmacy info
        *-add product to inventory
        *-edit product
        *-home page
        *-about us page
        -terms and coditions
Day 2:
    *navbar
    *routes to pages
    *signup functionality