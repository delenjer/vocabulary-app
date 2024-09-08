export interface Field {
  value?: string,
  handleChange: (arg0: string) => void,
  name?: string;
  placeholder?: string;
  wrapperClass?: string,
  error?: boolean,
}
