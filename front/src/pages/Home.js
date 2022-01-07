import Card  from '../UI/Card';
import React, { useEffect, useState } from 'react'
import { getUserFetch } from '../helpers/useFetch';
import './Home.css'

const Home = () => {
    const [flights, setFlights] = useState([]);

    useEffect(async () => {
      const res = await getUserFetch();
      setFlights(res);
    }, []);

    return (
        <div className="card-deck p-3 cards">
            {flights.length > 0 &&
            flights.map((flight, ind) => (
                <div key={ind}>
                <Card mainpicture={flight.pictures.main} title={flight.name} description={flight.description} flight={flight} />
                </div>
            ))}
        </div>
    )
}

export default React.memo(Home)
