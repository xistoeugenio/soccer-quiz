import Player from "../models/Player.js";
import Match from "../models/Match.js";

const drawAnswer = () => {
    var random = Math.floor(Math.random() * 4);

    return random
}

const randomOptions = (value) => {

    //this part is responsible to drawing 4 players from the object received as a parameter
    const numbers = []
    while (numbers.length < 4) {
        var aleatorio = Math.floor(Math.random() * value.length);

        if (numbers.indexOf(aleatorio) == -1)
            numbers.push(aleatorio);
    }

    const players = []
    numbers.map(number => {
        players.push(value[number])
    })


    //here we draw 1 of the four players to be the correct answer
    const currentPlayer = players[drawAnswer()]

    const options = players.map(item => ({ name: item.name, id: item.id }))

    const { id, team, country, league, position, name } = currentPlayer


    //here we return the correct format to be placed in the database
    const newMatch = {
        options: options,
        info: { team, country, league, position },
        rightAnswer: { id, name }
    }


    return newMatch
}

export const startMatch = async (req, res, next) => {
    const { mode } = req.query

    var data = null

    try {
        
        if (mode === "brazilian") {
            data = await Player.find({ "country": "Brazil" })
        } else {
            data = await Player.find()
        }

        const newMatch = new Match(randomOptions(data))

        const savedMacth = await newMatch.save()
        const {options, info} = savedMacth

        return res.status(200).json({ options, info, id_match: savedMacth._id })
    } catch (error) {
        next(error)
    }

}

/*
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
}*/

export const verifyAnswer = async (req, res, next) => {

    const { player_id, match_id } = req.query;

    try {

        const currentMacth = await Match.findById(match_id)
        var response = null

        if (currentMacth.rightAnswer.id === player_id) {
            response = "right"
        } else {
            response = "wrong"
        }

        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
}
