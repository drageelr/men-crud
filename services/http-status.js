
'use strict'

const statusObj = {
200: "OK",
201: "CREATED",
202: "ACCEPTED",
203: "NO CONTENT",
301: "MOVED PERMANENTLY",
303: "SEE OTHER",
304: "NOT MODIFIED",
307: "TEMPORARY REDIRECT",
400: "BAD REQUEST",
401: "UNAUTHORIZED",
403: "FORBIDDEN",
404: "NOT FOUND",
406: "NOT ACCEPTABLE",
415: "UNSUPPORTED MEDIA TYPE",
500: "INTERNAL SERVER ERROR",
501: "NOT IMPLEMENTED"
}

exports.getName = (statusCode) => {
    let statusName = statusObj[statusCode];
    if (statusName === undefined) {
        statusName = "NOT A STATUS CODE";
    }
    return statusName;
}