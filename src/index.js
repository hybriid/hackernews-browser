import ReactDOM from 'react-dom';
import React, {useState, useEffect} from "react";
import * as serviceWorker from './serviceWorker';
import { Table } from "./components/Table";
import "./index.css";


const DEFAULT_QUERY = "react";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

function App() {
  const [searchTerm, setSearchTerm] = useState(DEFAULT_QUERY);
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const setSearchTopStories = result => {
    setResult(result.hits);
  };

  const onSearchSubmit = () => {
    fetchData(searchTerm);
  };

  const fetchData = searchTerm => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&hitsPerPage=30`)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return setSearchTopStories(result);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onSearchChange = event => {
    setSearchTerm(event.target.value);
    fetchData(searchTerm);
  };

  return (
    result && (
      <main>
          <div className="header">
            <h1>Hackernews</h1>
            <input
                value={searchTerm}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
            />
          </div>
          {result && <Table list={result}/>}
      </main>
    )
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
