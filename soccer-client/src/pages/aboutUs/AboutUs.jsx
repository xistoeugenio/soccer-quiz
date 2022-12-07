import "./aboutUs.scss"

export default function AboutUs() {
  return (
    <div className="aboutContainer">
      <div className="aboutTopContainer">
        <div className="imgContainer">
          <img src="./assets/xisto.jpg" alt="" />
        </div>
        <div className="textTopContainer">
          <p>
            This game was created by just one developer
            called <a href="https://xisto.xyz" target="blank">Xisto Eugênio</a>.
            This is an open source game developed on the MERN stack that aims
            to make everyone know soccer players.
          </p>
        </div>
      </div>
      <div className="aboutBottomContainer">
        <div className="infoContainer">
          <h2>Developer site</h2>
          <a href="https://xisto.xyz" target="blank">www.xisto.xyz</a>
          <h2>Linkedin profile</h2>
          <a href="https://www.linkedin.com/in/xisto-eug%C3%AAnio-266029171/" target="blank">
            linkedin.com/in/xisto-eugênio
          </a>
          <h2>Source code</h2>
          <a href="https://github.com/xistoeugenio/soccer-quiz" target="blank">
            github.com/xistoeugenio/socciz
          </a>
        </div>
        <div className="textBottomContainer">
          <p>
            It's still a simple game, but we still have a lot of improvements to offer.
            If you want to participate in the development of this amazing game you
            can contribute with your feedback.
          </p>
          <a href="mailto:xistoeugeniosilva1@gmail.com" target="blank">Feedback</a>
        </div>
      </div>
    </div>
  )
}
