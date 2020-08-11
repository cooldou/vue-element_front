import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('district', { districtItems: 'flattedItems' })
  },

  methods: {
    getDistrictCode(itemId) {
      if (itemId) {
        const item = this.districtItems.find(item => item.id === itemId)
        return item ? item.value : null
      } else {
        return null
      }
    }
  }
}