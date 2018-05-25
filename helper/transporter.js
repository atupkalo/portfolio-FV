var transporter = require('nodemailer').createTransport({service: 'gmail', auth: {user: 'biggarbage2018@gmail.com', pass: 'XXL123456789'}});

function getOpts (obj, flag){
    if(flag){
        return{
            from: 'biggarbage2018@gmail.com',
            to: 'a.tupkalo@ukr.net',
            subject: 'form portfolio',
            html: `
                <h3>new message from portfolio</h3>
                <ul>
                    <li>name: ${obj.name}</li>
                    <li>phone: ${obj.phone}</li>
                    <li>mail: ${obj.email}</li>
                    <li>message: ${obj.message}</li>
                </ul>
             `
        };
    }
    return {
        from: 'biggarbage2018@gmail.com',
        to: 'a.tupkalo@ukr.net',
        subject: 'form portfolio',
        html: `
                <h3>new message from portfolio</h3>
                <ul>
                    <li>name: ${obj.name}</li>
                    <li>phone: ${obj.phone}</li>
                    <li>mail: ${obj.email}</li>
                    <li>message: ${obj.message}</li>
                </ul>
             `
    };
};

module.exports = function(obj, flag){
    return new Promise(function(res, rej){
        transporter.sendMail(getOpts(obj, flag), function(err, data){
            if(err){
                console.log(err);
                rej(err);
            }else{
                res(data);
            }
        })
    });
};
