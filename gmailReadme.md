Steps involved to read email:

We have integrated with Gmail apis, rather than MailListener.
Reason for choosing gmail apis:
1. Easy to Use
2. We can do, search, list, latest emails and read the content.
3. Uses OAuth client as credentials, which is more secure and nowhere we have to paste username/pw in code

Created a separate module gmail, where we can see OAuth2 client and authenticate with gmail.

We can now directly use function readEmailWithSubjectLine(SubjectLine) with subjectline and this function will find the latest email with SubjectLine entered, it returns the email body as page source, so we might need to write a regex to read what we want from gmail body.

We can write custom regex for other email body. The below helpers right now only supports Invite email.

Example:
        var gmailApis = require('./gmail/index.js');
        gmailApis.readEmailWithSubjectLine('Welcome to MarginEdge')

we can use above method calls to read the latest invite email to get the invite link.