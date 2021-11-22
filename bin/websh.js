// bash-like terminal for web

//rendering initial screen
//styles
document.body.innerHTML += '<textarea type="text" id="websh" readonly></textarea>'
webshdiv = document.getElementById('websh')
webshdiv.style.minWidth = '400px'
webshdiv.style.minHeight = '300px'
webshdiv.style.backgroundColor = 'black'
webshdiv.style.color = 'white'

//dataflow
stdout_perm = ''
stdin_cache = ''
pointer_revpos = 0
function pointer_pos () { return stdin_cache.length - pointer_revpos -1}
function core () { return webshdiv.innerHTML }

function update() {
	webshdiv.innerHTML = stdout_perm + stdin_cache
}

function scroll_bottom () {
	webshdiv.scrollTop = webshdiv.scrollHeight
}

function stdout (content) {
	stdout_perm += content
}

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

function addchar(arg) {
	let a = stdin_cache.slice(0, pointer_pos()+1)
	let b = stdin_cache.slice(pointer_pos()+1, stdin_cache.length)
	stdin_cache = a + arg + b
}

function deletechar(isDel = 0) {
	let a = stdin_cache.substring(0, pointer_pos() + isDel)
	let b = stdin_cache.substring(pointer_pos() + 1 + isDel, stdin_cache.length)
	stdin_cache = a + b
	pointer_revpos -= isDel
}

function breakline () {
	stdout('\n')
	pointer_revpos = 0
}

function printl (content) {
	stdout(content)
	breakline()
}

function submitsh (content) {
	printl(content)
	salute()
}

function salute () {
	stdout('root@zoso:~#')
}

salute()
readmode()
