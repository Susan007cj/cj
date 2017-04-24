$(function () {
    var getValue = GetQueryString("key");
    $.ajax({
        url: "http://127.0.0.1:3000/api/getcategorybyid",
        data: { categoryid: getValue },
        success: function (data) {
            // console.log(data);
            var product_detail1 = template("product_detail1", data);
            $(".mmb-product-content ul").append(product_detail1);
        }
    })
    $.ajax({
        url: "http://127.0.0.1:3000/api/getproduct",
        data: { productid: getValue },
        success: function (data) {
            // console.log(data);
            var product_detail2 = template("product_detail2", data);
            $(".mmb-product-content ul").append(product_detail2);

        }
    })
    $.ajax({
        url: "http://127.0.0.1:3000/api/getproduct",
        data: { productid: getValue },
        success: function (data) {
            console.log(data);
            var product_detail3 = template("product_detail3", data);
            $(".mmb-details").html(product_detail3);
        }
    })

    $.ajax({
        url: "http://127.0.0.1:3000/api/getproduct",
        data: { productid: getValue },
        success: function (data) {
            console.log(data);
            var product_detail4 = template("product_detail4", data);
            $(".mytable").html(product_detail4);
        }
    })

    $.ajax({
        url: "http://127.0.0.1:3000/api/getproductcom",
        data: { productid: getValue },
        success: function (data) {
            console.log(data);
            var product_detail5 = template("product_detail5", data);
            $(".pj-list").html(product_detail5);
        }
    })

})

//获取地址栏的id
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}