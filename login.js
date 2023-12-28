function Login(){
    const [status, setStatus]       = React.useState('');
    const [email, setEmail]         = React.useState('');
    const [password, setPassword]   = React.useState('');
    const ctx = React.useContext(UserContext);
    const [logged, setLogged]       = React.useState('');

    React.useEffect(() => {
    if (ctx.loggedIndex < 0){
        setLogged(false)
    } else {
        setLogged(true)
    };
    },[ctx]);

    function validate(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function verify(){
        const newIndex = ctx.users.findIndex(user => user.email === email && user.password === password);
        console.log('newIndex: '+newIndex);
        ctx.setLoggedIndex(newIndex);
        if (newIndex < 0){
            setStatus('Error in data');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }

        const db = firebase.database();
        db.ref('users/' + newIndex).update({
            logstatus:true
        });

        ctx.users[newIndex].logstatus = true;
        setEmail('');
        setPassword('');
        setLogged(true);
    }

    function handleLogin(){

        console.log(email, password);
        
        if (!validate(email,    'email'))       return;
        if (!validate(password, 'password'))    return;
        verify();

    }

    function loginFB (){
        FB.login(function(response){
            console.log(response);

            if (response.status === 'connected'){
                FB.api('/me',{fields:'name,email'},function(response){
                    console.log(response);
                    const newIndex = ctx.users.findIndex(user => user.email === response.email);
                    console.log('newIndex: '+newIndex);
                    ctx.setLoggedIndex(newIndex);
                    if (newIndex < 0){
                        setStatus('Error in data');
                        setTimeout(() => setStatus(''), 3000);
                        return false;
                    }
            
                    const db = firebase.database();
                    db.ref('users/' + newIndex).update({
                        logstatus:true
                    });
            
                    ctx.users[newIndex].logstatus = true;
                    setEmail('');
                    setPassword('');
                    setLogged(true);
                })
            }

        },{scope:'public_profile,email'})
    }


    function logout(){

        const db = firebase.database();
        db.ref('users/' + ctx.loggedIndex).update({
            logstatus:false
        });

        ctx.users[ctx.loggedIndex].logstatus = false;
        ctx.setLoggedIndex(-1);
        setLogged(false);
    }

        return(
            <Card
                bgcolor="primary"
                header="Login"
                status={status}
                body={!logged ? (                
                    <>
                    Email address<br/>
                    <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                    <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
                    <button type="submit" className="btn btn-light" onClick={loginFB}>Login with Facebook</button>
                    </>              
                ) : (
                    <>
                    <h5>User Logged!</h5>
                    <button type="submit" className="btn btn-light" onClick={logout}>Logout</button>
                    </>
                )}
            />)
}