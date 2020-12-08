import { AxiosError, AxiosResponse } from "axios";
import { STATUS, ERROR_CODES } from "./constants";

export type SetStatusType = (
  newStatus: string,
  errorCode?: number,
  error?: string
) => void;

export const isOffline = (error: AxiosError): string => {
  if (error.code === "ECONNABORTED" || !error.response) {
    return STATUS.OFFLINE;
  }
  return "";
};

export const isIPBlocked = (error: AxiosError): string => {
  const resp = error.response;
  if (
    resp &&
    resp.status === 403 &&
    resp.data.error === ERROR_CODES.IPBLOCKED
  ) {
    return STATUS.IPBLOCKED;
  }
  return "";
};

export const isRateLimit = (error: AxiosError): string => {
  const resp = error.response;
  if (
    resp &&
    resp.status === 403 &&
    resp.data.error === ERROR_CODES.RATELIMIT
  ) {
    return STATUS.RATELIMIT;
  }
  return "";
};

export const isAPIError = (error: AxiosError): string => {
  const resp = error.response;
  if (
    (resp && !resp.data.error) ||
    // in case of "insufficient funds" error we must show API error if there is no tracking order
    (resp && resp.data.error === ERROR_CODES.INSUFFICIENT_FUNDS) ||
    (resp && resp.data.error === ERROR_CODES.INTERNAL_SERVICES_ERROR)
  ) {
    return STATUS.APIERROR;
  }
  return "";
};

export const handleCode400 = (error: AxiosError): string => {
  if (error.response && error.response.status === 400) {
    return STATUS.APIERROR;
  }
  return "";
};

export const successCallback = (setStatus: SetStatusType) => {
  return (response: AxiosResponse): AxiosResponse => {
    // remove notification about connection
    setStatus(STATUS.ONLINE);
    return response;
  };
};

export const errorCallback = (
  callbacks: { (data: AxiosError): string }[],
  setStatus: SetStatusType
) => (error: AxiosError): Promise<AxiosError> => {
  for (let i = 0; i < callbacks.length; i += 1) {
    const newStatus = callbacks[i](error);
    if (newStatus.length > 0) {
      setStatus(newStatus, error.response?.status, error.response?.data.error);
      break;
    }
  }
  return Promise.reject(error);
};
