import express from 'express'
import cors from 'cors'

const users = []
const tweets = []

const app = express()
app.use(express.json())
app.use(cors())


app.post("/sign-up", (req, res) => {

    if(!req.body.username || !req.body.avatar){
        res.status(400).send("Todos os campos são obrigatórios")
        return
    }
    
    users.push(req.body)
    res.status(201).send("Ok")

})

app.post("/tweets", (req, res) => {

    if(!req.body.username || !req.body.tweet){
        res.status(400).send("Todos os campos são obrigatórios")
        return
    }

    tweets.push(req.body)
    res.status(201).send("Ok")
})

app.get("/tweets", (req, res) => {

    const requiredTweets = []
    let userAvatar

    for(let i=0; i<11; i++){
        
        if(tweets[tweets.length - i]){

            for(let j=0; j<users.length; j++){
                if(users[j].username === tweets[tweets.length - i].username){
                    userAvatar = users[j].avatar
                    continue
                }
            }

            requiredTweets.push({username:tweets[tweets.length - i].username, avatar:userAvatar, tweet:tweets[tweets.length - i].tweet})
        }
    }

    res.send(requiredTweets)

})

app.get("tweets/:USERNAME", (req, res) => {
    
})

app.listen(5000)