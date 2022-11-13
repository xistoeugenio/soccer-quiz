import { Skeleton } from "@mui/material"
import "./skeletonContainer.scss"

export default function SkeletonContainer({ SingleOption }) {

    const GameContainer = () => {
        return (
            <>
                <div className="skeletonGameLeft">
                    <Skeleton
                        className="skeletonCard"
                        sx={{ bgcolor: '#8b8181' }}
                        variant='rectangular' />
                </div>
                <div className="skeletonGameRight">
                    <div className="skeletonPlayersContainer">
                        {Array(4).fill(0).map((item, i) => (
                            <Skeleton
                                className="skeletonBtPlayer"
                                key={i}
                                sx={{ bgcolor: '#8b8181' }}
                                variant='rectangular' />
                        ))}
                    </div>
                </div>
            </>
        )
    }

    return (

        <>{SingleOption
            ?
            <GameContainer />
            :
            <>
                <Skeleton
                    className="skeletonScore"
                    sx={{ bgcolor: '#8b8181' }}
                    height={50}
                    variant='rectangular' />
                <div className="gamerContainer">
                    <GameContainer />
                </div>
                <Skeleton
                    className="skeletonBtSkip"
                    sx={{ bgcolor: '#8b8181' }}
                    height={50}
                    variant='rectangular' />
            </>
        }</>
    )
}
