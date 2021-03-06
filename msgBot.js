
const fs = require('fs-extra')
const { index } = require('mathjs')
const banned = JSON.parse(fs.readFileSync('./settings/banned.json'))
const simi = JSON.parse(fs.readFileSync('./settings/simi.json'))
const ngegas = JSON.parse(fs.readFileSync('./settings/ngegas.json'))
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
const prem = JSON.parse(fs.readFileSync('./lib/database/prem.json'))

//Variaveis referente a FS-EXTRA
let vip = JSON.parse(fs.readFileSync('./cadastro/vip.json'))


let { 
    ownerNumber, 
    groupLimit, 
    memberLimit,
    prefix,
    vhtearkey,
    keepSave,
    iTechApi,
    apiKey
} = setting

const {
    apiNoBg,
	apiSimi
} = JSON.parse(fs.readFileSync('./settings/api.json'))

function formatin(duit){
    let	reverse = duit.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const inArray = (needle, haystack) => {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i].id == needle) return i;
    }
    return false;
}


module.exports = msgBot = async (client, message) => {
    try{
        const {filehash, fromMe, height, filename, deprecateMms3Url, directPath, clientUrl, content, broadcast, ack, type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList, messageId} = message
        let { body, user } = message
        var { name, formattedTitle, gcok} = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        //const botNumber = await client.getHostNumber() + '@c.us'
      //  const groupId = isGroupMsg ? client.groupmetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(from) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
		const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const pengirim = sender.id
        const serial = sender.id
        //const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
       // const blockNumber = await client.getBlockedIds()
       // const groupMembers = isGroupMsg ? await client.participants(groupId) : ''
        //const GroupLinkDetector = antilink.includes(chatId)
       // const stickermsg = message.type === 'sticker'

        // Bot Prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
		const argx = chats.slice(0).trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const uaOverride = process.env.UserAgent
        const url = args.length !== 0 ? args[0] : ''
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
		
        // [IDENTIFY]
        const ownerNumber = "554598331383@c.us"
        const isOwnerBot = ownerNumber.includes(pengirim)
        const isOwner = ownerNumber.includes(pengirim)
        const isOwnerB = ownerNumber.includes(pengirim)
        const isBanned = banned.includes(pengirim)
		const isSimi = simi.includes(chatId)
		const isNgegas = ngegas.includes(chatId)
        const isImage = type === 'image'
        const isPrem = prem.includes(pengirim)
        var nomegrupo = name

        client.onAddedToGroup((chat) => {
            client.sendText(chat.id, 'Ola amigo')
        })


        switch(command){
            case 'admin':
                console.log(isAdminGrupo())
                if(isAdminGrupo() == false) return client.reply(from, `^-^ *${pushname}* Voc?? n??o ?? Adminstrador(a)`, id)
                if(isGroupMsg == false) return client.reply(from, '*USO apenas em grupo*, Valeu a tentativa..', id)
                client.reply(from, `*${pushname}* _ACESSO LIBERADO_ - Enviei um codigo no chat privado seu! Tambem enviei as informa????es importante desta fun????o `, id)
                client.reply(author, `_[cod00000] Fala cheef_ esta fun????o esta sendo desenvolvida ainda! mais em breve estara supor funcionando.`, id)
                break;
            case 'vip':
                if(verificarCadastroVip() == true) return client.reply(from, '*Uau kk* Voc?? ja se cadastrou! Obrigado, Divirta-se com os privilegios!', id);
                cadastrandoVip() // fun????o de cadastro
                break;
            case 'menu':
                
                let text = `
*>>>  MENU - BOT  <<<*

_Status VIP_: *${verificarCadastroVip()}* 

-- OP????ES:
*${prefix}sobre* - Sobre o bot
*${prefix}regras* - Regras do Cl?? ONU
*${prefix}vip* - Ativar vip no Bot
*${prefix}inst* - Instagram Creator (Owner)

\`\`\`Envie um das op????es acima destacado em negrito para mais detalhes\`\`\`  `

                client.reply(from, text, id)
                break;
            case 'message':
                let txt1 = `
body ${body}
ack ${ack}
author ${author}
*broadcast* : ${broadcast}
*caption* : ${caption}
*chat* : ${chat}
*chatId* : ${chatId}
*clientUrl* : ${clientUrl}
*content* : ${content}
*deprecateMms3Url* : ${deprecateMms3Url}
*directPath* : ${directPath}
*filehash* : ${filehash}
*filename* : ${filename}
*from* : ${from}
*fromMe* : ${fromMe}
*height* : ${height}
grupo de admins: ${groupAdmins[0], groupAdmins[1]}
                
                `
                client.reply(from, txt1, id)
                break;
            case 'linkgrupo':
                if(message.author == config.Admin + '@c.us') return client.reply(from, `voc?? nao ?? administrador do grupo!`, id)
                var linkg = await client.getGroupInviteLink(from)
                await client.sendMessageWithThumb('e', linkg, `JEF - ${name}`, 'link deste chat', chatId) 
                break;
            case 'criador':

                await client.getNumberProfile(id, 'feito')
                await client.sendContactVcard(from, '554598331383@c.us', 'Jefferson Alionco')
                break;
            case 'inst':
                await client.sendMessageWithThumb('e', 'https://www.instagram.com/jeffersonla_/', 'JEFFERSON - NA????ES UNIDAS', 'O cl?? na????es unidas ?? um dos melhores grupos brasileiros dentro do game Mafia City', chatId)
                break;
            case 'sobre':
                if (isGroupMsg){ 
                console.log(author)
                client.reply(author, `_posso responder aqui!!_`, id)
                return client.reply(from, '*Desculpe, este comando s?? pode ser usado no meu privado!* _J?? ENVIEI UM UP NO PV KK_', id)
                }
                client.reply(from, '_- Sou um sistema sendo desenvolvido em javascript, baseado no Projeto venom... PARA MAIS INFOMA????O CONSULTA O DOCS VENOM_', id);
                break;
            case 'regras':
                var texto = `
                
????    REGRAS DO CL??    ????
                
BOT JHEFFER: 


                1?? Nunca atacar outros jogadores, nem mesmo gangue de coletas!
                
                2??  Contribuir na op????o de propriedades do Cl??, ficando ativo no minimo 1 vez por dia, se ficar mais deve justificar antes, para nao ser rebaixado.
                
                4?? Respeite os outros 
                
                5?? Os ataques s??o permitidos apenas durante a morte. 
                
                6?? Ataques na mans??o de outro cl?? s??o permitidos se eles estiverem na colm??ia do seu cl??. 
                
                7?? N??o ataque torres, fazendas, zonas comerciais de outros cl??s. 
                
                8??. N??o colete recursos no territ??rio de outras alian??as. 
                
                9?? As fazendas devem ter a palavra "Fazenda" nelas, ter a bandeira do Vaticano e ser membros apenas de cl??s agr??colas. 
                
                10?? Mans??es abandonadas e sem cl??s podem ser atacadas a qualquer momento ... 9
                
                 11?? O ataque de um jogador ?? banido mais de duas vezes em 24 horas por uma villa.
                
                
                
                _____ESSAS REGRAS NAO SE APLICA NO DESERTO! APENAS NA CIDADE! NO DESERTO ?? LIVRE.`
                client.reply(from, `*${pushname}* ${texto}`, id)
                break;

        }
    function idUsuario(){
        let fiduser
        if(isGroupMsg){
            fiduser = author
        }else{
            fiduser = from
        }
        return fiduser // retorna id do usuario
    }
    function verificarCadastroVip(){
        let cadastradoOuNao
                let qtdCadastro = vip.length - 1
                for(let i = 0; i <= qtdCadastro; i++){
                    if(vip[i] == idUsuario()){
                        cadastradoOuNao = true;
                    }else{
                        cadastradoOuNao = false;
                    }
                }
                return cadastradoOuNao // Retorna true para cadastrado // false para nao cadastrado no vip
    }
    function isAdminGrupo(){
        let resultt = false
        let nTotalAdmins = groupAdmins.length
        console.log(nTotalAdmins)
        
        
        for(let i = 0; i < nTotalAdmins; i++){
            let iduser = `${groupAdmins[i].user}@c.us`

            if(idUsuario() == iduser){
                resultt = true
            }else{
                resultt = false
            }
            console.log('n', i)
        }
        return resultt;
    }
    function cadastrandoVip(){
        if(isGroupMsg){
            vip.push(author)
            fs.writeFileSync('./cadastro/vip.json', JSON.stringify(vip))
            client.reply(from, '_- Ok, Cadastrado(a) com sucesso._', id)
        }else{
            vip.push(from)
            fs.writeFileSync('./cadastro/vip.json', JSON.stringify(vip))
            client.reply(from, '_- Ok, Cadastro efetuado com sucesso..._', id)
        }
    }

    }catch(err){
        console.log('[ERROR]', err)
    }

}