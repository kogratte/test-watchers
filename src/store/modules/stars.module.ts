import { Module, VuexModule } from 'vuex-module-decorators'

@Module({
  namespaced: true,
  name: 'starsModule'
})
export default class StarsModule extends VuexModule {
    public _starsCount = 0;

    public _loading = false;

    public get starsCount (): number {
      return this._starsCount
    }

    public get isLoading (): boolean {
      return this._loading
    }

    public set isLoading (val: boolean) {
      this._loading = val
    }
}
