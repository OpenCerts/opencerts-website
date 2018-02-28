const renderTable = (people) => {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Age</th>
      </tr>
      {people.map(p => (
        <tr>
          <td>{p.name}</td>
          <td>{p.age}</td>
        </tr>
      ))}
    </table>
  )
}

export default ({ people, fetchData}) => {
  return (
    <div>
      {renderTable(people)}
      <button onClick={fetchData}>Fetch Data Again!</button>
    </div>
  )
}
