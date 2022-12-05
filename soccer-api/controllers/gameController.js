import Player from "../models/Player.js";
import Match from "../models/Match.js";

const randomNumber = (number, number2, number3) => {
    var ranNum = Math.floor(Math.random() * 40 + 1);

    if (number === ranNum || number2 === ranNum || number3 === ranNum) {
        while (number === ranNum || number2 === ranNum || number3 === ranNum) {
            ranNum = Math.floor(Math.random() * 40 + 1)
        }
    }

    return ranNum
}

const drawAnswer = () => {
    var random = Math.floor(Math.random() * 4);

    return random
}


export const startMatch = async (req, res, next) => {

    try {
        const first = await Player.findOne({ "id_number": randomNumber() })
        const second = await Player.findOne({ "id_number": randomNumber(first.id_number) })
        const third = await Player.findOne({ "id_number": randomNumber(first.id_number, second.id_number) })
        const forth = await Player.findOne({ "id_number": randomNumber(first.id_number, second.id_number, third.id_number) })

        const all = [
            { name: first.name, id: first.id },
            { name: second.name, id: second.id },
            { name: third.name, id: third.id },
            { name: forth.name, id: forth.id },
        ]

        const currentPlayer = await Player.findById(all[drawAnswer()].id)
        const { id, team, country, league, position, name } = currentPlayer

        const newMatch = new Match({
            options: all,
            info: {
                team, country, league, position
            },
            rightAnswer: {
                id, name
            }
        })

        const savedPlayer = await newMatch.save()
        const { options, info } = savedPlayer

        res.status(200).json({ options, info, id_match: savedPlayer._id })
    } catch (err) {
        next(err)
    }
}

export const verifyAnswer = async (req, res, next) => {

    const { player_id, match_id } = req.query;
    
    try {
        
        const currentMacth = await Match.findById(match_id)
        var response = null

        if (currentMacth.rightAnswer.id === player_id) {
            response  = "right"
        } else {
            response = "wrong"
        }

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}
