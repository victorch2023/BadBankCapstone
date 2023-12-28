function Balance(){
    const ctx = React.useContext(UserContext);
    const [status, setStatus]       = React.useState('');

    React.useEffect(() => {
        if (ctx.loggedIndex < 0){
            setStatus('Please LOGIN first')
        }
        },[ctx]);

    return(
        <Card
            bgcolor="primary"
            header="Balance"
            status={status}
            body={
                <>
                Balance<br/>
                <h2>USD: {ctx.loggedIndex >= 0 ? ctx.users[ctx.loggedIndex].balance : '-'}</h2><br/><br/>
                </>
            }

        />
    )
}