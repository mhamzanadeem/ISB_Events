import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://crypto-events-calendar.p.rapidapi.com/index',
  params: {
    page: '1',
    pageSize: '10'
  },
  headers: {
    'x-rapidapi-key': '3c4218e182msh140ce6fc170a6c5p131c46jsn944c3513f6ab',
    'x-rapidapi-host': 'crypto-events-calendar.p.rapidapi.com'
  }
};

export async function fetchCryptoEvents() {
  try {
	const response = await axios.request(options);
	//console.log(response.data);
    return response.data
} catch (error) {
	console.error(error);
}
}