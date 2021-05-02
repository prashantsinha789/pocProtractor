const promise1 = async() => {
    // 1. Import Mailosaur and create an instance of the MailosaurClient, using your API key
    const MailosaurClient = require("mailosaur");
    const client = new MailosaurClient("NL2E5khNY8JOobz");

    // 2. Wait for the message (by default only looks for messages received in the last hour)
    const message = await client.messages.get("ipfn4gjv", {
        sentTo: "ipfn4gjv.mailosaur.net",
    });

    const passwordResetLink = message.text;
    return Promise.resolve(passwordResetLink);
};


module.exports = {
    promise1: promise1
}