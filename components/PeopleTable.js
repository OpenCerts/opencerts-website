import PropTypes from "prop-types";

const renderTable = people => (
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Age</th>
      </tr>
      {people.map((p, i) => (
        <tr key={i}>
          <td>{p.name}</td>
          <td>{p.age}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const PeopleTable = ({ people, fetchData }) => (
  <div>
    {renderTable(people)}
    <button onClick={fetchData}>Fetch Data Again!</button>
  </div>
);

PeopleTable.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      age: PropTypes.number
    })
  ),
  fetchData: PropTypes.func
};

export default PeopleTable;
