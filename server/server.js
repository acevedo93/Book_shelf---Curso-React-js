const   express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        mongoose = require('mongoose'),
        app = express(),
        config = require('./config/config').get(process.env.NODE_ENV),
        // Ports
        port = process.env.PORT || 3001,
        // Models
        {User} = require('./model/user'),
        {Book} = require('./model/book'),
        {auth} = require('./middleware/auth')


// Configuracion mongoose
mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE)

app.use(bodyParser.json())
app.use(cookieParser())


//ROUTES BOOK

//-------------------------- GET // 
app.get('/api/auth',auth,(req,res)=> {
    res.json({
        isAuth : true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname: req.user.lastname
    })
})

app.get('/api/logout',auth,(req,res) => {
    req.user.deleteToken(req.token,(err,user)=> {
        if(err) return res.status(400).send(err)
        res.sendStatus(200)
    })
})

app.get('/api/getBook',(req,res) => {
    let id = req.query.id
   
    Book.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/books',(req,res)=> {

    let skip = parseInt(req.query.skip),
        limit = parseInt(req.query.limit),
        order = req.query.order
    
    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.send(doc)
    })
})

app.get('/api/getReviewer',(req,res) => {
    let id = req.query.id

    User.findById(id,(err,doc) => {
        if(err) return res.status(400).send(err)
        res.json({
            name:doc.name,
            lastname: doc.lastname
        })
    })
})


app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        res.status(200).send(users)

    })
})

app.get('/api/user_posts',(req,res) => {
        Book.find({ownerId:req.query.user}).exec((err,docs)=> {
            if(err) return res.status(400).send(err)
            res.send(docs)
        })
})
//--------------------------- POST // 
app.post ('/api/book',(req,res) => {
    const book = new Book(req.body)
    
    book.save ( (err,doc ) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({
            post : true,
            bookId : doc._id
        })
    })
} )


app.post('/api/register',(req,res)=>{
   
    const user = new User(req.body)

    user.save((err,doc)=> {
        
        if(err) return res.json({success : false })
        res.status(200).json({
            success: true,
            user : doc 
        })
    })
})

app.post('/api/login',(req,res) => {
    User.findOne({"email": req.body.email},(err,user)=> {
        if(err) return res.json ({isAuth:false,message:"El correo no es correcto "})

        user.comparePassword(req.body.password,(err,isMatch)=> {
            if(!isMatch) return res.json({
                isAuth:false,
                message: "wrong password"
            })

            user.generateToken((err,user)=> {
                if(err) return res.status(400).send(err)
                res.cookie('auth',user.token).json({
                    isAuth: true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})
// ------------------------------UPDATE //
app.post('/api/book_update',(req,res) => {

    Book.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400)
        res.json({
            success:true,
            doc
        })
    })
})

//------------------------------------- DELETE //

app.delete('/api/delete_book',(req,res)=>{
    let id = req.query.id
    console.log(id)

    Book.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.json(true)

    })
})




app.listen(port,()=>{
    console.log('server running')
})