type InputType = "text" | "checkbox" | "radio" | "number" | "password";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: InputType;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
}
