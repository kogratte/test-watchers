import { createDecorator } from 'vue-class-component'
import { Vue } from 'vue-property-decorator'
import { getModule, VuexModule } from 'vuex-module-decorators'

interface VuexModuleConstructor
{
    new (...args: Array<any>): VuexModule ;
}

const isVuexModule = (object: any): object is VuexModuleConstructor => object?.prototype instanceof VuexModule

export const StoreModule = <Mod extends VuexModuleConstructor>(Module: Mod) =>
    <K extends string, C extends Vue & { [key in K]: InstanceType<Mod> }>(aComponent: C, aPropertyKey: K): void => {
      if (isVuexModule(Module)) {
        const decorate = createDecorator(
          (aComponentOptionsObject, aProperty) => {
            aComponentOptionsObject.computed =
                    {
                      ...aComponentOptionsObject.computed,
                      [aProperty] (this: Vue) {
                        return getModule(Module, this.$store)
                      }
                    }
          }
        )

        decorate(aComponent, aPropertyKey)
      } else {
        throw new Error('The decorated property type does not extend VuexModule.')
      }
    }
