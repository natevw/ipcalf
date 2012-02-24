function (doc, req) {
    if (req.query.ip !== req.peer) {        // primitive cache busting (user could still hit same URL, but hopefully better understand if IP remains same...)
        var path = req.requested_path;
        if (path.length) path[path.length - 1] = path[path.length - 1].split('?')[0];        // lop off any "bonus" query component
        req.query.ip = req.peer;
        var unique_url = "http://" + req.headers['Host'] +
            '/' + path.map(encodeURIComponent).join('/') +
            '?' +Object.keys(req.query).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(req.query[k]); }).join('&');
        return {code:302, headers:{'Access-Control-Allow-Origin':"*", 'Location':unique_url}};
    }   // NOPE: while Safari/Chrome don't seem eager to cache a redirect, Firefox diligently validates the cached redirect result via same old ETag...
    provides("html", function () {
        return "Your IP address is: <h1>" + req.peer + "</h1> Have a nice day.\n";
    });
    provides("text", function () {
        return req.peer;
    });
    provides("json", function () {
        // can't return full response, see https://github.com/apache/couchdb/blob/master/share/server/render.js#L240
        //return {headers:{'Access-Control-Allow-Origin':"*"}, json:req.peer};
        return JSON.stringify(req.peer);
    });
}
