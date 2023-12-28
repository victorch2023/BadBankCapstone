function Init () {
    const ctx = React.useContext(UserContext);

    React.useEffect(() => {
        console.log('hola');

        const db = firebase.database();

        db.ref('users').on('value', dbUsers => {
            const newUsers = [];
            let loggedUserKey = -1;
            dbUsers.forEach(dbUser => {
                const userData = dbUser.val();
                if (userData.logstatus === true){
                    loggedUserKey = dbUser.key;
                }
                newUsers.push(userData);
            });
            ctx.setUsers(newUsers);
        });

        db.ref('ops').on('value', dbOps => {
            const newOps = [];
            dbOps.forEach(dbOp => {
                const opData = dbOp.val();
                newOps.push(opData);
            });
            ctx.setOps(newOps);
        });





        
        FB.getLoginStatus(function(response){
            console.log(response);
        })

        },[]);

}