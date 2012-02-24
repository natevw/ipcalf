function (doc, req) {
    provides("html", function () {
        return "Your IP address is: <h1>" + req.peer + "</h1> Have a nice day.\n";
    });
    provides("text", function () {
        return req.peer;
    });
    provides("json", function () {
        // NOTE: CouchDB 1.1.1 only uses {body:} or a string, see https://issues.apache.org/jira/browse/COUCHDB-1330
        //return {headers:{'Access-Control-Allow-Origin':"*"}, json:req.peer};
        return JSON.stringify(req.peer);
    });
    return {headers:{'Access-Control-Allow-Origin':"*"}};   // hacky workaround for JSON issue above (does allow CORS for any type, but no matter.)
}
