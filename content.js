console.log("Ready to go...");
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

$(document).keyup(function(e) {

    try
    {
          //Add Order to Q
          if (e.key === 'q' || e.key === 'Q' || e.keyCode == 27) {

            var orderElement = getElementByXpath ("//*[@class='orderDataTitle']//span[1]");
            //console.log("Fetched order : "+ orderElement);
            var orderNumber = orderElement.innerHTML;
            console.log("Fetched order : "+orderNumber);
            orderNumber =  orderNumber.replace(new RegExp("-", 'g'), "_");
            orderNumber =  orderNumber.replace(new RegExp("/", 'g'), "_");
            console.log("Fetched order : "+orderNumber);

            //Fetch its lat long co-ords
            var latLongs = getElementByXpath("//*[text()='Latitude / Longitude']//ancestor::tr[1]//td[@class='orderData2']//span"); // - //*[text()='Latitude / Longitude']//ancestor::tr[1]//td[@class="orderData2"]//span
            //console.log("Fetched latLongs : "+ latLongs);
            var latLongs =  latLongs.innerHTML;
            var latLongs_array = latLongs.split(" ");
            console.log("Fetched lat longs : lat = "+latLongs_array[0] + " long : "+latLongs_array[1]);

            //Get Customer Name - //Get Customer Name - //*[text()='Customer']//ancestor::tr[1]//td[@class="orderData4"]//span[1]
            var custName = getElementByXpath("//*[text()='Customer']//ancestor::tr[1]//td[@class='orderData4']//span[1]");
            var custText = custName.innerText;
            console.log("Fetched Customer Name : "+  custText);

            //Fetch Customer Address
            var address = getElementByXpath("//*[text()='Address']//ancestor::tr[1]//td[@class='orderData2']//span");  // - //*[text()='Address']//ancestor::tr[1]//td[@class=\"orderData2\"]
            //console.log ("Fetch address : "+ address);
            var addressText = address.innerHTML;
            console.log("Fetched addressText : "+  addressText);

            //Get Total after rounding - //*[text()='Total After Rounding']//ancestor::tr[1]//td[@class='orderItemsTotal5']//span
            var totalAfterRoundingElem = getElementByXpath("//*[text()='Total After Rounding']//ancestor::tr[1]//td[@class='orderItemsTotal5']//span");
            var totalAfterRoundingText = totalAfterRoundingElem.innerText;
            console.log("Fetched total after rounding : "+ totalAfterRoundingText);

            //Get Branch  - //*[@class='mcdeliveryLogo']//ancestor::tr[1]//td[@valign="middle"]//span[1]
            var branchElem = getElementByXpath("//*[@class='mcdeliveryLogo']//ancestor::tr[1]//td[@valign='middle']//span[1]");// //*[@class='mcdeliveryLogo']//ancestor::tr[1]//td[@valign="middle"]//span[1]
            var branchText =  branchElem.innerText;
            console.log("Branch : "+ branchText);

            var phoneNumberElem = getElementByXpath("//*[text()='Phone No']//ancestor::tr[1]//td[@class='orderData2']//span[1]");//  // - //*[text()='Phone No']//ancestor::tr[1]//td[@class='orderData2']//span
            var phoneNumberText  = phoneNumberElem.innerText;
            console.log('Phone number : '+ phoneNumberText);

            //TODO - Connect to Firebase and get corresponding branch username password strings


            //Call Loginext OD
            $.ajax({
              url: "https://products.loginextsolutions.com/ShipmentApp/ondemand/v1/create",
              type: 'post',
              contentType: "application/json",
              data:
              JSON.stringify(
                  [ {
                    "cashOnDelivery": totalAfterRoundingText,
                    "customerName": custText,
                    "locality": "Powai",
                    "subLocality": "Supreme Business Park",
                    "address": addressText,
                    "deliverPhoneNumber": "8888889999",
                    "orderNo": orderNumber,
                    "distributionCenter": "OnDemandDemoBranch",
                    "paymentType": "COD"
                  }]
                )
              ,
              headers: {
                  "WWW-Authenticate" : "BASIC e2077121-f874-413b-864e-ff6cfbad8765",
                  "CLIENT_SECRET_KEY": '$2a$08$.m2ESyrl.vz9YKeo5c7szenEOlof5nJsintu4Mk2uP95b5n1dzp06',   //If your header name has spaces or any other char not appropriate
                  "Content-Type": 'application/json'  //for object property name, use quoted notation shown in second
              },
              dataType: 'json',
              success: function (data) {
                  console.info(data);
              }
            });

            alert("Created order : "+orderNumber+ " in LogiNext...! "); // :)
      }
    }
    catch(err) {
          alert ("Unknown page...");
    }
  }
);
