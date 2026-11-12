export const CONTROL_STATES = ["disabled", "error"] as const;

export type ControlState = (typeof CONTROL_STATES)[number];

export interface ControlProps {
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  state?: ControlState;
}
