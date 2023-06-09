/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"ybJrFH35FmdI0dOc","label":"college","bookmarks":[{"id":"vuljUCL4UQ9HuZ2J","label":"notion","url":"https://www.notion.so/"},{"id":"imShpXZboXqLF39K","label":"classroom","url":"https://classroom.google.com/"}]},{"id":"3HM2nYTbdZB1kMXp","label":"personal","bookmarks":[{"id":"eKpfFbNAcXC8YEKJ","label":"email","url":"https://mail.google.com/"},{"id":"uPORlgoCHNKJMoxk","label":"github","url":"https://github.com"}]},{"id":"GNOOfV8rRLmN6lPI","label":"media","bookmarks":[{"id":"VPAowMC2dsqY0vQ3","label":"youtube","url":"https://www.youtube.com"},{"id":"gMOT2wHDfyMzMzuy","label":"reddit","url":"https://reddit.com"}]},{"id":"mcVg4fL2hZja0yW7","label":"misc","bookmarks":[{"id":"nD2swQlN9cR5TMhv","label":"webnovel","url":"https://www.webnovel.com/library"},{"id":"5Gqj1OX6fMpsOXvN","label":"wattpad","url":"https://wattpad.com/home"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
