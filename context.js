const firebaseConfig = {
    databaseURL : "https://badbank-e4a9d-default-rtdb.firebaseio.com"
};
const app = firebase.initializeApp(firebaseConfig);

const Route         = ReactRouterDOM.Route;
const Link          = ReactRouterDOM.Link;
const HashRouter    = ReactRouterDOM.HashRouter;
const UserContext   = React.createContext(null);

const UserContextProvider = ({children}) => {

    const [loggedIndex, setLoggedIndex] = React.useState(-1);

    const [users, setUsers] = React.useState([]);
    const [ops, setOps] = React.useState([]);

/*
    const [users, setUsers] = React.useState([{name:'abel',email:'abel@mit.edu',password:'secret',balance:100, logstatus: false},{name:'luis',email:'luis@mit.edu',password:'az',balance:100, logstatus: false},{name:'carlos',email:'carlos@mit.edu',password:'az',balance:100, logstatus: false},{name:'rita',email:'rita@mit.edu',password:'az',balance:100, logstatus: false}]);
    const [ops, setOps] = React.useState([{userSearched:'rita@mit.edu',type:'deposit',amount:100, newBalance:200,date:'2023-11-17T02:31:52.815Z'},{userSearched:'rita@mit.edu',type:'deposit',amount:200, newBalance:400,date:'2023-11-17T02:32:52.815Z'},{userSearched:'rita@mit.edu',type:'deposit',amount:300, newBalance:700,date:'2023-11-17T02:33:52.815Z'},{userSearched:'rita@mit.edu',type:'deposit',amount:1000, newBalance:1700,date:'2023-11-17T02:34:52.815Z'}]);
*/
    return(
        <UserContext.Provider value={{users, ops, loggedIndex, setLoggedIndex, setUsers, setOps}}>
            {children}
        </UserContext.Provider>

    );
};

function Card(props){
    function classes(){
        const bg  = props.bgcolor ? ' bg-secondary' : ' ';
        const txt = props.txtcolor ? ' text-white' : ' text-white';
        return 'card mb-3 ' + bg + txt;
    }

    return(
        <div className={classes()} style={{maxWidth:"40rem"}}>
            <div className="card-header">{props.header}</div>
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.status && (<div id='createStatus'>{props.status}</div>)}

            </div>
        </div>
    )
}