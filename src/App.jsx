import { useState, useEffect } from 'react'

import './App.css'

function App() {
  
  const [data, setData] = useState()
  const[page,setPage] = useState(1)
  const[isLoading, setLoading] = useState(false)
  const[gender,setGender] = useState('')
  const[status,setStatus] = useState('')
  const[name,setName] = useState('')
  // const[isDisabled, setDisabled] = useState(true)
  useEffect(() => {
    const getData = async()=>{
      const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&gender=${gender}&status=${status}&name=${name}`)
      
      const dataJson = await data.json()
      
      setData(dataJson)
      setLoading(false)
    }
    getData()
  },[page,gender,status,name])

  // if(page !== 0){
  //   setDisabled(false)
  // }

  

  if(isLoading){
    return <h1>Loading</h1>
  }

  // const names= [{id:1, name: 'Beka'}, {id:2, name: 'Samir'}]
  // const ages= [{id:1, age: 16}, {id:2, age: 17}]
  // const a = names.map((item) => {
  //   const b = ages.find((i) => i.id === item.id)
  //   return {...b, ...item}
  // })
  // console.log(a);

  

  return (
    <>
      <h3>Current Page {page}</h3>
      <input type="text" value={name} onChange={(b) => setName(b.target.value)}/>
      
      <button onClick={()=> setStatus('alive')}>Alive</button>
      <button onClick={()=> setStatus('dead')}>Dead</button>
      <button onClick={()=> setStatus('unknown')}>Unknown</button>
      <button onClick={()=> setGender('male')}>Male</button>
      <button onClick={()=> setGender('female')}>Female</button>
    <button onClick={()=> setPage(page-1)}>Previous Page</button>
    <button onClick={()=> setPage(page+1)}>Next Page</button>
    {data?.error ? <h1>Error</h1> : data?.results.map((item, index) => <div style={{display: 'flex', justifyContent: 'center', }}><div style={{paddingTop: '60px',}}><img src={item.image} alt=''/><h1>{item.name}</h1></div> </div>)}
    </>
  )
}

export default App
