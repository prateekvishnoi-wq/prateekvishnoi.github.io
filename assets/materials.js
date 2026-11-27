const input = document.querySelector('#filter-materials');
const list = document.querySelector('#materials-list');
const count = document.querySelector('#search-status');
const empty = document.querySelector('#no-results');

function filterItems(items, query, parentMatches = false) {
  let visibleLinks = 0;
  for (const item of items) {
    const link = item.querySelector(':scope > a');
    const children = item.querySelector(':scope > ul');
    const matches = parentMatches || link.textContent.toLowerCase().includes(query);
    const childMatches = children ? filterItems(children.children, query, matches) : 0;
    item.hidden = !matches && childMatches === 0;
    visibleLinks += Number(!item.hidden) + childMatches;
  }
  return visibleLinks;
}

input.parentElement.hidden = false;
input.addEventListener('input', () => {
  const query = input.value.trim().toLowerCase();
  const visibleLinks = filterItems(list.children, query);
  count.textContent = `${visibleLinks} ${visibleLinks === 1 ? 'link' : 'links'} shown`;
  empty.hidden = visibleLinks !== 0;
});
