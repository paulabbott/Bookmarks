import { isUrlReachableFromBE } from './isUrlReachableFromBE'

type ValidationRuleResultType = {
  rule: string;
  passed: any;
  errorMessage: string;
}

export const ValidateUrlFormatPromise = (input: string): Promise<ValidationRuleResultType> => {
  const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(input);
  const returnObj: ValidationRuleResultType = { rule: "format", passed: valid, errorMessage: valid ? '' : 'badly formatted url' }
  //TODO: don't use reject/catch for validation failures?
  return new Promise((resolve, reject) => {
    // valid ? resolve(returnObj) : reject(returnObj)
    //TODO: try only returning resolve.
    resolve(returnObj)
  })
}

export const checkUrlExists = async (input: string): Promise<ValidationRuleResultType> => {
  const result = await isUrlReachableFromBE(input)
  const returnObj: ValidationRuleResultType = { rule: "livecheck", passed: result.ok, errorMessage: result.ok ? '' : 'url is unreachable' }
  return new Promise((resolve, reject) => {
    // result.ok ? resolve(returnObj) : reject(returnObj)
    //TODO: try only returning resolve.
    resolve(returnObj)
  })
}
