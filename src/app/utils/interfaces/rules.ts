
export interface Rules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  sameAs?: string;
}
