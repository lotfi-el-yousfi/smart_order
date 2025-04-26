// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, expect, it } from 'vitest'
import { useOrderStore } from '@/domain/order/store/store'

describe('Order Store', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('increments', () => {
    const store = useOrderStore()
    expect(store.orders).toStrictEqual([])

  })


})