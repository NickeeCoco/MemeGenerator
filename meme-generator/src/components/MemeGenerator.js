import React, {useState, useEffect} from "react"

function MemeGenerator() {
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [rdmImageUrl, setRdmImageUrl] = useState("http://i.imgflip.com/1bij.jpg")
  const [allMemeImgs, setAllMemeImgs] = useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes} = response.data
        setAllMemeImgs(memes)
      })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    let rdmNumber = Math.floor(Math.random() * allMemeImgs.length)
    setRdmImageUrl(allMemeImgs[rdmNumber].url)
  }

  return(
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Top Text" name="topText" value={topText} onChange={(e) => setTopText(e.target.value)} />
        <input type="text" placeholder="Bottom Text" name="bottomText" value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
        <button>Generate</button>
      </form>
      <div className="meme">
        <img src={rdmImageUrl} />
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
      </div>
    </div>
  )
}

export default MemeGenerator