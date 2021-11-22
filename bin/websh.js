// bash-like terminal for web
export { bash_init }

// HTML
document.body.innerHTML += '<textarea type="text" id="websh" readonly></textarea>'
websh = document.getElementById('websh')
function scroll_bottom () {
	websh.scrollTop = websh.scrollHeight
}

// CSS
websh.style.minWidth = '400px'
websh.style.minHeight = '300px'
websh.style.backgroundColor = 'black'
websh.style.color = 'white'


// text storage and rendering
stdout_perm = '' // terminal's imutable part
stdin_cache = '' // the part user may edit
total_text = () => stdout_perm + stdin_cache  // what must be written on screen
function update() {  // refreshing screen
	websh.innerHTML = total_text()
}

// keyboard pointer
pointer_revpos = 0 // where the pointer is (backwards)
pointer_pos = () => stdin_cache.length - pointer_revpos-1 // where it actually is on cache string


// changing data
function stdout (content) { // register user's input into permanent part
	stdout_perm += content
}

function breakline () {
	stdout('\n')
	pointer_revpos = 0
}

function printl (content) { // print and breakline at once
	stdout(content)
	breakline()
}

function addchar(arg) { // writing on cache part (based on pointer)
	let a = stdin_cache.slice(0, pointer_pos()+1)
	let b = stdin_cache.slice(pointer_pos()+1, stdin_cache.length)
	stdin_cache = a + arg + b
}

function deletechar(isDel = 0) { // backspace or delete effect, based on pointer and at cache part
	let a = stdin_cache.substring(0, pointer_pos() + isDel)
	let b = stdin_cache.substring(pointer_pos() + 1 + isDel, stdin_cache.length)
	stdin_cache = a + b
	pointer_revpos -= isDel
}

//keyboard interaction
function readmode() {
	update()
	document.addEventListener('keydown', (k) => {
		scroll_bottom()
		switch (k.key) {
			case 'Enter':
				submitsh(stdin_cache)
				stdin_cache = ''
				break
			case 'Backspace':
				deletechar(0)
				break
			case 'Delete' :
				deletechar(1)
				break
			case 'ArrowLeft':
				if (pointer_revpos < stdin_cache.length) {
					pointer_revpos++ 
				}
				break
			case 'ArrowRight':
				if (pointer_revpos > 0) { 
					pointer_revpos-- 
				}
				break
			case 'Escape':
				console.log('you pressioned escape')
				break
			case 'Alt':
				break
			case 'AltGraph':
				break
			case 'Control':
				break
			case 'Shift':
				break
			case 'CapsLock':
				break
			default:
				addchar(k.key)
				update()
				return
		}
		update()
	})
}

function submitsh (content) {
	printl(content)
	salute()
}

function salute () {
	stdout('root@zoso:~#')
}

function bash_init () {
	salute()
	readmode()
}

