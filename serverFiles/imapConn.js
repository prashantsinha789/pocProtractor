var Imap = require("imap");
var MailParser = require("mailparser").MailParser;
var Promise = require("bluebird");
Promise.longStackTraces();

var exports = (module.exports = {});

exports.TwoFactorAuth = function() {
    // function TwoFactorAuth() {
    const url = [];
    var imapConfig = {
        user: "marginedgetest20@gmail.com",
        password: "Test@12345",
        host: "imap.gmail.com",
        port: 993,
        tls: true,
    };

    var imap = new Imap(imapConfig);
    Promise.promisifyAll(imap);

    imap.once("ready", execute);
    imap.once("error", function(err) {
        console.log("Connection error: " + err.stack);
    });

    imap.connect();

    function execute() {
        imap.openBox("INBOX", false, function(err, mailBox) {
            if (err) {
                console.error(err);
                return;
            }
            imap.search(["UNSEEN", ["SINCE", "May 1, 2020"]], function(err, results) {
                if (!results || results.length === 0) {
                    console.log("No unseen email available");
                    imap.end();
                    return;
                }

                // imap.setFlags(results, ["\\Seen"], function(err) {
                //     if (!err) {
                //         console.log("marked as read");
                //     } else {
                //         console.log(JSON.stringify(err, null, 2));
                //     }
                // });

                var f = imap.fetch(results, { bodies: "" });
                f.on("message", processMessage);
                f.once("error", function(err) {
                    return Promise.reject(err);
                });
                f.once("end", function() {
                    console.log("Done fetching all unseen messages.");
                    imap.end();
                });
            });
        });
    }

    function processMessage(msg, seqno) {
        var result;
        console.log("Processing msg #" + seqno);
        // console.log(msg);

        var parser = new MailParser();
        parser.on("headers", function(headers) {
            console.log("Header: " + JSON.stringify(headers));
        });

        parser.on("data", (data) => {
            if (data.type === "text") {
                result = data.text;
                var res = result.split("<");
                var res2 = res[1].split(">");
                url.push(res2[0]);
                console.log("Link from Imap File Direct", url);
                return res2
            }
        });

        msg.on("body", function(stream) {
            stream.on("data", function(chunk) {
                parser.write(chunk.toString("utf8"));
            });
        });
        msg.once("end", function() {
            parser.end();
        });
    }

    console.log("********&&&&", url)
    return url;
}

// TwoFactorAuth();