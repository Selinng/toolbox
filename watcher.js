export default class ComponentWatcher {
  constructor(opts) {
    this.component = opts.component
    this.states = opts.states
    this.data = {...this.component.state}
    this.tasks = []
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
          this.data = {...val}
        }
      })
  }
}