import { Component, Vue } from 'vue-property-decorator'
import { StoreModule } from '@/decorators/storeModule'
import StarsModule from '@/store/modules/stars.module'

@Component
export default class AnotherWatcher extends Vue {
    @StoreModule(StarsModule)
    public readonly starsModule!: StarsModule;

    private onLoadingStatusUpdate (val: boolean) {
      if (val) {
        console.log('Stars count is loading')
      }
    }

    created (): void {
      this.$watch(() => this.starsModule.isLoading,
        this.onLoadingStatusUpdate,
        {
          immediate: true
        })
    }
}
