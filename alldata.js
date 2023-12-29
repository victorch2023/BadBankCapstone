function AllData(){
  const ctx = React.useContext(UserContext);

  console.log(ctx)
  return(
                  
       <Card
            bgcolor="primary"
            header="All Data"
            body={
            <card>    
              <h5 class="card-title">Registered Users</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Password</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody> 
                    {ctx.users.map((user, index) => (
                      <tr>  
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.balance}</td>
                        <td>{user.logstatus ? 'Logged In' : 'Logged Out'}</td>
                      </tr>
                    ))}      
                  </tbody>
                </table> 
            
    <br/>
    <br/>
    <br/>
                
             <h5 class="card-title">Bank Operations</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">User</th>
                      <th scope="col">Type</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody> 
                    {ctx.ops.map((user, index) => (
                      <tr>
                        <td>{user.userSearched}</td>
                        <td>{user.type}</td>
                        <td>{user.amount}</td>
                        <td>{user.newBalance}</td>
                        <td>{user.date}</td>
                      </tr>  
                    ))}      
                  </tbody>
                </table>
            </card>

            }

      />

  );
}