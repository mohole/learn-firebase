import { useState, useEffect } from 'react';
import firebase from './firebase';
import './App.css';

const random = () => Math.floor(Math.random() * 9999);

/** Caching Firebase DB and collection instance */
const db = firebase.firestore();
const collection = db.collection('items');

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    /** 
     * Load Firebase data on component init and subscribing 
     * to the collection changes, so it will sync automatically
     * when the data updates
     */
    collection
      .onSnapshot(querySnapshot => {
        /**
         * Create a plain JSON object from the collection results
         * using each item .data() and its own id
         */
        const docs = querySnapshot.docs;
        const json = docs.map(item => {
          const id = item.id;
          return { id, ...item.data() }
        });
        /**
         * Set the DB data as component state (trigger render)
         */
        setItems(json);
      })

  }, []);

  /** Add a new item in the DB */
  const add = () => collection.doc().set({
    label: 'random item ' + random(),
    value: random()
  });

  /** Remove an item from the DB */
  const remove = (id) => collection.doc(id).delete();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn Firebase</h1>
        <p>
          Add and remove DB items in real time!
          <br /> 
          <code>(also check the project DataBase UI)</code>
        </p>
        <p><button onClick={add}>Add a random element!</button></p>
        <ul>
          { items.map((item, index) => <li key={index}>
            {item.label} <button 
              onClick={() => remove(item.id)}>remove</button>
          </li>) }
        </ul>
      </header>
    </div>
  );
}

export default App;
