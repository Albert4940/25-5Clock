// !! IMPORTANT README:
$(document).ready(function(){  
        putMin(25)
        putSec(0)
     //
     function addSessionLength(session){
        $("#time-left").val(fixedInt(session) + ":00");
    }

    function fixedInt(num){
        return (num < 10) ? '0' + num : num;
    }
    console.log(fixedInt(9))
    //
    function lengthHandle(el){
      const type = el.text();
      const idElement = el.attr("id").split("-")[0]
      const inputEl = el.siblings("input");
      var value = Number(inputEl.val());
    
      //     
         if(type === "up" && value < 60)
          value ++;
        else if(type == "down" && value > 1)
          value --; 
        
          inputEl.val(value); 
       
        if(idElement =="session")
          addSessionLength(value)
    }
  
    
    $("button.btn-length").click(function(){    
        lengthHandle($(this))        
    })

   
  
    function getMin(){
        return Number($("#time-left").val().split(":")[0]);
    }

    function putMin(min){
        const ss = $("#time-left").val().split(":")[1];
        $("#time-left").val(fixedInt(min) + ":" + ss); 
    }


    function getSec(){
        return Number($("#time-left").val().split(":")[1]);
    }

    function putSec(ss){
        const min = $("#time-left").val().split(":")[0]
        $("#time-left").val(min + ":" + fixedInt(ss));
    }

    
    function countDown(){
        var ss = getSec();
        if(ss == 0)
            ss = 60;
        
         ss -= 1;
         putSec(ss);
        
        if(ss == 0)
            if(getMin() != 0)
              putMin(getMin() - 1);           
       
    }

    var isStarting = true;
    var id = 0;     
    
    $("#reset").click(reset); 

   
    function reset(){
        $("#break-length").val("5");
        $("#session-length").val("25");

        if(!isStarting)
        isStarting = !isStarting;

        clearInterval(id);
        putMin(25)
       putSec(0);
      }

    $("#start_stop").click(function(){ 
     
        if(isStarting){
          //  isStarting = !isStarting;
            id = setInterval(countDown, 1000);
        }        
        if(!isStarting){
            isStarting = !isStarting;
            clearInterval(id);
            /*return function in order to block the execution 
            flux in order to keep isStarting with the value*/
            return;
        }
        isStarting = !isStarting;
    })
    
})