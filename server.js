const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    fs = require('fs');;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//middlevere - server working
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) console.log('Unable to append server.log');
    });
    next();//перейдет на стр после next()
});

//created maintance middlewhere
app.use((req,res,next) => {
    res.render('maintance.hbs');

});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear());
hbs.registerHelper('toUp', (str)=> str.toUpperCase());
    
app.get('/', (req,res) => {
    // res.send('<h1>hello express!</h1>');
    // res.send({
    //     name: 'Dasha',
    //     likes: ['Programming', 'Football', 'Reading', 'Sex']
    // });
    res.render('main.hbs', {
        pageTitle: 'This is the main page',

    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About page',
    });   
});

app.get('/bad', (req,res) => {
    res.send({
        error: 'Unablde to log this page!'
    });    
});

app.listen(3000, () => {
    console.info('Server is up on port 3000');
});