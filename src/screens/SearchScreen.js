import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";

function SearchScreen(props) {

  const [selectedDepartureDate, setSelectedDepartureDate] = useState('');
  const [selectedReturnDate, setSelectedReturnDate] = useState('');

  let navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [userType, setUserType] = useState('');

  const [departFlights, setDepartFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);

  let {from, to, cabin, pcount, fromDate, toDate} = useParams();

  useEffect(() => {
    axios.get('http://localhost:8082/users/auth', {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.data.isLoggedIn ? (setFirstName(res.data.firstName), setUserType(res.data.type)) : setFirstName(''))
  }, [])

  useEffect(() => {
    async function fetchData(){
      const [departFlightsResult, returnFlightsResult] = await Promise.allSettled([
        fetchDepartFlights(),
        fetchReturnFlights()
      ])
      if(departFlightsResult.status === 'fulfilled'){
        const arr = departFlightsResult.value.data;
        for (let i = 0; i < arr.length; i++) {
          if (pcount > (arr[i].seatsAvailableOnFlight - arr[i].seatsBooked.length)) {
            arr.splice(i, 1);
            i--;
          }
        }
        setDepartFlights(arr);
      }
      else{
        console.log(departFlightsResult.reason)
      }
      if(returnFlightsResult.status === 'fulfilled'){
        const arr = returnFlightsResult.value.data;
        for (let i = 0; i < arr.length; i++) {
          if (pcount > (arr[i].seatsAvailableOnFlight - arr[i].seatsBooked.length)) {
            arr.splice(i, 1);
            i--;
          }
        }
        setReturnFlights(arr);
      }
      else{
        console.log(returnFlightsResult.reason)
      }
    }
    fetchData()
  }, [])

  async function fetchDepartFlights(){
    return await axios.post('http://localhost:8082/flights/search', {
      from: from,
      to: to,
      cabin: cabin === 'null' ? null : cabin,
      flightDate: fromDate === 'null' ? null : fromDate
    })
  }

  async function fetchReturnFlights(){
    return await axios.post('http://localhost:8082/flights/search', {
      from: to,
      to: from,
      cabin: cabin === 'null' ? null : cabin,
      flightDate: toDate === 'null' ? null : toDate
    })
  }

  return (
    <div>
      <Header userType={userType} firstName={firstName}/>
    </div>
    // <Container >
    //   <Header title={firstName}/>
    //   {
    //     loading ?
    //       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: 557, backgroundColor: '#fff' }}>
    //         <ReactLoading type={"spin"} color={"#F0A500"} height={'5%'} width={'5%'} />
    //     </div> 
    //     :
    //     (departFlights.length === 0 || returnFlights.length === 0 ? 
    //       <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: window.innerHeight-160, backgroundColor: '#fff'}}>
    //           <Image src={require("../assets/images/error-icon.png").default} style={{width: 100, height: 100}}/>
    //           <label style={{fontFamily: 'Archivo Black', fontSize: 30, color:'#F0A500'}}>No Results</label>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20, color:'#000', marginTop: 20}}>Modify your search criteria and try again.</label>
    //           <Button2 style={{width: 200, height: 50, marginTop: 20}} title={'Back to Home Screen'} onClick={() => history.push('/')}/>
    //       </div>
    //       :
    //     <div style={{width: '100%', display: 'flex', flexDirection: 'column', marginTop: 40}}>
    //       <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    //         <div style={{width: '95%', height: 3, backgroundColor: 'grey'}}/>
    //         <div style={{display: 'flex', flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginTop: -25, width: 370}}>
    //           <Image src={require("../assets/images/plane.png").default} style={{width: 50, height: 50}}/>
    //           <label style={{fontFamily: 'Archivo', fontWeight: 'bold', fontSize: 20}}>Outbound,</label>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft: 5}}>{from} to {to} ({departFlights.length} options)</label>
    //         </div>
    //       </div>
    //     {departFlights.map((flight) => {
    //       if(selectedReturnDate !== '' && new Date(flight.Flight_Date).getTime()>new Date(selectedReturnDate).getTime()){
    //         return null;
    //       }
    //       return(
    //         <div style={{height: 90, width: '95%', backgroundColor: '#f4f4f4', borderRadius: 30, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 30, marginBottom: 20, display: 'flex', flexDirection: 'row', backgroundImage: "url(" + Background + ")", alignItems: 'center', alignSelf: 'center'}}>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft: 10}}>{flight.From}</label>
    //           <Image src={require("../assets/images/plane.png").default} style={{height: 30, width: 30, marginLeft: 10}}/>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft:10}}>{flight.To}</label>
    //           <Image src={require("../assets/images/cabin.png").default} style={{height: 30, width: 30, marginLeft: 20}}/>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20}}>{flight.Cabin}</label>
    //           <Image src={require("../assets/images/cal.png").default} style={{height: 20, width: 20, marginLeft: 20}}/>
    //           <label style={{fontFamily: 'Archivo', fontSize:20, marginLeft:5}}>{flight.Flight_Date?(flight.Flight_Date.substring(0,10)):'N/A'}</label>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft:20}}>#{flight.FlightNumber?flight.FlightNumber:'N/A'}</label>
    //           <Image src={require("../assets/images/lug5.png").default} style={{height: 30, width: 30, marginLeft: 20}}/>
    //           <label style={{fontFamily: 'Archivo'}}>{flight.Baggage_Allowance?flight.Baggage_Allowance:'N/A'}Kg</label>
    //           <label style={{fontFamily: 'Archivo', marginLeft:20, fontSize: 20}}><label style={{fontWeight:'bold'}}>$</label>{flight.Price?flight.Price:'N/A'}</label>
    //           <label style={{fontFamily: 'Archivo', marginLeft:20, fontSize: 20}}>{flight.DepartureTime?flight.DepartureTime:'N/A'}</label>
    //           <Image src={require("../assets/images/line2.png").default} style={{height: 25, width: 30, marginLeft:10}}/>
    //           <label style={{fontFamily: 'Archivo', marginLeft:10, fontSize: 20}}>{flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
    //           <Image src={require("../assets/images/dur2.jpg").default} style={{height: 30, width: 30, marginLeft: 20}}/>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20}}>{durationString(flight.Trip_Duration)}</label>
    //           {selectedDepart === flight._id ? <Button3 title={'Select Flight'} style={{width: 160, height: 35, marginLeft: 'auto', marginRight: 20}} onClick={()=>{setSelectedDepart(''); setselectedDepDate(''); }} /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35, marginLeft: 'auto', marginRight: 20}}  onClick={() => {setSelectedDepart(flight._id);setselectedDepDate(flight.Flight_Date)}}/>}
    //         </div>
    //     );})}
    //       <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 60}}>
    //         <div style={{width: '95%', height: 3, backgroundColor: 'grey'}}/>
    //         <div style={{display: 'flex', flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginTop: -25, width: 370}}>
    //           <Image src={require("../assets/images/plane2.png").default} style={{width: 50, height: 50}}/>
    //           <label style={{fontFamily: 'Archivo', fontWeight: 'bold', fontSize: 20}}>Inbound,</label>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft: 5}}>{to} to {from} ({returnFlights.length} options)</label>
    //         </div>
    //       </div>
     
    //     {returnFlights.map((flight) => {
    //       if(selectedDepDate !== '' && new Date(flight.Flight_Date).getTime()<new Date(selectedDepDate).getTime()){
    //         return null;
    //       }
    //       return (
    //         <div style={{height: 90, width: '95%', backgroundColor: '#f4f4f4', borderRadius: 30, boxShadow: '0px 1px 5px  0.35px #000', marginTop: 30, marginBottom: 20, display: 'flex', flexDirection: 'row', backgroundImage: "url(" + Background + ")", alignItems: 'center', alignSelf: 'center'}}>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft: 10}}>{flight.From}</label>
    //           <Image src={require("../assets/images/plane.png").default} style={{height: 30, width: 30, marginLeft: 10}}/>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft:10}}>{flight.To}</label>
    //           <Image src={require("../assets/images/cabin.png").default} style={{height: 30, width: 30, marginLeft: 20}}/>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20}}>{flight.Cabin}</label>
    //           <Image src={require("../assets/images/cal.png").default} style={{height: 20, width: 20, marginLeft: 20}}/>
    //           <label style={{fontFamily: 'Archivo', fontSize:20, marginLeft:5}}>{flight.Flight_Date?(flight.Flight_Date.substring(0,10)):'N/A'}</label>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20, marginLeft:20}}>#{flight.FlightNumber?flight.FlightNumber:'N/A'}</label>
    //           <Image src={require("../assets/images/lug5.png").default} style={{height: 30, width: 30, marginLeft: 20}}/>
    //           <label style={{fontFamily: 'Archivo'}}>{flight.Baggage_Allowance?flight.Baggage_Allowance:'N/A'}Kg</label>
    //           <label style={{fontFamily: 'Archivo', marginLeft:20, fontSize: 20}}><label style={{fontWeight:'bold'}}>$</label>{flight.Price?flight.Price:'N/A'}</label>
    //           <label style={{fontFamily: 'Archivo', marginLeft:20, fontSize: 20}}>{flight.DepartureTime?flight.DepartureTime:'N/A'}</label>
    //           <Image src={require("../assets/images/line2.png").default} style={{height: 25, width: 30, marginLeft:10}}/>
    //           <label style={{fontFamily: 'Archivo', marginLeft:10, fontSize: 20}}>{flight.ArrivalTime?flight.ArrivalTime:'N/A'}</label>
    //           <Image src={require("../assets/images/dur2.jpg").default} style={{height: 30, width: 30, marginLeft: 20}}/>
    //           <label style={{fontFamily: 'Archivo', fontSize: 20}}>{durationString(flight.Trip_Duration)}</label>
    //           {selectedReturn === flight._id ? <Button3 title={'Select Flight'} style={{width: 160, height: 35, marginLeft: 'auto', marginRight: 20}} onClick={()=>{setSelectedReturn(''); setselectedReturnDate(''); }} /> : <Button1 title={'Select Flight'} style={{ width: 160, height: 35, marginLeft: 'auto', marginRight: 20}}  onClick={() => {setSelectedReturn(flight._id);setselectedReturnDate(flight.Flight_Date)}}/>}
    //         </div>
    //     );})}
    //       <div style={{height: 70, width: '100%', backgroundColor: '#000', borderBottom: '1px solid rgba(60,60,60,1)', display: 'flex', flexDirection: 'row', marginBottom: -35, alignItems: 'center', marginTop: 20}}>
    //         <label style={{color: '#f4f4f4', fontFamily: 'Archivo', fontSize: 25, marginLeft: 50}}>Round Trip Flight: <label style={{fontFamily: 'Archivo Black', color: '#F0A500'}}>{ from} - {to}</label></label>
    //         <Button1 disabled={selectedDepart === '' || selectedReturn === ''} onClick={() => history.push(`/summary/${selectedDepart}/${selectedReturn}/${pcount}`)} title={'Confirm Selection'} style={{fontSize: 20, position: 'absolute', right: 50, width: 180, height: 40}}/>
    //       </div>
    //     </div>
    //     )
    //   }
    //   <Footer />
    // </Container>
  );
}

export default SearchScreen;
