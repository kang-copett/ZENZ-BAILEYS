const fs = require('fs')
const { spawn } = require("child_process")
const { getRandom } = require('./index')

const packID = 'com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2'
const playstore = 'https://play.google.com/store/apps/details?id=com.stickify.stickermaker'
const itunes = 'https://itunes.apple.com/app/sticker-maker-studio/id1443326857'

const addMetaData = (packname, authorname, filename) => {
    if (!filename) filename = 'data'
    const json = {
        'sticker-pack-id': packID,
        'sticker-pack-name': packname,
        'sticker-pack-publisher': authorname,
        'android-app-store-link': playstore,
        'ios-app-store-link': itunes
    }
    let len = JSON.stringify(json).length
    const f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
    const code = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
    if (len > 256) {
        len = len - 256
        code.unshift(0x01)
    } else {
        code.unshift(0x00)
    }
    const fff = Buffer.from(code)
    const ffff = Buffer.from(JSON.stringify(json))
    if (len < 16) {
        len = len.toString(16)
        len = '0' + len
    } else {
        len = len.toString(16)
    }
    const ff = Buffer.from(len, 'hex')
    const buffer = Buffer.concat([f, ff, fff, ffff])
    fs.writeFile(`./media/sticker/${filename}.exif`, buffer, (err) => {
        if (err) return console.error(err)
        console.log('Success!')
    })
}

const createExif = (pack, auth) =>{
    const code = [0x00,0x00,0x16,0x00,0x00,0x00]
    const exif = {"sticker-pack-id": "com.client.tech", "sticker-pack-name": pack, "sticker-pack-publisher": auth, "android-app-store-link": "https://play.google.com/store/apps/details?id=com.termux", "ios-app-store-link": "https://itunes.apple.com/app/sticker-maker-studio/id1443326857"}
    let len = JSON.stringify(exif).length
    if (len > 256) {
        len = len - 256
        code.unshift(0x01)
    } else {
        code.unshift(0x00)
    }
    if (len < 16) {
        len = len.toString(16)
        len = "0" + len
    } else {
        len = len.toString(16)
    }
    //len = len < 16 ? `0${len.toString(16)}` : len.toString(16)
    const _ = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
    const __ = Buffer.from(len, "hex")
    const ___ = Buffer.from(code)
    const ____ = Buffer.from(JSON.stringify(exif))
    fs.writeFileSync('./media/sticker/data.exif', Buffer.concat([_, __, ___, ____]), function (err) {
        console.log(err)
        if (err) return console.error(err)
        return `./media/sticker/data.exif`
    })

}
const modStick = (media, client, mek, from, sender) => {
    out = getRandom('.webp')
    try {
        console.log(media)
        spawn('webpmux', ['-set','exif', `./media/sticker/${sender}.exif`, media, '-o', out])
        .on('exit', () => {
            client.sendMessage(from, fs.readFileSync(out), 'stickerMessage', {quoted: mek})
            fs.unlinkSync(out)
            fs.unlinkSync(media)
        })
    } catch (e) {
        console.log(e)
        client.sendMessage(from, 'Terjadi keslahan', 'conversation', { quoted: mek })
        fs.unlinkSync(media)
    }
}

function kyun(seconds){
    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
    
    return `${pad(hours)}H ${pad(minutes)}M ${pad(seconds)}S`
}

async function stickerHandler(message, client, isAdmin, isBotGroupAdmins, adminList, color, time) {

	if ((isAdmin) && (message.quotedMsg) && (isBotGroupAdmins) && (message.filehash == 'mHbEuCjA+RVWftr2AFuLieAJcyHYZnibd7waZPqvDNQ=') && (adminList.includes(message.quotedMsgObj.sender.id))) return await client.demoteParticipant(message.from, message.quotedMsgObj.sender.id)	
}

function tanggal(){
    myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
                myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
                var tgl = new Date();
                var day = tgl.getDate()
                bulan = tgl.getMonth()
                var thisDay = tgl.getDay(),
                thisDay = myDays[thisDay];
                var yy = tgl.getYear()
                var year = (yy < 1000) ? yy + 1900 : yy;
                return `${thisDay}, ${day} ${myMonths[bulan]} ${year}`
    }

module.exports = {
    addMetaData,
    createExif,
    modStick,
    kyun,
    stickerHandler,
    tanggal
}