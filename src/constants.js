export const STATUS = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  APIERROR: 'APIERROR',
  NOT_FOUND: 'NOT_FOUND',
  RATELIMIT: 'RATELIMIT',
  IPBLOCKED: 'IPBLOCKED',
};

export const ERROR_CODES = {
  WRONGADDRESS: 'XMRTO-ERROR-002',
  RATELIMIT: 'XMRTO-ERROR-012',
  IPBLOCKED: 'XMRTO-ERROR-014',
};

export const ERRORS = {
  'XMRTO-ERROR-002': 'Could not create your order. Check your input values! Is this a valid bitcoin address?',
  'XMRTO-ERROR-012': 'Sorry, the API is rate limited. Try again in a minute.',
  'XMRTO-ERROR-014': 'Sorry, XMR.to is not available in your location.',
  apiError: 'Sorry about that. We will accept new orders once we are available again, come back soon!',
  defaultError: 'Unknown Error. Please contact customer support.',
};
