function App(){
    /*declare a state assigning an empty array which will receive data from the quotes api */
    const[quotes,setQuotes] = React.useState([]);
    /*another state that will hold a random object which will be inform of a string in the array of many objects of the data in api */
    const[randomQuotes,setRandomQuotes] = React.useState("");
    /*state to track and update colors initialized to white */
    const[color,setColor]= React.useState('green')

    /*use effect is used to make api call to get the quotes */
    React.useEffect(()=>{
        /*asyn function used because getting data takes a long time . so the other codes can continue running as the data is being fetched */
    async function fetchData(){
        /*the link to the api where the quotes are available */
        const response = await fetch("https://type.fit/api/quotes")
        /*the data from the api will be transformed into string for usability */
        const data = await response.json();
        /*setQuotes updates the state so now it hold data from api */
        setQuotes(data);
        /*a variable declared to get a random number */
        let randomIndex = Math.floor(Math.random()* data.length);
        /*aids in acessing a random object */
        setRandomQuotes(data[randomIndex])
    }
    /*calling the async function */
    fetchData();
},[]);
/*an empty dependencies array cause we have nothing depending on the rendering of the app */

/*an arrow function that when clicked, a quote is displayed on the UI and the bg color also updates */
const getNewQuote=()=>{
    /*an array of colors */
    const colors=[
        "#e53935",
        "#00dbde",
        "#fc00ff",
        "#BA8B02",
        "#ee9ca7",
        "#7b4397"
    ];
   /*variable to get a random number as per the length of colors array */
    let randomColor = Math.floor(Math.random()*colors.length);
    /*the random number is used by the setcolor function to get a random color which is assingned to color there in the state */
    setColor(colors[randomColor]);
    /*variable to get a random number as per the length of data array */
    let randomIndex = Math.floor(Math.random()* quotes.length);
     /*the random number is used by the setrandomquotes function to get a object which is assingned to randomQuotes there in the state */
    setRandomQuotes(quotes[randomIndex])
}
    return(
        <div style={{backgroundColor:color,minHeight:"100vh"}}>
        <div className="container pt-5">
            <div className="jumbotron">
                <div className="card">
                 <div className="card-header">inspiration quotes</div>
                <div className="card-body">
                    {/*if there is a randomquote, display the author on card title and the text on the card-text otherwise display loading... */}
                    {randomQuotes? (<><h5 style={{color:color}} className="card-title">{randomQuotes.author || "¬no author" }</h5>
                    <p style={{color:color}} className="card-text">&quot;{randomQuotes.text}&quot;</p>
                    </>):(<h2>Loading</h2>) }
                </div>
               <div className="row">
                <button onClick={getNewQuote} className="btn btn-primary ml-3">New Quotes</button>
                
               </div>

                </div>

            </div>
        </div>
        </div>
    )
}
ReactDOM.render(<App/>,document.getElementById("app"))