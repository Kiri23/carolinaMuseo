import React from "react";

export function getSlotContent(children, SlotComponent) {
  const childrenArray = React.Children.toArray(children);
  const slot = childrenArray.find(
    (child) => child.type?.slotName === SlotComponent.slotName
  );
  return slot?.props?.children || null;
}
