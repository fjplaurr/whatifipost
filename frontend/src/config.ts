// Returns the base url for data fetching
const getBaseUrl = () => {
  // if (process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  //   return 'http://localhost:5000/api/';
  // }
  return 'https://backend-post-application.herokuapp.com/api/';
};

const baseUrl = getBaseUrl();

export { baseUrl };
