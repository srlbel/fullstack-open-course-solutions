/* eslint-disable react/prop-types */
import Information from "./Information"

const Results = ({ countryList, setSearchParam }) => {
  if (countryList.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countryList.length > 1 && countryList.length < 11) {
    return <List countryList={countryList} setSearchParam={setSearchParam} />
  }

  if (countryList.length === 1) {
    return <Information countryName={countryList[0]} />
  }

  if (countryList.length === 0) {
    return <p>No matches found</p>
  }
}

const List = ({ countryList, setSearchParam }) => {
  return (
    <table>
      <tbody>
        {countryList.map((country, i) => {
          return (
            <tr key={i}>
              <td> {country} </td>
              <td><button onClick={() => setSearchParam(country)}>show</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Results;