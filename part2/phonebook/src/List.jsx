const List = ({ persons }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td> {person.id}</td>
            <td> {person.name}</td>
            <td> {person.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;