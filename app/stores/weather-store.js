import { action, observable } from 'mobx';
import moment from 'moment';
import axios from 'axios';

const apiPrefix = `http://api.wunderground.com/api/${process.env.WEATHER_DOT_COM_API_KEY}`;
const apiSuffix = `q/${process.env.WEATHER_DOT_COM_API_COUNTRY}/${process.env.WEATHER_DOT_COM_API_TOWN}.json`;

const getApiUrl = type => `${apiPrefix}/${type}/${apiSuffix}`;

export default class WeatherStore
{
  @observable
  astronomyData;

  @observable
  conditionsData;

  @observable
  hourlyForecastData;

  @observable
  tenDayForecastData;

  constructor()
  {
    // Request all data
    this.requestAstronomyData();
    this.requestConditionsData();
    this.requestHourlyForecastData();
    this.requestTenDayForecastData();

    // Begin checking for new data
    this.updateData();
  }

  updateData()
  {
    const time = moment();
    const minute = time.minute();
    const hour = time.hour();

    // Update astronomy and ten day forecast at midnight
    if (hour === 0 && minute === 0)
    {
      this.requestAstronomyData();
      this.requestTenDayForecastData();
    }

    // Update conditions data on the quarter of the hour
    if (minute === 0 || minute === 15 || minute === 30 || minute === 45)
    {
      this.requestConditionsData();
    }

    // Update hourly forecast data on the hour
    if (minute === 0)
    {
      this.requestHourlyForecastData();
    }

    setTimeout(this.updateData.bind(this), 60000);
  }

  @action
  async requestAstronomyData()
  {
    const result = await axios(getApiUrl('astronomy'));

    if (result.status === 200)
    {
      this.astronomyData = result.data;
    }
  }

  @action
  async requestConditionsData()
  {
    const result = await axios(getApiUrl('conditions'));

    if (result.status === 200)
    {
      this.conditionsData = result.data;
    }
  }

  @action
  async requestHourlyForecastData()
  {
    const result = await axios(getApiUrl('hourly'));

    if (result.status === 200)
    {
      this.hourlyForecastData = result.data;
    }
  }

  @action
  async requestTenDayForecastData()
  {
    const result = await axios(getApiUrl('forecast10day'));

    if (result.status === 200)
    {
      this.tenDayForecastData = result.data;
    }
  }
}
