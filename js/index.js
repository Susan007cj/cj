$(function(){
    $.ajax({
        url:"http:127.0.0.1:3000/api/getindexmenu",
        success:function(data){
            var modual=template("index",data);
            $(".mmb-category .mmb-c-row").html(modual);

            var flag=false;
            $(".area-item:nth-last-child(-n+4)").css("display","none");
            $(".area-item:nth-child(8)").click(function(){
                flag=!flag;  
                if(flag){
                    $(".area-item:nth-last-child(-n+4)").css("display","block");
                }else{
                     $(".area-item:nth-last-child(-n+4)").css("display","none");
                }
            })

        }
    })
    $.ajax({
        url:"http:127.0.0.1:3000/api/getmoneyctrl",
        success:function(data){
            var amount=template("product",data);
            $(".mmb-discount-product ul").html(amount);
        }
    })
   
})