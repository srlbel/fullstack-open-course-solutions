/* eslint-disable react/prop-types */
const List = ({ persons, handleDelete }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td> {person.name}</td>
            <td> {person.number}</td>
            <td> <button onClick={() => handleDelete(person.name, person.id)}>delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;