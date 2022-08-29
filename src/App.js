import './App.css';

import { Header } from './components/Header'
import { Icon } from './components/Icon';

function App() {

  return (
    <>
      {/* Header */}
      <Header title="CRUD Users FrontEnd" />

      <section>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-4">
              <h3>List Users</h3>
              <button className="btn btn-primary bt-sm"><Icon icon="plus" /></button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">ID Number</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
