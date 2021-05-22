import Auth from '@/api/system/Auth'
import Config from '@/api/system/Config'
import Components from '@/api/system/Components'

export default {
  auth: () => new Auth(),
  config: () => new Config(),
  components: () => new Components()
}
