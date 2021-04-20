const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')

// FUNCTION
const fs = require("fs")
const { color, processTime, sleep, getGroupAdmins, getRandom, halah, hilih, huluh, heleh, holoh } = require('./lib/index')
const { fetchJson, getBuffer, fetchText, uploadImages, msgFilter } = require('./lib/fetcher')
const { addMetaData, createExif, modStick, kyun, stickerHandler, tanggal } = require('./lib/function')
const { custom, random } = require('./lib/meme')
const { msg } = require('./msg')
const { register, premium, limit, level, afk, atm} = require('./data')
const limitCount = 25

// MODULE
const { exec, spawn } = require('child_process')
const phoneNum = require('awesome-phonenumber')
const axios = require('axios')
const bent = require('bent')
const ID3Writer = require('browser-id3-writer');
const canvas = require('canvacord')
const ffmpeg = require('fluent-ffmpeg')
const FormData = require('form-data')
const got = require("got");
const imageToBase64 = require('image-to-base64')
const imgbb = require('imgbb-uploader')
const API = require('kasu.nhentaiapi.js');
const api = new API();
const moment = require('moment-timezone')
const toMs = require('ms')
const Nekos = require('nekos.life')
const neko = new Nekos()
const cron = require('node-cron')
const os = require('os')
const ms = require('parse-ms')
const speed = require('performance-now')
const request = require('request')
//const sharp = require('sharp');
const WSF = require('wa-sticker-formatter')
const yts = require( 'yt-search' )
const ytdl = require('ytdl-core')
const ytsr = require('ytsr')

// DATABASE
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _simih = JSON.parse(fs.readFileSync('./database/group/simi.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const _uang = JSON.parse(fs.readFileSync('./database/user/uang.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _myhit = JSON.parse(fs.readFileSync('./database/user/hit.json'))
const _caklontong = JSON.parse(fs.readFileSync('./database/user/caklontong.json'))
const _tebakgambar = JSON.parse(fs.readFileSync('./database/user/tebakgambar.json'))

const setting = JSON.parse(fs.readFileSync('./setting.json'))
const errorImg = 'https://i.ibb.co/yP8ZkXb/Pics-Art-02-28-08-54-47.jpg'

prefix = setting.prefix
lol = setting.lol
let gambar64 = '' || fs.readFileSync('./media/images/2.jpeg')

// START QR
async function starts() {
const client = new WAConnection()

client.logger.level = 'warn'
let authofile = './session.json'
client.on('qr', () => {
    const time_connecting = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    console.log(color(time_connecting, "white"), color("[  STATS  ]", "aqua"), "Scan QR Code with WhatsApp")
})
fs.existsSync(authofile) && client.loadAuthInfo(authofile)
client.on('connecting', () => {
    const time_connecting = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    console.log(color(time_connecting, "white"), color("[  STATS  ]", "aqua"), "Connecting...")
})
client.on('open', () => {
    const time_connect = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    console.log(color(time_connect, "white"), color("[  STATS  ]", "aqua"), "Connected")
})
await client.connect({ timeoutMs: 30 * 1000 })
fs.writeFileSync(authofile, JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

client.on('CB:action,,call', async json => {
    const callerId = json[2][0][1].from;
        client.sendMessage(callerId, "Maaf anda di block karena menelpon bot", MessageType.text)
        setTimeout(function(){ 
        client.blockUser(callerId, "add")
        }, 1000 * 2);
})

client.on('chat-update', async (mek) => {
    try {
        if (!mek.hasNewMessage) return
        mek = JSON.parse(JSON.stringify(mek)).messages[0]
        if (!mek.message) return
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (mek.key.fromMe) return
        
        global.prefix
        const content = JSON.stringify(mek.message)
        const from = mek.key.remoteJid
        const type = Object.keys(mek.message)[0]
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
        const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
        budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
        var Link = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
        
        const messagesLink = Link.slice(0).trim().split(/ +/).shift().toLowerCase()
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const ar = args.map((v) => v.toLowerCase())
        const q = args.join(' ')
        const query = args.join(' ')
        const isCmd = body.startsWith(prefix)
        const url = args.length !== 0 ? args[0] : ''

        const mentionByTag = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByReply = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByReply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []

        const botNumber = client.user.jid
        const ownerNumber = ["6281288339373@s.whatsapp.net"]
        const isGroup = from.endsWith('@g.us')
        const sender = isGroup ? mek.participant : mek.key.remoteJid
        const totalchat = await client.chats.all()
        const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
        pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
		
        const isMe = sender === botNumber ? true : false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false 
        const isGroupAdmins = groupAdmins.includes(sender) || false

        const isAfkOn = afk.checkAfkUser(sender, _afk)
        const isNsfw = isGroup ? _nsfw.includes(from) : false
        const isSimi = isGroup ? _simih.includes(from) : false 
        const isAntiLink = isGroup ? _antilink.includes(from) : false 
        const isOwner = ownerNumber.includes(sender)
        const isLevelingOn = isGroup ? _leveling.includes(from) : false
        const isPremium = premium.checkPremiumUser(sender, _premium)
        const isRegistered = register.checkRegisteredUser(sender, _registered)
        
        const isUrl = (url) => {
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}

        const reply = (teks) => {
        client.sendMessage(from, teks, text, {quoted:mek})}

        const sendMess = (hehe, teks) => {
        client.sendMessage(hehe, teks, text)}

        const mentions = (teks, memberr, id) => {
        (id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})}

        const costum = (pesan, tipe, target, target2) => {
        client.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})}

        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

        // CONSOLE LOG
        if (isCmd && !isGroup) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            await client.chatRead(from)}
        
        if (isCmd && isGroup) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            await client.chatRead(from)}
        
        // Anti-spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroup) {
            console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            return reply('_wait cooldown 5 detik_')}
        
        if (isCmd && msgFilter.isFiltered(from) && isGroup) {
            console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            return reply('_wait cooldown 5 detik_')
        }

        // NEW FUNCTION
        premium.expiredCheck(_premium)
        cron.schedule('0 4 * * *', () => {
        const reset = []
        _limit = reset
        console.log('Resetting user limit...')
        fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
        console.log('Success!')
        }, {
        scheduled: true,
        timezone: 'Asia/Jakarta'
        })

        // AFK
        if (isGroup) {
            for (let ment of mentionUser) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    reply(msg.afkMentioned(getReason, getTime))
                }
            }
            if (afk.checkAfkUser(sender, _afk)) {
                _afk.splice(afk.getAfkPosition(sender, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                reply(msg.afkDone(pushname))
            }
        }

        const levelRole = level.getLevelingLevel(sender, _level)
        var role = 'Warrior III'
        if (levelRole <= 5) {
            role = 'Warrior II'
        } else if (levelRole <= 10) {
            role = 'Warrior I'
        } else if (levelRole <= 15) {
            role = 'Elite III'
        } else if (levelRole <= 20) {
            role = 'Elite II'
        } else if (levelRole <= 25) {
            role = 'Elite I'
        } else if (levelRole <= 30) {
            role = 'Master III'
        } else if (levelRole <= 35) {
            role = 'Master II'
        } else if (levelRole <= 40) {
            role = 'Master I'
        } else if (levelRole <= 45) {
            role = 'GrandMaster III'
        } else if (levelRole <= 50) {
            role = 'GrandMaster II'
        } else if (levelRole <= 55) {
            role = 'GrandMaster I'
        } else if (levelRole <= 60) {
            role = 'Epic III'
        } else if (levelRole <= 65) {
            role = 'Epic II'
        } else if (levelRole <= 70) {
            role = 'Epic I'
        } else if (levelRole <= 75) {
            role = 'Legend III'
        } else if (levelRole <= 80) {
            role = 'Legend II'
        } else if (levelRole <= 85) {
            role = 'Legend I'
        } else if (levelRole <= 90) {
            role = 'Mythic'
        } else if (levelRole <= 95) {
            role = 'Mythical Glory'
        } else if (levelRole >= 100) {
            role = 'Immortal'
        } 

        if (isGroup && isRegistered && !level.isGained(sender) && isLevelingOn) {
            try {
                level.addCooldown(sender)
                const checkATM = atm.checkATMuser(sender, _uang)
                if (checkATM === undefined) atm.addATM(sender, _uang)
                const uangsaku = Math.floor(Math.random() * (15 - 25 + 1) + 20)
                atm.addKoinUser(sender, uangsaku, _uang)
                const currentLevel = level.getLevelingLevel(sender, _level)
                const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 20)
                const requiredXp = 10 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
                level.addLevelingXp(sender, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender, _level)) {
                    level.addLevelingLevel(sender, 1, _level)
                    const userLevel = level.getLevelingLevel(sender, _level)
                    const fetchXp = 10 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                    reply(`*LEVEL UP*\n\n*XP :* ${level.getLevelingXp(sender, _level)} / ${fetchXp}\n*Level :* ${currentLevel} -> ${level.getLevelingLevel(sender, _level)}`)
                }
            } catch (err) {
                console.error(err)
            }
        }
        
        // Anti-group link detector
        if (isGroup && isBotGroupAdmins && !isGroupAdmins && isAntiLink && !isOwner) {
            if (messagesLink.includes("://chat.whatsapp.com/")){
                var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
                setTimeout( () => {
                    reply('byee👋')
                }, 1100)
                setTimeout( () => {
                    client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
                }, 1000)
                setTimeout( () => {
                    reply(msg.linkDetected())
                }, 0)
            }
        }

        
        // AUTO LEFT
        if (isGroup && isBotGroupAdmins) {
            try {
                const getmemex = groupMembers.length
                if (getmemex <= 20) {
                    setTimeout( () => {
                    client.groupLeave(from) 
                    }, 2000)
                    setTimeout ( () => {
                    client.sendMessage(from, `Byee`, text)
                    }, 1000)
                    setTimeout( () => {
                    client.sendMessage(from, `Tidak Bisa Masuk Group Karna Member Group ${groupMetadata.subject} Tidak Memenuhi Limit Member\n\nMinimal Member 20`, text)
                    }, 0)
                }
            } catch (err) { console.error(err)  }
        }

        // ANTI VIRTEX
        if (isGroup && isBotGroupAdmins && !isGroupAdmins && !isOwner) {
            if (budy.length > 5000) {
                var kic = `${sender.split("@")[0]}@s.whatsapp.net`
                reply(`Terdeteksi Spam Chatt Oleh ${sender.split("@")[0]}\nanda akan di kick dari group`)
                setTimeout( () => {
                    client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
                    client.blockUser(sender, "add")
                }, 0)
            }
        }
        
        // FUNCTION TEBAK GAMBAR
        const addgambar = (sender, jawaban, expired) => {
            let obi = { id: sender, jawaban: jawaban, expired: Date.now() + toMs(`${expired}s`) }
            _tebakgambar.push(obi)
            fs.writeFileSync('./database/user/tebakgambar.json', JSON.stringify(_tebakgambar))
        }
        const getjawaban = (sender) => {
            let found = false
            Object.keys(_tebakgambar).forEach((i) => {
                if (_tebakgambar[i].id === sender) {
                    found = i
                }
            })
            if (found !== false) {
                return _tebakgambar[found].jawaban
            }
        }
        const isTebakGambar = (sender) => {
            let status = false
            Object.keys(_tebakgambar).forEach((i) => {
                if (_tebakgambar[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        const cekWaktuTG = (_dir, sender) => {
            setInterval(() => {
                let position = null
                Object.keys(_tebakgambar).forEach((i) => {
                    if (Date.now() >= _tebakgambar[i].expired) {
                        position = i
                    }
                })
                if (position !== null) {
                    reply(`Waktu habis\n\n*Jawaban :* ${_tebakgambar[position].jawaban}`)
                    console.log(`Waktu Habis : ${_tebakgambar[position].id}`)
                    _tebakgambar.splice(position, 1)
                    fs.writeFileSync('./database/user/tebakgambar.json', JSON.stringify(_tebakgambar))
                }
            }, 1000)
        }
        const gettgposi = (userId) => {
            let position = null
            Object.keys(_tebakgambar).forEach((i) => {
                if (_tebakgambar[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return position
            }
        }
        if(isTebakGambar(sender)){
            if (budy.match(getjawaban(sender))){
                reply(`Jenius Jawaban anda Benar!\nMendapatkan 2 Limit`)
                limit.limitAdd(sender, _limit, isPremium, isOwner)
                _tebakgambar.splice(gettgposi(sender, _tebakgambar), 1)
                fs.writeFileSync('./database/user/tebakgambar.json', JSON.stringify(_tebakgambar))
            }

        }

        // FUNCTION FAMILY 100
        const addResultCaklontong = (sender, jawaban, infoc, expired) => {
            let obi = { id: sender, jawaban: jawaban, infoc: infoc, expired: Date.now() + toMs(`${expired}s`) }
            _caklontong.push(obi)
            fs.writeFileSync('./database/user/caklontong.json', JSON.stringify(_caklontong))
        }
        const getjawabanCaklontong = (sender) => {
            let found = false
            Object.keys(_caklontong).forEach((i) => {
                if (_caklontong[i].id === sender) {
                    found = i
                }
            })
            if (found !== false) {
                return _caklontong[found].jawaban
            }
        }
        const isCakLontong = (sender) => {
            let status = false
            Object.keys(_caklontong).forEach((i) => {
                if (_caklontong[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        const cekWaktuCaklontong = (_dir, sender) => {
            setInterval(() => {
                let position = null
                Object.keys(_caklontong).forEach((i) => {
                    if (Date.now() >= _caklontong[i].expired) {
                        position = i
                    }
                })
                if (position !== null) {
                    reply(`Waktu habis\n\n*Jawaban :* ${_caklontong[position].jawaban}\n*Informasi :* ${_caklontong[position].infoc}`)
                    console.log(`Waktu Habis : ${_caklontong[position].id}`)
                    _caklontong.splice(position, 1)
                    fs.writeFileSync('./database/user/caklontong.json', JSON.stringify(_caklontong))
                }
            }, 1000)
        }
        const getCaklontongPosition = (userId) => {
            let position = null
            Object.keys(_caklontong).forEach((i) => {
                if (_caklontong[i].id === userId) {
                    position = i
                }
            })
            if (position !== null) {
                return position
            }
        }
        if(isCakLontong(sender)){
            let position = null
            Object.keys(_caklontong).forEach((i) => {
                position = i
            })
            if (budy.match(getjawabanCaklontong(sender))){
                reply(`Jenius Jawaban anda Benar!\nMendapatkan 2 Limit\n\n*Jawaban :* ${_caklontong[position].jawaban}\n*Informasi :* ${_caklontong[position].infoc}`)
                limit.limitAdd(sender, _limit, isPremium, isOwner)
                _caklontong.splice(getCaklontongPosition(sender, _caklontong), 1)
                fs.writeFileSync('./database/user/caklontong.json', JSON.stringify(_caklontong))
            }
        }

        if (isCmd && !isPremium && !isOwner) msgFilter.addFilter(from)
		switch(command) {

            // OPTIONAL
            case 'stat':
            case 'status':
            if (!isRegistered) return reply(msg.notRegistered())
				let i = []
				let giid = []
				for (mem of totalchat){
					i.push(mem.jid)
				}
				for (id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
                let timestampi = speed();
				let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = client.user.phone
                uptimes = process.uptime()
			    uptems = kyun(uptimes)
                teskny = `Whatsapp : ${wa_version}
RAM : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
MCC : ${mcc}
MNC : ${mnc}
Versi OS : ${os_version}
Merk HP : ${device_manufacturer}
Versi HP : ${device_model}

Group Chat : ${giid.length}
Personal Chat : ${totalchat.length - giid.length}
Total Chat : ${totalchat.length}
Speed : ${latensii.toFixed(4)} Second
Runtime : ${uptems}`
			client.sendMessage(from, teskny, text)
			break
            case 'ping':
			case 'p':
            if (!isRegistered) return reply(msg.notRegistered())
				let b = []
				let giidd = []
				for (mem of totalchat){
					b.push(mem.jid)
				}
				for (id of b){
					if (id && id.includes('g.us')){
						giidd.push(id)
					}
				}
                let timestampis = speed();
				let latensiis = speed() - timestampis
                uptimes = process.uptime()
			    uptems = kyun(uptimes)
                teskny = `Group Chat : ${giidd.length}
Personal Chat : ${totalchat.length - giidd.length}
Total Chat : ${totalchat.length}
Speed : ${latensiis.toFixed(4)} Second
Runtime : ${uptems}`
			reply(teskny)
			break
			case 'runtime':
			if (!isRegistered) return reply(msg.notRegistered())
			runtime = process.uptime()
			teks = `${kyun(runtime)}`
			reply(teks, text)
			break

			case 'help':
            case 'menu':
            if (!isRegistered) return reply(msg.notRegistered())
            timer = new Date("2021-04-12").getTime();
            now = new Date().getTime();
            distance = timer - now;
            result = Math.floor(distance / (1000 * 60 * 60 * 24));

			const tgl = tanggal()
			uptimes = process.uptime()
			const uptem = kyun(uptimes)
			const jumlahUser = _registered.length

            const tot = isOwner && isPremium ? 'None' :`${limit.getHit(sender, _myhit)}`
			const namaUserr = `${pushname}`
            const memu = isNsfw ? (msg.menun(jumlahUser, role, namaUserr, tgl, uptem, tot, result)) : (msg.menu(jumlahUser, role, namaUserr, tgl, uptem, tot, result))

            var punya_wa = "0@s.whatsapp.net"
            var ini_text = "𝘀𝗵𝗶𝗿𝗼 𝗯𝗼𝘁 𝗺𝗲𝗻𝘂"
            ini_csreply = {
                contextInfo: {
                    stanzaId: 'B826873620DD5947E683E3ABE663F263',
                    participant: punya_wa,
                    remoteJid: 'status@broadcast',
                    quotedMessage: {
                        imageMessage: {
                            caption: ini_text,
                            jpegThumbnail: gambar64
                        }
                    }
                }
            }
            client.sendMessage(from, memu, text, ini_csreply)
            break

			case 'rules':
			case 'lanjut':
			if (!isRegistered) return reply(msg.notRegistered())
			reply(msg.rules())
			break
			case 'verify':
			case 'register':
			if (isRegistered) return reply('Akun kamu sudah terverfikasi')
			const namaUser = `${pushname}`
			const umurUser = '20'
			const serialUser = register.createSerial(10)

				try {
			        ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
				} catch {
				    ppimg = errorImg
				}

			    daftarimg = await getBuffer(ppimg)
			    register.addRegisteredUser(sender, namaUser, umurUser, time, serialUser, _registered)
			client.sendMessage(from, daftarimg, image, {quoted: mek, caption: msg.registered(namaUser, sender)})
			console.log(color('REGISTER'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
			break
			
			
			// ISLAM
			case 'kota':
                if (!isRegistered) return reply(msg.notRegistered())
                if (!isGroup) return reply(msg.groupOnly())
                reply(msg.wait())
            try {
                const kota = await axios.get(`https://lolhuman.herokuapp.com/api/sholat/kota?apikey=${lol}`)
                const { result } = kota.data
                let drk = `*_Nama Kota Dari Sabang Ke Merauke :_*\n\n`
                for (let i = 0; i < kota.data.result.length; i++)
                drk += `- ${result[i].nama}\n`
                client.sendMessage(from, drk, text)
            } catch (err) {
                reply('Ada error sistem!')
            }
            break
			case 'jadwal':
				if (!isRegistered) return reply(msg.notRegistered())
                if (!isGroup) return reply(msg.groupOnly())
				if (args.length == 0) return reply(`Example: ${prefix + command} jakarta\nuntuk melihat daftar kota ketik ${prefix}kota`)
				reply(msg.wait())
			try {
				const jadwal = await axios.get(`https://lolhuman.herokuapp.com/api/sholat/${query}?apikey=${lol}`)
				const { result } = jadwal.data
				let jdw = `*_Berikut Jadwal Dari Kota ${query} :_*\n\n`
				jdw += `Wilayah : ${result.wilayah}\nTanggal : ${result.tanggal}\nSahur : ${result.sahur}\nImsak : ${result.imsak}\nSubuh : ${result.subuh}\nTerbit : ${result.terbit}\nDhuha : ${result.dhuha}\nDzuhur : ${result.dzuhur}\nAshar : ${result.ashar}\nMaghrib : ${result.maghrib}\nIsya : ${result.isya}\n`
				client.sendMessage(from, jdw, text)
			} catch (err) {
				reply(`Pastikan Nama Kota Benar\nCek nama kota dengan ketik ${prefix}kota`)
			}
			break
			case 'asmaul':
			case 'asmaulhusna':
			if (!isRegistered) return reply(msg.notRegistered())
			if (!isGroup) return reply(msg.groupOnly())
				get_result = await fetchJson(`https://lolhuman.herokuapp.com/api/asmaulhusna?apikey=${lol}`)
				get_result = get_result.result
				txt = `index : ${get_result.index}\n`
				txt += `latin : ${get_result.latin}\n`
				txt += `arab : ${get_result.ar}\n`
				txt += `id : ${get_result.id}\n`
				txt += `en : ${get_result.en}\n`
				client.sendMessage(from, txt, text)
			break
			case 'kisahnabi':
			case 'kisah':
			if (!isRegistered) return reply(msg.notRegistered())
			if (!isGroup) return reply(msg.groupOnly())
				if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} muhammad`)
				reply(msg.wait())
				get_result = await fetchJson(`https://lolhuman.herokuapp.com/api/kisahnabi/${query}?apikey=${lol}`)
				get_result = get_result.result
				txt = `name : ${get_result.name}\n`
				txt += `kelahiran : ${get_result.thn_kelahiran}\n`
				txt += `age : ${get_result.age}\n`
				txt += `place : ${get_result.place}\n\n`
				txt += `story :\n\n${get_result.story}\n`
				client.sendMessage(from, txt, text)
			break
			case 'audiosurah':
				if (!isRegistered) return reply(msg.notRegistered())
				if (!isGroup) return reply(msg.groupOnly())
				if (args.length == 0) return reply(`Usage: ${prefix + command} nomor surah\nExample: ${prefix + command} 1\n\nUntuk melihat list surah ketik ${prefix}listsurah`)
				reply(msg.wait())
				ini_buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/quran/audio/${query}?apikey=${lol}`)
				client.sendMessage(from, ini_buffer, audio, { quoted: mek, mimetype: Mimetype.mp4Audio })
			break
			case 'listsurah':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
				get_result = await fetchJson(`http://api.lolhuman.xyz/api/quran?apikey=${lol}`)
				get_result = get_result.result
				ini_txt = 'List Surah :\n\n'
				for (var x in get_result) {
					ini_txt += `${x}. ${get_result[x]}\n`
				}
			reply(ini_txt)
			break
			case 'audioayat':
				if (!isRegistered) return reply(msg.notRegistered())
				if (!isGroup) return reply(msg.groupOnly())
				if (args.length == 0) return reply(`Usage: ${prefix + command} nomor surah | ayat\nExample: ${prefix + command} 56 | 1\n\nUntuk melihat list surah ketik ${prefix}listsurah`)
				const surat = q.substring(0, q.indexOf('|') - 1)
				const ayat = q.substring(q.lastIndexOf('|') + 2)
				ini_buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/quran/audio/${surat}/${ayat}?apikey=${lol}`)
			client.sendMessage(from, ini_buffer, audio, { quoted: mek, mimetype: Mimetype.mp4Audio })
			break
			case 'quran':
            if (!isRegistered) return reply(msg.notRegistered())
			if (!isGroup) return reply(msg.groupOnly())
			anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {method: 'get'})
			quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`
			reply(quran)
		    break

			// STICKER
            case 'smoji':
            case 'emoji':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (args.length == 0) return reply(`Example: ${prefix + command} 😭`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            
                emoji = args[0]
                try {
                    emoji = encodeURI(emoji[0])
                } catch {
                    emoji = encodeURI(emoji)
                }
                ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/smoji/${emoji}?apikey=${lol}`)
                client.sendMessage(from, ini_buffer, sticker, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break            

            case 'sticker':
            case 'stiker':
            case 'stickergif':
            case 'stikergif':
            case 'sgif':
			if (!isRegistered) return reply(msg.notRegistered())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                encmediat = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                mediat = await client.downloadAndSaveMediaMessage(encmediat)
                ron = getRandom('.webp')
                exec(`ffmpeg -i ${mediat} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=15, crop=512:512" ${ron}`, (err) => {
                    fs.unlinkSync(mediat)
                    if (err) return reply('Gagal')
                    exec(`webpmux -set exif ./media/sticker/data.exif ${ron} -o ${ron}`, async (error) => {
                    if (error) return reply('error')
                    client.sendMessage(from, fs.readFileSync(ron), sticker, {quoted:mek})
                    limit.addLimit(sender, _limit, isPremium, isOwner)
                    fs.unlinkSync(ron)
                    })
                })
            } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                mediat = await client.downloadAndSaveMediaMessage(encmedia)
				ron = getRandom('.webp')
                exec(`ffmpeg -i ${mediat} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=15, crop=512:512" ${ron}`, (err) => {
                    fs.unlinkSync(mediat)
                    if (err) return reply('Gagal')
                    exec(`webpmux -set exif ./media/sticker/data.exif ${ron} -o ${ron}`, async (error) => {
                    if (error) return reply('error')
                    client.sendMessage(from, fs.readFileSync(ron), sticker, {quoted:mek})
                    limit.addLimit(sender, _limit, isPremium, isOwner)
                    fs.unlinkSync(ron)
                    })
                })
			}
            break

			case 'stickerp':
            case 'stikerp':
			if (!isRegistered) return reply(msg.notRegistered())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                encmediat = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                mediat = await client.downloadAndSaveMediaMessage(encmediat)
                ron = getRandom('.webp')
                exec(`ffmpeg -i ${mediat} -vf "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse" ${ron}`, (err) => {
                    fs.unlinkSync(mediat)
                    if (err) return reply('Gagal')
                    exec(`webpmux -set exif ./media/sticker/data.exif ${ron} -o ${ron}`, async (error) => {
                    if (error) return reply('error')
                    client.sendMessage(from, fs.readFileSync(ron), sticker, {quoted:mek})
                    limit.addLimit(sender, _limit, isPremium, isOwner)
                    fs.unlinkSync(ron)
                    })
                })
			} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                mediat = await client.downloadAndSaveMediaMessage(encmedia)
				ron = getRandom('.webp')
                exec(`ffmpeg -i ${mediat} -vf "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse" ${ron}`, (err) => {
                    fs.unlinkSync(mediat)
                    if (err) return reply('Gagal')
                    exec(`webpmux -set exif ./media/sticker/data.exif ${ron} -o ${ron}`, async (error) => {
                    if (error) return reply('error')
                    client.sendMessage(from, fs.readFileSync(ron), sticker, {quoted:mek})
                    limit.addLimit(sender, _limit, isPremium, isOwner)
                    fs.unlinkSync(ron)
                    })
                })
			}
            break
            
            case 'take':
            case 'takestick':
            if (!isPremium) return reply(msg.notPremium())
				encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				const media = await client.downloadAndSaveMediaMessage(encmedia, `./media/sticker/${sender}`)
                
                anu = args.join(' ').split('|')
				const packname = anu[0] !== '' ? anu[0] : `zenuwu`
				const author = typeof anu[1] !== 'undefined' ? anu[1] : ``

				addMetaData(packname, author, `takestick_${sender}`)
				exec(`webpmux -set exif ./media/sticker/takestick_${sender}.exif ./media/sticker/${sender}.webp -o ./media/sticker/${sender}.webp`, async (error) => {
					client.sendMessage(from, fs.readFileSync(`./media/sticker/${sender}.webp`), sticker)
					fs.unlinkSync(media)
					fs.unlinkSync(`./media/sticker/takestick_${sender}.exif`)
				})
			break

            case 'toimg':
				if (!isRegistered) return reply(msg.notRegistered())
                if (!isQuotedSticker) return reply('Reply stickernya')
                if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
                media = await client.downloadAndSaveMediaMessage(encmedia)
                ran = getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return reply(' Gagal, pada saat mengkonversi sticker ke gambar ')
                    buffer = fs.readFileSync(ran)
                    client.sendMessage(from, buffer, image, {quoted:mek})
                    limit.addLimit(sender, _limit, isPremium, isOwner)
                    fs.unlinkSync(ran)
                })
            break
			case 'smeme':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!q.includes('|')) return reply(msg.wrongFormat())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length > 2) {
                const top = q.split('|')[0]
                const bottom = q.split('|')[1]
                encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
                media = await client.downloadMediaMessage(encmedia, 'buffer')
                const getUrl = await uploadImages(media, false)
                const memeRes = await custom(getUrl, top, bottom)
                client.sendMessage(from, memeRes, image, {quoted: mek})
                limit.addLimit(sender, _limit, isPremium, isOwner)

            } else if ((isQuotedSticker) && args.length > 2) {
                var imgbb = require('imgbb-uploader')
                const top = q.split('|')[0]
                const bottom = q.split('|')[1]
                encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace("quotedM","m")).message.extendedTextMessage.contextInfo : mek
                media = await client.downloadAndSaveMediaMessage(encmedia)
                anu = await imgbb("3b8594f4cb11895f4084291bc655e510", media)
                teks = `${anu.display_url}`
                const memeRes = await custom(teks, top, bottom)
                client.sendMessage(from, memeRes, image, {quoted: mek})
                limit.addLimit(sender, _limit, isPremium, isOwner)
            }
            break

			// DOWNLOADER
			case 'play':
            if (!isPremium) return reply(msg.notPremium())
            if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} goyang dumang`)
                const srcsong = body.slice(6)
                let kanna = await yts(srcsong);
                kanna = kanna.all;
                if (kanna.length < 1) return await client.sendMessage(from, 'Error!', text,  {quoted: mek})
                var kThumb = await getBuffer(kanna[0].image)
                let kTitle = 'zenplay'
                let kStream = ytdl(kanna[0].videoId, {
                quality: 'highestaudio',
                });

                got.stream(kanna[0].image).pipe(fs.createWriteStream(kTitle + '.jpg'));
                ffmpeg(kStream)
                    .audioBitrate(128)
                    .save('./' + kTitle + '.mp3')
                    .on('end', async () => {
                    const kWrite = new ID3Writer(fs.readFileSync('./' + kTitle + '.mp3'));
                    kWrite.setFrame('TIT2', kanna[0].title)
                    .setFrame('TPE1', [kanna[0].author.name])
                    .setFrame('APIC', {
                        type: 3,
                        data: fs.readFileSync(kTitle + '.jpg'),
                        description: kanna[0].description
                    });
                
                kWrite.addTag();
                kPlayRes = `「 NOW PLAYING 」\n\nTitle : ${kanna[0].title}\nBy : ${kanna[0].author.name}\n\n_Sending Audio..._`
                await client.sendMessage(from, kThumb, image, {quoted: mek, caption: kPlayRes})
                await client.sendMessage(from, Buffer.from(kWrite.arrayBuffer), audio, {mimetype: Mimetype.mp4Audio, ptt: false, quoted: mek});
                fs.unlinkSync(kTitle + '.jpg')
                fs.unlinkSync('./' + kTitle + '.mp3')
                });
            break
			case 'playvideo':
            if (!isPremium) return reply(msg.notPremium())
            if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} goyang dumang`)
				const resa = await ytsr(body.slice(6)).catch(err => {
					return reply(`Gk ketemu 😔`)
				})
				const videoDatas = resa.items.filter(item => item.type === 'video')[0];
				console.log(videoDatas)
				console.log(videoDatas.url)
				var viidio = videoDatas.url.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
                let info = await ytdl.getInfo(viidio);
				let format = ytdl.chooseFormat(info.formats, { quality: '18' });
				console.log('Format found!', format)
				if (format.contentLength >= 15000000) {
						return reply(`maksimal video 15MB`)
					} else {
				ini_buffer = await getBuffer(format.url)
				await client.sendMessage(from, ini_buffer, video)
					}
				console.log('succes')
			break
			case 'tiktok':
            if (!isPremium) return reply(msg.notPremium())
				if (args.length == 0) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
				ini_url = args[0]
				ini_url = `http://api.lolhuman.xyz/api/tiktok?apikey=${lol}&url=${ini_url}`
				get_result = await fetchJson(ini_url)
				ini_buffer = await getBuffer(get_result.result.link)
				client.sendMessage(from, ini_buffer, video, { quoted: mek })
			break
			case 'tiktokmusic':
            if (!isPremium) return reply(msg.notPremium())
				if (args.length == 0) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
				ini_link = args[0]
				get_audio = await getBuffer(`http://api.lolhuman.xyz/api/tiktokmusic?apikey=${lol}&url=${ini_link}`)
				client.sendMessage(from, get_audio, audio, { mimetype: Mimetype.mp4Audio, quoted: mek })
			break
			case 'igdl':
            if (!isPremium) return reply(msg.notPremium())
				if (args.length == 0) return reply(`Example: ${prefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
				ini_url = args[0]
				ini_url = await fetchJson(`http://api.lolhuman.xyz/api/instagram?apikey=${lol}&url=${ini_url}`)
				ini_url = ini_url.result
				ini_type = image
				if (ini_url.includes(".mp4")) ini_type = video
				ini_buffer = await getBuffer(ini_url)
				client.sendMessage(from, ini_buffer, ini_type, { quoted: mek })
			break
			case 'twitter':
            if (!isPremium) return reply(msg.notPremium())
				if (args.length == 0) return reply(`Example: ${prefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`)
				ini_url = args[0]
				ini_url = await fetchJson(`http://api.lolhuman.xyz/api/twitter?apikey=${lol}&url=${ini_url}`)
				ini_url = ini_url.result
				ini_url = ini_url[ini_url.length - 1].link
				ini_buffer = await getBuffer(ini_url)
				client.sendMessage(from, ini_buffer, video, { quoted: mek })
				break
			case 'facebook':
            if (!isPremium) return reply(msg.notPremium())
				if (args.length == 0) return reply(`Example: ${prefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
				ini_url = args[0]
				ini_url = await fetchJson(`http://api.lolhuman.xyz/api/facebook?apikey=${lol}&url=${ini_url}`)
				ini_url = ini_url.result[0].link
				ini_buffer = await getBuffer(ini_url)
				client.sendMessage(from, ini_buffer, video, { quoted: mek })
			break
            case 'pin':
                if (!isRegistered) return reply(msg.notRegistered())
                if (!isGroup) return reply(msg.groupOnly())
                if (args.length == 0) return reply(`Usage: ${prefix + command} query\nExample: ${prefix + command} loli kawaii`)
                if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                    reply(msg.wait())
                    anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=${query}`)
                    anu = JSON.parse(JSON.stringify(anu));
                    anu = anu[Math.floor(Math.random() * anu.length)];
                    anu = await getBuffer(anu)
                    client.sendMessage(from, anu, image, {quoted: mek})
                    limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'loliv':
            case 'lolivid':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                anu = await fetchText('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/loli.txt')
                .then(async (body) => {
                anu = body.split('\n')
                anu = anu[Math.floor(Math.random() * anu.length)]
                anu = await getBuffer(anu)
                client.sendMessage(from, anu, video)
                limit.addLimit(sender, _limit, isPremium, isOwner)
                })
                .catch(async (err) => {
                    console.error(err)
                    reply('Error!')
                })
            break

			// FUN
            case 'simi': 
                if (!isRegistered) return reply(msg.notRegistered())
                if (!q) return await reply('mau nanya apa?')
                if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                try {
                    simi = await fetchJson(`http://api.lolhuman.xyz/api/simi?apikey=${lol}&text=${query}`)
                    reply(simi.result)
                    limit.addLimit(sender, _limit, isPremium, isOwner)
                } catch {
                    reply('jangan emot')
                }
            break

            case 'caklontong':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (isCakLontong(sender)) return reply(`Ada jawaban yang belum dijawab`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                const waktufamily100 = 30
                const respcaklontong = await axios.get(`https://lolhuman.herokuapp.com/api/tebak/caklontong2?apikey=${lol}`)
                const jawabancaklontong = respcaklontong.data.result.answer.toLowerCase()
                const informasicaklontong = respcaklontong.data.result.information.toLowerCase()
                reply(`Soal Waktu 30 Detik\n\n${respcaklontong.data.result.question} ?`)
                limit.addLimit(sender, _limit, isPremium, isOwner)
                addResultCaklontong(sender, jawabancaklontong, informasicaklontong, waktufamily100)
                cekWaktuCaklontong(sender)
            break

            case 'tebakgambar':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (isTebakGambar(sender)) return reply(`Ada jawaban yang belum dijawab`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            const waktujwb = 30
                const resptebakgambar = await axios.get(`https://videfikri.com/api/tebakgambar/`)
                const jwbntolw = resptebakgambar.data.result.jawaban.toLowerCase()
                teks = `_Jawab Maksud Dari Gambar Ini_\n\nWaktu: 30 Detik`
                anu = await getBuffer(resptebakgambar.data.result.soal_gbr)
                client.sendMessage(from, anu, image, { quoted: mek, caption: teks })
                limit.addLimit(sender, _limit, isPremium, isOwner)
                addgambar(sender, jwbntolw, waktujwb)
                cekWaktuTG(sender)
            break
			case 'tebok':
            if (!isRegistered) return reply(msg.notRegistered())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                client.sendMessage(from, `Jawaban nyontek : ${getjawaban(sender)}`, text, { quoted: mek })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'cakjawab':
            if (!isRegistered) return reply(msg.notRegistered())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                client.sendMessage(from, `Jawaban nyontek : ${getjawabanCaklontong(sender)}`, text, { quoted: mek })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'wancak':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                buffer = await getBuffer(`http://api.lolhuman.xyz/api/onecak?apikey=${lol}`)
                client.sendMessage(from, buffer, image, { quoted: mek })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'dark':
            case 'darkjokes':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/meme/darkjoke?apikey=${lol}`)
                client.sendMessage(from, buffer, image, { quoted: mek })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'meme':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                buffer = await getBuffer(`https://lolhuman.herokuapp.com/api/meme/memeindo?apikey=${lol}`)
                client.sendMessage(from, buffer, image, { quoted: mek })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
			
            // QUOTES
            case 'funik':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                const funik = await axios.get(`https://lolhuman.herokuapp.com/api/random/faktaunik?apikey=${lol}`)
                reply(`_*Fakta Unik*_\n\n${funik.data.result}`)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            case 'fakta':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                const faktas = await axios.get('https://videfikri.com/api/fakta')
                reply(`_*Fakta Unik*_\n\n${faktas.data.result.fakta}`)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            case 'kanye':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                const kanye = await axios.get(`https://dhyzx-free-api.herokuapp.com/api/quotes/kanye?apikey=undefined`)
                reply(`${kanye.data.result.text_id}`)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'puisi':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                const puisi = await axios.get('https://masgi.herokuapp.com/api/puisi2')
                reply(`${puisi.data.data}`)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'quotes':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                quotes = await fetchJson(`http://api.lolhuman.xyz/api/random/quotes?apikey=${lol}`)
                quotes = quotes.result
                author = quotes.by
                quotes = quotes.quote
                reply(`_${quotes}_\n\n*― ${author}*`)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            case 'katabijak':
            case 'pantun':
            case 'bucin':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/random/${command}?apikey=${lol}`)
                reply(get_result.result)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            case 'dilan':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            quotedilan = await fetchJson(`http://api.lolhuman.xyz/api/quotes/dilan?apikey=${lol}`)
                reply(quotedilan.result)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            case 'quotesanime':
            case 'quotenime':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                quotes = await fetchJson(`http://api.lolhuman.xyz/api/random/quotesnime?apikey=${lol}`)
                quotes = quotes.result
                quote = quotes.quote
                char = quotes.character
                anime = quotes.anime
                episode = quotes.episode
                reply(`_${quote}_\n\n*― ${char}*\n*― ${anime} ${episode}*`)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'cerpen':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/cerpen?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Title : ${get_result.title}\n`
                ini_txt += `Creator : ${get_result.creator}\n`
                ini_txt += `Story :\n${get_result.cerpen}`
                reply(ini_txt)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            case 'cerhor':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/ceritahoror?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Title : ${get_result.title}\n`
                ini_txt += `Desc : ${get_result.desc}\n`
                ini_txt += `Story :\n${get_result.story}\n`
                thumbnail = await getBuffer(get_result.thumbnail)
                client.sendMessage(from, thumbnail, image, { quoted: mek, caption: ini_txt })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'creepyfact':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                anu = await fetchText('https://raw.githubusercontent.com/TheSploit/CreepyFact/main/creepy.txt')
                .then(async (body) => {
                anu = body.split('\n')
                anu = anu[Math.floor(Math.random() * anu.length)]
                client.sendMessage(from, anu, text)
                limit.addLimit(sender, _limit, isPremium, isOwner)
                })
                .catch(async (err) => {
                    console.error(err)
                    reply('Error!')
                })
            break
            
            case 'artinama':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                if (args.length == 0) return reply(`Example: ${prefix + command} zein`)
                ini_nama = args.join(" ")
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/artinama?apikey=${lol}&nama=${ini_nama}`)
                reply(get_result.result)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'jodoh':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} Tahu & Bacem`)
                ini_nama = args.join(" ").split("&")
                nama1 = ini_nama[0].trim()
                nama2 = ini_nama[1].trim()
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/jodoh/${nama1}/${nama2}?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Positif : ${get_result.positif}\n`
                ini_txt += `Negative : ${get_result.negatif}\n`
                ini_txt += `Deskripsi : ${get_result.deskripsi}`
                reply(ini_txt)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'weton':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} 12 12 2020`)
                tanggal = args[0]
                bulan = args[1]
                tahun = args[2]
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/weton/${tanggal}/${bulan}/${tahun}?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Weton : ${get_result.weton}\n`
                ini_txt += `Pekerjaan : ${get_result.pekerjaan}\n`
                ini_txt += `Rejeki : ${get_result.rejeki}\n`
                ini_txt += `Jodoh : ${get_result.jodoh}`
                reply(ini_txt)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'jadian':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                if (args.length == 0) return reply(`Example: ${prefix + command} 12 12 2020`)
                tanggal = args[0]
                bulan = args[1]
                tahun = args[2]
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadian/${tanggal}/${bulan}/${tahun}?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Karakteristik : ${get_result.karakteristik}\n`
                ini_txt += `Deskripsi : ${get_result.deskripsi}`
                reply(ini_txt)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'tebakumur':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                if (args.length == 0) return reply(`Example: ${prefix + command} zein`)
                ini_name = args.join(" ")
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/tebakumur?apikey=${lol}&name=${ini_name}`)
                get_result = get_result.result
                ini_txt = `Nama : ${get_result.name}\n`
                ini_txt += `Umur : ${get_result.age}`
                reply(ini_txt)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            // NSFW
            case 'pussy': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.pussy()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'nekos': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.neko()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'lesbian': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.lesbian()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'kuni': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.kuni()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'cumsluts': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.cumsluts()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'classic': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.classic()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'bj': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.bJ()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'anal': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.anal()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'yuri18': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.yuri()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'trap': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.trap()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'tits': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.tits()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'pussyart': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.pussyArt()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'kemonomimi': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.kemonomimi()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'kitsune': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.kitsune()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'keta': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.keta()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'holo': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.holo()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'holoero': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.holoEro()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'hentai': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.hentai()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'futanari': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.futanari()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'femdom': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.femdom()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'erofeet': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.eroFeet()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'feet': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.feet()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'ero': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.ero()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'erokitsune': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.eroKitsune()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'erokemonomimi': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.eroKemonomimi()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'eroneko': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.eroNeko()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'eroyuri': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!isNsfw) return reply(msg.notNsfw())
            buffer = await getBuffer((await neko.nsfw.eroYuri()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'cumarts': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!isNsfw) return reply(msg.notNsfw())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            buffer = await getBuffer((await neko.nsfw.cumArts()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'blowjob': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!isNsfw) return reply(msg.notNsfw())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            buffer = await getBuffer((await neko.nsfw.blowJob()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'spank': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!isNsfw) return reply(msg.notNsfw())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            buffer = await getBuffer((await neko.nsfw.spank()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'gasm': 
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!isNsfw) return reply(msg.notNsfw())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            buffer = await getBuffer((await neko.nsfw.gasm()).url)
        	await client.sendMessage(from, buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            // ANIME
            case 'nhsearch':
                if (!isRegistered) return reply(msg.notRegistered())
                if (!isGroup) return reply(msg.groupOnly())
                if (args.length == 0) return reply(`Example: ${prefix + command} 193941`)
                if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                get_result = await api.getID(query).json()
                console.log(get_result)
                get_result = get_result.base
                ini_txt = `ID : ${get_result.id}\n`
                ini_txt += `URL : ${get_result.url}\n`
                ini_txt += `TITLE : ${get_result.title.translated}\n\n`
                ini_txt += `parodies : ${get_result.tag_table.parodies}\n`
                ini_txt += `characters : ${get_result.tag_table.characters}\n`
                ini_txt += `tag : ${get_result.tag_table.tag}\n`
                ini_txt += `artist : ${get_result.tag_table.artist}\n`
                ini_txt += `groups : ${get_result.tag_table.groups}\n`
                ini_txt += `languages : ${get_result.tag_table.languages}\n`
                ini_txt += `categories : ${get_result.tag_table.categories}\n`
                ini_txt += `uploaded : ${get_result.uploaded}\n`
                ini_txt += `pages : ${get_result.number_pages}\n`
                    ini_buffer = await getBuffer(get_result.images.cover)
                client.sendMessage(from, ini_buffer, image, { quoted: mek, caption: ini_txt })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break

             // AniManga //
            case 'character':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} Miku Nakano`)
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/character?apikey=${lol}&query=${query}`)
                get_result = get_result.result
                ini_txt = `Id : ${get_result.id}\n`
                ini_txt += `Name : ${get_result.name.full}\n`
                ini_txt += `Native : ${get_result.name.native}\n`
                ini_txt += `Favorites : ${get_result.favourites}\n`
                ini_txt += `Media : \n`
                ini_media = get_result.media.nodes
                for (var x of ini_media) {
                    ini_txt += `- ${x.title.romaji} (${x.title.native})\n`
                }
                ini_txt += `\nDescription : \n${get_result.description.replace(/__/g, "_")}`
                thumbnail = await getBuffer(get_result.image.large)
                client.sendMessage(from, thumbnail, image, { quoted: mek, caption: ini_txt })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'manga':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/manga?apikey=${lol}&query=${query}`)
                get_result = get_result.result
                ini_txt = `Id : ${get_result.id}\n`
                ini_txt += `Id MAL : ${get_result.idMal}\n`
                ini_txt += `Title : ${get_result.title.romaji}\n`
                ini_txt += `English : ${get_result.title.english}\n`
                ini_txt += `Native : ${get_result.title.native}\n`
                ini_txt += `Format : ${get_result.format}\n`
                ini_txt += `Chapters : ${get_result.chapters}\n`
                ini_txt += `Volume : ${get_result.volumes}\n`
                ini_txt += `Status : ${get_result.status}\n`
                ini_txt += `Source : ${get_result.source}\n`
                ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
                ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
                ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
                ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
                ini_txt += `Score : ${get_result.averageScore}%\n`
                ini_txt += `Characters : \n`
                ini_character = get_result.characters.nodes
                for (var x of ini_character) {
                    ini_txt += `- ${x.name.full} (${x.name.native})\n`
                }
                ini_txt += `\nDescription : ${get_result.description}`
                thumbnail = await getBuffer(get_result.coverImage.large)
                client.sendMessage(from, thumbnail, image, { quoted: mek, caption: ini_txt })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'anime':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/anime?apikey=${lol}&query=${query}`)
                get_result = get_result.result
                ini_txt = `Id : ${get_result.id}\n`
                ini_txt += `Id MAL : ${get_result.idMal}\n`
                ini_txt += `Title : ${get_result.title.romaji}\n`
                ini_txt += `English : ${get_result.title.english}\n`
                ini_txt += `Native : ${get_result.title.native}\n`
                ini_txt += `Format : ${get_result.format}\n`
                ini_txt += `Episodes : ${get_result.episodes}\n`
                ini_txt += `Duration : ${get_result.duration} mins.\n`
                ini_txt += `Status : ${get_result.status}\n`
                ini_txt += `Season : ${get_result.season}\n`
                ini_txt += `Season Year : ${get_result.seasonYear}\n`
                ini_txt += `Source : ${get_result.source}\n`
                ini_txt += `Start Date : ${get_result.startDate.day} - ${get_result.startDate.month} - ${get_result.startDate.year}\n`
                ini_txt += `End Date : ${get_result.endDate.day} - ${get_result.endDate.month} - ${get_result.endDate.year}\n`
                ini_txt += `Genre : ${get_result.genres.join(", ")}\n`
                ini_txt += `Synonyms : ${get_result.synonyms.join(", ")}\n`
                ini_txt += `Score : ${get_result.averageScore}%\n`
                ini_txt += `Characters : \n`
                ini_character = get_result.characters.nodes
                for (var x of ini_character) {
                    ini_txt += `- ${x.name.full} (${x.name.native})\n`
                }
                ini_txt += `\nDescription : ${get_result.description}`
                thumbnail = await getBuffer(get_result.coverImage.large)
                client.sendMessage(from, thumbnail, image, { quoted: mek, caption: ini_txt })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'kusonime':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/kusonimesearch?apikey=${lol}&query=${query}`)
                get_result = get_result.result
                ini_txt = `Title : ${get_result.title}\n`
                ini_txt += `Japanese : ${get_result.japanese}\n`
                ini_txt += `Genre : ${get_result.genre}\n`
                ini_txt += `Seasons : ${get_result.seasons}\n`
                ini_txt += `Producers : ${get_result.producers}\n`
                ini_txt += `Type : ${get_result.type}\n`
                ini_txt += `Status : ${get_result.status}\n`
                ini_txt += `Total Episode : ${get_result.total_episode}\n`
                ini_txt += `Score : ${get_result.score}\n`
                ini_txt += `Duration : ${get_result.duration}\n`
                ini_txt += `Released On : ${get_result.released_on}\n`
                ini_txt += `Desc : ${get_result.desc}\n`
                link_dl = get_result.link_dl
                for (var x in link_dl) {
                    ini_txt += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        ini_txt += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                ini_buffer = await getBuffer(get_result.thumbnail)
                client.sendMessage(from, ini_buffer, image, { quoted: mek, caption: ini_txt })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'otakudesu':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesusearch?apikey=${lol}&query=${query}`)
                get_result = get_result.result
                ini_txt = `Title : ${get_result.title}\n`
                ini_txt += `Japanese : ${get_result.japanese}\n`
                ini_txt += `Judul : ${get_result.judul}\n`
                ini_txt += `Type : ${get_result.type}\n`
                ini_txt += `Episode : ${get_result.episodes}\n`
                ini_txt += `Aired : ${get_result.aired}\n`
                ini_txt += `Producers : ${get_result.producers}\n`
                ini_txt += `Genre : ${get_result.genres}\n`
                ini_txt += `Duration : ${get_result.duration}\n`
                ini_txt += `Studios : ${get_result.status}\n`
                ini_txt += `Rating : ${get_result.rating}\n`
                ini_txt += `Credit : ${get_result.credit}\n`
                get_link = get_result.link_dl
                for (var x in get_link) {
                    ini_txt += `\n\n*${get_link[x].title}*\n`
                    for (var y in get_link[x].link_dl) {
                        ini_info = get_link[x].link_dl[y]
                        ini_txt += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                        ini_txt += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                        ini_txt += `\`\`\`Link : \`\`\`\n`
                        down_link = ini_info.link_dl
                        for (var z in down_link) {
                            ini_txt += `${z} - ${down_link[z]}\n`
                        }
                    }
                }
                reply(ini_txt)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            // Information

            case 'heroml':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} Fanny`)
                hero = args.join(" ")
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/heroml/${hero}?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Name : ${get_result.hero_name}\n`
                ini_txt += `Entrance Quotes : ${get_result.ent_quotes}\n`
                ini_txt += `Role : ${get_result.detail.role}\n`
                ini_txt += `Specialty : ${get_result.detail.specialty}\n`
                ini_txt += `Laning : ${get_result.detail.laning_recommendation}\n`
                ini_txt += `Release : ${get_result.detail.release_date}\n`
                ini_txt += `Movement speed : ${get_result.attr.movement_speed}\n`
                ini_txt += `Physical attack : ${get_result.attr.physical_attack}\n`
                ini_txt += `Magic power : ${get_result.attr.magic_power}\n`
                ini_txt += `Physical defense : ${get_result.attr.physical_defense}\n`
                ini_txt += `Magic defense : ${get_result.attr.magic_defense}\n`
                ini_txt += `Critical rate : ${get_result.attr.basic_atk_crit_rate}\n`
                ini_txt += `Hp : ${get_result.attr.hp}\n`
                ini_txt += `Mana : ${get_result.attr.mana}\n`
                ini_txt += `Mana regen : ${get_result.attr.mana_regen}\n`
                ini_icon = await getBuffer(get_result.icon)
            client.sendMessage(from, ini_icon, image, { quoted: mek, caption: ini_txt })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'genshin':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                if (args.length == 0) return reply(`Example: ${prefix + command} jean`)
                hero = args.join(" ")
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/genshin/${hero}?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Name : ${get_result.title}\n`
                ini_txt += `Intro : ${get_result.intro}\n`
                ini_txt += `Icon : ${get_result.icon}\n`
                ini_icon = await getBuffer(get_result.cover1)
                client.sendMessage(from, ini_icon, image, { quoted: mek, caption: ini_txt })
                ini_voice = await getBuffer(get_result.cv[0].audio[0])
                client.sendMessage(from, ini_voice, audio, { quoted: mek, mimetype: Mimetype.mp4Audio })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'wikipedia':
            case 'wiki':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                if (args.length == 0) return reply(`Example: ${prefix + command} Tahu`)
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/wiki?apikey=${lol}&query=${query}`)
                get_result = get_result.result
                reply(get_result)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'jadwaltv':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                if (args.length == 0) return reply(`Example: ${prefix + command} RCTI`)
                channel = args[0]
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/jadwaltv/${channel}?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Jadwal TV ${channel.toUpperCase()}\n`
                for (var x in get_result) {
                    ini_txt += `${x} - ${get_result[x]}\n`
                }
            reply(ini_txt)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            case 'infogempa':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/infogempa?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Lokasi : ${get_result.lokasi}\n`
                ini_txt += `Waktu : ${get_result.waktu}\n`
                ini_txt += `Potensi : ${get_result.potensi}\n`
                ini_txt += `Magnitude : ${get_result.magnitude}\n`
                ini_txt += `Kedalaman : ${get_result.kedalaman}\n`
                ini_txt += `Koordinat : ${get_result.koordinat}`
                get_buffer = await getBuffer(get_result.map)
                client.sendMessage(from, get_buffer, image, { quoted: mek, caption: ini_txt })
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
            
            case 'cuaca':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                if (args.length == 0) return reply(`Example: ${prefix + command} Yogyakarta`)
                daerah = args[0]
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/cuaca/${daerah}?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Tempat : ${get_result.tempat}\n`
                ini_txt += `Cuaca : ${get_result.cuaca}\n`
                ini_txt += `Angin : ${get_result.angin}\n`
                ini_txt += `Description : ${get_result.description}\n`
                ini_txt += `Kelembapan : ${get_result.kelembapan}\n`
                ini_txt += `Suhu : ${get_result.suhu}\n`
                ini_txt += `Udara : ${get_result.udara}\n`
                ini_txt += `Permukaan laut : ${get_result.permukaan_laut}\n`
                client.sendMessage(from, { degreesLatitude: get_result.latitude, degreesLongitude: get_result.longitude }, location, { quoted: mek })
                reply(ini_txt)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'covidindo':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/corona/indonesia?apikey=${lol}`)
                get_result = get_result.result
                ini_txt = `Positif : ${get_result.positif}\n`
                ini_txt += `Sembuh : ${get_result.sembuh}\n`
                ini_txt += `Dirawat : ${get_result.dirawat}\n`
                ini_txt += `Meninggal : ${get_result.meninggal}`
                reply(ini_txt)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break


			// STALKER
            case 'ttstalk':
            case 'tiktokstalk':
			if (!isRegistered) return reply(msg.notRegistered())
            if (args.length == 0) return reply(`Usage: ${prefix + command} username\nExample: ${prefix + command} nimeuwu`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                	console.log('Sending Tiktok Profile')
                    const namatt = await axios.get(`https://lolhuman.herokuapp.com/api/stalktiktok/${q}?apikey=${lol}`)
                    hasil = `*_TIKTOK STALK_*\n\n*Username :* ${namatt.data.result.username}\n*Nickname :* ${namatt.data.result.nickname}\n*Bio :* ${namatt.data.result.bio}\n\n*Followers :* ${namatt.data.result.followers}\n*Followings :* ${namatt.data.result.followings}\n*Likes :* ${namatt.data.result.likes}\n*Video :* ${namatt.data.result.video}`
					buffer = await getBuffer(namatt.data.result.user_picture)
                    await client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
                    limit.addLimit(sender, _limit, isPremium, isOwner)
                        .catch(async (err) => {
                            console.error(err)
                            reply('ID Tidak Ketemu')
                        })
            break
            case 'ytstalk':
			if (!isRegistered) return reply(msg.notRegistered())
            if (args.length == 0) return reply(`Usage: ${prefix + command} username\nExample: ${prefix + command} jess no limit`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                    console.log('Sending yt Profile')
                    const namayt = await axios.get(`https://lolhuman.herokuapp.com/api/ytchannel?apikey=${lol}&query=${q}`)
                    hasil = `*_YOUTUBE STALK_*\n\n*Channel Name :* ${namayt.data.result[0].channel_name}\n*Channel About :* ${namayt.data.result[0].channel_about}\n\n*Channel Created :* ${namayt.data.result[0].channel_created}`
					buffer = await getBuffer(namayt.data.result[0].channel_picture.high.url)
                    await client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
                    limit.addLimit(sender, _limit, isPremium, isOwner)
                        .catch(async (err) => {
                            console.error(err)
                            reply('ID Tidak Ketemu')
                        })
            break

            // WEBZONE
            case 'ssweb':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!isUrl(url) && !url.includes('http')) return reply(`*pake http://*\nContoh : http://facebook.com`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                ini_link = args[0]
                ini_buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/ssweb?apikey=${lol}&url=${ini_link}`)
                client.sendMessage(from, ini_buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'lk21':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} Transformer`)
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/lk21?apikey=${lol}&query=${query}`)
                get_result = get_result.result
                ini_txt = `Title : ${get_result.title}\n`
                ini_txt += `Link : ${get_result.link}\n`
                ini_txt += `Genre : ${get_result.genre}\n`
                ini_txt += `Views : ${get_result.views}\n`
                ini_txt += `Duration : ${get_result.duration}\n`
                ini_txt += `Tahun : ${get_result.tahun}\n`
                ini_txt += `Rating : ${get_result.rating}\n`
                ini_txt += `Desc : ${get_result.desc}\n`
                ini_txt += `Actors : ${get_result.actors.join(", ")}\n`
                ini_txt += `Location : ${get_result.location}\n`
                ini_txt += `Date Release : ${get_result.date_release}\n`
                ini_txt += `Language : ${get_result.language}\n`
                ini_txt += `Link Download : ${get_result.link_dl}`
                thumbnail = await getBuffer(get_result.thumbnail)
                client.sendMessage(from, thumbnail, image, { quoted: mek, caption: ini_txt })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'drakorongoing':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            get_result = await fetchJson(`http://api.lolhuman.xyz/api/drakorongoing?apikey=${lol}`)
            get_result = get_result.result
            ini_txt = "Ongoing Drakor\n\n"
            for (var x of get_result) {
                ini_txt += `Title : ${x.title}\n`
                ini_txt += `Link : ${x.link}\n`
                ini_txt += `Thumbnail : ${x.thumbnail}\n`
                ini_txt += `Year : ${x.category}\n`
                ini_txt += `Total Episode : ${x.total_episode}\n`
                ini_txt += `Genre : ${x.genre.join(", ")}\n\n`
            }
            reply(ini_txt)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'wattpad':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} https://www.wattpad.com/707367860-kumpulan-quote-tere-liye-tere-liye-quote-quote`)
            ini_url = args[0]
            get_result = await fetchJson(`http://api.lolhuman.xyz/api/wattpad?apikey=${lol}&url=${ini_url}`)
            get_result = get_result.result
            ini_txt = `Title : ${get_result.title}\n`
            ini_txt += `Rating : ${get_result.rating}\n`
            ini_txt += `Motify date : ${get_result.modifyDate}\n`
            ini_txt += `Create date: ${get_result.createDate}\n`
            ini_txt += `Word : ${get_result.word}\n`
            ini_txt += `Comment : ${get_result.comment}\n`
            ini_txt += `Vote : ${get_result.vote}\n`
            ini_txt += `Reader : ${get_result.reader}\n`
            ini_txt += `Pages : ${get_result.pages}\n`
            ini_txt += `Description : ${get_result.desc}\n\n`
            ini_txt += `Story : \n${get_result.story}`
            thumbnail = await getBuffer(get_result.photo)
            client.sendMessage(from, thumbnail, image, { quoted: mek, caption: ini_txt })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'wattpadsearch':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (args.length == 0) return reply(`Example: ${prefix + command} Tere Liye`)
            get_result = await fetchJson(`http://api.lolhuman.xyz/api/wattpadsearch?apikey=${lol}&query=${query}`)
            get_result = get_result.result
            ini_txt = "Wattpad Seach : \n"
            for (var x of get_result) {
                ini_txt += `Title : ${x.title}\n`
                ini_txt += `Url : ${x.url}\n`
                ini_txt += `Part : ${x.parts}\n`
                ini_txt += `Motify date : ${x.modifyDate}\n`
                ini_txt += `Create date: ${x.createDate}\n`
                ini_txt += `Coment count: ${x.commentCount}\n\n`
            }
            reply(ini_txt)
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

			case 'lirik':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!q) return await reply('mau nyari lirik lagu apa?')
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                const lirik = await axios.get(`https://lolhuman.herokuapp.com/api/lirik?apikey=${lol}&query=${query}`)
                await reply(`Pencarian : ${query}\n\n${lirik.data.result}`, text)
                limit.addLimit(sender, _limit, isPremium, isOwner)
                    .catch(async (err) => {
                        console.error(err)
                        reply('Error!')
                    })
            break		
			case 'tomp3':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if ((isMedia && mek.message.videoMessage.seconds <= 30 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds <= 30)) {
                encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                media = await client.downloadAndSaveMediaMessage(encmedia, "video")
                exec(`ffmpeg -y -i ${media} -b:a 192K -ar 44100 -vn -f mp3 tomp3.mp3`, function(err) {
                    fs.unlinkSync(media)
                    if (err) return reply("error om")
                    client.sendMessage(from, fs.readFileSync('./tomp3.mp3'), audio, {mimetype: 'audio/ogg', quoted: mek})
                    limit.addLimit(sender, _limit, isPremium, isOwner)
                    fs.unlinkSync('./tomp3.mp3')
                })
            }
            break
			case 'tr':
			case 'translate':
            if (!isRegistered) return reply(msg.notRegistered())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if (!q.includes('|')) return reply(`Usage :\n${prefix + command} [Pesan | Kode Negara]\nExample : ${prefix + command} hai | en`)
            const texto = q.substring(0, q.indexOf('|') - 1)
            const languaget = q.substring(q.lastIndexOf('|') + 2)
                translate(texto, {to: languaget}).then(res => {reply(res.text, text)})
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break		
			

			// ANIME
            
            case 'bts':
            case 'exo':
            case 'cecan':
            case 'cogan':
            case 'blackpink':

            case 'elf':
            case 'art':
            case 'kanna':
            case 'neko':
            case 'shota':
            case 'husbu':
            case 'sagiri':
            case 'shinobu':            
            case 'megumin':
            case 'wallnime':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                anu = await getBuffer(`http://api.lolhuman.xyz/api/random/${command}?apikey=${lol}`)
				client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break

			// MEDIA
            case 'nsfwcheck':
            case 'cek':
            if (!isRegistered) return
            if ((isQuotedSticker || isQuotedImage) && args.length == 0) {
                encmedia =  JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                const filePath = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                const form = new FormData();
                const stats = fs.statSync(filePath);
                const fileSizeInBytes = stats.size;
                const fileStream = fs.createReadStream(filePath);
                form.append('img', fileStream, { knownLength: fileSizeInBytes });
                const options = {
                    method: 'POST',
                    credentials: 'include',
                    body: form
                }
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/nsfwcheck?apikey=${lol}`, {...options })
                fs.unlinkSync(filePath)
                get_result = get_result.result
                is_nsfw = "*Aman*"
                if (Number(get_result.replace("%", "")) >= 50) is_nsfw = "*Tidak aman*"
                reply(`Apakah gambar ini aman? ${is_nsfw}\n\nGambar ini ${is_nsfw}\nDengan score : ${get_result}`)
            } else {
                reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
            }
            break
            case 'wasted':
            if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                ini_url = args[0]
                ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/editor/wasted?apikey=${lol}&img=${ini_url}`)
                client.sendMessage(from, ini_buffer, image, { quoted: mek })
            limit.addLimit(sender, _limit, isPremium, isOwner)
            break

            case 'spamsms':
            if (!isPremium) return reply(msg.notPremium())
                if (args.length == 0) return reply(`Example: ${prefix + command} 62812xxxxxx`)
                nomor = args[0]
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam1?apikey=${lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam2?apikey=${lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam3?apikey=${lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam4?apikey=${lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam5?apikey=${lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam6?apikey=${lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam7?apikey=${lol}&nomor=${nomor}`)
                await fetchJson(`http://api.lolhuman.xyz/api/sms/spam8?apikey=${lol}&nomor=${nomor}`)
            reply("Success")
            break

            case 'wait':
            case 'what':
            if (!isPremium) return reply(msg.notPremium())
            if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                const filePath = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                const form = new FormData();
                const stats = fs.statSync(filePath);
                const fileSizeInBytes = stats.size;
                const fileStream = fs.createReadStream(filePath);
                form.append('img', fileStream, { knownLength: fileSizeInBytes });
                const options = {
                    method: 'POST',
                    credentials: 'include',
                    body: form
                }
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/wait?apikey=${lol}`, {...options })
                fs.unlinkSync(filePath)
                get_result = get_result.result
                ini_video = await getBuffer(get_result.video)
                ini_txt = `Anilist id : ${get_result.anilist_id}\n`
                ini_txt += `MAL id : ${get_result.mal_id}\n`
                ini_txt += `Title Romaji : ${get_result.title_romaji}\n`
                ini_txt += `Title Native : ${get_result.title_native}\n`
                ini_txt += `Title English : ${get_result.title_english}\n`
                ini_txt += `at : ${get_result.at}\n`
                ini_txt += `Episode : ${get_result.episode}\n`
                ini_txt += `Similarity : ${get_result.similarity}`
                client.sendMessage(from, ini_video, video, { quoted: mek, caption: ini_txt })
            } else {
                reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
            }
            break

            case 'qrreader':
            case 'qr':
            if (!isRegistered) return reply(msg.notRegistered())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                const filePath = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                const form = new FormData();
                const stats = fs.statSync(filePath);
                const fileSizeInBytes = stats.size;
                const fileStream = fs.createReadStream(filePath);
                form.append('img', fileStream, { knownLength: fileSizeInBytes });
                const options = {
                    method: 'POST',
                    credentials: 'include',
                    body: form
                }
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/read-qr?apikey=${lol}`, {...options })
                fs.unlinkSync(filePath)
                reply("Result: " + get_result.result)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            } else {
                reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
            }
            break

            case 'ocr':
            if (!isRegistered) return reply(msg.notRegistered())
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
            if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                var filePath = await client.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                var form = new FormData();
                var stats = fs.statSync(filePath);
                var fileSizeInBytes = stats.size;
                var fileStream = fs.createReadStream(filePath);
                form.append('img', fileStream, { knownLength: fileSizeInBytes });
                var options = {
                    method: 'POST',
                    credentials: 'include',
                    body: form
                }
                get_result = await fetchJson(`http://api.lolhuman.xyz/api/ocr?apikey=${lol}`, {...options })
                fs.unlinkSync(filePath)
                get_result = get_result.result
                reply(`Result : ${get_result}`)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            } else {
                reply(`Kirim gambar dengan caption ${prefix + command} atau tag gambar yang sudah dikirim`)
            }
            break
            case 'wanted':
                if (!isRegistered) return reply(msg.notRegistered())
                if (!isGroup) return reply(msg.groupOnly())
                if (!isQuotedImage) return reply('Reply Gambarnya gan')
                if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                media = await client.downloadMediaMessage(encmedia)
                const imageUrl13 = await uploadImages(media, false)
				const teeks1 = q.substring(0, q.indexOf('|') - 1)
                const teeks12 = q.substring(q.lastIndexOf('|') + 2)
                anu = await getBuffer(`https://videfikri.com/api/textmaker/wanted/?urlgbr=${imageUrl13}&text1=${teeks1}&text2=${teeks12}`)
                await client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
			case 'gtav': //KRIS
			case 'gta5': //KRIS
                if (!isRegistered) return reply(msg.notRegistered())
                if (!isGroup) return reply(msg.groupOnly())
                if (!isQuotedImage) return reply('Reply Gambarnya gan')
                if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                media = await client.downloadMediaMessage(encmedia)
                const imageUrl14 = await uploadImages(media, false)
                anu = await getBuffer(`https://videfikri.com/api/textmaker/gtavposter/?urlgbr=${imageUrl14}`)
                await client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
			break
			case 'ttefek': //KRIS
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!q.includes('|')) return reply(`Example : ${prefix + command} zen | uwu`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
				const teeks11 = q.substring(0, q.indexOf('|') - 1)
                const teeks13 = q.substring(q.lastIndexOf('|') + 2)
                anu = await getBuffer(`https://videfikri.com/api/textmaker/tiktokeffect/?text1=${teeks11}&text2=${teeks13}`)
                await client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
			case 'trump':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!q) return await reply(`Example : ${prefix + command} textmu`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                const trumj = await axios.get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${query}`)
                anu = await getBuffer(trumj.data.message)
				await client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
			case 'tahta':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!q) return await reply(`Example : ${prefix + command} textmu`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                anu = await getBuffer(`https://api.zeks.xyz/api/hartatahta?text=${q}&apikey=apivinz`)
				await client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
			case 'write':
            case 'nulis':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!q) return await reply(`Example : ${prefix + command} textmu`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                anu = await getBuffer(`https://lolhuman.herokuapp.com/api/nulis?apikey=${lol}&text=${q}`)
				await client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
			case 'phlogo':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!q.includes('|')) return reply(`Example : ${prefix + command} zen | uwu`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                const kiri = q.substring(0, q.indexOf('|') - 1)
                const kanan = q.substring(q.lastIndexOf('|') + 2)
                anu = await getBuffer(`https://api.zeks.xyz/api/phlogo?text1=${kiri}&text2=${kanan}&apikey=apivinz`)
				await client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
			case 'phcomment':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!q.includes('|')) return reply(`Example : ${prefix + command} zen | uwu`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)

				try {
					ppPhRaw = await client.getProfilePicture(sender)
					} catch {
						ppPhRaw = errorImg
					}

                const dataPpPh = await bent('buffer')(ppPhRaw)
                const linkPpPh = await uploadImages(dataPpPh, `${sender}_ph`)
                const preprocessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
				anu = await getBuffer(preprocessPh.data.message)
				await client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break
			case 'ytc':
            case 'ytcomment':
			if (!isRegistered) return reply(msg.notRegistered())
            if (!isGroup) return reply(msg.groupOnly())
            if (!q.includes('|')) return reply(`Example : ${prefix + command} zen | uwu`)
            if (limit.isLimit(sender, _limit, limitCount, isPremium, isOwner)) return reply(msg.limit())
				const ytc1 = q.substring(0, q.indexOf('|') - 1)
                const ytc2 = q.substring(q.lastIndexOf('|') + 2)
				
				try {
					ppytc = await client.getProfilePicture(sender)
					} catch {
						ppytc = errorImg
					}

                const datappyt = await bent('buffer')(ppytc)
                const linkppyt = await uploadImages(datappyt, `${sender}_ph`)
                anu = await getBuffer(`https://lolhuman.herokuapp.com/api/ytcomment?apikey=${lol}&username=${ytc1}&comment=${ytc2}&img=${linkppyt}`)
                await client.sendMessage(from, anu, image)
                limit.addLimit(sender, _limit, isPremium, isOwner)
            break


			// PLAYER PROFILE
            case 'afk': 
            if (!isRegistered) return reply(msg.notRegistered())
			if (!isGroup) return reply(msg.groupOnly())
                if (isAfkOn) return reply(msg.afkOnAlready())
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender, time, reason, _afk)
                reply(msg.afkOn(pushname, reason))
            break

			case 'profile': //Cek Player Profile
            case 'me':
            if (!isRegistered) return reply(msg.notRegistered())
			if (!isGroup) return reply(msg.groupOnly())
                const username = pushname
                const statuses = await client.getStatus(sender)
                const adm = isGroupAdmins ? 'Yes' : 'No'
                cekExp = ms(premium.getPremiumExpired(sender, _premium) - Date.now())
                const premi = isPremium ? `-${cekExp.days} Days` : 'No'
                const levelMe = level.getLevelingLevel(sender, _level)
                const xpMe = level.getLevelingXp(sender, _level)
                const req = 10 * Math.pow(levelMe, 2) + 50 * levelMe + 100
                const kantongs = atm.checkATMuser(sender, _uang)
                const limitnya = isPremium || isOwner ? 'Unlimited' : `${limit.getLimit(sender, _limit, limitCount)}`
                const { status } = statuses
                try {
                    profilePic = await client.getProfilePicture(sender)
                    } catch {
                    profilePic = errorImg
                    }
                buff = await getBuffer(profilePic)
                await client.sendMessage(from, buff, image, {quoted: mek, caption: msg.profile(username, status, premi, adm, levelMe, req, xpMe, kantongs, limitnya)})
            break
            case 'limit': //Cek Player Limit
			if (!isRegistered) return reply(msg.notRegistered())
			if (isPremium || isOwner) return reply('Limit left: 999999\n\n*_Limit direset setiap menit_*')
			reply(`_*Limit : ${limit.getLimit(sender, _limit, limitCount)} (25max)*_\n*_Limit direset tiap pukul 04:00_*\n`)
			break
			case 'level': //Cek Player Level
			if (!isRegistered) return reply(msg.notRegistered())
			if (!isGroup) return reply(msg.groupOnly())
                const userLevel = level.getLevelingLevel(sender, _level)
                const userXp = level.getLevelingXp(sender, _level)
                try {
					profilePic = await client.getProfilePicture(sender)
					} catch {
					profilePic = errorImg
					}
                const requiredXp = 10 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                const rank = new canvas.Rank()
                .setAvatar(profilePic)
                    .setLevel(userLevel)
                    .setLevelColor('#ffffff', '#5ebdd8')
                    .setRank(Number(level.getUserRank(sender, _level)))
                    .setRankColor('#ffffff', '#5ebdd8')
                    .setCurrentXP(userXp)
                    .setOverlay('#000000', 100, false)
                    .setRequiredXP(requiredXp)
                    .setProgressBar('#62d3f5', 'COLOR')
                    .setCustomStatusColor('#000000', 'COLOR')
                    .setBackground('COLOR', '#000000')
                    .setUsername(pushname)
                    .setDiscriminator(sender.substring(9, 13))
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${sender}_card.png`)
                        await client.sendMessage(from, buffer, image, {quoted: mek})
                        fs.unlinkSync(`${sender}_card.png`)
                    })
                .catch(async (err) => {
                    console.error(err)
                    reply('Error!')
                })
            break
			case 'belipremium':
			case 'beliprem' :
            case 'donate' :
            reply(msg.beliPrem())
			break
			case 'premiumlist':
            case 'listpremium':
                if (!isRegistered) return reply(msg.notRegistered())
                let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
                const deret = premium.getAllPremiumUser(_premium)
                const arrayPremi = []
                for (let i = 0; i < deret.length; i++) {
                    const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now())
                    arrayPremi.push(await client.getContacts(premium.getAllPremiumUser(_premium)[i]))
                    listPremi += `${i + 1}. wa.me/${premium.getAllPremiumUser(_premium)[i].replace('@s.whatsapp.net', '')}\n*Expired :* ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
                }
                await client.sendMessage(from, listPremi, text)
            break
			case 'premiumcheck':
            case 'cekpremium':
                if (!isPremium) return reply(msg.notPremium())
                cekExp = ms(premium.getPremiumExpired(sender, _premium) - Date.now())
                reply(`*PREMIUM EXPIRE*\n\n*Nomor :* ${sender}\n*Sisa Premium :* ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`)
            break
			case 'daftar':
				if (!isRegistered) return reply(msg.notRegistered())
		    	const jumlahUsers = _registered.length
			await client.sendMessage (from, `*Teman Shiro yg sudah mendaftar* : ${jumlahUsers}`, text)
            break
            case 'leaderboard': //Cek Leaderboard
            case 'leaderboards':
                if (!isRegistered) return reply(msg.notRegistered())
                if (!isGroup) return reply(msg.groupOnly())
                const resp = _level
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '*TOP 10 LEADERBOARD*\n\n'
                try {
                    for (let i = 0; i < 10; i++) {
                        var roles = 'Warrior III'
                        if (resp[i].level <= 5) {
                            roles = 'Warrior II'
                        } else if (resp[i].level <= 10) {
                            roles = 'Warrior I'
                        } else if (resp[i].level <= 15) {
                            roles = 'Elite III'
                        } else if (resp[i].level <= 20) {
                            roles = 'Elite II'
                        } else if (resp[i].level <= 25) {
                            roles = 'Elite I'
                        } else if (resp[i].level <= 30) {
                            roles = 'Master III'
                        } else if (resp[i].level <= 35) {
                            roles = 'Master II'
                        } else if (resp[i].level <= 40) {
                            roles = 'Master I'
                        } else if (resp[i].level <= 45) {
                            roles = 'GrandMaster III'
                        } else if (resp[i].level <= 50) {
                            roles = 'GrandMaster II'
                        } else if (resp[i].level <= 55) {
                            roles = 'GrandMaster I'
                        } else if (resp[i].level <= 60) {
                            roles = 'Epic III'
                        } else if (resp[i].level <= 65) {
                            roles = 'Epic II'
                        } else if (resp[i].level <= 70) {
                            roles = 'Epic I'
                        } else if (resp[i].level <= 75) {
                            roles = 'Legend III'
                        } else if (resp[i].level <= 80) {
                            roles = 'Legend II'
                        } else if (resp[i].level <= 85) {
                            roles = 'Legend I'
                        } else if (resp[i].level <= 90) {
                            roles = 'Mythic'
                        } else if (resp[i].level <= 95) {
                            roles = 'Mythical Glory'
                        } else if (resp[i].level >= 100) {
                            roles = 'Immortal'
                        } 

                        leaderboard += `${i + 1}. wa.me/${_level[i].id.replace('@s.whatsapp.net', '')}\n\n*Role :* ${roles}\n*Level :* ${_level[i].level}\n*XP :* ${_level[i].xp}\n━━━━━━━━━━━━━━━━━━\n`
                    }
                    reply(leaderboard)
                } catch (err) {
                    console.error(err)
                    reply(msg.minimalDb())
                }
            break

            // ADMIN
            case 'leveling':
            if (!isGroup) return reply(msg.groupOnly())
            if (!isGroupAdmins) return reply(msg.adminOnly())
                if (ar[0] === 'enable') {
                if (isLevelingOn) return reply(msg.levelingOnAlready())
                    _leveling.push(from)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    reply(msg.levelingOn())

                } else if (ar[0] === 'disable') {
                    var anu = _leveling.indexOf(from)
                    _leveling.splice(anu, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    reply(msg.levelingOff())
                } else {
                    reply('Pilih enable atau disable!')
                }
            break
            case 'nsfw':
            if (!isGroup) return reply(msg.groupOnly())
            if (!isGroupAdmins) return reply(msg.adminOnly())
                if (ar[0] === '9') {
                if (isNsfw) return reply(msg.nsfwAlready())
                    _nsfw.push(from)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    reply(msg.nsfwOn())

                } else if (ar[0] === '9') {
                    var anu = _nsfw.indexOf(from)
                    _nsfw.splice(anu, 1)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    reply(msg.nsfwOff())
                } else {
                    reply('NSFW Locked disaat Ramadhan')
                }
            break

            case 'antilink':
            if (!isGroup) return reply(msg.groupOnly())
            if (!isGroupAdmins) return reply(msg.adminOnly())
                if (ar[0] === 'enable') {
                if (isAntiLink) return reply(msg.detectorOnAlready())
                _antilink.push(from)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    reply(msg.detectorOn())

                } else if (ar[0] === 'disable') {
                    var anu = _antilink.indexOf(from)
                    _antilink.splice(anu, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    reply(msg.detectorOff())
                } else {
                    reply('Pilih enable atau disable!')
                }
            break

            case 'add':
                if (!isGroup) return reply(msg.groupOnly())
                if (!isGroupAdmins) return reply(msg.adminOnly())
                if (!isBotGroupAdmins) return reply(msg.botNotAdmin())
                if (args.length < 1) return reply('nomornya ?')
                if (args[0].startsWith('08')) return reply('Gunakan kode negara')
                try {
                    num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
                    client.groupAdd(from, [num])
                } catch {
                    reply('Gagal menambahkan target, mungkin karena di private')
                }
            break
            case 'kick':
			    if (!isGroup) return reply(msg.groupOnly())
                if (!isGroupAdmins) return reply(msg.adminOnly())
                if (!isBotGroupAdmins) return reply(msg.botNotAdmin())
                if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di kick!')
                mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                if (mentioned.length > 1) {
                    teks = 'Perintah di terima, mengeluarkan :\n'
                    for (let _ of mentioned) {
                        teks += `@${_.split('@')[0]}\n`
                    }
                    mentions(teks, mentioned, true)
                    client.groupRemove(from, mentioned)
                } else {
                    mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
                    client.groupRemove(from, mentioned)
                }
            break
            case 'promote':
            if (!isGroup) return reply(msg.groupOnly())
            if (!isGroupAdmins) return reply(msg.adminOnly())
            if (!isBotGroupAdmins) return reply(msg.botNotAdmin())
            if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di jadi admin!')
                mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                if (mentioned.length > 1) {
                    teks = 'Perintah di terima, anda menjdi admin :\n'
                    for (let _ of mentioned) {
                        teks += `@${_.split('@')[0]}\n`
                    }
                    mentions(teks, mentioned, true)
                    client.groupMakeAdmin(from, mentioned)
                } else {
                    mentions(`@${mentioned[0].split('@')[0]} Menjadi Admin\nDi Group *${groupMetadata.subject}*`, mentioned, true)
                    client.groupMakeAdmin(from, mentioned)
                }
            break
            case 'demote':
            if (!isGroup) return reply(msg.groupOnly())
            if (!isGroupAdmins) return reply(msg.adminOnly())
            if (!isBotGroupAdmins) return reply(msg.botNotAdmin())
            if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tidak jadi admin!')
                mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                if (mentioned.length > 1) {
                    teks = 'Perintah di terima, anda tidak menjadi admin :\n'
                    for (let _ of mentioned) {
                        teks += `@${_.split('@')[0]}\n`
                    }
                    mentions(teks, mentioned, true)
                    client.groupDemoteAdmin(from, mentioned)
                } else {
                    mentions(`@${mentioned[0].split('@')[0]} Menjadi Member`, mentioned, true)
                    client.groupDemoteAdmin(from, mentioned)
                }
            break
            case 'leave': 
				if (!isGroup) return reply(msg.groupOnly())
                if (!isGroupAdmins) return reply(msg.adminOnly())
				anu = await client.groupLeave(from, `Bye *${groupMetadata.subject}*`, groupId)
			break
            case 'group':
            case 'gc':
            if (!isGroupAdmins) return reply(msg.adminOnly())
            if (!isBotGroupAdmins) return reply(msg.botNotAdmin())
            if (!isGroup) return reply(msg.groupOnly())
            if (args.length == 0) return reply('enable / disable')
            if (args[0] === 'enable') {
                client.groupSettingChange(from, GroupSettingChange.messageSend, true)
            } else if (args[0] === 'disable') {
                client.groupSettingChange(from, GroupSettingChange.messageSend, false)
            }
            break

            case 'delete':
            case 'del':
                if (!isGroup) return reply(msg.groupOnly())
                client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
            break
            
            
            // OWNER
            case 'owner':
            entah = "6281288820823"
            nah = "zen's"
            if (isNaN(entah)) return reply('Invalid phone number');
            vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + `FN:${nah}\n`
            + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
            + 'END:VCARD'.trim()
            client.sendMessage(from, {displayName: `${nah}`, vcard: vcard}, contact)
            break

            case 'setthumb':
            if (!isOwner) return
            if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                await client.downloadAndSaveMediaMessage(encmedia, "./media/images/2")
                reply("succes")
            }
            break
            
            case 'premium': 
            if (!isOwner) return reply(`*Format salah!*\n\nKetik ${prefix}belipremium`)
                if (ar[0] === 'add') {
                premium.addPremiumUser(args[1], args[2], _premium)
                reply(`*「 PREMIUM ADDED 」*\n\n*ID :* ${args[1]}\n*Expired :* ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`)
            } else if (ar[0] === 'del') {
                _premium.splice(premium.getPremiumPosition(args[1], _premium), 1)
                fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                reply(msg.doneOwner())
            } else {
                reply('Pilih add / del')
            }
            break

			default:

                if (!isRegistered) return
				if (budy.startsWith('>')){
                    return client.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text)
                }

            }
        } catch (e) {
            e = String(e)
            if (!e.includes("this.isZero")) { 
            if (!e.includes("startsWith")) {
                const time_error = moment.tz('Asia/Jakarta').format('HH:mm:ss')
                console.log(color(time_error, "white"), color("[  ERROR  ]", "aqua"), color(e, 'red'))
            }
        }}
    })
}
starts()
