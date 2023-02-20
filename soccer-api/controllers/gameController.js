import Player from "../models/Player.js";
import Match from "../models/Match.js";
import RankedMatches from "../models/RankedMatches.js";

const randomNumber = (number, number2, number3) => {
    var ranNum = Math.floor(Math.random() * 20 + 1);

    if (number === ranNum || number2 === ranNum || number3 === ranNum) {
        while (number === ranNum || number2 === ranNum || number3 === ranNum) {
            ranNum = Math.floor(Math.random() * 20 + 1)
        }
    }

    return ranNum
}

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

export const startRankedMatch = async (req, res, next) => {
    const data = await Player.find()
    const firstRound =randomOptions(data)
    const MatchConfig ={
        rounds:[firstRound],
        currentRound: firstRound,
        started: true,
        finished: false,
        skips: 3
    }
    const newMatch = new RankedMatches(MatchConfig)

    return res.status(200).json({newMatch})
}

export const startMatch = async (req, res, next) => {
    const { mode } = req.query

    var data = null
    const countries = req.query.countries?.split(",")
    const leagues = req.query.leagues?.split(",")
    try {
        if (!mode) {
            data = await Player.find()
        }

        if (mode === "brazilian") {
            data = await Player.find({ "country": "Brazil" })
        }
        if (mode === "custom") {
            if (!countries || !leagues)
                return next(createError(400, "You must add at least one country and one league."))
            data = await Player.find({ "$or": [{ "country": { "$in": [...countries] } }, { "league": { "$in": [...leagues] } }] })
        }

        const newMatch = new Match(randomOptions(data))
        const savedMacth = await newMatch.save()
        const { options, info } = savedMacth

        return res.status(200).json({ options, info, id_match: savedMacth._id })
    } catch (error) {
        next(error)
    }
}


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
