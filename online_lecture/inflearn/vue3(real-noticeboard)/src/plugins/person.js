export default {
  install(app, options) {
    const person = {
      name: '소윤호',
      say() {
        alert(this.name);
      },
      ...options,
    };
    app.config.globalProperties.$person = person;
    app.provide('person', person);
  },
};
