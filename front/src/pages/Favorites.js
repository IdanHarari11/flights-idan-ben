import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getUserFetch } from '../helpers/useFetch';
import Card from '../UI/Card';

const Favorites = () => {
    const favoritesFlights = useSelector((state) => state.favorite);
    const [flights, setFlights] = useState([]);

    useEffect(async () => {
      const res = await getUserFetch();
      setFlights(res);
    }, []);
    return (
        <div className="card-deck p-3" style={{justifyContent: 'center', marginTop: '5rem'}}>
            {flights.length > 0 &&
            flights.map((flight, ind) => { 
                const isExist = favoritesFlights.find((favorite) => flight._id === favorite);
                if(!isExist){
                    return
                } else{
                    return (
                        <div key={ind}>
                          <Card mainpicture={flight.pictures.main} title={flight.name} description={flight.description} flight={flight} />
                        </div>
                )
                }
            }
            )}
        </div>
    )
}

export default Favorites
