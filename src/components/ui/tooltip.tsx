"use client";

import * as React from "react";

export interface TooltipProps {
  children: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
}

export const Tooltip = React.forwardRef<HTMLSpanElement, TooltipProps>(
  function Tooltip(props, ref) {
    return <span ref={ref}>{props.children}</span>;
  },
);
