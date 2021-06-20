import axios from "axios";
import PropTypes from "prop-types";

const http = ({ headers = {} } = {}) => {
  const http = axios.create({
    baseURL: "https://findfalcone.herokuapp.com",
    timeout: 3000,
    headers: {
      "Accept-Language": "en",
      "Content-Type": "application/json",
      "x-portal": "web",
      ...headers,
    },
  });

  return http;
};

http.propTypes = {
  headers: PropTypes.object,
};

export default http;
