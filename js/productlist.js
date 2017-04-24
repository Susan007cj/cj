$(function () {
    var getValue = GetQueryString("key");
    var num = 1;
    $.ajax({
        url: "http://127.0.0.1:3000/api/getcategorybyid",
        data: { categoryid: getValue },
        success: function (data) {
            var product_list = template("product_list", data);
            $(".mmb-product-content ul").append(product_list);
        }
    })
    $.ajax({
        url: "http://127.0.0.1:3000/api/getproductlist",
        data: { categoryid: getValue, pageid: num },
        success: function (data) {
            console.log(data);
            var product_list2 = template("product_list2", data);
            $(".mmb-product-list ul").html(product_list2);
            var pageNum = Math.ceil(data.totalCount / data.pagesize);
            //点击中间切换页面
            changePage();
            pageLoad();
            pageFllow();
            //上一页
            $("#prev").click(function () {
                if (num > 1) {
                    num--;
                }
                $.ajax({
                    url: "http://127.0.0.1:3000/api/getproductlist",
                    data: { categoryid: getValue, pageid: num },
                    success: function (data) {
                        var product_list2 = template("product_list2", data);
                        $(".mmb-product-list ul").html(product_list2);
                    }
                })
                changePage();
                pageLoad();
                pageFllow();
            })
            //下一页
            $("#next").click(function () {
                if (num < pageNum) {
                    num++;
                }
                $.ajax({
                    url: "http://127.0.0.1:3000/api/getproductlist",
                    data: { categoryid: getValue, pageid: num },
                    success: function (data) {
                        var product_list2 = template("product_list2", data);
                        $(".mmb-product-list ul").html(product_list2);
                    }
                })
                changePage();
                pageLoad();
                pageFllow();

            })
            //点击中间ul中的某个li，让对应的li所在的页面显示
            function pageFllow() {
                $("#selector>li").click(function () {
                    var that = $(this);
                    var index = that.text().indexOf("/");
                    num=that.text().substr(0,index);
                    console.log(num);
                    $.ajax({
                        url: "http://127.0.0.1:3000/api/getproductlist",
                        data: { categoryid: getValue, pageid: num },
                        success: function (data) {
                            var product_list2 = template("product_list2", data);
                            $(".mmb-product-list ul").html(product_list2);
                            $("#selector li:first-child").text(that.text());
                        }
                    })
                })
            }
            //点击中间ul让所有的li显示
            function pageLoad() {
                var flag = false;
                for (var i = 1; i <= pageNum; i++) {
                    var li = document.createElement("li");
                    li.innerHTML = i + '/' + pageNum;
                    $("#selector").append(li);
                }
                $("#selector>li:nth-last-child(-n+3)").css("display", "none");
                $("#selector").click(function () {
                    flag = !flag;
                    if (flag) {
                        $("#selector>li:nth-last-child(-n+3)").css("display", "block");
                    } else {
                        $("#selector>li:nth-last-child(-n+3)").css("display", "none");
                    }
                })

            }
            //页面变化 对应中间的页码发生变化
            function changePage() {
                for (var i = 1; i <= num; i++) {
                    var pages = '<li>' + i + '/' + pageNum + '</li>';
                    $("#selector").html(pages);
                }
            }
        }
    })
})
//获取地址栏的id
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}