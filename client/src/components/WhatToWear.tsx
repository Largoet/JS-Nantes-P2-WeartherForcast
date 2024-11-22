import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import weatherConditions from "../assets/APIWeatherConditions";
import "../WhatToWear.css";
import { NavLink } from "react-router-dom";
import tempRanges from "../assets/Temps";
import type WhatToWearInterfaces from "../types/whatToWear";

function WhatToWear() {
  // DECLARATION OF VARIABLES -- Est-ce qu'on devrait stocker ces variables dans un context pour qu'ils soient dispo pour tout les componenets ?
  const [conditions, setConditions] = useState();
  const [tempMax, setTempMax] = useState<WhatToWearInterfaces.useStateProps>();
  const [conditID, setConditID] = useState(615);
  const city = useOutletContext<WhatToWearInterfaces.OutletContextProps>().city;
  const clothingPref =
    useOutletContext<WhatToWearInterfaces.OutletContextProps>().clothingPref;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=07310a0f69c5739447b27cfd4c17e3dd&units=metric`;
  const [tempRange, setTempRange] = useState("cool");

  // FETCH API
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // est-ce que je peux utiliser un 'map' ou 'spread' pour automatiser ce genre de code?
        setConditions(data.weather[0].description);
        setTempMax(data.main.temp_max);
        setConditID(data.weather[0].id);
      })
      .catch((err) => console.error(err));
  }, [url]);

  // REORDER EXTERNAL ARRAY AND DEFINE IMAGE URLS TO DISPLAY - WEATHER CONDITIONS
  const weatherConditionImages: WhatToWearInterfaces.WeatherConditionImagesProps =
    {};

  for (const condition of weatherConditions) {
    for (const id of condition.id) {
      weatherConditionImages[id] = condition.imgSrc;
    }
  }
  //  FIND TEMERATURE RANGE (ie: warm, very warm, cool, etc.)
  useEffect(() => {
    function findTemperatureRange(tempIn: string, tempPref: string) {
      const prefRealFeel = Number.parseInt(tempIn) + Number.parseInt(tempPref);
      for (const range of tempRanges) {
        if (prefRealFeel >= range.start && prefRealFeel <= range.end) {
          setTempRange(range.temp);
          break;
        }
      }
    }
    findTemperatureRange(tempMax, clothingPref.warmthPref);
  }, [tempMax, clothingPref.warmthPref]);

  // REORDER EXTERNAL ARRAY AND DEFINE IMAGE URLS TO DISPLAY - TEMPERATURE RANGE

  const weatherTempImages: WhatToWearInterfaces.WeatherTempImagesProps = {};
  for (const condition of tempRanges) {
    weatherTempImages[condition.temp] = condition.imgSrc;
  }

  // SET WEATHER ITEM
  const weatherConditionItems: WhatToWearInterfaces.weatherConditionItemProps =
    {};
  for (const condition of weatherConditions) {
    for (const id of condition.id) {
      weatherConditionItems[id] = condition.item;
    }
  }

  // SET URLS TO VARIABLES
  const imageUrls = weatherConditionImages[conditID];
  const tempUrls = weatherTempImages[tempRange];
  const weatherItem = weatherConditionItems[conditID];

  // DISPLAY ELEMENTS
  return (
    <div className="wtw-mother-div">
      {/* Title */}
      <h3 className="wtw-title">What to Wear</h3>

      <p className="wtw-text-description">
        Today it will be {tempRange} with {conditions}. Don't forget your{" "}
        {weatherItem}
      </p>
      <nav>
        <p>
          {" "}
          <NavLink to="/WhatToWearMore">more...</NavLink>
        </p>
      </nav>

      {/* DISPLAY OF CLOTHING RECOMMENDATIONS DEPENDING ON WEATHER CONDITIONS - need to use map*/}
      <figure className="wtw-images">
        <section>
          {imageUrls.map((el: string) => (
            <img
              key={el}
              src={el}
              alt="weather conditions icon"
              className="wtw-icons"
            />
          ))}
        </section>
        <section>
          {tempUrls.map((el: string) => (
            <img
              key={el}
              src={el}
              alt="temperature conditions icon"
              className="wtw-icons"
            />
          ))}
        </section>
      </figure>
    </div>
  );
}

export default WhatToWear;
