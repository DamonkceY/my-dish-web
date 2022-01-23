import { Rules } from '../../app/utils/interfaces/rules'

export const Validator = (value: string | number, rules?: Rules) => {
  let validatorResult = []
  if (rules) {
    if (!!rules.required) validatorResult.push({ valid: value !== '' && !!value, name: 'required' })
    if (!!rules.pattern) validatorResult.push({ valid: rules.pattern.test(value.toString()), name: 'pattern' })
    if (!!rules.sameAs) validatorResult.push({ valid: rules.sameAs === value, name: 'sameAs' })
    if (!!rules.minLength) validatorResult.push({
      valid: value.toString().length >= rules.minLength,
      name: 'minLength',
    })
    if (!!rules.maxLength) validatorResult.push({
      valid: value.toString().length <= rules.maxLength,
      name: 'maxLength',
    })
    return validatorResult.filter((item) => !item.valid)
  }
  return []
}
