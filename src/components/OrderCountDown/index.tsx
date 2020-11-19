import React from "react";
import { observer } from "mobx-react-lite";
import { Icon } from "squirrel-ui-components";
import { useMst } from "../../store";
import secondsToHms from "../../helpers/secondsToHms";

const OrderCountDown: React.FC = () => {
  const {
    orderStore: {
      order: { secondsTillTimeout, state },
    },
  } = useMst();
  return state && state !== "TO_BE_CREATED" ? (
    <p className="t-hint-1">
      <Icon name="clock" />
      &nbsp;Order expires in {secondsToHms(secondsTillTimeout) || 0}
    </p>
  ) : null;
};

export default observer(OrderCountDown);
