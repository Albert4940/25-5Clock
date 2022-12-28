// !! IMPORTANT README:
$(document).ready(function(){  
  
    //
    function lengthHandle(el){
      const type = el.text();
      const inputEl = el.siblings("input");
      const value = Number(inputEl.val());
      
      //     
         if(type === "up" && value < 60)
          inputEl.val(value + 1);
        else if(type == "down" && value > 1)
          inputEl.val(value - 1); 
    }
  
    function reset(){
        $("#break-length").val("5");
        $("#session-length").val("25");
        $("time-left").val("25:00");
      }

    $("button.btn-length").click(function(){    
        lengthHandle($(this))        
    })

    $("#reset").click(reset);

 
})