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

const mockData = [
  {
    title: "Mock Crypto Event",
    description: "This is mock event data used when API fails.",
    date: "2024-07-01",
    location: "Online"
  }
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export async function fetchCryptoEvents() {
  // Check sessionStorage first
//   const cached = sessionStorage.getItem("cryptoEvents");
//   if (cached) {
//     console.log("Returning cached data:", JSON.parse(cached));
//     return JSON.parse(cached);
//   }

  try {
	const response = await axios.request(options);
	//console.log(response.data);
    return response.data
} catch (error) {
	console.error(error);
}
}