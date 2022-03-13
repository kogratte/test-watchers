import { Component, Vue } from 'vue-property-decorator'
import { StoreModule } from '@/decorators/storeModule'
import StarsModule from '@/store/modules/stars.module'

@Component
export default class StarsCountWatcher extends Vue {
    @StoreModule(StarsModule)
    public readonly starsModule!: StarsModule;

    private onCountUpdated (val: number) {
      console.log(`Stars count has been updated: ${val}`)
    }

    created (): void {
      this.$watch(() => this.starsModule.starsCount,
        this.onCountUpdated,
        {
          immediate: true
        })
    }
}
