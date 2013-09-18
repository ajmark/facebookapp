$(document).ready(function(){
    jqueryActions();
});

function jqueryActions(){
    $("h1").mouseenter(function(){
      $(this).css("color","#3b5998"); 
    });
    
    $("a").mouseenter(function(){
        $(this).css("color","#222").mouseleave(function(){
            $(this).css("color","#3b5998");
        });
    });
    
    $(".infobox").mouseenter(function(){
        $(this).css({"background-color":"#FFFFF2", "border-radius":"10px"}).mouseleave(function(){
            $(this).css({"background-color":"white","border-radius":"0px"});
        });
    });
};    

function getUserInput(){
    var userinput = document.getElementById("inputfield").value;
    getPage(userinput);
};
    
function getPage(userinput){
    try{
      $.getJSON("https://graph.facebook.com/"+userinput+"/?fields=picture.height(160).width(160),description,about,mission,general_info,username,company_overview,link", function(data){
            about = data["about"];
            description = data["descripton"];
            company_overview = data["company_overview"];
            mission = data["mission"];
            link = data["link"]; 
            picture = data["picture"].data.url;
            username = data["username"];  
            
            if (about == undefined){
              $("#wrapper").prepend("<h3>This is not a Facebook company page</h3><br>"); 
            }
            else {
              $("#wrapper").prepend("<div id='"+username+"'class='infobox'><img src='"+picture+"' alt='profile'><br><h3>"+about+"</h3>");
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
          
            $(selector).append("<a href='"+link+"' target='_blank'>Visit the Facebook page here!</a></div>");
            //Hide then show to reload stylesheet
            $(selector).parent().hide().show();
            jqueryActions();
      });
    }
    catch(e) {
        console.log("error");
    }
}; 