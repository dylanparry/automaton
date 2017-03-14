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

  database;

  constructor(database)
  {
    this.database = database;

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

  updateDatabase(type, data)
  {
    // Store the data in the database
    const transaction = this.database.transaction(['weather'], 'readwrite');
    const objectStore = transaction.objectStore('weather');
    objectStore.put({
      type,
      data,
      date: new Date(),
    });
  }

  @action
  requestAstronomyData()
  {
    const transaction = this.database.transaction(['weather']);
    const objectStore = transaction.objectStore('weather');
    const request = objectStore.get('astronomy');

    request.onsuccess = async () =>
    {
      const sameDay = moment().isSame(request.result.date, 'day');

      // Check if there was any data from today
      if (request.result && sameDay)
      {
        // Use the existing data
        this.astronomyData = request.result.data;
      }
      else
      {
        // Data didn't exist or was too old, so get new data
        const result = await axios(getApiUrl('astronomy'));

        if (result.status === 200)
        {
          this.astronomyData = result.data;

          this.updateDatabase('astronomy', result.data);
        }
      }
    };
  }

  @action
  async requestConditionsData()
  {
    const transaction = this.database.transaction(['weather']);
    const objectStore = transaction.objectStore('weather');
    const request = objectStore.get('conditions');

    request.onsuccess = async () =>
    {
      const ageOfData = moment().diff(request.result.date, 'minutes');

      // Check if there was any data from last fifteen minutes
      if (request.result && ageOfData < 15)
      {
        // Use the existing data
        this.conditionsData = request.result.data;
      }
      else
      {
        // Data didn't exist or was too old, so get new data
        const result = await axios(getApiUrl('conditions'));

        if (result.status === 200)
        {
          this.conditionsData = result.data;

          this.updateDatabase('conditions', result.data);
        }
      }
    };
  }

  @action
  async requestHourlyForecastData()
  {
    const transaction = this.database.transaction(['weather']);
    const objectStore = transaction.objectStore('weather');
    const request = objectStore.get('hourly');

    request.onsuccess = async () =>
    {
      const ageOfData = moment().diff(request.result.date, 'minutes');

      // Check if there was any data from last hour
      if (request.result && ageOfData < 60)
      {
        // Use the existing data
        this.hourlyForecastData = request.result.data;
      }
      else
      {
        // Data didn't exist or was too old, so get new data
        const result = await axios(getApiUrl('hourly'));

        if (result.status === 200)
        {
          this.hourlyForecastData = result.data;

          this.updateDatabase('hourly', result.data);
        }
      }
    };
  }

  @action
  async requestTenDayForecastData()
  {
    const transaction = this.database.transaction(['weather']);
    const objectStore = transaction.objectStore('weather');
    const request = objectStore.get('forecast10day');

    request.onsuccess = async () =>
    {
      const sameDay = moment().isSame(request.result.date, 'day');

      // Check if there was any data from today
      if (request.result && sameDay)
      {
        // Use the existing data
        this.tenDayForecastData = request.result.data;
      }
      else
      {
        // Data didn't exist or was too old, so get new data
        const result = await axios(getApiUrl('forecast10day'));

        if (result.status === 200)
        {
          this.tenDayForecastData = result.data;

          this.updateDatabase('forecast10day', result.data);
        }
      }
    };
  }
}
