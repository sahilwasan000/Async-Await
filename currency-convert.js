//fixer.io -> Api that lets you get a real time currency exchange values.
// http://restcountries.eu -> Api that lets you know where a particular currency is valid.

const axios = require('axios');

// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=32b4d5d86a599a032368ed7d1aa727e6&format=1').then((response) => {
//       const euro = 1/response.data.rates[from];
//       const rate = euro * response.data.rates[to];
//       return rate;
//     });
// };

// getExchangeRate('USD','CAD').then((rate) => {
//   console.log(rate);
// });

const getExchangeRate = async (from, to) => {

      try{
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=32b4d5d86a599a032368ed7d1aa727e6&format=1');
        const euro = 1/response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if(isNaN(rate)){
            throw new Error();
        }

        return rate;
      }
      catch (E) {
        throw new Error(`Unable to exchange between ${from} and ${to}.`);
      }
};


// const getCountries = (currency) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`).then((response) => {
//     return response.data.map((country) => country.name);
//   })
// };

// getCountries('INR').then((countries) => {
//   console.log(countries);
// });

const getCountries = async (currency) => {

  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to fetch countries.`);
  }

};

// const convertCurrency = (from, to, amt) => {
//     let convertedAmount;
//     return getExchangeRate(from,to).then((rate) => {
//       convertedAmount = (rate * amt).toFixed(2);
//     return getCountries(to);
//   }).then((countries) => {
//     return `${amt} ${from} is worth ${convertedAmount} ${to}. You may use them in following countries : ${countries.join(', ')}`;
//   })
// };

const convertCurrency = async (from, to, amt) => {
  const rate = await getExchangeRate(from, to);
  const countries =   await getCountries(to);
  convertedAmount = (rate * amt).toFixed(2);
  return `${amt} ${from} is worth ${convertedAmount} ${to}. You may use them in following countries : ${countries.join(', ')}`;
};


convertCurrency('INR', 'INR', 69).then((msg) => {
  console.log(msg);
}).catch((e) => {
  console.log(e.msg);
});
