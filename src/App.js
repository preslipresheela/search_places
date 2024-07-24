import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [places,setPlaces]=useState([]);
  const [display,setDisplay]=useState([]);
  const [currPageNo,setCurrPageNo]=useState(1);
  const dataPerPage=10;
  //const searchForData=Object.keys(Object.assign({},...places));
  const searchForData="name";
  useEffect(()=>{
    axios({
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    method: "GET",
    headers: {
      'x-rapidapi-key': 'a5534d8408msh688ea1e461b2392p1f145bjsneea5cb5a45fe', // get your key from https://rapidapi.com/wirefreethought/api/geodb-cities
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
  }
})
  .then((res) => {
    setPlaces(res.data.data);
    setDisplay(res.data.data.slice(0,dataPerPage));
    
  })
  .catch((err) => {});
  },[]);
  useEffect(()=>{
    const start=(currPageNo-1)*dataPerPage;
    const end=currPageNo*dataPerPage;
    setDisplay(places.slice(start,end));
  },[currPageNo]);

  const handleChange=(e)=>{
   // const searchData=Object.keys(Object.assign({},...places));
    return display.filter((data)=>{
      //searchForData.some((p)=>{
        data[searchForData].toString().toLowerCase().includes(e.target.value)
      //}
      //);
    })
    console.log(places);
  }
  const goPrevpage=()=>{
    if(currPageNo===1) return;
    setCurrPageNo((prev)=>prev-1);
  };
  const goNextPage=()=>{
    if(currPageNo===places.length/dataPerPage)
      return;
    setCurrPageNo((prev)=>prev+1);
  };
  const handleSelectChange=(e)=>{
    setCurrPageNo(e.target.value);
  };
  return (
    <div className="App">
      {(places.length==0)?(
        <div>Loading</div>
      ):(
        <>
          <hi className="title">Find the Places</hi>
          <div>
            <input type="search" className="searchData" onChange={(e)=>{handleChange(e)}} placeholder="Serach Places...  Ctrl+/" />
          </div>
          <div>
          <table border={1}>
            <tr>
              <th>#</th>
              <th>Place Name</th>
              <th>Country</th>
            </tr>
            {display.map((place)=>(
              <tr key={place.id}>
                <td>{place.id}</td>
                <td>{place.name}</td>
                <td>{place.country}</td>
              </tr>
            ))}
          </table>
          </div>
          <div>
              {/*<select name="pageNo" onChange={handleSelectChange} value={currPageNo}>
                {Array.from(Array(places.length/dataPerPage)).map((val,i)=>i+1).map((val)=>{
                  return <option key={val}>{val}</option>;
                })}
              </select> */}
              <input type="text" onChange={handleSelectChange} value={currPageNo} />
          </div>
          <div>
            <button onClick={goPrevpage}>Prev</button>
            <button onClick={goNextPage}>Next</button>
          </div>
          </>
      )
  }
    </div>
  );
}

export default App;
