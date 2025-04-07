import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/registerPage';

function App() {
  const [api, setApi] = useState([{
    statusCode: 200,
    datas: [],
    messageText: ''
  }])
  // const endpoint = `http://localhost:2000${window.location.pathname}${window.location.search}`

  // const user = async () => {
  //   try {
  //     const res = await fetch(endpoint)
  //     console.log(res)
  //     const data = await res.json()
  //     // setApi(JSON.parse(data))
  //     console.log(endpoint)
  //     console.log(data)
  //     setApi(data)
  //   } catch (error) {
  //     throw new error
  //   }
  // }

  // useEffect(()=> {
  //   user()
  // }, [endpoint])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path='/' element={}/>
        </Routes>
      </Router>



      {/* <div>
        {Api.datas?.map((mhs)=> {
          return (
            <div key={mhs.id}>
              <p>no: {mhs.id}</p>
              <p>nama: {mhs.nama}</p>
              <p>kelas: {mhs.kelas}</p>
              --------------------------------
            </div>
            
          )
        })}
      </div> */}
      {/* {console.log(api)} */}
      
    </>
  )
}

export default App
