import Player from "../models/Player.js";
import RankedMatches from "../models/RankedMatches.js";


//this function already exists in gameController
const drawAnswer = () => {
    var random = Math.floor(Math.random() * 4);

    return random
}


//this function already exists in gameController
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


const newRound = async (idMatch) => {
    //Add another round to rounds array and change the currentRound
    const newRound = randomOptions(data)
    MatchConfig.rounds.push(newRound)
    MatchConfig.currentRound = newRound

    await RankedMatches.findByIdAndUpdate(idMatch, { $set: MatchConfig })
}



export const startRankedMatch = async (req, res, next) => {

    const data = await Player.find()
    const firstRound = randomOptions(data)

    //this is the initial config to our match
    const MatchConfig = {
        rounds: [firstRound],
        currentRound: firstRound,
        started: true,
        finished: false,
        score: 0,
        skips: 3
    }
    const newMatch = new RankedMatches(MatchConfig)

    return res.status(200).json({ newMatch })
}



export const verifyAnswer = async (req, res, next) => {
}

export const skipRound = async (req, res, next) => {
    const skipAnswer = (MatchObject) => {
        if (MatchObject.skips > 0) {
            //change Match object decreasing the amounts of SKIPS
            newRound()
        } else {
            //return a error, showing too user that he does not have skips enough
        }
    }
    skipAnswer()
}