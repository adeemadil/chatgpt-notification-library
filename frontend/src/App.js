import logo from "./logo.svg";
import "./App.css";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  const serverInformation = useCallback(async () => {
    const { data } = await axios.get("http://localhost:3000");
    setCategories(data);
  }, []);
  useEffect(() => {
    serverInformation();
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
       */}
      <ul>
        {categories.map((cat) => (
          <li key={cat.category}>
            {cat.category}
            <ul>
              {cat.notificationTypes.map((notificationType) => (
                <li key={notificationType.name}>
                  {notificationType.name}
                  <ul>
                    {notificationType.notifications.map((notification) => (
                      <li key={notification}>{notification}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
