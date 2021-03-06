import React from "react";
import { Button } from "squirrel-ui-components";
import { STATUS, ERRORS, ERROR_CODES } from "../../constants";
import { useMst } from "../../store";
import { applyProxyConsent } from "../../services";
import ApiErrIcon from "./images/maintenance.svg";
import ipBlockedIcon from "./images/ipBlocked.svg";
import "./styles.scss";

const AppOffline: React.FC = () => (
  <div className="app-status">
    <div className="item">
      <div className="item__image">
        <svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1">
          <title>DEF87E49-D252-48D9-8158-877AC3C3EA13</title>
          <desc>Created with sketchtool.</desc>
          <g
            id="XMR.to"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="xmr.to-site-down-warning-1"
              transform="translate(-451.000000, -518.000000)"
              fill="#FD681E"
              fillRule="nonzero"
            >
              <g
                id="Create-and-Track"
                transform="translate(347.000000, 384.000000)"
              >
                <path
                  d="M150.734194,154.16929 L148.088,151.523097 C147.567742,151.002839 146.931355,150.650581 146.244645,150.450065 C143.96929,140.895742 135.289032,134 125.419613,134 C113.608516,134 104,143.608516 104,155.419613 C104,165.460903 110.918194,174.049032 120.592516,176.271742 C120.79071,176.935226 121.132129,177.565419 121.655484,178.088774 L124.300903,180.734194 C125.074323,181.507613 126.102452,181.956645 127.196387,181.997677 C127.249806,181.999226 127.301677,182 127.353548,182 C128.497032,182 129.604903,181.543226 130.41471,180.733419 L135.250323,175.897806 C136.825806,174.322323 136.908645,171.83329 135.537548,170.137806 L140.210581,165.465548 C140.985548,166.064774 141.908387,166.382968 142.842065,166.382968 C143.949161,166.382968 145.056258,165.961806 145.898581,165.11871 L150.734968,160.283097 C151.550194,159.466323 152,158.380129 152,157.225806 C152,156.07071 151.550194,154.98529 150.734194,154.16929 Z M140.939871,143.061935 C142.622194,145.159226 143.887226,147.607226 144.604903,150.299097 C143.613161,150.396645 142.689548,150.80929 141.975742,151.523097 L138.83871,154.660129 L138.83871,154.645419 L136.502194,154.645419 C136.439484,151.502194 136.009032,148.782452 135.35329,146.452903 C137.178839,145.705032 138.923871,144.611871 140.939871,143.061935 Z M136.465806,157.26529 C136.482839,156.91071 136.495226,156.553032 136.502968,156.193032 L137.305032,156.193032 L137.139355,156.35871 C136.864516,156.633548 136.650839,156.943226 136.465806,157.26529 Z M136.501419,161.631742 L135.845677,162.287484 C135.946323,161.794323 136.037677,161.294968 136.115871,160.787097 C136.213419,161.079742 136.339613,161.362323 136.501419,161.631742 Z M139.924903,141.889806 C138.096258,143.290323 136.521548,144.282839 134.885677,144.968774 C133.332645,140.466839 130.979871,137.586065 129.212387,135.930839 C133.355097,136.747613 137.094452,138.872 139.924903,141.889806 Z M134.941419,156.193806 C134.87871,159.148129 134.468387,161.915871 133.70271,164.430452 L133.296258,164.836903 C131.408774,164.336 129.223226,164.101419 126.193806,164.076645 L126.193806,156.193806 L127.225806,156.193806 L127.225806,154.645419 L126.193806,154.645419 L126.193806,147.909161 C129.337032,147.882839 131.725419,147.627355 133.873032,146.977032 C134.486194,149.159484 134.891871,151.705806 134.953806,154.645419 L128.774194,154.645419 L128.774194,156.193806 L134.941419,156.193806 Z M132.008,166.125161 L131.679742,166.453419 C130.002839,165.494968 127.882323,165.747355 126.491871,167.138581 L126.193806,167.436645 L126.193806,165.627355 C128.613161,165.657548 130.448,165.806194 132.008,166.125161 Z M126.193032,135.582452 C126.226323,135.584 126.260387,135.585548 126.293677,135.587097 C127.254452,136.213419 131.178839,139.094968 133.405419,145.500645 C131.406452,146.104516 129.173677,146.336 126.193032,146.360774 L126.193032,135.582452 Z M115.885419,154.645419 C115.950452,151.598194 116.389419,148.976 117.045161,146.738581 C119.139355,147.371097 121.681032,147.827097 124.645419,147.893677 L124.645419,154.645419 L115.885419,154.645419 Z M124.645419,156.193806 L124.645419,164.092129 C121.823484,164.155613 119.392516,164.575226 117.35871,165.162839 C116.527226,162.700129 115.962065,159.731871 115.888516,156.193806 L124.645419,156.193806 Z M124.573419,135.570065 C124.597419,135.56929 124.621419,135.56929 124.644645,135.568516 L124.644645,146.34529 C121.873806,146.27871 119.492387,145.843613 117.529032,145.248258 C119.795871,138.972645 123.679226,136.152258 124.573419,135.570065 Z M121.647742,135.912258 C119.908903,137.535742 117.59329,140.348387 116.034065,144.734194 C113.318968,143.706839 111.594839,142.479742 110.874839,141.899097 C113.689806,138.873548 117.433032,136.725161 121.647742,135.912258 Z M109.862194,143.078194 C110.675871,143.750194 112.563355,145.115871 115.551742,146.23071 C114.861161,148.609806 114.40129,151.399226 114.337032,154.645419 L105.567742,154.645419 C105.735742,150.284387 107.315871,146.281806 109.862194,143.078194 Z M105.582452,156.193806 L114.340129,156.193806 C114.414452,159.906065 115.008258,163.029935 115.883871,165.633548 C113.277161,166.563355 111.464,167.701419 110.428129,168.467097 C107.534968,165.138839 105.762065,160.853677 105.582452,156.193806 Z M120.427613,174.649806 C116.976258,173.761032 113.92671,171.992774 111.498839,169.609806 C112.460387,168.923097 114.100903,167.925935 116.420387,167.097548 C117.616516,170.051097 119.156387,172.242065 120.584774,173.817548 C120.505032,174.090839 120.452387,174.368 120.427613,174.649806 Z M121.350452,172.348129 C120.152774,170.942968 118.906323,169.066323 117.903742,166.628387 C119.791226,166.090323 122.040258,165.703226 124.644645,165.640516 L124.644645,168.985032 L121.655484,171.974968 C121.539355,172.091097 121.450323,172.22271 121.350452,172.348129 Z M134.155613,174.803097 L129.32,179.63871 C128.768774,180.189935 128.030968,180.469419 127.255226,180.450065 C126.553806,180.423742 125.893419,180.135742 125.397161,179.63871 L122.751742,176.99329 C121.670194,175.911742 121.670194,174.151226 122.751742,173.069677 L127.587355,168.234065 C128.37471,167.44671 129.525935,167.229935 130.525419,167.608516 L128.84929,169.284645 L128.846968,169.283871 C128.846194,169.285419 128.845419,169.287742 128.844645,169.290065 L126.387355,171.747355 C125.482323,172.653161 125.482323,174.126452 126.388129,175.033032 L126.874323,175.518452 C127.31329,175.956645 127.896258,176.198968 128.517161,176.198968 C129.138065,176.198968 129.721032,175.957419 130.159226,175.518452 L134.444387,171.23329 C135.217806,172.315613 135.127226,173.83071 134.155613,174.803097 Z M129.389677,172.48129 C129.697806,172.790194 130.031484,172.993032 130.365161,173.12 L129.062194,174.422968 C128.770323,174.716387 128.260903,174.717161 127.967484,174.422194 L127.48129,173.936774 C127.179355,173.634839 127.179355,173.143226 127.48129,172.84129 L128.773419,171.549161 C128.900387,171.868903 129.09471,172.186323 129.389677,172.48129 Z M131.819871,171.66529 C131.576774,171.747355 130.977548,171.878194 130.484387,171.386581 C130.048516,170.949935 130.10271,170.427355 130.177806,170.144 L140.527226,159.795355 C140.810581,159.720258 141.333161,159.666839 141.769032,160.101935 C142.263742,160.597419 142.128258,161.20129 142.047742,161.437419 L131.819871,171.66529 Z M141.931613,158.390968 L143.356903,156.965677 C143.507871,156.81471 143.706065,156.739613 143.904258,156.739613 C144.102452,156.739613 144.300645,156.815484 144.451613,156.965677 L144.938581,157.452645 C145.240516,157.754581 145.240516,158.245419 144.938581,158.547355 L143.496258,159.989677 C143.370065,159.652903 143.174194,159.317677 142.863742,159.007226 C142.568774,158.712258 142.251355,158.517935 141.931613,158.390968 Z M149.639484,159.187613 L144.803871,164.023226 C143.853935,164.972387 142.382194,165.086194 141.30529,164.370065 L146.03329,159.642065 C146.939097,158.737032 146.939097,157.262968 146.03329,156.357935 L145.546323,155.870968 C144.640516,154.965161 143.167226,154.965161 142.262194,155.870968 L139.67329,158.459871 C139.670968,158.460645 139.667871,158.462194 139.665548,158.462968 L139.667097,158.466065 L137.642581,160.490581 C137.219871,159.481806 137.414968,158.27329 138.234839,157.453419 L143.070452,152.617806 C144.11871,151.569548 145.945806,151.569548 146.99329,152.617806 L149.639484,155.264 C150.162839,155.788129 150.451613,156.484129 150.451613,157.225806 C150.451613,157.96671 150.162839,158.663484 149.639484,159.187613 Z M147.531496,175.015688 L150.192887,177.677079 C150.583411,178.067603 150.583411,178.700768 150.192887,179.091293 L149.961288,179.322892 C149.570763,179.713416 148.937598,179.713416 148.547074,179.322892 L145.885683,176.661501 L143.238602,179.308581 C142.848078,179.699105 142.214913,179.699105 141.824389,179.308581 L141.607101,179.091293 C141.216576,178.700768 141.216576,178.067603 141.607101,177.677079 L144.254181,175.029999 L141.633798,172.409616 C141.243274,172.019092 141.243274,171.385927 141.633798,170.995403 L141.865398,170.763803 C142.255922,170.373279 142.889087,170.373279 143.279611,170.763803 L145.899994,173.384186 L148.547074,170.737106 C148.937598,170.346581 149.570763,170.346581 149.961288,170.737106 L150.178576,170.954394 C150.5691,171.344918 150.5691,171.978083 150.178576,172.368607 L147.531496,175.015688 Z"
                  id="Icons/48px_disconnected"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div className="item__content">
        <h4 className="item__header">
          <span className="text-bold h4">Failed to contact XMR.to</span>
        </h4>
        <div className="item__description">
          Please check your connection and make sure that you can access the
          internet.
        </div>
      </div>
    </div>
  </div>
);

const AppError: React.FC<{ message: string }> = ({ message }) => (
  <div className="app-status">
    <div className="item">
      <div className="item__image">
        <img src={ApiErrIcon} alt="Api error" />
      </div>
      <div className="item__content">
        <h4 className="item__header">
          <span className="text-bold h4">
            XMR.to is currently not available
          </span>
        </h4>
        <div className="item__description">{message}</div>
      </div>
    </div>
  </div>
);

const AppBlocked: React.FC<{ message: string }> = ({ message }) => (
  <div className="app-status">
    <div className="item">
      <div className="item__image">
        <img width="48" height="48" src={ipBlockedIcon} alt="ip is blocked" />
      </div>
      <div className="item__content">
        <div className="item__header">
          <h4 className="text-bold h4">No XMR.to for you</h4>
        </div>
        <div className="item__description">{message}</div>
      </div>
    </div>
  </div>
);

const FlaggedAddress: React.FC = () => {
  return (
    <section className="order-step">
      <header className="order-step__header">
        <h2 className="normal">Not compliant address</h2>
      </header>
      <div className="order-step__content">
        <p>
          Sorry, the Bitcoin destination address that you want to use has been
          flagged as not compliant.
        </p>
      </div>
    </section>
  );
};

const RejectedOrder: React.FC = () => {
  const {
    orderStore: { setData },
  } = useMst();
  return (
    <section className="order-step">
      <header className="order-step__header">
        <h2 className="normal">Order rejected</h2>
      </header>
      <div className="order-step__content">
        <p>
          We apologise, this order was rejected. Possible reasons range from
          order limitations to internal processing problems. Please try again.
        </p>
        <Button
          onClick={(): void => {
            setData({});
          }}
          large
          primary
        >
          Create a new order
        </Button>
      </div>
    </section>
  );
};

const PaymentFailed: React.FC = () => (
  <section className="order-step">
    <header className="order-step__header">
      <h2 className="normal">Payment failed</h2>
    </header>
    <div className="order-step__content">
      <div>
        We apologise, a failure occurred while processing your order. The
        Lighting Network is a beta feature and we are working on improvements.
        Don&apos;t panic! We&apos;ve served the community for years and nobody
        has ever lost funds. The friendly people at{" "}
        <a className="link" href="mailto:support@xmr.to">
          support@xmr.to
        </a>{" "}
        can help you get your funds back.
        <p>Please include these details in your support request:</p>
        <ol>
          <li>your order&apos;s secret key and your transaction ID;</li>
          <li>
            if you don&apos;t have those, any other information that could help
            us identify your payment (destination address that XMR.to gave you,
            time, amount, etc);
          </li>
          <li>
            your Monero address ??? for reimbursement. Due to Monero
            characteristics we do not know your address unless you tell us!
          </li>
        </ol>
      </div>
    </div>
  </section>
);

const VPNDetected: React.FC = () => {
  const {
    paramsStore: { setStatus },
  } = useMst();
  return (
    <section className="order-step">
      <header className="order-step__header">
        <h2 className="text-center">VPN detected</h2>
      </header>
      <div className="order-step__content">
        <div style={{ fontSize: "12px" }}>
          <p>
            We have detected that you <i> might </i> have accessed XMR.to using
            a VPN. We have discussed our policy on VPNs in our{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://test.xmr.to/blog/blogging-and-logging"
            >
              blog.{" "}
            </a>
            Please be aware that we actively log site activity and will
            cooperate with law enforcement as long as correct legal procedures
            are followed. Please confirm by clicking below that you are fully
            aware of all laws and regulations applicable to use of this service
            in your jurisdiction.
          </p>
          <p>
            I confirm that I am a legal adult in my jurisdiction, that I have
            read and understood this message, and that I have read and will
            abide by the{" "}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://xmr.to/terms-of-service"
            >
              terms of service
            </a>
          </p>
          <Button
            onClick={(): void => {
              applyProxyConsent(setStatus);
            }}
            primary
            large
            type="button"
          >
            Confirm and continue
          </Button>
        </div>
      </div>
    </section>
  );
};

interface IAppStatus {
  status:
    | typeof STATUS.ONLINE
    | typeof STATUS.OFFLINE
    | typeof STATUS.APIERROR
    | typeof STATUS.IPBLOCKED;
  orderState: string;
  children: React.ReactElement;
}
const AppStatus: React.FC<IAppStatus> = ({ children, status, orderState }) => {
  switch (status) {
    case STATUS.VPN:
      return <VPNDetected />;
    case STATUS.OFFLINE:
      return <AppOffline />;
    case STATUS.APIERROR:
      return <AppError message={ERRORS.apiError} />;
    case STATUS.IPBLOCKED:
      return <AppBlocked message={ERRORS[ERROR_CODES.IPBLOCKED]} />;
    case STATUS.RATELIMIT:
      return <AppError message={ERRORS[ERROR_CODES.RATELIMIT]} />;
    default:
      if (orderState === STATUS.FLAGGED_DESTINATION_ADDRESS) {
        return <FlaggedAddress />;
      }
      if (orderState === STATUS.REJECTED) {
        return <RejectedOrder />;
      }
      if (orderState === STATUS.PAYMENT_FAILED) {
        return <PaymentFailed />;
      }
      return children;
  }
};

export default AppStatus;
