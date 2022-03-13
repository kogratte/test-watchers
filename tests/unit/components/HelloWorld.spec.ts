import { createLocalVue, shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import * as Vuex from 'vuex'
import getModuleName from '@/store/utils/module-name-getter'
import StarsModule from '@/store/modules/stars.module'

describe('HelloWorld.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store: Vuex.Store<any>

  const fakeStarsModule = {
    getters: {
      starsCount: jest.fn().mockReturnValue(0)
    },
    namespaced: true
  }

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        [getModuleName(StarsModule)]: fakeStarsModule
      }
    })
  })

  test('should display stars count, with a default value 0', () => {
    const wrapper = shallowMount(HelloWorld, {
      localVue,
      store
    })

    expect(wrapper.get('[data-testid="stars-count"]').text()).toBe('0 stars')
  })

  test('should keep stars count updated', async () => {
    const wrapper = shallowMount(HelloWorld, {
      localVue,
      store
    })

    fakeStarsModule.getters.starsCount.mockReturnValue(1)

    store.hotUpdate({
      modules: {
        [getModuleName(StarsModule)]: fakeStarsModule
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.get('[data-testid="stars-count"]').text()).toBe('1 stars')
  })
})
