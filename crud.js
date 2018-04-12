$(function() {
  const $table = $('#table')
  const $newName = $('#new-name')
  let names;

  const getRemoveLink = (id) =>
    `<a class="remove-btn" data-id="${id}" href="#">remove</a>`

  const restAddCall = (name) => {
    return fetch(
      'http://localhost:3000/names', {
        method:'POST',
        body: JSON.stringify({ name }),
        headers: { 'content-type': 'application/json' }
      })
      .then(response => response.json())
  }

  const restRemoveCall = (id) => {
    return fetch(
      'http://localhost:3000/names', {
        method:'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'content-type': 'application/json' }
      })
      .then(response => response.json())
  }
  
  const removeHandler = (e) => {
    const id = $(e.target).data('id')
    restRemoveCall(id)
      .then(() => {
        const indexToRemove = names.findIndex(obj => obj.id === id )
        names.splice(indexToRemove, 1)
        drawTable()
      })
  }




  // I redrawing everything for simplicity every time
  const drawTable = () => {
    $table.empty()
    const table = names.map(({id, name}) => `
    <pre>
      ${name} ${getRemoveLink(id)} <br/>
    </pre>`)
    $table.html(table)
    $('.remove-btn').on('click', removeHandler)
  }

  const addHandler = () => {
    const name = $newName.val()
    restAddCall(name)
      .then(({id}) => {
        names.push({ id, name })
        drawTable()
      })
  }

  fetch('http://localhost:3000/names')
    .then((response) => response.json())
    .then((_names) => {
      names = _names
      drawTable()
    })

  $('#add-new').on('click', addHandler)
})
