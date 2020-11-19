import React from "react";
import classNames from "classnames";
import "./styles.scss";

interface ISegment {
  positive?: boolean;
}

const Segment: React.FC<ISegment> = ({ children, positive }) => (
  <div className={classNames("segment", { "segment--positive": positive })}>
    {children}
  </div>
);

Segment.defaultProps = {
  positive: false,
};

export default Segment;
