function (doc, req) {
    provides("html", function () {
        return "Your IP address is: <h1>" + req.peer + "</h1> Have a nice day.\n";
    });
    provides("text", function () {
        return req.peer;
    });
    provides("json", function () {
        return {headers:{'Access-Control-Allow-Origin':"*"}, json:req.peer};
    });
}
