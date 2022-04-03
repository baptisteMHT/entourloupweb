const express       = require('express');
const app           = express();
const http          = require('http');
const server        = http.createServer(app);
const { Server }    = require("socket.io");
const io            = new Server(server);
var nodemailer      = require('nodemailer');

const email         = "MAIL";
const secretEmail   = "SECRET";

const secret        = "Chipeur";
const location      = "Sous la fresque dans le hall.";

var nTry            = 0;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
    socket.on("try", function(data,res){
        nTry++;
        console.log(nTry + " " + socket.handshake.address);

        if(secret != data) return res(null);

        res(location);
        console.log(socket.handshake.address + " a trouvé le code.", 1000);
        sendWinnerEmail(socket.handshake.address);
        return;
    });
});

server.listen(80, () => {
  console.log('listening on *:80');
});

function sendWinnerEmail(address){
        var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
            user: email,
            pass: secretEmail
        },
        tls: {
            ciphers:'SSLv3'
        }
    });
      
    var mailOptions = {
        from: email,
        to: email,
        subject: 'Entourloupweb',
        text: address + ' a trouvé la clé.'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}