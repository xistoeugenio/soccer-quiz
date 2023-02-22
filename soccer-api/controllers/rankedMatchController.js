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
    const data = await Player.find()
    const MatchConfig = await RankedMatches.findById(idMatch)

    const newRound = randomOptions(data)
    MatchConfig?.rounds.push(newRound)
    MatchConfig.currentRound = newRound

    await RankedMatches.findByIdAndUpdate(idMatch, { $set: MatchConfig })


    //return res.status(200).json({ MatchConfig })

    return ({ MatchConfig })


}

const skipRound = async (match_id) => {

    const Match = await RankedMatches.findById(match_id)
    const skipAnswer = async (MatchObject) => {
        if (MatchObject.skips > 0) {
            //change Match object decreasing the amounts of SKIPS
            await RankedMatches.findByIdAndUpdate(MatchObject.id, { $set: { skips: MatchObject.skips - 1 } })

            return (newRound(match_id))
        } else {
            //return a error, showing to user that he does not have skips enough
        }
    }

    skipAnswer(Match)
}

const verifyAnswer = async (match_id, player_id) => {


    const currentMacth = await RankedMatches.findById(match_id)
    var response = null

    if (currentMacth.currentRound.rightAnswer.id === player_id) {

        return (newRound(match_id))

    } else {
        response = "wrong"
    }

    //res.status(200).json(response);

    return response

}



export const startRankedMatch = async (req, res, next) => {

    const { match_id, player_id, skip } = req.query

    if (skip === "true" && match_id) {

        return res.status(200).json(skipRound(match_id))

    } else if ((match_id && player_id) && !skip) {

        return res.status(200).json(verifyAnswer(match_id, player_id))
        
    } else {
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
        const savedMacth = await newMatch.save()

        return res.status(200).json({ savedMacth })
    }

}