// // /client/App.js
// import React, { Component } from "react";
// import axios from "axios";
//
// class App extends Component {
//     // initialize our state
//     state = {
//         data: [],
//         id: 0,
//         message: null,
//         intervalIsSet: false
//     };
//
//     // never let a process live forever
//     // always kill a process everytime we are done using it
//     componentWillUnmount() {
//         if (this.state.intervalIsSet) {
//             clearInterval(this.state.intervalIsSet);
//             this.setState({ intervalIsSet: null });
//         }
//     }
//     // our put method that uses our backend api
//     // to create new query into our data base
//     putDataToDB = message => {
//         let currentIds = this.state.data.map(data => data.id);
//         let idToBeAdded = 0;
//         while (currentIds.includes(idToBeAdded)) {
//             ++idToBeAdded;
//         }
//
//         axios.post("http://localhost:3001/api/putNotification", {
//             id: idToBeAdded,
//             message: message
//         });
//     };
//
//     // here is our UI
//     // it is easy to understand their functions when you
//     // see them render into our screen
//     render() {
//         const { data } = this.state;
//         return (
//             <div>
//                 <div style={{ padding: "10px", width: "100px" }}>
//                     <input
//                         type="textarea"
//                         onChange={e => this.setState({ message: e.target.value })}
//                         placeholder="add something in the database"
//                         style={{ width: "200px" }}
//                     />
//                     <button onClick={() => this.putDataToDB(this.state.message)}>
//                         ADD
//                     </button>
//                 </div>
//             </div>
//         );
//     }
// }
//
// export default App;
