export const labelClassHandle = (wrapper?:string, error?:boolean) => {
  const isError = `${error ? 'field-wrapper error-label' : 'field-wrapper'}`

  if (!wrapper && !error) {
    return 'field-label';
  }

  return wrapper ? `${isError} ${wrapper}` : `${isError}`;
}
