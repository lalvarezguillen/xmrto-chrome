export const STATUS: { [key: string]: string } = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  APIERROR: "APIERROR",
  NOT_FOUND: "NOT_FOUND",
  RATELIMIT: "RATELIMIT",
  IPBLOCKED: "IPBLOCKED",
  FLAGGED_DESTINATION_ADDRESS: "FLAGGED_DESTINATION_ADDRESS",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  REJECTED: "REJECTED",
};

export const ERROR_CODES: { [key: string]: string } = {
  INTERNAL_SERVICES_ERROR: "XMRTO-ERROR-001",
  WRONGADDRESS: "XMRTO-ERROR-002",
  RATELIMIT: "XMRTO-ERROR-012",
  IPBLOCKED: "XMRTO-ERROR-014",
  INSUFFICIENT_FUNDS: "XMRTO-ERROR-008",
  LI_ALREADY_KNOWN: "XMRTO-ERROR-019",
  LI_INVOICE_EXPIRED: "XMRTO-ERROR-020",
};

export const ERRORS: { [key: string]: string } = {
  "XMRTO-ERROR-002":
    "Could not create your order. Check your input values! Is this a valid bitcoin address?",
  "XMRTO-ERROR-012": "Sorry, the API is rate limited. Try again in a minute.",
  "XMRTO-ERROR-014":
    "XMR.to is currently not available in your region. Apologies.",
  apiError:
    "Sorry about that. We will accept new orders once we are available again, come back soon!",
  defaultError: "Unknown Error. Please contact customer support.",
};

export const ORDER_STATE: { [key: string]: string } = {
  TO_BE_CREATED: "TO_BE_CREATED",
  UNPAID: "UNPAID",
  UNDERPAID: "UNDERPAID",
  PAID_UNCONFIRMED: "PAID_UNCONFIRMED",
  PAID: "PAID",
  BTC_SENT: "BTC_SENT",
  TIMED_OUT: "TIMED_OUT",
};

export const IFRAME_HEIGHT: { [key: string]: number } = {
  [ORDER_STATE.TO_BE_CREATED]: 380,
  [ORDER_STATE.UNPAID]: 380,
  [ORDER_STATE.UNDERPAID]: 500,
  [ORDER_STATE.PAID_UNCONFIRMED]: 380,
  [ORDER_STATE.PAID]: 380,
  [ORDER_STATE.BTC_SENT]: 350,
  [ORDER_STATE.TIMED_OUT]: 440,
};
