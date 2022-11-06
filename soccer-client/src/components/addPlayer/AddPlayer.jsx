import "./addPlayer.scss";

export default function AddPlayer() {
    return (
        <form className="addPlayer">
            <input type="text" placeholder="name" className="input" />
            <input type="text" placeholder="country" className="input" />
            <select name="league" id="" className="input">
                <option value="premier league"> Premier league</option>
                <option value="la liga">La liga</option>
            </select>
            <input type="text" placeholder="team" className="input" />
            <input type="text" placeholder="description" className="input" />
            <button>Add player</button>
        </form>
    )
}
