let http = require('http');
let url = require('url');

let Router = require('routes');
let router = Router();

let view = require('swig');

let mysql = require('mysql');
let connection_database = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'apidatabaseproject',
    user: 'root',
    password: '',
});

let DataOne = require('./DataPegawai.js');
console.log(DataOne.FemaleData);

router.addRoute('/', function(req, res) {
    connection_database.query("select * from user_data",function(err, rows, field) {
        if(err) {
            throw err;
        }
        
        res.writeHead(200,{"Content-Type" : "text/plain"});
        res.end(JSON.stringify(rows));
    });
});

let dataInsert = {
    name: "Crapper Inside",
    age: 19
}

let descriptionOne = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
let dataArray = [];
for( let i = 0; i < 1000; i++ ) {
    dataArray[i] = {
        title: "This Is Title Content Number : " + i,
        subtitle: "Lorem Ipsum Subtitle Mode, From Content Title Subtitle " + i,
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s it to make a type specimen book.",
        description: descriptionOne,
    }
}

// console.log(dataArray);

let dataUpdate = [
    {
        name: "Crapper Inside",
        age: 31
    }, 4
]

let dataDelete = 6;

router.addRoute('/insert', function(req, res) {

   for(let x = 0; x < DataOne.FemaleData.length; x++) {
    connection_database.query("insert into user_data set ? ", DataOne.FemaleData[x], function(err, field) {
        if(err) {
            throw err;
        }
        res.writeHead(200,{"Content-Type" : "text/plain"});
        res.end(field.rowAffected);
    });
   }
});


router.addRoute('/update/:id?', function(req, res) {

    console.log(dataUpdate);
    connection_database.query("update One set ? where id = ? ", dataUpdate, function(err, field) {
        if(err) {
            throw err;
        }
        res.writeHead(200,{"Content-Type" : "text/plain"});
        res.end(field.changedRow);
    });

    res.writeHead(200,{"Content-Type" : "text/plain"});
    res.end("From Update");
});

router.addRoute('/delete/:id?', function(req, res) {
    connection_database.query("delete from One where id = ?", dataDelete, function(err, field) {
        if(err) {
            throw err;
        }

        res.writeHead(200,{"Content-Type" : "text/plain"});
        res.end(field.affectedRows);
    });

    res.writeHead(200,{"Content-Type" : "text/plain"});
    res.end("From Delete");
});

// router.addRoute('/view', FooOne);

http.createServer(function(req, res) {
    let path = url.parse(req.url).pathname;
    let match = router.match(path);

    if(match) {
        match.fn(req, res);
    } else {
        res.writeHead(404,{"Content-Type": "text/plain"});
        res.end('Page Not Found');
    }
}).listen(8888);

console.log("Server Is Running.....");

