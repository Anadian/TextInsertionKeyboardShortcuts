#!/usr/local/bin/node

/**
* @file text_insertion_keyboard_shortcut.js
* @brief Control-Alt-Shift-T inserts the current time in ISO UTC format.
* @author Anadian
* @copyright 	Copyright 2018 Canosw
	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
software and associated documentation files (the "Software"), to deal in the Software 
without restriction, including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to the following 
conditions:
	The above copyright notice and this permission notice shall be included in all copies 
or substantial portions of the Software.
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

//Dependencies
	//Internal
const Log = require('./log.js');
	//Standard
const Utility = require('util');
const ExternalProcess = require('child_process');
	//External
const ElectronPath = require('electron');
const ElectronProcess = ExternalProcess.spawn(ElectronPath);
const Robot = require('robotjs');

//Constants
const FILENAME = 'text_insertion_keyboard_shortcut.js';
const MODULE_NAME = 'TextInsertionKeyboardShortcut';
var PROCESS_NAME = '';
if(require.main === module){
	PROCESS_NAME = 'text_insertion_keyboard_shortcut';
} else{
	PROCESS_NAME = process.argv0;
}

//Functions
/**
* @fn TextInsertionKeyboardShortcut_TypeISOUTCTimeString
* @brief Types the current time in ISO UTC format.
* @return <ARRAY>
*	@entry 0 
*		@retval 1 premature return.
*		@retval 0 on success.
*		@retval <0 on failure.
*	@entry 1
*		@retval <object> on success
*		@retval <error_message> on failure.
*/
function TextInsertionKeyboardShortcut_TypeISOUTCTimeString(){
	var _return = [1,null];
	const FUNCTION_NAME = 'TextInsertionKeyboardShortcut_TypeISOUTCTimeString';
	//Variables
	var function_return = null;
	var current_date = new Date();
	var iso_date_string = current_date.toISOString();
	Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','received: '+arguments.toString());
	//Parametre checks
	
	//Function
	function_return = Robot.typeString(iso_date_string);
	//Return
	Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','returned: '+_return.toString());
	return _return;
}

/**
* @fn TextInsertionKeyboardShortcut_RegisterShortcut_Time
* @brief Register the shortcut/accelerator 'Control+Alt+Shift+T' to insert current time in ISO UTC format.
* @return <ARRAY>
*	@entry 0 
*		@retval 1 premature return.
*		@retval 0 on success.
*		@retval <0 on failure.
*	@entry 1
*		@retval <object> on success
*		@retval <error_message> on failure.
*/
function TextInsertionKeyboardShortcut_RegisterShortcut_Time(){
	var _return = [1,null];
	const FUNCTION_NAME = 'TextInsertionKeyboardShortcut_RegisterShortcut_Time';
	//Variables
	var function_return = null;
	Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','received: '+arguments.toString());
	//Parametre checks
	
	//Function
	Electron.globalShortcut.register( 'Control+Alt+Shift+T', TextInsertionKeyboardShortcut_TypeISOUTCTimeString );
	function_return = Electron.globalShortcut.isRegistered( 'Control+Alt+Shift+T' );
	if( function_return === true ){
		//Should be registered.
		_return = [0,'Should be registered.'];
	} else{
		//Shouldn't be registered; something went wrong.
		_return = [-1,'Register attempt failed.'];
		Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'error',_return[1]);
	}
	//Return
	Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','returned: '+_return.toString());
	return _return;
}
/**
* @fn TextInsertionKeyboardShortcut_UnRegisterShortcut_Time
* @brief UnRegister the shortcut/accelerator 'Control+Alt+Shift+T'.
* @return <ARRAY>
*	@entry 0
*		@retval 1 premature return.
*		@retval 0 on success.
*		@retval <0 on failure.
*	@entry 1
*		@retval <object> on success
*		@retval <error_message> on failure.
*/
function TextInsertionKeyboardShortcut_UnRegisterShortcut_Time(){
	var _return = [1,null];
	const FUNCTION_NAME = 'TextInsertionKeyboardShortcut_UnRegisterShortcut_Time';
	//Variables
	var function_return = null;
	Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','received: '+arguments.toString());
	//Parametre checks

	//Function
	Electron.globalShortcut.unregister('Control+Alt+Shift+T');
	function_return = Electron.globalShortcut.isRegistered('Control+Alt+Shift+T');
	if( function_return === false ){
		//Should be unregistered.
		_return = [0,function_return];
	} else{
		//Should still be registered.
		_return = [-1,'Accelerator still registered.'];
		Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'error',_return[1]);
	}
	//Return
	Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug','returned: '+_return.toString());
	return _return;
}


//Exports and Execution
if(require.main === module){
	const FUNCTION_NAME = 'main';
	Log.log(PROCESS_NAME,MODULE_NAME,FILENAME,FUNCTION_NAME,'debug',Utility.format('%o', ElectronProcess));
	//const ElectronApplication = Electron.app;
	//ElectronApplication.on( 'ready', TextInsertionKeyboardShortcut_RegisterShortcut_Time );
	//ElectronApplication.on( 'will-quit', TextInsertionKeyboardShortcut_UnregisterShortcut_Time );
} else{
	
}
