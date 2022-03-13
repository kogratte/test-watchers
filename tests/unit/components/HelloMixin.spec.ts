import { createLocalVue, shallowMount } from '@vue/test-utils'
import HelloMixin from '@/components/HelloMixin.vue'
import * as Vuex from 'vuex'
import getModuleName from '@/store/utils/module-name-getter'
import StarsModule from '@/store/modules/stars.module'

describe('HelloMixin.vue', () => {
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

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should display stars count, with a default value 0', () => {
    const wrapper = shallowMount(HelloMixin, {
      localVue,
      store
    })

    expect(wrapper.get('[data-testid="stars-count"]').text()).toBe('0 stars')
  })

  test('should not update stars count just updating the mocked getter', async () => {
    const wrapper = shallowMount(HelloMixin, {
      localVue,
      store
    })

    fakeStarsModule.getters.starsCount.mockReturnValue(1)

    await wrapper.vm.$nextTick()

    expect(wrapper.get('[data-testid="stars-count"]').text()).not.toBe('1 stars')
  })

  test('should keep stars count updated using hotUpdate techniques.', async () => {
    const wrapper = shallowMount(HelloMixin, {
      localVue,
      store
    })

    fakeStarsModule.getters.starsCount.mockReturnValue(1)

    rebuildStore()

    await wrapper.vm.$nextTick()

    expect(wrapper.get('[data-testid="stars-count"]').text()).toBe('1 stars')
  })

  describe('Watchers', () => {
    test('Console.log should be invoked on component creation', () => {
      globalThis.console.log = jest.fn()

      expect(console.log).not.toHaveBeenCalled()

      shallowMount(HelloMixin, {
        localVue,
        store
      })

      /**
       * @Vue team, something is strange here.
       * First call is made with undefined, despite the provided value. Why?
       * Are watchers evaluated BEFORE getters the first time?
       */
      expect(console.log).toHaveBeenCalledWith('Stars count has been updated: undefined')
    })

    test('Console.log should be invoked when store value is updated', async () => {
      const fakeFn = jest.fn()
      globalThis.console.log = fakeFn

      expect(console.log).not.toHaveBeenCalled()

      const wrapper = shallowMount(HelloMixin, {
        localVue,
        store
      })

      fakeFn.mockReset()

      fakeStarsModule.getters.starsCount.mockReturnValue(1)

      rebuildStore()

      await wrapper.vm.$nextTick()

      expect(console.log).toHaveBeenCalledWith('Stars count has been updated: 1')
    })
  })
})
