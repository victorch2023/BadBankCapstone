function CreateAccount(){
    const [show, setShow]           = React.useState(true);
    const [status, setStatus]       = React.useState('');
    const [name, setName]           = React.useState('');
    const [email, setEmail]         = React.useState('');
    const [password, setPassword]   = React.useState('');
    const ctx = React.useContext(UserContext);


    function validate(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function validatepassword(field, label){
        if (password.length<8){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function validateNewEmail(email){
        const index = ctx.users.findIndex(user => user.email === email);
        if (index >= 0){
            setStatus('Error: duplicated email');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function handleCreate(){
        console.log(name, email, password);
        if (!validate(name,     'name'))        return;
        if (!validate(email,    'email'))       return;
        if (!validate(password, 'password'))    return;
        if (!validatepassword(password, 'password should have 8 characters at least'))    return;
        if (!validateNewEmail(email))                return;

        const db = firebase.database();
        db.ref('users/' + ctx.users.length).set({
            name,
            email,
            password,
            balance:100,
            logstatus:false
        });

        ctx.users.push({name,email,password,balance:100,logstatus:false});
        setShow(false);
    }

    function signUpFB (){
        FB.login(function(response){
            console.log(response);

            if (response.status === 'connected'){
                FB.api('/me',{fields:'name,email'},function(response){
                    console.log(response);
                    if (!validateNewEmail(response.email))                return;

                    const db = firebase.database();

                    const newUser = {
                        name: response.name,
                        email: response.email,
                        password: '',
                        balance:100,
                        logstatus:false
                    };
                    db.ref('users/' + ctx.users.length).set(newUser);

                    ctx.users.push(newUser);
                    setShow(false);
                })
            }

        },{scope:'public_profile,email'})
    }


    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }


    return(
        <Card
            bgcolor="primary"
            header="Create Account"
            status={status}
            body={show ? (
                <>
                Name<br/>
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
                <button type="submit" className="btn btn-light" onClick={signUpFB}>Sign Up with Facebook</button>
                </>
            ) : (
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
            )}

        />
    )
}