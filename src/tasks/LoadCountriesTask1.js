import papa from "papaparse";
import legendItems from "../entities/LegendItems";
import {features} from "../data/countries.json";
//    this.setState(features);

class LoadCountryTask {
  covidUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv";

  setState = null;

  load = (setState) => {
    this.setState = setState;

    papa.parse(this.covidUrl, {
      download: true,
      header: true,
      complete: (result) => this.#processCovidData(result.data),
    });
  };

  #processCovidData = (covidCountries) => {
    for (let i = 0; i < features.length; i++) {
      const country = features[i];
      //console.log(country);
      const covidCountry = covidCountries.find(
        (covidCountry) => country.properties.ISO_A3 === covidCountry.ISO3
      );

      country.properties.confirmed = 0;
      country.properties.confirmedText = 0;
      country.properties.deaths = 0;
      country.properties.mortality_rate = 0;
      country.properties.cases_28_days = 0;
      country.properties.deaths_28_days = 0;

      if (covidCountry != null) {
        let confirmed = Number(covidCountry.Confirmed);
        let deaths = Number(covidCountry.Deaths);
        let mortality_rate = Number(covidCountry.Mortality_Rate);
        let cases_28_days = Number(covidCountry.Cases_28_Days);
        let deaths_28_days = Number(covidCountry.Deaths_28_Days);

        country.properties.confirmed = confirmed;
        country.properties.confirmedText = this.#formatNumberWithCommas(confirmed);
        country.properties.deaths = this.#formatNumberWithCommas(deaths);
        country.properties.cases_28_days = this.#formatNumberWithCommas(cases_28_days);
        country.properties.deaths_28_days = this.#formatNumberWithCommas(deaths_28_days);
        country.properties.mortality_rate = mortality_rate;
      }
      this.#setCountryColor(country);
    }

    this.setState(features);
  };

  #setCountryColor = (country) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(country.properties.confirmed)
    );

    if (legendItem != null) country.properties.color = legendItem.color;
  };

  #formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
}

export default LoadCountryTask;