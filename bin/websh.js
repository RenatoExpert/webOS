// bash-like terminal for web

//rendering initial screen
document.body.innerHTML += '<div id="websh"></div>'
webshdiv = document.getElementById('websh')
webshdiv.style.minWidth = '160px'
webshdiv.style.minHeight = '160px'
webshdiv.style.backgroundColor = 'black'
webshdiv.style.color = 'white'
busy = false
charblack = '▮'
charwhite = '▯'

function core () { return webshdiv.innerHTML }

function stdout (content) {
	webshdiv.innerHTML += content
}

function replace_char (a,b) {
	let text = webshdiv.innerHTML
	let newt = text.replaceAll(a,b)
	webshdiv.innerHTML = newt
}

async function penpointer() {
	stdout (charwhite)
	let pointer_pos = 0
	let interval = 500
	while (true) {
		replace_char(charblack, charwhite)
		await new Promise(r => setTimeout(r, interval));
		replace_char(charwhite, charblack)
		await new Promise(r => setTimeout(r, interval));
		console.log(core()[ core().length - 1 - pointer_pos ])
	}
}

function readmode() {
	let oldhtml = webshdiv.innterHTML
	let stdin
	document.addEventListener('keydown', (k) => {
		console.log('a')
		stdout(k.key)
	})
}

function br () {
	stdout('<br>')
}

function salute () {
	stdout('root@zoso:~#')
	readmode();
}

salute()
penpointer()
