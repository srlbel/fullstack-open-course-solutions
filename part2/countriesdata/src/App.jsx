import Form from './components/Form';
import Results from './components/Results';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [searchParam, setSearchParam] = useState("");
  const [countryList, setCountryList] = useState([]);

  const handleSearchChange = event => setSearchParam(event.target.value);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countries = response.data.map(country => country.name.common)
        setCountryList(countries)
      })
      .catch(e => {
        console.error('error while fetching: ', e)
      })
  }, [])

  const filteredList = searchParam
    ? countryList.filter(item => item.includes(searchParam))
    : countryList

  return (
    <>
      <Form
        searchParam={searchParam}
        handleSearchChange={handleSearchChange}
      />
      <Results
        countryList={filteredList}
        setSearchParam={setSearchParam}
      />
    </>
  )
}

export default App
