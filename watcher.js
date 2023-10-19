export default class ComponentWatcher {
  constructor(opts) {
    this.component = opts.component
    this.states = opts.states
    this.data = {...this.component.state}
    this.tasks = []
    // this.setData()
  }

  setData() {
    this.states.forEach(stateKey => {
      this.data[stateKey] = this.component.state[stateKey]
    });
  }
  
  addWatchEffect(handler) {
    this.tasks.push(handler)
    this.updateWatch()
  }

  updateWatch() {
      Object.defineProperty(this.component, 'state', {
        get: () => {
          console.log('是从watcher类get的+++++++', this.data)
          return this.data
        },
        set: val => {
          this.states.forEach(stateKey => {
            const newVal = val[stateKey]
            const oldVal = this.data[stateKey]
            if(oldVal !== newVal) {
              this.tasks.forEach(task => {
                task(newVal, oldVal)
              })
            }
          })
          console.log('在watch类进行了set--------', val)
          this.data = {...val}
        }
      })
  }
}