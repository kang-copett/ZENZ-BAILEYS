const chalk = require('chalk')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const getGroupAdmins = (participants) => {
	admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

const halah = (text) => { // by LoL-Human and MRHRTZ@kali~:#
    const A = new RegExp("[AIUEOaiueo]", "g")
    text = text.replace(A, "a")
    return text
}

const hilih = (text) => { // by LoL-Human and MRHRTZ@kali~:#
    const I = new RegExp("[AIUEOaiueo]", "g")
    text = text.replace(I, "i")
    return text
}

const huluh = (text) => { // by LoL-Human and MRHRTZ@kali~:#
    const U = new RegExp("[AIUEOaiueo]", "g")
    text = text.replace(U, "u")
    return text
}

const heleh = (text) => { // by LoL-Human and MRHRTZ@kali~:#
    const E = new RegExp("[AIUEOaiueo]", "g")
    text = text.replace(E, "e")
    return text
}

const holoh = (text) => { // by LoL-Human and MRHRTZ@kali~:#
    const O = new RegExp("[AIUEOaiueo]", "g")
    text = text.replace(O, "o")
    return text
}

module.exports = {
    color,
    processTime,
    sleep,
    getGroupAdmins,
    getRandom,
	halah,
    hilih,
	huluh,
	heleh,
	holoh
}
