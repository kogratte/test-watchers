export default function getModuleName (module: any): string {
  if (!module._vmdModuleName) {
    throw new Error(`ERR_GET_MODULE_NAME : Could not get module accessor.
        Make sure your module has name, we can't make accessors for unnamed modules
        i.e. @Module({ name: 'something' })`)
  }
  return module._vmdModuleName
}
