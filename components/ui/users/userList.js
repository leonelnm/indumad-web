export const UserList = ({ users = [] }) => {
  return (
    <div className="table-container">
      <table className="table is-striped">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.dni}</td>
              <td>
                <span>{`${user.active}`}</span>
                <div className="field">
                  <input
                    type="checkbox"
                    name="switchExample"
                    className="switch"
                    checked={user.active ? "checked" : ""}
                    onChange={() => {}}
                  />
                </div>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  )
}
