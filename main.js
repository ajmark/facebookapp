$(document).ready(function(){
    jqueryActions();
    //Resets value of input field to blank
    $("form").submit(function(){
        getUserInput();
        $("#inputfield").val('');
        return false; 
    });
});

function jqueryActions(){
    //Changes color of header to facebook blue 
    $("h1").mouseenter(function(){
      $(this).css("color","#3b5998"); 
    });
    //Changes color of link on hover 
    $("a").mouseenter(function(){
        $(this).css("color","#222").mouseleave(function(){
            $(this).css("color","#3b5998");
        });
    });
    //Change coloer of facebook background info on hover 
    $(".infobox").mouseenter(function(){
        $(this).css({"background-color":"#FFFFF2", "border-radius":"10px"}).mouseleave(function(){
            $(this).css({"background-color":"white","border-radius":"0px"});
        });
    });
    //Removes facebook info section on click 
    $(".infobox").click(function(){
        $(this).slideUp();
    });
};    

//Stores the value from the input field and calls the getPage() method 
function getUserInput(){
    var userinput = document.getElementById("inputfield").value;
    getPage(userinput);
    return false; 
};
    
function getPage(userinput){
      $.ajax({
          url: "https://graph.facebook.com/"+userinput+"/?fields=picture.height(160).width(160),description,about,mission,general_info,username,company_overview,link",
          statusCode: {
            //Catches any http errors 
            400: function(){
                $("#wrapper").prepend("<div class='infobox'><h3 style='color:red'>"+userinput+" is not a Facebook company page name!</h3></div><br>")
            },
            404: function() {
                $("#wrapper").prepend("<div class='infobox'><h3 style='color:red'>"+userinput+" is not a Facebook company page name!</h3></div><br>")
            }
          }
      }).done(function(data){
            //grabs info from the json
            about = data["about"];
            description = data["descripton"];
            company_overview = data["company_overview"];
            mission = data["mission"];
            link = data["link"]; 
            picture = data["picture"].data.url;
            username = data["username"];  
            
            //Grabs info from json, if there is no information for a section, does not add it to the page 
            if (about != undefined){
                //Puts the div at the top of the list 
              $("#wrapper").prepend("<div id='"+username+"'class='infobox'><img src='"+picture+"' alt='profile'><br><h3>"+about+"</h3>");
              jqueryActions();
            }
            
            var selector = "#"+username; 
            if (description != undefined){
                $(selector).append("<p>"+description+"</p>");
            }
            if (company_overview != undefined){
               $(selector).append("<p>"+company_overview+"</p>"); 
            }
            if (mission != undefined){
               $(selector).append("<p>"+mission+"</p>"); 
            }
          
            $(selector).append("<div><a href='"+link+"' target='_blank'>Visit the Facebook page here!</a></div></div>");
            //Hide then show to reload stylesheet
            $(selector).parent().hide().show();
            //Reloads JQuery actions 
            jqueryActions();
      });
}; 