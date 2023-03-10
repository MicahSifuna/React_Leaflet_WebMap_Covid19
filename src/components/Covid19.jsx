import React, { useState, useEffect } from 'react'
import Loading from './Loading';
import CovidMap from "./CovidMap";
import Legend from './Legend';
import LoadCountriesTask from '../tasks/LoadCountriesTask1';
import LegendItems from '../entities/LegendItems';

const Covid19 = () => {

    const [countries, setCountries] = useState([]);

    const legendItemsInReverse = [...LegendItems].reverse();

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load((countries) => setCountries(countries));
    }

    useEffect(load, []);
  return (
    <div>
        {countries.length === 0 ?
        (<Loading />)
         : (<div>
            <CovidMap countries={countries} />
            <Legend legendItems = {legendItemsInReverse}/>
        </div>) }
    </div>
  )
}

export default Covid19