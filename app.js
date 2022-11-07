import express from 'express'
import cors from 'cors'

const users = [
    {
        "username": "pablo",
        "avatar": "https://cloud.estacaonerd.com/wp-content/uploads/2019/07/17091456/rick-and-morty-4-temp1.jpg",
    },
    {
        "username": "bobesponja",
          "avatar": "https://super.abril.com.br/wp-content/upload/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    }

]
const tweets = [
    {
        "username": "pablo",
        "avatar": "https://cloud.estacaonerd.com/wp-content/uploads/2019/07/17091456/rick-and-morty-4-temp1.jpg",
        "tweet": "ldsbnljb"
    },
    {
        "username": "bobesponja",
      "tweet": "eu amo o hub"
    },
    {
        "username": "bobesponja",
      "tweet": "eu amo o hub"
    }
]

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

    const userName = req.headers.user

    if(!userName || !req.body.tweet){
        res.status(400).send("Todos os campos são obrigatórios")
        return
    }

    tweets.push({username:userName, tweet:req.body.tweet})
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

app.get("/tweets/:USERNAME", (req, res) => {

    const userTweets = []
    const userName = req.params.USERNAME
    let userAvatar
    
    for(let i=0; i<tweets.length; i++){

        for(let k=0; k<users.length; k++){
            if(users[k].username === tweets[i].username){
                userAvatar = users[k].avatar
            }
        }

        if((tweets[i].username).toLowerCase() === (userName).toLowerCase()){
            userTweets.push({username:userName, avatar:userAvatar, tweet:tweets[i].tweet})
        }
    }

    res.send(userTweets)
    
})

app.listen(5000)