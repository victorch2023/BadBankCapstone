function NavBar(){

    const ctx = React.useContext(UserContext);

    React.useEffect(() => {
        ctx.users.forEach((user, index) => {
            if (user.logstatus === true){
                ctx.setLoggedIndex(index);
            }
        });
        },[ctx.users]);

    function logout(){
        const db = firebase.database();
        db.ref('users/' + ctx.loggedIndex).update({
            logstatus:false
        });

        ctx.users[ctx.loggedIndex].logstatus = false;
        ctx.setLoggedIndex(-1);
    }


    return(
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            
                <a class="navbar-brand" href="#">BadBank</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link" href="#/CreateAccount/">Create Account</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#/login/">Login</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#/deposit/">Deposit</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#/withdraw/">Withdraw</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#/balance/">Balance</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#/alldata/">AllData</a>
                    </li>
                </ul>
                </div>
                <div>
                    {ctx.loggedIndex >= 0 ? ctx.users[ctx.loggedIndex].email : ''}
                </div>
                {ctx.loggedIndex >= 0 ? (
                    <button type="submit" className="btn btn-light" onClick={logout}>Logout</button>
                ) : ''
                }
            </nav>
        </>
    );
}