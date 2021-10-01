const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default (emails) => {
    
    emails = emails.trim();
    if (emails[emails.length-1] === ',') {
        emails = emails.slice(0, emails.length-1);
    }

    const invalidEmails = emails.split(',').map(email => email.trim()).filter(email => !re.test(email));

    if (invalidEmails.length > 0) {
        return `Invalid Emails: ${invalidEmails}`
    }

    return
}