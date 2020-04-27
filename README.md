# Setup for unauthenticated lightninng out implementation

1. Enable Communities in your org
2. Create a community
   - Name the community Public Lightning Out
   - Fill in the optional url with lightningoutpublic
   - Activate the community
3. Clone this repository
   - run sfdx force:mdapi:deploy -d public_metadata/
4. Add the web app origin in org's CORS
   - https://help.salesforce.com/articleView?id=snapins_chat_cors_whitelist.htm&type=5
5. Configure the community user's profile to make sure it has access to the permissions that your lightning component requires.
6. Sample implementation code for your web app

   ```html
   <html lang="en">
     <head>
       <title>
         Salesforce Lightnig Out Demo
       </title>
     </head>
     <body>
       <div id="lexcontainer"></div>
     </body>
     <script src="<URL of your community>/lightning/lightning.out.js"></script>

     <script>
       var _lightningReady = false;

       createLightningComponent();

       function setupLightning(callback) {
         var appName = "c:LightningOutApp";

         if (_lightningReady) {
           if (typeof callback === "function") {
             callback();
           }
         } else {
           // Transform the URL for Lightning
           var url = "<URL of your community>/lightningoutpublic"; ///$.cookie("InstURL");
           //url = url.replace("my.salesforce", "lightning.force");

           $Lightning.use(
             appName,
             function() {
               _lightningReady = true;
               document.getElementById("lexcontainer").style.display = "";
               if (typeof callback === "function") {
                 callback();
               }
             },
             url,
             "<URL of your community>/lightningoutpublic/"
           );
         }
       }

       // attributes of your lightning component
       let compAttributes = { attributeTest: 4 };

       function createLightningComponent() {
         setupLightning(function() {
           $Lightning.createComponent(
             "c:LightningOutComponent",
             {
               componentName: "c:<name of your lightning component>",
               componentAttributes: JSON.stringify(compAttributes)
             },
             "lexcontainer"
           );
         });
       }
     </script>

     <style type="text/css">
       html,
       body {
         width: 100%;
         height: 100%;
       }

       .slds-scope:not(html),
       .slds-scope body,
       .slds-media__body,
       .forceChatterStyle .cuf-preamble,
       .cuf-subPreamble .slds-text-body--small,
       .slds-post__footer {
         font-size: 1rem !important;
       }
     </style>
   </html>
   ```
