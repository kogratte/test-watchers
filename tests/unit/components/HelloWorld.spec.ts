import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  test('should display stars count, with a default value 0', () => {
    const wrapper = shallowMount(HelloWorld)

    expect(wrapper.get('[data-testid="stars-count"]').text()).toBe('0 stars')
  })
})
