let nedb = require('nedb');
let db = new nedb({
    filename: 'users.db',
    autoload:true
})

module.exports = (app) => {
    app.get( '/users', (req,res) =>{
        db.find({}).sort({name:1}).exec((err,users)=>{
            if(err){
                res.status(400).json({
                    err
                })
            }else{
                res.status(200).json({
                    users
                })
            }
            
        })
       
    });
    app.post('/users', (req,res) => {
        db.insert(req.body, (err, user) => {
            if(err){
                res.status(400).json({
                    err: err
                });
            }else{
                res.status(200).json(user)
            }
        })
    })
    
    app.get('/users/admin', (req,res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h2>Pagina Admin</h2>');
    })
};