import { useState, useCallback } from "react";
import PropTypes from "prop-types";

// Custom Components
import http from "helpers/http/http.helper";
import debounce from "helpers/debounce/debounce.helper";

const useHttp = (defaultUrl) => {
  const DELAY = 300;
  const [url, setUrl] = useState(defaultUrl);
  const [status, setStatus] = useState(0);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  const get = useCallback(
    debounce((params = {}) => {
      onGet(params);
    }, DELAY),
    []
  );

  async function onGet(params = {}) {
    try {
      setIsLoading(true);
      setResponse(null);
      setStatus(0);
      setHasError(false);
      setError(null);
      const response = await http().get(url, {
        params,
      });
      setStatus(response?.data?.status);
      setResponse(response?.data);
    } catch (error) {
      setHasError(true);
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  }

  async function post({ headers = {}, postData = {} } = {}) {
    try {
      setIsLoading(true);
      setResponse(null);
      setStatus(0);
      setHasError(false);
      setError(null);
      const response = await http({ headers }).post(url, postData);
      setStatus(response?.data?.status);
      setResponse(response?.data);
    } catch (error) {
      setHasError(true);
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    get,
    post,
    setUrl,
    status,
    response,
    isLoading,
    hasError,
    error,
    setError,
  };
};

useHttp.propTypes = {
  defaultUrl: PropTypes.string.isRequired,
};

export default useHttp;
