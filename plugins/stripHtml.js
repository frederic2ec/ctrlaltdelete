import Vue from 'vue'

Vue.filter('striphtml', (value) => {
  const div = document.createElement('div')
  div.innerHTML = value
  const text = div.textContent || div.innerText || ''
  return text
})
