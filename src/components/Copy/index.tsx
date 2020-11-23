import React, { useEffect, useState } from "react";
import Clipboard from "clipboard";
import { Icon } from "squirrel-ui-components";
import randHash from "../../helpers/randHash";
import "./styles.scss";

interface ICopyToClipboard {
  text?: string;
  value?: string;
  id?: string;
}
const CopyToClipboard: React.FC<ICopyToClipboard> = ({ text, value, id }) => {
  const [hash] = useState(randHash());
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line
    const copy = new Clipboard(`.copyToClipboard_${hash}`);
  }, [hash]);
  function onClick(): void {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  }
  const copyData = value || text;
  return (
    <div className="copy-content">
      <div className="copy-content__text" id={id}>
        {text}
      </div>
      <button
        onClick={onClick}
        type="button"
        className={`copy-content__button copyToClipboard_${hash} clear-btn c-hand ${
          clicked ? "text-success" : ""
        }`}
        data-clipboard-text={copyData}
      >
        <Icon name={clicked ? "check" : "copy"} />
      </button>
    </div>
  );
};

CopyToClipboard.defaultProps = {
  text: "",
  value: "",
  id: "",
};

export default CopyToClipboard;
