function (doc, req) {
    provides("text", function () {
        return JSON.stringify(req,null,4);
    });
}
