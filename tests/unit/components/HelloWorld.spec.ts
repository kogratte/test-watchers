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

  function buildStore () {
    return {
      modules: {
        [getModuleName(StarsModule)]: fakeStarsModule
      }
    }
  }

  function rebuildStore () {
    store.hotUpdate(buildStore())
  }

  beforeEach(() => {
    store = new Vuex.Store(buildStore())
  })

  test('should display stars count, with a default value 0', () => {
    const wrapper = shallowMount(HelloWorld, {
      localVue,
      store
    })

    expect(wrapper.get('[data-testid="stars-count"]').text()).toBe('0 stars')
  })

  test('should not update stars count just updating the mocked getter', async () => {
    const wrapper = shallowMount(HelloWorld, {
      localVue,
      store
    })

    fakeStarsModule.getters.starsCount.mockReturnValue(1)

    await wrapper.vm.$nextTick()

    expect(wrapper.get('[data-testid="stars-count"]').text()).not.toBe('1 stars')
  })

  test('should keep stars count updated using hotUpdate techniques.', () => {
    const wrapper = shallowMount(HelloWorld, {
      localVue,
      store
    })

    fakeStarsModule.getters.starsCount.mockReturnValue(1)

    rebuildStore()

    expect(wrapper.get('[data-testid="stars-count"]').text()).toBe('1 stars')
  })
})
