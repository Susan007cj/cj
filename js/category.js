$(function () {
    $.ajax({
        url: "http://127.0.0.1:3000/api/getcategorytitle",
        success: function (data) {
            var category_title = template("category_title", data);
            $(".bbm-category .bbm-c-lists").html(category_title);

            $(".bbm-c-lists .bbm-c-lists-t").each(function (i, v) {
                var that = $(this);
                var flag=false;
                $(this).click(function () {
                    $(".bbm-c-lists .bbm-c-lists-t").each(function () {
                        $(".bbm-c-lists-t .bbm-c-lists-all").css("display", "none");
                        $(".bbm-c-lists-t p").css("transform","rotate(90deg)");
                    })
                    flag=!flag;
                    if(flag){
                        $.ajax({
                            url: "http://127.0.0.1:3000/api/getcategory",
                            data: { titleid: i },
                            success: function (data) {
                                console.log(data);
                                var category_list = template("category_list", data);
                                that.children("p").css("transform","rotate(-90deg)");
                                that.children('.bbm-c-lists-all').remove();
                                that.append(category_list);
                            }
                        })
                    }else{
                         $(".bbm-c-lists-t .bbm-c-lists-all").css("display", "none");
                         $(".bbm-c-lists-t p").css("transform","rotate(90deg)");
                    }
                    
                })
            })

        }
    })
})