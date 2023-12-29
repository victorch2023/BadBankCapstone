function Withdraw(){
    const [show, setShow]           = React.useState(true);
    const [status, setStatus]       = React.useState('');
    const [amount,setAmount]        = React.useState('');
    const [btnstatus, setBtnstatus] = React.useState(true);
    const ctx = React.useContext(UserContext);
    const type = 'withdraw'

    React.useEffect(() => {
        if (ctx.loggedIndex < 0){
            setStatus('Please LOGIN first')
        }
        },[ctx]);

        function validate(field){
            if (!field){
                setStatus('Empty field');
                setTimeout(() => setStatus(''), 3000);
                setBtnstatus(true)
                return false;
            }
    
            if(isNaN(field)){
                setStatus('Error: Is not a number');
                setTimeout(() => setStatus(''), 3000);
                return false;
            }
    
            const number = parseFloat(field);
            const balance = ctx.users[ctx.loggedIndex].balance
            if(number > balance){
                setStatus('Error: Withdraw exceeds balance');
                setTimeout(() => setStatus(''), 3000);
                return false;
            }
            return true;
        }


    function handleWithdraw(){
        console.log(amount);
        if (!validate(amount))        return;
        ctx.users[ctx.loggedIndex].balance -= Number(amount);

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
        setBtnstatus(true);
    }

    function handleOnChange (event){
        const newContent = event.target.value;
        setAmount(newContent);
        setBtnstatus(newContent === '');
    };

    return(
        <Card
            bgcolor="primary"
            header="Withdraw"
            status={status}
            body={show ? (
                <>
                Balance<br/>
                <h2>USD: {ctx.loggedIndex >= 0 ? ctx.users[ctx.loggedIndex].balance : '-'}</h2><br/><br/>
                <p>Set a withdraw</p>
                Amount<br/>
                <input type="text" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={handleOnChange} /><br/>
                <button type="submit" className="btn btn-light" onClick={handleWithdraw} disabled={btnstatus}>Confirm withdraw</button>
                </>
            ) : (
                <>
                Balance<br/>
                <h2>USD: {ctx.users[ctx.loggedIndex].balance}</h2><br/><br/>
                <h5>Success withdraw</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Set another withdraw</button>
                </>
            )}

        />
    )
}