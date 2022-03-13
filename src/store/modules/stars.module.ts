import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  namespaced: true,
  name: 'starsModule'
})
export default class StarsModule extends VuexModule {
    public _starsCount = 0;

    public get starsCount () {
      return this._starsCount
    }
}
