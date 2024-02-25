export function exclude <O, K extends keyof O = keyof O> (object: O | undefined, keys: K[]): Omit<O, K> | undefined {
  return (object && Object.fromEntries(
    Object.entries(object).filter(
      ([key]) => !keys.includes(key as K)
    )
  )) as Omit<O, K> | undefined
}
