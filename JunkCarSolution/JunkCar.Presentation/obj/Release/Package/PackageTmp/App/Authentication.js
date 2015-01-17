//function checkCookies() {
//    var text = "";
//    if (navigator.cookieEnabled == true) {
//        text = "Cookies are enabled.";
//        alert("Cookies are enabled.");
//    } else {
//        text = "Cookies are not enabled.";
//        alert("Cookies are not enabled.");
//    }
//    //document.getElementById("demo").innerHTML = text;
//}

//function getCookie(name) {
//    var dc = document.cookie;
//    var prefix = name + "=";
//    var begin = dc.indexOf("; " + prefix);
//    if (begin == -1) {
//        begin = dc.indexOf(prefix);
//        if (begin != 0) return null;
//    }
//    else {
//        begin += 2;
//        var end = document.cookie.indexOf(";", begin);
//        if (end == -1) {
//            end = dc.length;
//        }
//    }
//    return unescape(dc.substring(begin + prefix.length, end));
//}

//function doSomething() {
//    var myCookie = getCookie("MyCookie");

//    if (myCookie == null) {
//        // do cookie doesn't exist stuff;
//    }
//    else {
//        // do cookie exists stuff
//    }
//}
var url = '';
Zypro();
//alert(url);
//window.onpaint = function () {
//    Zypro();
//}

//window.onloadstart = function () { Zypro(); };

//object.addEventListener("load", Zypro);

function Zypro()
{
    url = document.URL;    
    var mystring = new String(url);
    url = mystring.substring(38, url.length-5);
    checkCookie();
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {    
    var authentication = getCookie(".ASPXAUTH");
    if (authentication != "") {
        if (url.toLowerCase() == "login")
        { window.location = "Index.html"; }
        else if (url.toLowerCase() != "practiceeditdetails") {
            //alert("Welcome again " + user);
            window.location = "PracticeEditDetails.html";
        }
       
        
    } else {
        if (url.toLowerCase() != "login") {
            window.location = "Login.html";
        }
        
        //user = prompt("Please enter your name:", "");
        //if (user != "" && user != null) {
        //    setCookie("username", user, 365);
        //}
    }
}