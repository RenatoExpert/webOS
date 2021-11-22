// Boot the machine

// step1. get configurations from a especific file
// step2. if no config is storaged, get the template config
// step3. prompt login shell

import { shellscreen } from '../lib/modules/egg/kernel/drivers/prompt_driver.js'

boot()

function boot() {
	var display = shellscreen
	display.create()
	display.stdout ('Zoso Kernel version="Egg"\n')
	display.stdout ('\n'+
		'▒███████▒ ▒█████    ██████  ▒█████  \n'+
		'▒ ▒ ▒ ▄▀░▒██▒  ██▒▒██    ▒ ▒██▒  ██▒\n'+
		'░ ▒ ▄▀▒░ ▒██░  ██▒░ ▓██▄   ▒██░  ██▒\n'+
		'  ▄▀▒   ░▒██   ██░  ▒   ██▒▒██   ██░\n'+
		'▒███████▒░ ████▓▒░▒██████▒▒░ ████▓▒░\n'+
		'░▒▒ ▓░▒░▒░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░░ ▒░▒░▒░ \n'+
		'░░▒ ▒ ░ ▒  ░ ▒ ▒░ ░ ░▒  ░ ░  ░ ▒ ▒░ \n'+
		'░ ░ ░ ░ ░░ ░ ░ ▒  ░  ░  ░  ░ ░ ░ ▒  \n'+
		'  ░ ░        ░ ░        ░      ░ ░  \n'+
		'░                                   \n\n'
	)
	display.stdout ('Initializing...\n')
	display.stdout ("[OK]	Screen drivers: resolution_detected=("
		+screen.width
		+"x"
		+screen.height
		+")\n"
	)
	// start memory driver
	display.stdout ("Starting memory driver...")

}
