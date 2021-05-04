import './App.css';
import SearchForm from './Form/SearchForm'

import MyGeolocated from './API/my_Geolocated' //HACK: 混乱を避けるために絶対パスで指定できるようにする

function App() {
  return (
    <div className="App">
      <MyGeolocated />
      <SearchForm />      
    </div>
  );
}

export default App;
