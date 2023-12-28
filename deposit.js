function Deposit(){
    const [show, setShow]           = React.useState(true);
    const [status, setStatus]       = React.useState('');
    const [amount,setAmount]        = React.useState('');
    const ctx = React.useContext(UserContext);
    const type = 'deposit';

    React.useEffect(() => {
        if (ctx.loggedIndex < 0){
            setStatus('Please LOGIN first')
        }
        },[ctx]);

    function validate(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }


    function handleDeposit(){
        console.log(amount);
        if (!validate(amount,     'amount'))        return;
        ctx.users[ctx.loggedIndex].balance += Number(amount);

        const userSearched = ctx.users[ctx.loggedIndex].email;
        const newBalance = ctx.users[ctx.loggedIndex].balance;
        const date = new Date().toString();

        const db = firebase.database();
        db.ref('users/' + ctx.loggedIndex).update({
            balance:newBalance
        });

        ctx.ops.push({userSearched,type,amount,newBalance,date});
        db.ref('ops').push({userSearched,type,amount,newBalance,date});

        setShow(false);
    }


    function clearForm(){
        setAmount('');
        setShow(true);
    }


    return(
        <Card
            bgcolor="primary"
            header="Deposit"
            status={status}
            body={show ? (
                <>
                Balance<br/>
                <h2>USD: {ctx.loggedIndex >= 0 ? ctx.users[ctx.loggedIndex].balance : '-'}</h2><br/><br/>
                <p>Set a deposit</p>
                Amount<br/>
                <input type="number" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
                <button type="submit" className="btn btn-light" onClick={handleDeposit}>Confirm deposit</button>
                </>
            ) : (
                <>
                Balance<br/>
                <h2>USD: {ctx.users[ctx.loggedIndex].balance}</h2><br/><br/>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Set another deposit</button>
                </>
            )}

        />
    )
}