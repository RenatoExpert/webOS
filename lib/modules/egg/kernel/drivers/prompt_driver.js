// bash-like terminal for web
export { shellscreen }

var shellscreen = {

	// text storage and rendering
	stdout_perm: '', // terminal's imutable part
	stdin_cache: '', // the part user may edit
	get total_text () { return this.stdout_perm + this.stdin_cache },  // what must be written on screen
	update: function() {  // refreshing screen
		prompts.innerHTML = this.total_text
	},

	create: function () {
		// HTML
		const lousa = document.getElementById('lousa')
		lousa.innerHTML += '<textarea type="text" id="prompts" readonly></textarea>'
		lousa.prompts = document.getElementById('prompts')

		// CSS
		prompts.style.width = '100%'
		prompts.style.height = '100%'
		prompts.style.backgroundColor = 'black'
		prompts.style.color = 'white'

		this.clear()
	},

	gettobot : function () {
		prompts.scrollTop = prompts.scrollHeight
	},

	// keyboard pointer
	pointer_revpos: 0, // where the pointer is (backwards)
	get pointer_pos () { return stdin_cache.length - pointer_revpos-1 }, // where it actually is on cache string

	addchar: function(arg) { // writing on cache part (based on pointer)
		let a = stdin_cache.slice(0, pointer_pos()+1)
		let b = stdin_cache.slice(pointer_pos()+1, stdin_cache.length)
		stdin_cache = a + arg + b
		update()
	},

	deletechar: function(isDel = 0) { // backspace or delete effect, based on pointer and at cache part
		let a = stdin_cache.substring(0, pointer_pos() + isDel)
		let b = stdin_cache.substring(pointer_pos() + 1 + isDel, stdin_cache.length)
		stdin_cache = a + b
		pointer_revpos -= isDel
	},

	// changing data
	stdout: function (content) { // register user's input into permanent part
		this.stdout_perm += content
		this.update()
	},

	breakline: function () {
		stdout('\n')
		pointer_revpos = 0
	},

	clear: function () {
		this.stdout_perm = ''
	},

	//keyboard interaction
	readinput: function () {
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
	},
}

