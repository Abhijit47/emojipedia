import moment from "moment/moment";
import { useState, useEffect } from "react";
import "./App.css";



function App() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [time, setTime] = useState("");
  const now = moment().format("ddd, Do MMM YYYY h:mm a");

  setInterval(() => {
    setTime(now);
  }, 1000);

  try {
    const getData = async function () {
      const res = await fetch(
        `https://emoji-api.com/emojis?access_key=${process.env.REACT_APP_API_KEY}`
      );
      const result = await res.json();
      setData(result);
      return result;
    };
    // De-bouncing
    useEffect(() => {
      let timeOut = setTimeout(() => {
        getData();
      }, 5000);
      return () => clearTimeout(timeOut);
    });
  } catch (err) {
    console.error("🤟", err.message);
    setIsError(err.message);
  }

  // Add id to each object
  data.map((item, id) => (item.id = id + 1));
  return (
    <>
      <h1 className="heading">
        Emojipedia <span className="emoji">😍</span>
      </h1>
      {isError ? <h2>{isError}</h2> : ""}
      <p className="time">{time}</p>
      <div className="grid">
        {data.map((item) => {
          // Destructuring object's
          const { id, codePoint, unicodeName: uName, character } = item;
          return (
            <div className="card" key={id}>
              <p className="tag">{id}</p>
              <h2 className="character">{character}</h2>
              <p>Emoji Code: U+ {codePoint}</p>
              <p className="unicode-name">{uName}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
