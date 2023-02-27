import jwt from "jsonwebtoken";
import Player from "../models/Player.js";
import RankedMatches from "../models/RankedMatches.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";


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

    const matchUpdated = await RankedMatches.findByIdAndUpdate(
        idMatch, { $set: MatchConfig }, { new: true }
    )

    return (matchUpdated)


}

const updateUserMatches = async (match_id, user_id) => {
    const MatchFinished = await RankedMatches.findById(match_id)
    const userData = await User.findById(user_id)
    //this add the last match to user's data
    userData.rankedMatchesPlayed.push(MatchFinished)

    //this verify if the last match was his best ranked score
    if (MatchFinished.score > userData.bestRankedScore) {
        userData.bestRankedScore = MatchFinished.score
    }

    await User.findByIdAndUpdate(
        user_id, { $set: userData }
    )
}

const skipRound = async (match_id) => {

    const Match = await RankedMatches.findById(match_id)

    if (Match.skips > 0) {
        //change Match object decreasing the amounts of SKIPS
        await RankedMatches.findByIdAndUpdate(Match.id, { $set: { skips: Match.skips - 1 } })

        const roundUpdated = await newRound(match_id)

        return roundUpdated
    } else {
        //return a error, showing to user that he does not have skips enough
    }
}

const Defeat = async (match_id) => {
    //change started and finished
    const Match = await RankedMatches.findById(match_id)
    await RankedMatches.findByIdAndUpdate(
        Match.id, { $set: { finished: true, currentRound: [] } }
    )
    console.log("finished")
    //this step is responsible to add the last match to user data.
    updateUserMatches(match_id, Match.userId)
    //

    //
    return ("your score: " + Match.score)
}

const verifyAnswer = async (match_id, player_id) => {


    const currentMacth = await RankedMatches.findById(match_id)

    if (currentMacth.currentRound.rightAnswer.id === player_id) {
        await RankedMatches.findByIdAndUpdate(
            match_id, { $set: { score: currentMacth.score + 1 } }
        )


        const roundUpdated = await newRound(match_id)

        return roundUpdated

    } else {
        return Defeat(match_id)
    }

}




export const startRankedMatch = async (req, res, next) => {

    const { match_id, player_id, type_function } = req.query
    try {
        const currentMacth = await RankedMatches.findById(match_id)

        switch (type_function) {
            case "skip":

                if (!currentMacth.finished) {
                    return res.status(200).json(await skipRound(match_id))
                } else {
                    return next(createError(500, "this match is already finished"))
                }

            case "verify":

                if (!currentMacth.finished) {
                    return res.status(200).json(await verifyAnswer(match_id, player_id))
                } else {
                    return next(createError(500, "this match is already finished"))
                }

            case "start":
                const data = await Player.find()
                const firstRound = randomOptions(data)

                //this step get the user Id from a cookie called access_token
                jwt.verify(req.cookies.access_token, process.env.JWT, (err, user) => {
                    req.user = user
                })

                //this is the initial config to our match
                const MatchConfig = {
                    userId: req.user.id,
                    rounds: [firstRound],
                    currentRound: firstRound,
                    started: true,
                    finished: false,
                    score: 0,
                    skips: 20
                }
                const newMatch = new RankedMatches(MatchConfig)
                const savedMacth = await newMatch.save()

                //this is responsible to finish the match after 1 min
                setTimeout(() => {
                    if (!currentMacth?.finished)
                        Defeat(savedMacth.id)
                    console.log("done")
                }, 30000);

                return res.status(200).json({ savedMacth })

            default:
                return res.status(200).json("please select a valid function")


        }
    } catch (err) {
        next(err)
    }
}

export const getTopPlayers = async (req, res, next) => {
    const top10 = await User.find().sort({score: -1}).limit(10)

    //this is responsible to return new object with only the username and bestRankedScore fields.
    const newArray = top10.map(({username, bestRankedScore, ...rest})=>(
        {username,bestRankedScore}
    ))
    return res.status(200).json(newArray)
}