<template>
  <div class="hello">
    <span data-testid="stars-count">{{ starsCount }} stars</span>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import StarsCountWatcher from '@/mixins/StarsWatch.mixin'
import AnotherWatcher from '@/mixins/AnotherWatch.mixin'

@Component
export default class HelloMultipleMixins extends Mixins(StarsCountWatcher, AnotherWatcher) {
  public get starsCount () {
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
