import Player from "../models/Player.js";

const randomNumber = (number, number2, number3) => {
    var ranNum = Math.floor(Math.random() * 20 + 1);

    if (number === ranNum || number2 === ranNum || number3 === ranNum) {
        while (number === ranNum || number2 === ranNum || number3 === ranNum) {
            ranNum = Math.floor(Math.random() * 20 + 1)
        }
    }

    return ranNum
}

const drawAnswer =()=>{
    var random = Math.floor(Math.random() * 4);

    return random
}

var currentPlayer = {}


export const singlePlayer = async (req, res, next) => {

    try {
        const first = await Player.findOne({ "id_number": randomNumber() })
        const second = await Player.findOne({ "id_number": randomNumber(first.id_number) })
        const third = await Player.findOne({ "id_number": randomNumber(first.id_number, second.id_number) })
        const forth = await Player.findOne({ "id_number": randomNumber(first.id_number, second.id_number, third.id_number) })

        const all = [
            {name: first.name, id :first.id},
            {name: second.name, id :second.id},
            {name: third.name, id :third.id},
            {name: forth.name, id :forth.id},
        ]


        currentPlayer = await Player.findById(all[drawAnswer()].id)
        const {team, country, league, ...others} = currentPlayer

        res.status(200).json({all, team, country, league})
    } catch (err) {
        next(err)
    }
}

export const verify = async (req, res, next)=>{
    try {
        const answer = req.params.id
        var response = null
        if(answer === currentPlayer.id){
            response = "right"
        }else{
            response = "wrong"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}
