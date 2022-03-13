<template>
  <div class="hello">
    <span data-testid="stars-count">{{ starsCount }} stars</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StoreModule } from '@/decorators/storeModule'
import StarsModule from '@/store/modules/stars.module'

@Component
export default class HelloWorld extends Vue {
  @StoreModule(StarsModule)
  public readonly starsModule!: StarsModule;

  public get starsCount (): number {
    return this.starsModule.starsCount
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
