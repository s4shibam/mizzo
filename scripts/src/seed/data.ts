/* cspell:disable */

import {
  UserArtistApplication,
  type Playlist,
  type PlaylistTrack,
  type Track,
  type User,
  type UserProfile
} from '@mizzo/prisma'

// User identifiers for seeding database with artist accounts
export const USER_CUIDS = {
  'a.r.rahman': 'xsqcbxikkx2vwubih9qgm00c',
  'alan.walker': 'cjlc4otf3ikpoq9qhi38upab',
  'anirudh.ravichander': 'zqrh5z99xr3qzqt1hokenhfj',
  'anupam.roy': 'bkxsbdeyqzrohwnd64zox41y',
  'arijit.singh': 'z810cysyuxcphsybufcdmga2',
  'atif.aslam': 'ow82do27xgofe3jjhraymxd9',
  'b.praak': 'sefk8zshmie7r4vliv50mbt8',
  'diljit.dosanjh': 'cs0gdc47gc7ncr832s0x1ej2',
  'dua.lipa': 'lbcfbqauzne3jakhnie2herg',
  'ed.sheeran': 'fi9zpuuezyj8xfn7n2i1yrcw',
  'honey.singh': 's3ub584i4x6yeh6bnh76uw49',
  'imagine.dragons': 'v3k8nzfyb67lqqcnlc6o5xgf',
  'jeet.ganguly': 'ddp5edguu1s92h3km63043n9',
  'jonita.gandhi': 'd9vqhxn5okf54i1otbqn5z4v',
  'jasmine.sandlas': 'vhfzm92mffudztjlxs2wjkx3',
  'k.k': 'yrl0a2gwtp6megvlzsjlnxk6',
  'kishore.kumar': 'g5swq1gx44hvearuuclzgebv',
  'kumar.sanu': 'idl5gl950e137t246pa2tyvp',
  'mizzo.official': 'o3wokabgrgzdfynbn1wl75m4',
  'pritam.chakraborty': 'keotm6pu5netg1e67nnub2yq',
  'sam.smith': 'fcd689si8tf3js0yq6qypkwk',
  'shreya.ghoshal': 'vy9k6p8nmvdlyjeg1o70nt4o',
  'sonu.nigam': 'ajqvixd08uhx45zvcb5ajt2e',
  'sunidhi.chauhan': 'nbvdhokhl64favsutq1zsmto',
  'taylor.swift': 'jeyr5lrdbbbpmkhzuad1pcu9',
  'usha.uthup': 'q8n1bhz83mdw8q2m88pdzr7o',
  'zubeen.garg': 'oj2gzmoifbrw1m4rcb5gka2z'
} as const

// Track identifiers organized by artist for seeding database with songs
export const TRACK_CUIDS = {
  'a.r.rahman': {
    'chaka-chak-atragi-re': 'gtbq1s3nhi6pd5kyw7nng107',
    'enna-sona-ok-jaanu': 'ouyhn32pz37756gi2ngfg8ee',
    'hamma-hamma-bombay': 'n4dwx8ojj4rqp8hre6pmbfoy',
    'jai-ho-slumdog-millionaire': 'qukifk8h1stvofvhw7njop3i',
    'maa-tujhe-salaam': 'im77cfaaiuwxwjsz98cyxlwp',
    'mukkala-muqabala-kadhalan': 'kdidprr3wckbz2pzudiaxfwn',
    'tu-hi-re-bombay': 'i1kgjhz3638ux19cht03ikjl',
    'urvasi-urvasi': 'cnm0qqh1cp46hvf0rm63adfx',
    'vellipomaakey-saahasam-swaasaga-saagipo': 'zsxpxmv9r551pkbxsdp4qste'
  },
  'alan.walker': {
    'alone-official': 'j8qqq8pacl485j6ampn131qs',
    'faded-official': 'yt8b2poraitqqjmoc3y0hfp3',
    'not-you': 'jn54szqwj9xvpjs3i0wa0ua2',
    'on-my-way': 'jrv2agi11e2i2vxebumssrwu',
    'the-spectre': 'y7vfv5aitnvr930g56r0c8go'
  },
  'anirudh.ravichander': {
    'arabic-kuthu-beast': 'm3asz6ziuqk7kjpxfpmw7mk2',
    'ayudha-pooja-devara': 'dizwhhy0azi6jfvwooqlirpm',
    'baitikochi-chuste-agnyaathavaasi': 'jxg99tfy7f02jfn6faswn5gs',
    'gaali-vaaluga-agnyaathavaasi': 'kjnzxexhc9b5cwihsc6re252',
    'hoyna-hoyna-gang-leader': 'slltq5qi1maanazj4l8lnobm',
    'hukum-jailer': 'qpcn8f1odqk7x3q9kvhd0l9o',
    'naa-ready-leo': 'tv3i3csgnwigskvrg18t1ji6',
    'vaathi-coming-master': 'xzag6avsv1zk3lywd4he1s57',
    'why-this-kolaveri-di': 'iryibsra0rwgzyxtfkdh9qqg',
    'zinda-banda-jawan': 'xqus3xfjvkg3v5xxknrcmyw8'
  },
  'anupam.roy': {
    'amake-amar-moto-thakte-dao': 'a3rr346wzxjpi9732cwm5v5u',
    'bariye-dao-tomar-haat': 'wxzsfbjetjdkj9yaqnripwzy',
    'bezubaan-piku': 'ffbdqli2cuh88hp1p79hf9x1',
    'bondhu-chol': 'i69q0hrzawkuzs9utmsa3rb6',
    'ekbar-bol': 'l12wtd182pwdfi1g1w4xmhgb',
    'gobheere-jao-baishe-srabon': 'xfqpg7nm3qxv7lh9gl3cpvl2',
    'jaago-jaago-uma': 'qjqdqemwf8j0nghmlbqi34q8',
    'journey-song-piku': 't2anhmsacf6id5xr17y566a0',
    'tumi-jaake-bhalobasho-praktan': 'nsvfzs0e9zv7mv1ta0hq65kf',
    'ure-jaak-uma': 'ki0yigp6q7vjhuzimobpxmt2'
  },
  'arijit.singh': {
    'aami-tomar-kache-yoddha': 'it78px0e3hevli6zrs1mxrsv',
    'aayat-bajirao-mastani': 'qpc3gshmhmj7pycyu617ufys',
    'ami-je-tomar-bhool-bhulaiyaa-2': 'hisoktt6z5q9fo9eob6tvzeg',
    'anuvanuvuu-om-bheem-bush': 'a0dsgctby7ek8cd7doh1ld5d',
    'channa-mereya-ae-dil-hai-mushkil': 'rcax8wl6umzflzvrbe3mvk4u',
    'ee-raathale-radhe-shyam': 't7rztfcriwpovzztz20noqvm',
    'gerua-dilwale': 'l5rk3j1fxsy365k379kynlpd',
    'kesariya-brahmastra': 'hm04zxmkxgvb6guwlz0q593v',
    'khairiyat-chhichhore': 'vgsnn5236q2srhvxalvo98x5',
    'ki-kore-toke-bolbo': 'b4zzcabmdtourkfe1pgaxr8k',
    'mon-majhi-re': 'afwhtsqp9foxvkdglomtjzx2',
    'phir-le-aaya-dil-barfi': 'v3scltxnmlio5iad8r6581zf',
    'suno-na-sangemarmar-youngistaan': 'r7spaxx54ohm7hkh8xi6g08s',
    'tomake-chuye-dilam': 'f4vog5z6b5sd0a9y2a4c5fe2',
    'tum-hi-ho-aashiqui-2': 'euczz4ypsag4rwhvw2au2xg4'
  },
  'atif.aslam': {
    'dil-diyan-gallan-tiger-zinda-hai': 'j63o8sehsd1oy2hppcesfef5',
    'jeena-jeena-badlapur': 'k57hohlsny1fq1baui26dpwu',
    'o-saathi-baaghi-2': 'ixi3gkyd8qz6jh7btosfpb27',
    'pehli-nazar-mein-race': 'jhi6ptx4h1vvkvz22wdzjgwc',
    'tera-hone-laga-hoon': 'dd6xi6ztz4y3ax3lhcvpf2hh',
    'tere-sang-yaara-rustom': 'ly04l6d014l6okz8i3ywc2gu',
    'tu-jaane-na-ajab-prem-ki-ghazab-kahani': 'v2b1m7qj8uo4mexjtnswi805',
    'woh-lamhe-woh-baatein-zeher': 'niu7vmxjeqvo5gs0467iamui'
  },
  'b.praak': {
    'filhaal-single': 'tsmvko60bbtv8xk8mnh8ec4a',
    'mann-bharryaa-2-0-shershaah': 'm0d1jusd36i4yqbrmki6gy2f',
    'ranjha-shershaah': 'nbb47byqxjjyram6og3u16nv',
    'saari-duniya-jalaa-denge-animal': 'qhfw1hs8aurmkr5e7njv6kgj',
    'teri-mitti-kesari': 'yednsxxih4v1ulhxt8kxn590',
    'yaar-ka-sataya-hua-hai': 'z0q9vke8y7lkrtxwswhphb2f'
  },
  'diljit.dosanjh': {
    'born-to-shine-g-o-a-t': 'otmad0toavdurwtlb2xhfuo5',
    'do-you-know': 'e3q74wra2je4kqvifyuhide9',
    'g-o-a-t-title-track': 'mkfy4nu2o1od9vi7f1m2yhpk',
    'tenu-ki-pata': 'zmnk5fjsikr4u2iyp6j8ee13',
    'lover-moonchild-era': 'vck7vkyrumrxj16tc08p13sm',
    'patiala-peg': 'txyhsg8hfy1tbdghbtksjxzm',
    'proper-patola-namaste-england': 'ixnviyimbxya1jjk0gpbff0f'
  },
  'dua.lipa': {
    'dont-start-now': 't1g9t5owg6jxxo7fsyoevlos',
    'houdini-single': 'mp1a7v5j2d2tjpu9y8ltu5df',
    'levitating-feat-dababy': 'pt96sci75umaq6feqw6nhr1x',
    'new-rules': 'xijtn1mkto4elunwb4lz73rv',
    'one-kiss-calvin-harris': 'cf4d2k9h848ddogm1t39o312'
  },
  'ed.sheeran': {
    'bad-habits': 'tmkvhvxlk9w2bwm1cqngu0z8',
    'give-me-love': 'i2pjhcxog2eff6qgjj40iy5b',
    'sapphire-feat-arijit-singh': 'slei9nu62dbv5svvkyla05iw',
    'shape-of-you': 'k7dtm57stkorx6w5tyq8eeox',
    'thinking-out-loud': 'uxooyjhgj201kxendw27bwqp'
  },
  'honey.singh': {
    'blue-eyes-single': 'yasq34ohl04w8zca0bvjbqz6',
    'brown-rang-international-villager': 'wnkloedrnc36iqlt2mzh1qlg',
    'dheere-dheere-single': 'kovvqh82opp8n4mni82ux6vw',
    'laal-pari-house-full-5': 'lyex4nazfzcn6tqd2pjeskci',
    'lungi-dance-chennai-express': 'dotoc2v7tzu4dqtxwep43z3t',
    'maniac-glory': 'rk4zrx0wrfair8ef54o5vl8p',
    'millionaire-glory': 'kx0na29fztidddaapd6fmscr',
    'one-bottle-down': 'c2r4mnbulapji2w6k5fujpas',
    'raat-jashan-di': 'kfqamr6t2idkulvos7p840rk'
  },
  'imagine.dragons': {
    'believer-evolve-2017': 'jb5p1uodifbhmpbsmejf2nlb',
    'bleeding-out-night-visions': 'l4a85ezxmyci2ta5k8wwgoca',
    'gods-dont-pray-loom': 'hvxidvchqvo1l50hh1wkewad',
    'nice-to-meet-you-loom': 'i3issdynzwjwg67icmsr1ubw',
    'thunder-evolve': 'g27r393gg4uhmi1p3nbuu6st'
  },
  'jeet.ganguly': {
    'boss-title-track': 'zkbyvg3t1lqcnvor7zyk4qj6',
    'chaahun-main-ya-naa-aashiqui-2': 'moy3xanj1r47s16jycubrwuh',
    'dhaker-taale-poran-jay-joliya-re': 'zhcqcmqvsh13rkj3bnbdgb1r',
    'hamari-adhuri-kahani-title-track': 'ykg2trcm145pcfk6md2c1ts5',
    'khamoshiyan-title-track': 'oqgheco84qj1k66j2kshad76',
    'khujechi-toke-raat-berate': 'zdumd71xifodnmjt50yzjz1p',
    'muskurane-citylights': 'h8albhc5t5wj6vc6bctzfwar',
    'raaz-aankhein-teri-raaz-reboot': 'lx30ss7q1d6a0ovwqgtbuy28',
    'tor-ek-kothaye': 'rdaxvh8oq9syi5hzcld4pnt6'
  },
  'jonita.gandhi': {
    'beparwai-solo': 'oyb71k2ewkc6n2jupt26xnz7',
    'chellamma-doctor-tamil': 'vj1ejp6d4vaxam8pvkn30te2',
    'dil-ka-telephone-dream-girl': 'nhktwgc2dixa3mks68xj4w7b',
    'jimikki-ponnu-varisu': 'q5coinj7me6jin0ij85i5ogy',
    'mental-manadhil-ok-kanmani': 'smtjoong8bdwlphs3atohe8q',
    'nuvve-nuvve-kick-2': 'vcq3w1uf1nsk5gkzvogtembl',
    'takdi-ravan-jindua': 'fbdt2aptdzzcdvvss6ywgh2t',
    'the-breakup-song-ae-dil-hai-mushkil': 'l1dx4e8zlulds3q8vit7s5or',
    'what-jhumka': 'rfu5wk5efy37vwzx3w16tsap'
  },
  'jasmine.sandlas': {
    'dhurandhar-title-track': 'shsspaz6yx5vfd501sv5l81a',
    'illegal-weapon': 'cu8rxb9ncrmvssft9084azds',
    'ittar-desi-melodies': 'zzxwv2mdhlgmts06lfiobkwl',
    'sawan-mein': 'fzhtkyvak9rw7ticbh12doy2',
    'taras-munjya': 'b6b3h45h121duxo5jdr2gzhv'
  },
  'k.k': {
    'aankhon-mein-teri-om-shanti-om': 'f5q16iq23n26cxgji4vqha6i',
    'khuda-jaane-bachna-ae-haseeno': 's2swluvnxg2gvj22kkta20yp',
    'pyaar-ke-pal': 'vs00jy2vj0ydamozgekurapr',
    'tadap-tadap-ke-hum-dil-de-chuke-sanam': 'xmu400sjda75bkmzu6yjv02t',
    'tu-hi-meri-shab-hai-gangster': 'pz5n01fx9rbmkra6ev7qfpij',
    'yaaron-rockford': 'm5l3sqhlu061qavc26i9it4o',
    'zara-sa-jannat': 'lbvkii1vwetgxb1xqoxrr4kj'
  },
  'kishore.kumar': {
    'ami-chini-go-chini-charulata': 'pw34pplhunne0ft5j790dakx',
    'mere-sapno-ki-rani-aradhana': 'a210roepyczw29zzwu98ze3a',
    'o-mere-dil-ke-chain': 'kdmo7u9llh4rkb1qjkghx1za',
    'pal-pal-dil-ke-paas-blackmail': 'xtj17068ujeekemkzbn5d9rk',
    'roop-tera-mastana-aradhana': 'wncw9y2s6nua5y8ves2emtct',
    'yeh-shaam-mastani-kati-patang': 'll0cnyn3a2tufcbhz9r753tx'
  },
  'kumar.sanu': {
    'chura-ke-dil-mera-main-khiladi-tu-anari': 'baxhxn00836ex8sqcmocnz3r',
    'do-dil-mil-rahe-hain-pardes': 'hoquxajrzq1msp049lux4jr4',
    'ek-ladki-ko-dekha-to-1942-a-love-story': 'uuo39o4w9dqeee14j38svqeg',
    'jab-koi-baat-bigad-jaye-jurm': 'erre3wwj5eivm6uyjvtdt1f1',
    'mera-dil-bhi-kitna-pagal-hai': 'h31h453fkrf50j5q9nzepg0y',
    'tujhe-dekha-to-yeh-jaana-sanam': 'q5cgug50j80oemuhfj9hiu0t'
  },
  'mizzo.official': {},
  'pritam.chakraborty': {
    'ae-dil-hai-mushkil-title-track': 'wgkvvg0j6uxz579ba760o28z',
    'badtameez-dil-yeh-jawaani-hai-deewani': 'h9rfw3r1uk2gz3oe6c7ziyaf',
    'in-dino-life-in-a-metro': 'uxcr78g3sfy3wkzdnag2xwba',
    'janam-janam-dilwale': 'xn2me90h145z4bzlgx0twdvb',
    'oh-my-love-amanush-2': 'nohz0vqcyczdf1t3s3v0ktdt',
    'pee-loon-once-upon-a-time-in-mumbaai': 'j5n2xpqidk5kxfntis886bpw',
    'raabta-agent-vinod': 'wpyw2rt0t1rjcdgiv00r6sqc',
    'shayad-love-aaj-kal': 'iph790q4yb4ao70j6o26ahn1',
    'subhanallah-yeh-jawaani-hai-deewani': 'inihxu4k8y5ycwometuch54e',
    'tum-se-hi-jab-we-met': 'q3ooy6ep2bb3zdnmgoiocz6l'
  },
  'sam.smith': {
    'dancing-with-a-stranger-normani': 'nz0fjuy1nntxqputb7t712pc',
    'im-not-the-only-one': 'r2d4qi11yz7i72f5f4fvaxjx',
    'stay-with-me': 'pf1j15zr1m1in30dl254tesd',
    'unholy-kim-petras': 'j9lhrv6h1gj7r5uzjv8c7ort'
  },
  'shreya.ghoshal': {
    'adhir-man-zhaley': 'hcef562fgg3ji5jqt17dyue3',
    'anuraga-vilochananayi': 'm6avakhydgyun5m2pzygivyj',
    'chawlraastaye-autograph': 'ztfork3v8q3cmtkqtc84fr5h',
    'chhaila-bhoomi': 'rntokxdk3yq0x3ssh7ikq6sk',
    'deewani-mastani-bajirao-mastani': 'dzfgcoz1cc51dgrne5vlz34c',
    'ghoomar-padmaavat': 'c19qtw9jcodhczvn459h95ks',
    'guli-mata': 'zk8p67or2wdi7oz3od50hx0k',
    'jao-pakhi-bolo': 'mnzuqyl0dmgmjk6cl3ft3g6j',
    'jeev-rangla-jogwa': 'myzqdl1568u1rrn9hhhgzbpx',
    'tumi-bondhu-aaj-shunbe': 'mpk8masyduvox2w7bn3hd1dl',
    'munbe-vaa-sillunu-oru-kaadhal': 'omanzkrvi2wm77fz1ondp1a2',
    'nagada-sang-dhol-ram-leela': 'wzmoozh74nzlu3athjugthus',
    'namo-shankara-mahashivaratri': 'pmd7lz9d2bjulh1jyxzrclfi',
    'neel-digante': 'hyv8w0ea4y3565mf4n8h3smd',
    'neenadena-yuvarathnaa': 'hms963r5tgmvw1g8xq7jslxz',
    'yimmy-yimmy-tayc': 'w2lqin2x0s84bftrysq9dwtp'
  },
  'sonu.nigam': {
    'abhi-mujh-mein-kahin-agneepath': 'rbnt8moeqwwvpi75yaak8hdr',
    'anisuthide-yaako-indhu-mungaru-maleye': 'lf805xes8ppcuiqdcinko3sw',
    'kal-ho-naa-ho-title-track': 'q7tkmca8wbp6j3ninh04rwgu',
    'main-agar-kahoon-om-shanti-om': 'ac8ousisxm0twgma95xaougw',
    'mungaru-maleye': 'x83dipd6oo1bzmh5vchf54pu',
    'saathiya-title-track': 'u9roun73c0vc6pgn6cdwvok6',
    'sandese-aate-hain-border': 'fawlj3s14p1xxz1ar39pjmjl',
    'shukran-allah-kurbaan': 'h1y8eqe0x1rx6wlerusxxodg'
  },
  'sunidhi.chauhan': {
    'aaja-nachle-title-track': 'vzmbiedwvruce5chy7ijzmw0',
    'beedi-omkara': 'u7ag1cl5jook8k7tdi1cmgum',
    'crazy-kiya-re-dhoom-2': 'qe88yb7sdms50ui8nb0mmk33',
    'dhoom-machale-dhoom': 'rnaggaghwwhq8mfbemj9bwmv',
    'kamli-dhoom-3': 'dd02pwd51m0slwfqsq74wlw2',
    'sheila-ki-jawani-tees-maar-khan': 'oxeli4v1xal9e8rbpomv2a9n',
    'the-disco-song-student-of-the-year': 'riui5aqrr7av78gchbfa4gnp'
  },
  'taylor.swift': {
    'anti-hero-midnights': 'w89cjn2x3yowr1bx3ub65ibo',
    'blank-space-1989': 'q7xm9b1sj9p6m85mvp16tqsb',
    'cruel-summer-lover': 'yp9m8l4r1g65diecn1k7e750',
    'love-story-fearless': 'nu2do66ih1grmax349tf1hqd',
    'shake-it-off-1989': 'nhf1rb4igbc1m9oc8r87i6ex',
    'you-belong-with-me-fearless': 'n9xux8whipidvbmf9d2poz0h'
  },
  'usha.uthup': {
    'aami-shotti-bolchi-kahaani': 'fpia2dxnuqs9r6w6qhpbipmo',
    'auva-auva-koi-yahan-nache': 'fc58n8bptf4520iunu1x98ws',
    'darling-7-khoon-maaf': 'mhybrw80b3fab965y5vpzphe',
    'hari-om-hari-pyara-dushman': 'uh00g8los15oxtblu6ixk94z',
    'rambha-ho-ho-ho-armageddon': 'qh61tvpqx6qukkes42hsohjx',
    'uri-uri-baba': 'i0k4yc9kmedmcymnzc0v2l1y',
    'vande-mataram-k3g': 'hfaxnrc1wsyrz92jgkl4u7z4'
  },
  'zubeen.garg': {
    'dil-tu-hi-bataa-krrish-3': 'j8hyb5taqxt5jrzg38x53aur',
    'jhoom-barabar-jhoom': 'xr1f91fkw81ex3cpaia65mif',
    'khuda-jaane-paglu-2': 'ammbcd7ak2ecuapsovh66ttp',
    'tomar-amar-prem': 'ebqyzw7e21f8u1xf7mw9jrpo',
    'tumi-suwa-jetia': 'qyt70pzj6u9ofzp5mbiytulw',
    'ya-ali-gangster': 'pohggn6x4byqn5fu6ox873rw'
  }
} satisfies TTrackCuids

// Playlist identifiers for seeding database with curated music collections
export const PLAYLIST_CUIDS = {
  'bollywood-romantic-hits': 'z7ugoobnr9wgmly2mujah6j4',
  'tamil-dance-anthems': 'vwm1zrdb6oi20lyd5bxlpalc',
  'punjabi-party-bangers': 'g0p3bz88dji9i5cnotrgc90x',
  'bengali-soulful-collection': 'la1mp6y7tugoajm76g52zjlr',
  'ar-rahman-classics': 'm4kiniri3b47yzpikgiybk7q',
  'arijit-singh-love-songs': 'l8cet0r812qrq2mebrfq9954',
  'western-pop-favorites': 'tjbxkba7by13kozovuuefuez',
  'bollywood-item-songs': 'q63oy5in3kwzyfyjmpxgz6kp',
  'emotional-ballads': 'iw0hv7xt5h28mvkknleirt1v',
  'cross-cultural-fusion': 'ltaz13sssjwx54x7cxnlyu4v',
  'bollywood-bangers': 'kane4wmvhovc819uhyeunu1v',
  'classical-hits': 'innbyplefa7fg5gm1p79wpwc',
  'devotional-bliss': 'x3ijncbbgu12ktz8fgnsshmf',
  'sufi-sanctuary': 'qpdowoirpa4jkhi3ic97v5ua',
  'regional-hits': 'dzuabd0p1uvjjk3t6oebee8g',
  'deep-focus': 'edhh14d0offac30u55y5qwas',
  'quiet-moments': 'vpfycdkenc2c3dr6pz7hrhwz',
  'indie-india': 'lpp9ottgcyyas1i8iosgiacs',
  'retro-classics': 'fy8jdxsmwj9r6e80ia0gnwxm',
  'arabic-malayalam-fusion': 'osgfthau7fs1v4uwg7tt0sbz',
  'action-anthems': 'ci0usr1e3xer6qpj57bhicf0',
  'patriotic-pride': 'sg6as30usqvhfa0ls3xocq1c',
  'folk-treasures': 'iru0n8bfkbzjqehdshv2gzil',
  'electronic-beats': 'vc4lwcqzflo5b52gkgxocc6e',
  'beats-to-think-to': 'lai0h63khqyev0pou2sgws0a'
}

// Utility types for user identifiers
type TUserName = keyof typeof USER_CUIDS
type TUserCuid = (typeof USER_CUIDS)[TUserName]

// Utility types for track identifiers
type TTrackCuid = string
type TTrackCuids = Record<TUserName, Record<string, TTrackCuid>>

// Seed data types for database seeding
type TSeedUserWithProfile = Pick<User, 'name' | 'createdAt'> & {
  id: TUserCuid
  username: TUserName
  email: `${TUserName}@mizzo.artist`
  avatarUrl: string
} & Pick<UserProfile, 'bio'>

type TSeedTrack = Pick<
  Track,
  'id' | 'title' | 'language' | 'tags' | 'createdAt'
> & {
  primaryArtistId: TUserCuid
  secondaryArtists: TUserCuid[]
  youtubeUrl: string
}

type TSeedUserArtistApplication = Pick<
  UserArtistApplication,
  'userId' | 'message' | 'idProofType' | 'createdAt'
>

type TSeedPlaylist = Omit<
  Playlist,
  'status' | 'likes' | 'isPublic' | 'posterKey' | 'updatedAt'
> & {
  ownerId: TUserCuid
  posterUrl: string
}

type TSeedPlaylistTrack = Omit<PlaylistTrack, 'createdAt'>

export const SEED_ADMIN_WITH_PROFILE: TSeedUserWithProfile = {
  id: USER_CUIDS['mizzo.official'],
  name: 'Mizzo Official',
  email: 'mizzo.official@mizzo.artist',
  username: 'mizzo.official',
  createdAt: new Date('2025-01-01T10:00:00.000Z'),
  avatarUrl: '',
  bio: 'Official Mizzo platform account. The voice of Mizzo music streaming platform.'
}

// Artist user profiles with basic information for seeding
export const SEED_USERS_WITH_PROFILE: TSeedUserWithProfile[] = [
  {
    id: USER_CUIDS['a.r.rahman'],
    name: 'A. R. Rahman',
    email: 'a.r.rahman@mizzo.artist',
    username: 'a.r.rahman',
    createdAt: new Date('2025-03-10T10:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5ebb19af0ea736c6228d6eb539c',
    bio: 'Oscar-winning Indian music composer, singer, and music producer. Known for integrating Indian classical music with electronic sounds.'
  },
  {
    id: USER_CUIDS['alan.walker'],
    name: 'Alan Walker',
    email: 'alan.walker@mizzo.artist',
    username: 'alan.walker',
    createdAt: new Date('2025-01-25T10:30:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5eb572a8eae56feae217f618078',
    bio: 'A Norwegian DJ and record producer known for electronic dance music. Famous for hits like "Faded", "Alone" and "Darkside".'
  },
  {
    id: USER_CUIDS['anirudh.ravichander'],
    name: 'Anirudh Ravichander',
    email: 'anirudh.ravichander@mizzo.artist',
    username: 'anirudh.ravichander',
    createdAt: new Date('2025-02-28T16:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5eb0f0be2054fe9594026a6b843',
    bio: 'An Indian music composer, singer, and music producer who primarily works in Tamil cinema. One of the most sought-after composers in the South Indian film industry.'
  },
  {
    id: USER_CUIDS['anupam.roy'],
    name: 'Anupam Roy',
    email: 'anupam.roy@mizzo.artist',
    username: 'anupam.roy',
    createdAt: new Date('2023-12-01T13:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67616d0000b2731b9c43ce1848bb70dc6798df',
    bio: 'An Indian singer, lyricist, composer, and music director from Kolkata.'
  },
  {
    id: USER_CUIDS['arijit.singh'],
    name: 'Arijit Singh',
    email: 'arijit.singh@mizzo.artist',
    username: 'arijit.singh',
    createdAt: new Date('2023-11-15T11:30:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5eb5ba2d75eb08a2d672f9b69b7',
    bio: 'An Indian playback singer and music composer. Known as the "King of Playback Singing" for his soulful voice and romantic songs.'
  },
  {
    id: USER_CUIDS['atif.aslam'],
    name: 'Atif Aslam',
    email: 'atif.aslam@mizzo.artist',
    username: 'atif.aslam',
    createdAt: new Date('2025-03-08T11:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5ebc40600e02356cc86f0debe84',
    bio: 'A playback singer, songwriter, composer, and actor. He has recorded many chart-topping songs.'
  },
  {
    id: USER_CUIDS['b.praak'],
    name: 'B Praak',
    email: 'b.praak@mizzo.artist',
    username: 'b.praak',
    createdAt: new Date('2023-12-15T13:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67616d00001e0210e1ad0883fd8a9c55db0202',
    bio: 'An Indian playback singer and music composer known for his soulful voice and emotional songs. Popular in Punjabi and Bollywood music.'
  },
  {
    id: USER_CUIDS['diljit.dosanjh'],
    name: 'Diljit Dosanjh',
    email: 'diljit.dosanjh@mizzo.artist',
    username: 'diljit.dosanjh',
    createdAt: new Date('2025-01-10T11:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67706c0000da845bd3fc52a142f8f043e7ffe6',
    bio: 'An Indian singer, actor, and television presenter who works predominantly in Punjabi cinema and music. He is recognized as one of the most successful artists in the Punjabi music industry.'
  },
  {
    id: USER_CUIDS['dua.lipa'],
    name: 'Dua Lipa',
    email: 'dua.lipa@mizzo.artist',
    username: 'dua.lipa',
    createdAt: new Date('2023-10-01T10:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67616d0000b273ae395b47b186c2bc8c458e0f',
    bio: 'A British pop sensation known for her distinctive vocals and dance-pop hits. Known for songs like "Levitating", "Don\'t Start Now" and "Physical".'
  },
  {
    id: USER_CUIDS['ed.sheeran'],
    name: 'Ed Sheeran',
    email: 'ed.sheeran@mizzo.artist',
    username: 'ed.sheeran',
    createdAt: new Date('2025-03-01T15:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67616d0000b2736567a393a964a845a89b7f70',
    bio: 'An English singer-songwriter. He is known for his loop pedal compositions and often incorporates various musical genres into his work.'
  },
  {
    id: USER_CUIDS['honey.singh'],
    name: 'Honey Singh',
    email: 'honey.singh@mizzo.artist',
    username: 'honey.singh',
    createdAt: new Date('2025-01-01T10:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5ebbc7e4fffd515b47ff1ebbc1f',
    bio: "An Indian rapper, music producer, and singer known for his contributions to Punjabi and Hindi music. Popular for hits like 'Brown Rang' and 'Lungi Dance'."
  },
  {
    id: USER_CUIDS['imagine.dragons'],
    name: 'Imagine Dragons',
    email: 'imagine.dragons@mizzo.artist',
    username: 'imagine.dragons',
    createdAt: new Date('2025-02-05T16:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5ebab47d8dae2b24f5afe7f9d38',
    bio: 'An American rock band known for their alternative rock and pop hits. Famous for songs like "Radioactive", "Believer" and "Thunder".'
  },
  {
    id: USER_CUIDS['jeet.ganguly'],
    name: 'Jeet Ganguly',
    email: 'jeet.ganguly@mizzo.artist',
    username: 'jeet.ganguly',
    createdAt: new Date('2025-01-29T10:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5eb6adc98db259e563ee2352b85',
    bio: 'An Indian music composer and singer, who has worked in Bollywood and Tollywood.'
  },
  {
    id: USER_CUIDS['jonita.gandhi'],
    name: 'Jonita Gandhi',
    email: 'jonita.gandhi@mizzo.artist',
    username: 'jonita.gandhi',
    createdAt: new Date('2025-04-18T14:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67616100005174a308d2dbeeb587cb5e9220db',
    bio: 'An Indo-Canadian playback singer known for her versatile voice and multilingual singing. Popular in Bollywood and regional Indian cinema.'
  },
  {
    id: USER_CUIDS['jasmine.sandlas'],
    name: 'Jasmine Sandlas',
    email: 'jasmine.sandlas@mizzo.artist',
    username: 'jasmine.sandlas',
    createdAt: new Date('2025-04-18T14:10:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000517424014f4a90070826e31dc90c',
    bio: 'Jasmine Sandlas is an Indian-American singer, television personality, performer, songwriter who mainly sings Punjabi songs.'
  },
  {
    id: USER_CUIDS['k.k'],
    name: 'K K',
    email: 'k.k@mizzo.artist',
    username: 'k.k',
    createdAt: new Date('2023-11-20T12:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5ebb09a31f853166e721d4d46b2',
    bio: "An Indian playback singer known for his versatile voice and emotional singing style. Popular for songs like 'Pal', 'Yaaron' and numerous Bollywood hits."
  },
  {
    id: USER_CUIDS['kishore.kumar'],
    name: 'Kishore Kumar',
    email: 'kishore.kumar@mizzo.artist',
    username: 'kishore.kumar',
    createdAt: new Date('2023-09-18T14:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5ebc9ac92d87de28795c1c49730',
    bio: 'An Indian playback singer and actor. He is considered to be one of the greatest singers in the history of Indian music.'
  },
  {
    id: USER_CUIDS['kumar.sanu'],
    name: 'Kumar Sanu',
    email: 'kumar.sanu@mizzo.artist',
    username: 'kumar.sanu',
    createdAt: new Date('2025-01-20T09:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67616d0000b2737911c52518125dbdf4c78f4e',
    bio: 'An Indian playback singer, who is well known for singing in Hindi films, with over 21,000 recorded songs.'
  },
  {
    id: USER_CUIDS['pritam.chakraborty'],
    name: 'Pritam Chakraborty',
    email: 'pritam.chakraborty@mizzo.artist',
    username: 'pritam.chakraborty',
    createdAt: new Date('2025-04-12T10:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67616d00001e020cb0565e2f6fcec8591e2b6d',
    bio: 'An Indian music director, singer, and composer. He has composed music for various Bollywood films and is known for his diverse musical styles.'
  },
  {
    id: USER_CUIDS['sam.smith'],
    name: 'Sam Smith',
    email: 'sam.smith@mizzo.artist',
    username: 'sam.smith',
    createdAt: new Date('2023-10-10T09:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67616100005174d6b2f9db8528fc0cec4cd6c7',
    bio: 'An English singer and songwriter known for their soulful voice and emotional ballads. Famous for hits like "Stay With Me" and "Too Good at Goodbyes".'
  },
  {
    id: USER_CUIDS['shreya.ghoshal'],
    name: 'Shreya Ghoshal',
    email: 'shreya.ghoshal@mizzo.artist',
    username: 'shreya.ghoshal',
    createdAt: new Date('2025-04-05T14:15:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5eb59303d54ce789210e745e1a9',
    bio: 'An Indian playback singer who has recorded songs for films and albums in various Indian languages and has established herself as a leading playback singer of Indian cinema.'
  },
  {
    id: USER_CUIDS['sonu.nigam'],
    name: 'Sonu Nigam',
    email: 'sonu.nigam@mizzo.artist',
    username: 'sonu.nigam',
    createdAt: new Date('2025-03-22T09:30:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5ebbc959d7569618ec2af2210f5',
    bio: 'An Indian singer, music director and actor. He sings predominantly in Hindi films, but has also sung in various other Indian languages.'
  },
  {
    id: USER_CUIDS['sunidhi.chauhan'],
    name: 'Sunidhi Chauhan',
    email: 'sunidhi.chauhan@mizzo.artist',
    username: 'sunidhi.chauhan',
    createdAt: new Date('2023-09-01T11:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5eba45f7ef3e1c982461f2dad6b',
    bio: 'An Indian playback singer known for her powerful voice and energetic performances. Popular for songs in Hindi and regional languages.'
  },
  {
    id: USER_CUIDS['taylor.swift'],
    name: 'Taylor Swift',
    email: 'taylor.swift@mizzo.artist',
    username: 'taylor.swift',
    createdAt: new Date('2025-02-14T08:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647',
    bio: 'An American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread critical praise and media coverage.'
  },
  {
    id: USER_CUIDS['usha.uthup'],
    name: 'Usha Uthup',
    email: 'usha.uthup@mizzo.artist',
    username: 'usha.uthup',
    createdAt: new Date('2025-01-05T17:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5eb2f4bfcf0fbf8614697868204',
    bio: 'An Indian pop, film, jazz, and playback singer who sings in over 12 Indian and foreign languages. Known for her powerful and unconventional voice.'
  },
  {
    id: USER_CUIDS['zubeen.garg'],
    name: 'Zubeen Garg',
    email: 'zubeen.garg@mizzo.artist',
    username: 'zubeen.garg',
    createdAt: new Date('2025-02-20T12:00:00.000Z'),
    avatarUrl:
      'https://i.scdn.co/image/ab6761610000e5ebc921245b32947c7d61a7356c',
    bio: 'An Indian singer, music director, composer, and actor from Assam.'
  }
]

// Artist verification applications for seeding
export const SEED_USER_ARTIST_APPLICATIONS: TSeedUserArtistApplication[] = [
  {
    userId: USER_CUIDS['a.r.rahman'],
    message: 'Music composer seeking artist verification.',
    idProofType: 'Adhaar Card',
    createdAt: new Date('2025-03-09T10:00:00Z')
  },
  {
    userId: USER_CUIDS['alan.walker'],
    message: 'Electronic music producer seeking approval.',
    idProofType: 'National ID',
    createdAt: new Date('2025-01-24T10:30:00Z')
  },
  {
    userId: USER_CUIDS['anirudh.ravichander'],
    message: 'Tamil music director requesting artist verification.',
    idProofType: 'Passport',
    createdAt: new Date('2025-02-27T16:00:00Z')
  },
  {
    userId: USER_CUIDS['anupam.roy'],
    message: 'Bengali musician seeking artist status.',
    idProofType: 'Adhaar Card',
    createdAt: new Date('2023-11-30T13:00:00Z')
  },
  {
    userId: USER_CUIDS['arijit.singh'],
    message: 'Playback singer requesting artist status.',
    idProofType: 'Passport',
    createdAt: new Date('2023-11-14T11:30:00Z')
  },
  {
    userId: USER_CUIDS['atif.aslam'],
    message: 'Playback singer requesting artist status.',
    idProofType: 'Passport',
    createdAt: new Date('2025-03-07T11:00:00Z')
  },
  {
    userId: USER_CUIDS['b.praak'],
    message: 'Punjabi singer requesting platform verification.',
    idProofType: 'Passport',
    createdAt: new Date('2023-12-14T13:00:00Z')
  },
  {
    userId: USER_CUIDS['diljit.dosanjh'],
    message: 'Punjabi singer and actor applying.',
    idProofType: 'Driving License',
    createdAt: new Date('2025-01-09T11:00:00Z')
  },
  {
    userId: USER_CUIDS['dua.lipa'],
    message: 'Pop artist applying for platform verification.',
    idProofType: 'Driving License',
    createdAt: new Date('2023-09-30T10:00:00Z')
  },
  {
    userId: USER_CUIDS['ed.sheeran'],
    message: 'Singer-songwriter requesting artist status.',
    idProofType: 'Driving License',
    createdAt: new Date('2025-02-29T15:00:00Z')
  },
  {
    userId: USER_CUIDS['honey.singh'],
    message: 'Hip-hop artist applying for approval.',
    idProofType: 'National ID',
    createdAt: new Date('2023-12-31T10:00:00Z')
  },
  {
    userId: USER_CUIDS['imagine.dragons'],
    message: 'Rock band seeking artist verification.',
    idProofType: 'Passport',
    createdAt: new Date('2025-02-04T16:00:00Z')
  },
  {
    userId: USER_CUIDS['jeet.ganguly'],
    message: 'Music composer seeking artist approval.',
    idProofType: 'Passport',
    createdAt: new Date('2025-01-28T10:00:00Z')
  },
  {
    userId: USER_CUIDS['jonita.gandhi'],
    message: 'Multilingual singer applying for verification.',
    idProofType: 'Driving License',
    createdAt: new Date('2025-04-17T14:00:00Z')
  },
  {
    userId: USER_CUIDS['jasmine.sandlas'],
    message: 'Punjabi singer and performer applying.',
    idProofType: 'Driving License',
    createdAt: new Date('2025-04-18T14:30:00Z')
  },
  {
    userId: USER_CUIDS['k.k'],
    message: 'Playback singer applying for verification.',
    idProofType: 'Passport',
    createdAt: new Date('2023-11-19T12:00:00Z')
  },
  {
    userId: USER_CUIDS['kishore.kumar'],
    message: 'Legendary singer seeking artist badge.',
    idProofType: 'Adhaar Card',
    createdAt: new Date('2023-09-17T14:00:00Z')
  },
  {
    userId: USER_CUIDS['kumar.sanu'],
    message: 'Bollywood singer applying for verification.',
    idProofType: 'Driving License',
    createdAt: new Date('2025-01-19T09:00:00Z')
  },
  {
    userId: USER_CUIDS['pritam.chakraborty'],
    message: 'Music director applying for approval.',
    idProofType: 'Driving License',
    createdAt: new Date('2025-04-11T10:00:00Z')
  },
  {
    userId: USER_CUIDS['sam.smith'],
    message: 'Professional vocalist requesting artist verification.',
    idProofType: 'Passport',
    createdAt: new Date('2023-10-09T09:00:00Z')
  },
  {
    userId: USER_CUIDS['shreya.ghoshal'],
    message: 'Professional playback singer seeking approval.',
    idProofType: 'Adhaar Card',
    createdAt: new Date('2025-04-04T14:15:00Z')
  },
  {
    userId: USER_CUIDS['sonu.nigam'],
    message: 'Veteran singer requesting verification.',
    idProofType: 'Passport',
    createdAt: new Date('2025-03-21T09:30:00Z')
  },
  {
    userId: USER_CUIDS['sunidhi.chauhan'],
    message: 'Bollywood singer seeking artist badge.',
    idProofType: 'Driving License',
    createdAt: new Date('2023-08-31T11:00:00Z')
  },
  {
    userId: USER_CUIDS['taylor.swift'],
    message: 'Singer-songwriter seeking platform verification.',
    idProofType: 'Passport',
    createdAt: new Date('2025-02-13T08:00:00Z')
  },
  {
    userId: USER_CUIDS['usha.uthup'],
    message: 'Jazz vocalist requesting artist verification.',
    idProofType: 'Passport',
    createdAt: new Date('2025-01-04T17:00:00Z')
  },
  {
    userId: USER_CUIDS['zubeen.garg'],
    message: 'Assamese singer requesting artist verification.',
    idProofType: 'Adhaar Card',
    createdAt: new Date('2025-02-19T12:00:00Z')
  }
]

// Music tracks data for seeding the database
export const SEED_TRACKS: TSeedTrack[] = [
  {
    id: TRACK_CUIDS['a.r.rahman']['jai-ho-slumdog-millionaire'],
    primaryArtistId: USER_CUIDS['a.r.rahman'],
    secondaryArtists: [],
    title: 'Jai Ho (From Slumdog Millionaire)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=UxLSZoFK8EM',
    tags: 'Oscar Winner, Slumdog Millionaire, Hindi-English, Motivational, Dance, AR Rahman Anthem, Sukhwinder Singh, Global Hit',
    createdAt: new Date('2025-03-12T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['a.r.rahman']['maa-tujhe-salaam'],
    primaryArtistId: USER_CUIDS['a.r.rahman'],
    secondaryArtists: [],
    title: 'Maa Tujhe Salaam',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=jDn2bn7_YSM',
    tags: 'Vande Mataram, Patriotic, Indian, Republic Day, Jai Hind, Independence Day, Bharat Anthem, Deshbhakti',
    createdAt: new Date('2025-03-15T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['a.r.rahman']['urvasi-urvasi'],
    primaryArtistId: USER_CUIDS['a.r.rahman'],
    secondaryArtists: [],
    title: 'Urvasi Urvasi',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=5vkRRYMlmuo',
    tags: 'Kadhalan, Tamil, Prabhu Deva, 90s Hit, Dance, Peppy Song, Evergreen, Fun Track',
    createdAt: new Date('2025-03-18T11:45:00Z')
  },
  {
    id: TRACK_CUIDS['a.r.rahman']['mukkala-muqabala-kadhalan'],
    primaryArtistId: USER_CUIDS['a.r.rahman'],
    secondaryArtists: [],
    title: 'Mukkala Muqabala (From Kadhalan)',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=PjT12Ce0Kw8',
    tags: 'Kadhalan, Tamil, Prabhu Deva, Nagma, Dance Number, 90s Classic, Romance, Evergreen',
    createdAt: new Date('2025-03-20T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['a.r.rahman']['enna-sona-ok-jaanu'],
    primaryArtistId: USER_CUIDS['a.r.rahman'],
    secondaryArtists: [],
    title: 'Enna Sona (From OK Jaanu)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=hk4khNFw92w',
    tags: 'OK Jaanu, Hindi, Arijit Singh, Aditya Roy Kapur, Shraddha Kapoor, Romantic, Love Song, Soft Melody',
    createdAt: new Date('2025-03-25T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['a.r.rahman']['vellipomaakey-saahasam-swaasaga-saagipo'],
    primaryArtistId: USER_CUIDS['a.r.rahman'],
    secondaryArtists: [],
    title: 'Vellipomaakey (From Saahasam Swaasaga Saagipo)',
    language: 'telugu',
    youtubeUrl: 'https://www.youtube.com/watch?v=-GydnFPTgus',
    tags: 'Telugu, Romantic, Naga Chaitanya, Manjima Mohan, Melody, Love Ballad, Soothing, Youth Favorite',
    createdAt: new Date('2025-03-28T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['a.r.rahman']['tu-hi-re-bombay'],
    primaryArtistId: USER_CUIDS['a.r.rahman'],
    secondaryArtists: [],
    title: 'Tu Hi Re (From Bombay)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=V9mN0qBgEzQ',
    tags: 'Bombay, Mani Ratnam, Hindi-Tamil, Hariharan, Manisha Koirala, Arvind Swamy, Evergreen Romance, Emotional',
    createdAt: new Date('2025-04-01T09:30:00Z')
  },
  {
    id: TRACK_CUIDS['a.r.rahman']['chaka-chak-atragi-re'],
    primaryArtistId: USER_CUIDS['a.r.rahman'],
    secondaryArtists: [],
    title: 'Chaka Chak (From Atrangi Re)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZS4V05gAy9k',
    tags: 'Atrangi Re, Hindi, Sara Ali Khan, Dhanush, Dance, Folk Style, Festive, Peppy Number',
    createdAt: new Date('2025-04-03T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['a.r.rahman']['hamma-hamma-bombay'],
    primaryArtistId: USER_CUIDS['a.r.rahman'],
    secondaryArtists: [],
    title: 'Hamma Hamma (From Bombay)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=aIx2i5NSXxU',
    tags: 'Bombay, Hindi, Remix Favorite, Dance, Romantic Groove, Evergreen, 90s Hit, Love Song',
    createdAt: new Date('2025-04-05T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['kesariya-brahmastra'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Kesariya (From Brahmastra)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=6mr4cYJ7yew',
    tags: 'Brahmastra, Ranbir Kapoor, Alia Bhatt, Romantic, Wedding Favorite, Hindi, Love Anthem, 2022 Hit',
    createdAt: new Date('2023-11-20T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['channa-mereya-ae-dil-hai-mushkil'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Channa Mereya (From Ae Dil Hai Mushkil)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=jglVv0JfZUc',
    tags: 'Ae Dil Hai Mushkil, Ranbir Kapoor, Anushka Sharma, Heartbreak, Hindi, Romantic, Sad Song, Wedding Favorite',
    createdAt: new Date('2023-11-25T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['khairiyat-chhichhore'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Khairiyat (From Chhichhore)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=hoNb6HuNmU0',
    tags: 'Chhichhore, Sushant Singh Rajput, Shraddha Kapoor, Hindi, Friendship, Nostalgia, Emotional, Melody',
    createdAt: new Date('2023-11-28T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['gerua-dilwale'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Gerua (From Dilwale)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=2zoIA42nJJc',
    tags: 'Dilwale, Shah Rukh Khan, Kajol, Romantic, Scenic Song, Hindi, SRK-Kajol Chemistry, Love Anthem',
    createdAt: new Date('2023-12-01T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['phir-le-aaya-dil-barfi'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Phir Le Aaya Dil (From Barfi!)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=OHqJRf94xrc',
    tags: "Barfi, Ranbir Kapoor, Priyanka Chopra, Ileana D'Cruz, Ghazal Style, Soulful, Hindi, Heartfelt",
    createdAt: new Date('2023-12-05T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['tum-hi-ho-aashiqui-2'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Tum Hi Ho (From Aashiqui 2)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=WWZxDA81JFk',
    tags: 'Aashiqui 2, Aditya Roy Kapur, Shraddha Kapoor, Romantic, Evergreen, Hindi, Love Anthem, Soulful Ballad',
    createdAt: new Date('2023-12-10T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['aami-tomar-kache-yoddha'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Aami Tomar Kache (Yoddha)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=TTkjAOt2i70',
    tags: 'Yoddha, Bengali, Romantic, Dev, Mimi Chakraborty, Love Song, Melody, Regional Favorite',
    createdAt: new Date('2023-12-12T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['ki-kore-toke-bolbo'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Ki Kore Toke Bolbo',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=wiVzpyjdZxI',
    tags: 'Bengali, Romantic, Jeet, Sayantika Banerjee, Love Song, Emotional, Melody, Modern Bengali Hit',
    createdAt: new Date('2023-12-15T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['mon-majhi-re'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Mon Majhi Re',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=-qj5aTvSnkM',
    tags: 'Bengali, Srijit Mukherji, Jeet, Love Song, Romantic, Melody, Popular Bengali Track, Emotional',
    createdAt: new Date('2023-12-18T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['tomake-chuye-dilam'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Tomake Chuye Dilam',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=TRhQNNE6mCM',
    tags: 'Bengali, Romantic, Love Song, Emotional, Melody, Regional Favorite, Modern Bengali',
    createdAt: new Date('2023-12-20T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['ami-je-tomar-bhool-bhulaiyaa-2'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Ami Je Tomar (From Bhool Bhulaiyaa 2)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=q3nIItk0-wU',
    tags: 'Bhool Bhulaiyaa 2, Kartik Aaryan, Kiara Advani, Hindi, Horror, Romantic, Classical Touch, Emotional',
    createdAt: new Date('2023-12-22T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['anuvanuvuu-om-bheem-bush'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Anuvanuvuu - Om Bheem Bush',
    language: 'telugu',
    youtubeUrl: 'https://www.youtube.com/watch?v=E7ww8Xowydc',
    tags: 'Telugu, Romantic, Emotional, Melody, Love Ballad, Regional Hit, Soothing, Arijit Singh',
    createdAt: new Date('2023-12-25T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['ee-raathale-radhe-shyam'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Ee Raathale (Radhe Shyam)',
    language: 'telugu',
    youtubeUrl: 'https://www.youtube.com/watch?v=b1_5YO11rmM',
    tags: 'Radhe Shyam, Prabhas, Pooja Hegde, Hindi-Telugu, Romantic, Melody, Love Anthem, Soulful',
    createdAt: new Date('2023-12-28T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['suno-na-sangemarmar-youngistaan'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Suno Na Sangemarmar (From Youngistaan)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=v7jiFpX5SU4',
    tags: 'Youngistaan, Pulkit Samrat, Amy Jackson, Hindi, Romantic, Soft Melody, Love Song, Popular',
    createdAt: new Date('2025-01-01T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['arijit.singh']['aayat-bajirao-mastani'],
    primaryArtistId: USER_CUIDS['arijit.singh'],
    secondaryArtists: [],
    title: 'Aayat (From Bajirao Mastani)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=74nPCMebpYg',
    tags: 'Bajirao Mastani, Ranveer Singh, Deepika Padukone, Priyanka Chopra, Hindi, Romantic, Classical, Emotional',
    createdAt: new Date('2025-01-05T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['kumar.sanu']['tujhe-dekha-to-yeh-jaana-sanam'],
    primaryArtistId: USER_CUIDS['kumar.sanu'],
    secondaryArtists: [],
    title: 'Tujhe Dekha To (From DDLJ)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=cNV5hLSa9H8',
    tags: 'DDLJ, Shah Rukh Khan, Kajol, Hindi, Romantic, Evergreen, Bollywood Classic, Love Anthem',
    createdAt: new Date('2025-01-22T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['kumar.sanu']['ek-ladki-ko-dekha-to-1942-a-love-story'],
    primaryArtistId: USER_CUIDS['kumar.sanu'],
    secondaryArtists: [],
    title: 'Ek Ladki Ko Dekha To (From 1942 A Love Story)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=htMvfOfixuM',
    tags: '1942 A Love Story, Anil Kapoor, Manisha Koirala, Hindi, Romantic, Evergreen, Melody, Bollywood Hit',
    createdAt: new Date('2025-01-25T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['kumar.sanu']['chura-ke-dil-mera-main-khiladi-tu-anari'],
    primaryArtistId: USER_CUIDS['kumar.sanu'],
    secondaryArtists: [],
    title: 'Chura Ke Dil Mera (From Main Khiladi Tu Anari)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=Yqj1_V90KJo',
    tags: 'Main Khiladi Tu Anari, Akshay Kumar, Saif Ali Khan, Hindi, Dance, Romantic, 90s Hit, Peppy Song',
    createdAt: new Date('2025-01-28T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['kumar.sanu']['mera-dil-bhi-kitna-pagal-hai'],
    primaryArtistId: USER_CUIDS['kumar.sanu'],
    secondaryArtists: [],
    title: 'Mera Dil Bhi Kitna Pagal Hai (From Saajan)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=FsNc7I33w60',
    tags: 'Saajan, Salman Khan, Madhuri Dixit, Hindi, Romantic, Classic, Melody, Emotional',
    createdAt: new Date('2025-02-01T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['kumar.sanu']['jab-koi-baat-bigad-jaye-jurm'],
    primaryArtistId: USER_CUIDS['kumar.sanu'],
    secondaryArtists: [],
    title: 'Jab Koi Baat Bigad Jaye (From Jurm)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=mNSYPtzpfd4',
    tags: 'Jurm, Bollywood, Hindi, Romantic, Duet, Evergreen, Love Ballad, Classic Hit',
    createdAt: new Date('2025-02-05T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['kumar.sanu']['do-dil-mil-rahe-hain-pardes'],
    primaryArtistId: USER_CUIDS['kumar.sanu'],
    secondaryArtists: [],
    title: 'Do Dil Mil Rahe Hain (From Pardes)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=eKIpHujNdX0',
    tags: 'Pardes, Shah Rukh Khan, Mahima Chaudhry, Hindi, Romantic, Love Anthem, Melody, Evergreen',
    createdAt: new Date('2025-02-08T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['deewani-mastani-bajirao-mastani'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Deewani Mastani (From Bajirao Mastani)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=h6lHUn20J5g',
    tags: 'Bajirao Mastani, Ranveer Singh, Deepika Padukone, Priyanka Chopra, Hindi, Romantic, Classical, Dance, Shreya Ghoshal',
    createdAt: new Date('2025-04-08T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['ghoomar-padmaavat'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Ghoomar (From Padmaavat)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=6cKErCWrb44',
    tags: 'Padmaavat, Deepika Padukone, Shahid Kapoor, Hindi, Rajasthani Folk, Dance, Traditional, Epic, Shreya Ghoshal',
    createdAt: new Date('2025-04-10T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['guli-mata'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Guli Mata (Shreya Ghoshal X Saad Lamjarred)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=Gp1RNYBckBs',
    tags: 'Pop Fusion, International, Duet, Dance, Shreya Ghoshal, Saad Lamjarred, Hindi-Arabic, Catchy, Romantic',
    createdAt: new Date('2025-04-12T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['munbe-vaa-sillunu-oru-kaadhal'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Munbe Vaa (From Sillunu Oru Kaadhal)',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=UPQZ4vuvW2s',
    tags: 'Sillunu Oru Kaadhal, Tamil, Vijay, Trisha, Romantic, Melody, Soft Ballad, Shreya Ghoshal',
    createdAt: new Date('2025-04-14T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['nagada-sang-dhol-ram-leela'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Nagada Sang Dhol - Ram-Leela',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=3X7x4Ye-tqo',
    tags: 'Ram-Leela, Ranveer Singh, Deepika Padukone, Hindi, Dance, Folk, Festival Song, Shreya Ghoshal',
    createdAt: new Date('2025-04-16T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['tumi-bondhu-aaj-shunbe'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Tumi Bondhu Aaj Shunbe',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=znhB3R1qHZ4',
    tags: 'Shantanu Moitra, Emotional, Night Conspiracy, Inner Conflict, Breaking Boundaries, Destruction, Rebellion',
    createdAt: new Date('2025-04-18T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['anuraga-vilochananayi'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Anuraga Vilochananayi',
    language: 'malayalam',
    youtubeUrl: 'https://www.youtube.com/watch?v=maGx1qLP3GE',
    tags: 'Malayalam, Romantic, Soft Melody, Love Song, Emotional, Shreya Ghoshal, Regional Hit',
    createdAt: new Date('2025-04-20T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['chhaila-bhoomi'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [USER_CUIDS['sunidhi.chauhan']],
    title: 'Chhaila (Shreya Ghoshal X Sunidhi Chauhan)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=4UkJ-AziPu0',
    tags: 'Bollywood, Dance, Duet, Party Song, Hindi, Shreya Ghoshal, Sunidhi Chauhan, Peppy',
    createdAt: new Date('2025-04-06T10:30:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['neel-digante'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Neel Digante',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y1doS51Ec4I',
    tags: 'Telugu, Romantic, Soft Melody, Emotional, Shreya Ghoshal, Love Ballad, Regional Hit',
    createdAt: new Date('2025-04-22T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['namo-shankara-mahashivaratri'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Namo Shankara - Mahashivaratri - Shreya Ghoshal',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=mb0Aix5gZ4A',
    tags: 'Devotional, Hindi, Shreya Ghoshal, Lord Shiva, Bhajan, Festival, Spiritual, Celebration',
    createdAt: new Date('2025-04-25T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['neenadena-yuvarathnaa'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Neenadena (From Yuvarathnaa)',
    language: 'kannada',
    youtubeUrl: 'https://www.youtube.com/watch?v=3s5XyooFGpg',
    tags: 'Kannada, Romantic, Puneeth Rajkumar, Soft Melody, Emotional, Love Ballad, Shreya Ghoshal',
    createdAt: new Date('2025-04-28T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['yimmy-yimmy-tayc'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Yimmy Yimmy - Tayc',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=OzI9M74IfR0',
    tags: 'Pop, Duet, International, Catchy, Dance, Shreya Ghoshal, Tayc, Fusion, Romantic',
    createdAt: new Date('2025-04-30T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['chawlraastaye-autograph'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'ChawlRaastaye - Autograph',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y7okSN12O54',
    tags: 'Marathi, Emotional, Melody, Love Song, Shreya Ghoshal, Regional, Soft, Romantic',
    createdAt: new Date('2025-05-02T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['jao-pakhi-bolo'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Jao Pakhi Bolo',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=IUmHCgivgi4',
    tags: 'Bengali, Soft Melody, Romantic, Emotional, Shreya Ghoshal, Love Ballad, Regional Favorite',
    createdAt: new Date('2025-05-05T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['jeev-rangla-jogwa'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Jeev Rangla (From Jogwa)',
    language: 'marathi',
    youtubeUrl: 'https://www.youtube.com/watch?v=en60_iC0u2M',
    tags: 'Marathi, National Award, Romantic, Melody, Emotional, Regional Hit, Shreya Ghoshal',
    createdAt: new Date('2025-05-07T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['shreya.ghoshal']['adhir-man-zhaley'],
    primaryArtistId: USER_CUIDS['shreya.ghoshal'],
    secondaryArtists: [],
    title: 'Adhir Man Zhaley',
    language: 'marathi',
    youtubeUrl: 'https://www.youtube.com/watch?v=pCaq8r4OvS8',
    tags: 'Marathi, Romantic, Soft Ballad, Emotional, Shreya Ghoshal, Regional Hit, Love Song',
    createdAt: new Date('2025-05-09T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['why-this-kolaveri-di'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [],
    title: 'Why This Kolaveri Di',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=YR12Z8f1Dh8',
    tags: 'Tamil, Viral Hit, Dhanush, Fun Song, Internet Sensation, Catchy, Dance, Youth Favorite',
    createdAt: new Date('2025-03-01T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['arabic-kuthu-beast'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [USER_CUIDS['jonita.gandhi']],
    title: 'Arabic Kuthu (From Beast)',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=KUN5Uf9mObQ',
    tags: 'Tamil, Vijay, Pooja Hegde, Dance, Peppy, Party Song, Viral, Mass Track',
    createdAt: new Date('2025-03-05T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['vaathi-coming-master'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [],
    title: 'Vaathi Coming (From Master)',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=fRD_3vJagxk',
    tags: 'Tamil, Vijay, Dance, Mass Song, Celebration, Festival, Peppy, Party Track',
    createdAt: new Date('2025-03-08T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['hukum-jailer'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [],
    title: 'Hukum (From Jailer)',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=1F3hm6MfR1k',
    tags: 'Tamil, Rajinikanth, Dance, Mass Song, Celebration, Peppy, Action Movie, Catchy',
    createdAt: new Date('2025-03-12T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['naa-ready-leo'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [],
    title: 'Naa Ready (From Leo)',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=szvt1vD0Uug',
    tags: 'Tamil, Vijay, Dance, Mass Track, Peppy, Action, Celebration, Youth Favorite',
    createdAt: new Date('2025-03-15T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['gaali-vaaluga-agnyaathavaasi'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [],
    title: 'Gaali Vaaluga (From Agnyaathavaasi)',
    language: 'telugu',
    youtubeUrl: 'https://www.youtube.com/watch?v=yUNMH9KaTjA',
    tags: 'Telugu, Allu Arjun, Action, Dance, Mass Song, Peppy, Catchy, Party Track',
    createdAt: new Date('2025-03-18T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['hoyna-hoyna-gang-leader'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [],
    title: 'Hoyna Hoyna (From Gang Leader)',
    language: 'telugu',
    youtubeUrl: 'https://www.youtube.com/watch?v=91EzD9VgwGk',
    tags: 'Telugu, Mass Song, Dance, Peppy, Stylish, Allu Arjun, Celebration, Catchy',
    createdAt: new Date('2025-03-20T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['zinda-banda-jawan'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [],
    title: 'Zinda Banda (From Jawan)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=AQEc4BwX6dk',
    tags: 'Tamil, Shah Rukh Khan, Action, Dance, Mass Track, Party, Celebration, Energetic',
    createdAt: new Date('2025-03-22T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['ayudha-pooja-devara'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [],
    title: 'Ayudha Pooja | Devara',
    language: 'telugu',
    youtubeUrl: 'https://www.youtube.com/watch?v=HZ_Q20ir-gg',
    tags: 'Tamil, Festival Song, Dance, Mass Track, Peppy, Celebration, Energetic, Catchy',
    createdAt: new Date('2025-03-25T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['anirudh.ravichander']['baitikochi-chuste-agnyaathavaasi'],
    primaryArtistId: USER_CUIDS['anirudh.ravichander'],
    secondaryArtists: [],
    title: 'Baitikochi Chuste (From Agnyaathavaasi)',
    language: 'telugu',
    youtubeUrl: 'https://www.youtube.com/watch?v=JXIiQFSj8Yg',
    tags: 'Telugu, Stylish, Dance, Mass Track, Peppy, Allu Arjun, Catchy, Celebration',
    createdAt: new Date('2025-03-28T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['diljit.dosanjh']['lover-moonchild-era'],
    primaryArtistId: USER_CUIDS['diljit.dosanjh'],
    secondaryArtists: [],
    title: 'Lover (From Moonchild Era)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=mH_LFkWxpI0',
    tags: 'Punjabi, Romantic, Melody, Love Song, Emotional, Youth Favorite, Soft Ballad',
    createdAt: new Date('2025-01-12T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['diljit.dosanjh']['tenu-ki-pata'],
    primaryArtistId: USER_CUIDS['diljit.dosanjh'],
    secondaryArtists: [],
    title: 'Tenu Ki Pata (From The Ba***ds Of Bollywood)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=bWNegJHBnUk',
    tags: 'Aryan Khan, Badshah, Punjabi, Party Song, Dance, Peppy, Youth Favorite, Bass Boosted',
    createdAt: new Date('2025-01-15T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['diljit.dosanjh']['proper-patola-namaste-england'],
    primaryArtistId: USER_CUIDS['diljit.dosanjh'],
    secondaryArtists: [],
    title: 'Proper Patola (From Namaste England)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=YmXJp4RtBCM',
    tags: 'Punjabi, Bollywood, Party Song, Dance, Peppy, Catchy, Youth Favorite, Fun Track',
    createdAt: new Date('2025-01-18T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['diljit.dosanjh']['do-you-know'],
    primaryArtistId: USER_CUIDS['diljit.dosanjh'],
    secondaryArtists: [],
    title: 'Do You Know',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=P-DhwN87JDY',
    tags: 'Punjabi, Romantic, Love Song, Soft Melody, Emotional, Melody, Youth Favorite, Catchy',
    createdAt: new Date('2025-01-20T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['diljit.dosanjh']['born-to-shine-g-o-a-t'],
    primaryArtistId: USER_CUIDS['diljit.dosanjh'],
    secondaryArtists: [],
    title: 'Born To Shine (From G.O.A.T.)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=OaIYx56dqu0',
    tags: 'Punjabi, Motivational, Dance, Peppy, Youth Favorite, Catchy, Energetic, Party Track',
    createdAt: new Date('2025-01-22T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['diljit.dosanjh']['patiala-peg'],
    primaryArtistId: USER_CUIDS['diljit.dosanjh'],
    secondaryArtists: [],
    title: 'Patiala Peg',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=xB9-dsTC_0U',
    tags: 'Punjabi, Party Song, Dance, Catchy, Fun Track, Peppy, Youth Favorite, Celebration',
    createdAt: new Date('2025-01-25T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['diljit.dosanjh']['g-o-a-t-title-track'],
    primaryArtistId: USER_CUIDS['diljit.dosanjh'],
    secondaryArtists: [],
    title: 'G.O.A.T. (Title Track)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=cl0a3i2wFcc',
    tags: 'Punjabi, Rap, Motivational, Catchy, Dance, Youth Favorite, Energetic, Party Track',
    createdAt: new Date('2025-01-28T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['amake-amar-moto-thakte-dao'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [],
    title: 'Amake Amar Moto Thakte Dao',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=ilgT99XFUq8',
    tags: 'Bengali, Romantic, Melody, Love Song, Emotional, Soft Ballad, Regional Hit, Popular',
    createdAt: new Date('2023-12-03T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['bezubaan-piku'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [],
    title: 'Bezubaan (From Piku)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=RVRlV53TjzY',
    tags: 'Hindi, Piku, Amitabh Bachchan, Deepika Padukone, Romantic, Soft Melody, Emotional, Love Song',
    createdAt: new Date('2023-12-05T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['journey-song-piku'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [USER_CUIDS['shreya.ghoshal']],
    title: 'The Journey Song (From Piku)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=2__nNm0NK4A',
    tags: 'Hindi, Piku, Amitabh Bachchan, Deepika Padukone, Light, Travel Theme, Soft, Melody',
    createdAt: new Date('2023-12-08T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['gobheere-jao-baishe-srabon'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [],
    title: 'Gobheere Jao (From Baishe Srabon)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=yQyQ1sjyNBQ',
    tags: 'Bengali, Thriller, Mystery, Emotional, Melody, Regional Hit, Popular, Background Song',
    createdAt: new Date('2023-12-10T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['bondhu-chol'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [],
    title: 'Bondhu Chol - Open Tee Bioscope',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=sZdmkif8CSY',
    tags: 'Bengali, Youth, Romantic, Melody, Emotional, Regional Favorite, Love Song, Soft Ballad',
    createdAt: new Date('2023-12-12T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['tumi-jaake-bhalobasho-praktan'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [],
    title: 'Tumi Jaake Bhalobasho (From Praktan)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=LkUqqoKB4rM',
    tags: 'Bengali, Romantic, Melody, Emotional, Love Song, Regional Hit, Popular, Soft Ballad',
    createdAt: new Date('2023-12-15T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['ekbar-bol'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [],
    title: 'Ekbar Bol (Baishe Srabon)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=EooMDG2W25g',
    tags: 'Bengali, Thriller, Melody, Emotional, Soft, Regional Favorite, Love Song, Popular',
    createdAt: new Date('2023-12-18T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['bariye-dao-tomar-haat'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [],
    title: 'Bariye Dao Tomar Haat',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=9b7G9zW-SZ8',
    tags: 'Bengali, Romantic, Melody, Love Song, Emotional, Soft, Regional Hit, Popular',
    createdAt: new Date('2023-12-20T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['ure-jaak-uma'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [],
    title: 'Ure Jaak (From Uma)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=6AV7ZiEicbQ',
    tags: 'Bengali, Romantic, Melody, Emotional, Love Song, Soft Ballad, Regional Hit, Popular',
    createdAt: new Date('2023-12-22T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['anupam.roy']['jaago-jaago-uma'],
    primaryArtistId: USER_CUIDS['anupam.roy'],
    secondaryArtists: [],
    title: 'Jaago Jaago Uma',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=OWhOsOHQjY0',
    tags: 'Bengali, Inspirational, Motivational, Melody, Soft, Emotional, Regional Hit, Youth Favorite',
    createdAt: new Date('2023-12-25T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['sonu.nigam']['kal-ho-naa-ho-title-track'],
    primaryArtistId: USER_CUIDS['sonu.nigam'],
    secondaryArtists: [],
    title: 'Kal Ho Naa Ho (Title Track)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=oq5Ocx_rEv8',
    tags: 'Hindi, Shah Rukh Khan, Preity Zinta, Romance, Melody, Emotional, Evergreen, Bollywood Hit',
    createdAt: new Date('2025-03-24T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['sonu.nigam']['abhi-mujh-mein-kahin-agneepath'],
    primaryArtistId: USER_CUIDS['sonu.nigam'],
    secondaryArtists: [],
    title: 'Abhi Mujh Mein Kahin (From Agneepath)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=usSA3mPzOJY',
    tags: 'Hindi, Hrithik Roshan, Melody, Emotional, Love Song, Bollywood, Evergreen, Romantic',
    createdAt: new Date('2025-03-26T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['sonu.nigam']['saathiya-title-track'],
    primaryArtistId: USER_CUIDS['sonu.nigam'],
    secondaryArtists: [],
    title: 'Saathiya (Title Track)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=eMA6GHTQ4WA',
    tags: 'Hindi, Vivek Oberoi, Rani Mukerji, Romantic, Melody, Evergreen, Bollywood, Love Song',
    createdAt: new Date('2025-03-28T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['sonu.nigam']['main-agar-kahoon-om-shanti-om'],
    primaryArtistId: USER_CUIDS['sonu.nigam'],
    secondaryArtists: [USER_CUIDS['shreya.ghoshal']],
    title: 'Main Agar Kahoon (From Om Shanti Om)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=DAYszemgPxc',
    tags: 'Hindi, Shah Rukh Khan, Deepika Padukone, Romantic, Melody, Soft Ballad, Bollywood, Love Song',
    createdAt: new Date('2025-03-30T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['sonu.nigam']['sandese-aate-hain-border'],
    primaryArtistId: USER_CUIDS['sonu.nigam'],
    secondaryArtists: [],
    title: 'Sandese Aate Hain (From Border)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=HsQYlZEtKX4',
    tags: 'Hindi, Sunny Deol, Jackie Shroff, Patriotic, War Film, Melody, Emotional, Evergreen',
    createdAt: new Date('2025-04-01T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['sonu.nigam']['shukran-allah-kurbaan'],
    primaryArtistId: USER_CUIDS['sonu.nigam'],
    secondaryArtists: [USER_CUIDS['shreya.ghoshal']],
    title: 'Shukran Allah (From Kurbaan)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=z_B0PF8Ug00',
    tags: 'Hindi, Kurbaan, Saif Ali Khan, Kareena Kapoor, Romantic, Melody, Soft Ballad, Emotional',
    createdAt: new Date('2025-04-03T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['sonu.nigam']['mungaru-maleye'],
    primaryArtistId: USER_CUIDS['sonu.nigam'],
    secondaryArtists: [],
    title: 'Mungaru Maleye (Title Track)',
    language: 'kannada',
    youtubeUrl: 'https://www.youtube.com/watch?v=QrCQyRSoEtY',
    tags: 'Kannada, Romantic, Melody, Love Song, Emotional, Evergreen, Regional Hit, Soft Ballad',
    createdAt: new Date('2025-04-05T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['sonu.nigam']['anisuthide-yaako-indhu-mungaru-maleye'],
    primaryArtistId: USER_CUIDS['sonu.nigam'],
    secondaryArtists: [],
    title: 'Anisuthide Yaako Indhu (From Mungaru Maleye)',
    language: 'kannada',
    youtubeUrl: 'https://www.youtube.com/watch?v=DMmrwp1pS6E',
    tags: 'Kannada, Romantic, Melody, Love Song, Emotional, Soft Ballad, Regional Hit, Evergreen',
    createdAt: new Date('2025-03-25T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['dua.lipa']['dont-start-now'],
    primaryArtistId: USER_CUIDS['dua.lipa'],
    secondaryArtists: [],
    title: "Don't Start Now",
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=oygrmJFKYZY',
    tags: 'Pop, Dance, Disco, Energetic, 2019 Hit, Catchy, Party Song, International',
    createdAt: new Date('2023-10-15T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['dua.lipa']['levitating-feat-dababy'],
    primaryArtistId: USER_CUIDS['dua.lipa'],
    secondaryArtists: [],
    title: 'Levitating (feat. DaBaby)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw',
    tags: 'Pop, Dance, Disco, 2020 Hit, Energetic, Catchy, International, Party Song',
    createdAt: new Date('2023-11-01T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['dua.lipa']['new-rules'],
    primaryArtistId: USER_CUIDS['dua.lipa'],
    secondaryArtists: [],
    title: 'New Rules',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=k2qgadSvNyU',
    tags: 'Pop, Dance, Empowerment, 2017 Hit, Catchy, International, Party Anthem, Energetic',
    createdAt: new Date('2023-10-20T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['dua.lipa']['one-kiss-calvin-harris'],
    primaryArtistId: USER_CUIDS['dua.lipa'],
    secondaryArtists: [],
    title: 'One Kiss (with Calvin Harris)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=DkeiKbqa02g',
    tags: 'EDM, Dance, Club Hit, Calvin Harris, Electronic, Catchy, International, Party Song',
    createdAt: new Date('2023-11-10T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['dua.lipa']['houdini-single'],
    primaryArtistId: USER_CUIDS['dua.lipa'],
    secondaryArtists: [],
    title: 'Houdini (Single)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=suAR1PYFNYA',
    tags: 'Pop, Dance, Catchy, International, Energetic, Fun Track, 2020s Hit, Party',
    createdAt: new Date('2023-12-01T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['kishore.kumar']['mere-sapno-ki-rani-aradhana'],
    primaryArtistId: USER_CUIDS['kishore.kumar'],
    secondaryArtists: [],
    title: 'Mere Sapno Ki Rani (From Aradhana)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=9PdSmDRGIwM',
    tags: 'Aradhana, Rajesh Khanna, Hindi, Romantic, Classic, Evergreen, Melody, Bollywood Hit',
    createdAt: new Date('2023-09-20T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['kishore.kumar']['o-mere-dil-ke-chain'],
    primaryArtistId: USER_CUIDS['kishore.kumar'],
    secondaryArtists: [],
    title: 'O Mere Dil Ke Chain',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=-Px0efU00uQ',
    tags: 'Hindi, Rajesh Khanna, Romantic, Melody, Evergreen, Classic, Bollywood, Love Song',
    createdAt: new Date('2023-09-22T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['kishore.kumar']['yeh-shaam-mastani-kati-patang'],
    primaryArtistId: USER_CUIDS['kishore.kumar'],
    secondaryArtists: [],
    title: 'Yeh Shaam Mastani (From Kati Patang)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=lbfWsIpXsCA',
    tags: 'Kati Patang, Rajesh Khanna, Hindi, Romantic, Evergreen, Melody, Soft Ballad, Classic',
    createdAt: new Date('2023-09-25T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['kishore.kumar']['roop-tera-mastana-aradhana'],
    primaryArtistId: USER_CUIDS['kishore.kumar'],
    secondaryArtists: [],
    title: 'Roop Tera Mastana (From Aradhana)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=dyEdcOhxJNQ',
    tags: 'Aradhana, Rajesh Khanna, Hindi, Romantic, Evergreen, Melody, Bollywood Classic, Love Song',
    createdAt: new Date('2023-09-28T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['kishore.kumar']['pal-pal-dil-ke-paas-blackmail'],
    primaryArtistId: USER_CUIDS['kishore.kumar'],
    secondaryArtists: [],
    title: 'Pal Pal Dil Ke Paas (From Blackmail)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=AMuRRXCuy-4',
    tags: 'Blackmail, Dharmendra, Hindi, Romantic, Melody, Evergreen, Classic, Love Song',
    createdAt: new Date('2023-10-01T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['kishore.kumar']['ami-chini-go-chini-charulata'],
    primaryArtistId: USER_CUIDS['kishore.kumar'],
    secondaryArtists: [],
    title: 'Ami Chini Go Chini (From Charulata)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=CYBc8xPAs_o',
    tags: 'Charulata, Bengali, Satyajit Ray, Classic, Melody, Romantic, Evergreen, Soft Ballad',
    createdAt: new Date('2023-10-05T14:00:00Z')
  },

  // TODO: Cross Check these tracks
  {
    id: TRACK_CUIDS['usha.uthup']['darling-7-khoon-maaf'],
    primaryArtistId: USER_CUIDS['usha.uthup'],
    secondaryArtists: [],
    title: 'Darling (From 7 Khoon Maaf)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=q_b8tcbRhXE',
    tags: '7 Khoon Maaf, Hindi, Thriller, Usha Uthup, Jazz, Catchy, Melody, Bollywood',
    createdAt: new Date('2025-01-10T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['usha.uthup']['hari-om-hari-pyara-dushman'],
    primaryArtistId: USER_CUIDS['usha.uthup'],
    secondaryArtists: [],
    title: 'Hari Om Hari (From Pyara Dushman)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=cOnLqQgD538',
    tags: 'Pyara Dushman, Hindi, Dance, Retro, Catchy, Usha Uthup, Party Song, Fun Track',
    createdAt: new Date('2025-01-15T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['usha.uthup']['rambha-ho-ho-ho-armageddon'],
    primaryArtistId: USER_CUIDS['usha.uthup'],
    secondaryArtists: [],
    title: 'Rambha Ho Ho Ho (From Armageddon)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=MINo9f1hpz8',
    tags: 'Hindi, Dance, Fun Track, Retro, Party Song, Catchy, Usha Uthup, Bollywood',
    createdAt: new Date('2025-01-20T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['usha.uthup']['aami-shotti-bolchi-kahaani'],
    primaryArtistId: USER_CUIDS['usha.uthup'],
    secondaryArtists: [],
    title: 'Aami Shotti Bolchi (From Kahaani)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=dWrOxSyv9cA',
    tags: 'Kahaani, Vidya Balan, Hindi, Thriller, Melody, Catchy, Usha Uthup, Bollywood',
    createdAt: new Date('2025-01-25T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['usha.uthup']['auva-auva-koi-yahan-nache'],
    primaryArtistId: USER_CUIDS['usha.uthup'],
    secondaryArtists: [],
    title: 'Auva Auva Koi Yahan Nache',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=3vylXQbEULQ',
    tags: 'Hindi, Dance, Party Song, Catchy, Usha Uthup, Fun Track, Retro, Bollywood',
    createdAt: new Date('2025-01-30T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['usha.uthup']['uri-uri-baba'],
    primaryArtistId: USER_CUIDS['usha.uthup'],
    secondaryArtists: [],
    title: 'Uri Uri Baba',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=y9QZFFVB9qs',
    tags: 'Hindi, Fun Track, Party Song, Catchy, Retro, Usha Uthup, Dance, Bollywood',
    createdAt: new Date('2025-01-30T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['usha.uthup']['vande-mataram-k3g'],
    primaryArtistId: USER_CUIDS['usha.uthup'],
    secondaryArtists: [],
    title: 'Vande Mataram (From K3G)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=eDBrF3yfZHE',
    tags: 'K3G, Shahrukh Khan, Hindi, Patriotic, Festival, Vande Mataram, Usha Uthup, Iconic',
    createdAt: new Date('2025-02-03T17:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty']['ae-dil-hai-mushkil-title-track'],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Ae Dil Hai Mushkil (Title Track)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=wx89ZdkwtS8',
    tags: 'Ae Dil Hai Mushkil, Ranbir Kapoor, Anushka Sharma, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2025-04-15T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty']['in-dino-life-in-a-metro'],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [],
    title: 'In Dino (From Life In A Metro)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=dXFVOkq41us',
    tags: 'Life In A Metro, Shiney Ahuja, Mahi Gill, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2025-04-18T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty'][
      'badtameez-dil-yeh-jawaani-hai-deewani'
    ],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [],
    title: 'Badtameez Dil (From Yeh Jawaani Hai Deewani)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=II2EO3Nw4m0',
    tags: 'Yeh Jawaani Hai Deewani, Ranbir Kapoor, Deepika Padukone, Hindi, Dance, Party, Peppy, Catchy',
    createdAt: new Date('2025-04-20T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty']['shayad-love-aaj-kal'],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Shayad (From Love Aaj Kal)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=MJyKN-8UncM',
    tags: 'Love Aaj Kal, Kartik Aaryan, Sara Ali Khan, Hindi, Romantic, Soft Ballad, Melody, Emotional',
    createdAt: new Date('2025-04-22T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty']['raabta-agent-vinod'],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Raabta (From Agent Vinod)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=zlt38OOqwDc',
    tags: 'Agent Vinod, Saif Ali Khan, Kareena Kapoor, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2025-04-25T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty'][
      'pee-loon-once-upon-a-time-in-mumbaai'
    ],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [],
    title: 'Pee Loon (From Once Upon A Time In Mumbaai)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=D8XFTglfSMg',
    tags: 'Once Upon A Time In Mumbaai, Emraan Hashmi, Prachi Desai, Hindi, Romantic, Melody, Love Song, Soft',
    createdAt: new Date('2025-04-28T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty']['tum-se-hi-jab-we-met'],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [],
    title: 'Tum Se Hi (From Jab We Met)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=Cb6wuzOurPc',
    tags: 'Jab We Met, Shahid Kapoor, Kareena Kapoor, Hindi, Romantic, Melody, Love Song, Evergreen',
    createdAt: new Date('2025-05-01T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty'][
      'subhanallah-yeh-jawaani-hai-deewani'
    ],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [],
    title: 'Subhanallah (From Yeh Jawaani Hai Deewani)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=QYO6AlxiRE4',
    tags: 'Yeh Jawaani Hai Deewani, Ranbir Kapoor, Deepika Padukone, Hindi, Romantic, Melody, Love Song, Soft Ballad',
    createdAt: new Date('2025-05-03T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty']['janam-janam-dilwale'],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Janam Janam (Dilwale 2015)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=pIBoAh4OXhQ',
    tags: 'Dilwale, Shah Rukh Khan, Kajol, Hindi, Romantic, Melody, Love Song, Soft Ballad',
    createdAt: new Date('2025-05-05T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['pritam.chakraborty']['oh-my-love-amanush-2'],
    primaryArtistId: USER_CUIDS['pritam.chakraborty'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Tujhe Sochta Hoon | Jannat 2',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZNbE-PfI6jk',
    tags: 'Jannat 2, Emraan Hashmi, Esha Gupta, Hindi, Romantic, Melody, Love Song, Soft Ballad',
    createdAt: new Date('2025-05-08T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['taylor.swift']['love-story-fearless'],
    primaryArtistId: USER_CUIDS['taylor.swift'],
    secondaryArtists: [],
    title: 'Love Story (From Fearless)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=LHxXaY7NR3w',
    tags: 'Pop, Romantic, Love Song, 2020s, Soft Ballad, Melody, International, Catchy',
    createdAt: new Date('2025-02-16T08:00:00Z')
  },
  {
    id: TRACK_CUIDS['taylor.swift']['blank-space-1989'],
    primaryArtistId: USER_CUIDS['taylor.swift'],
    secondaryArtists: [],
    title: 'Blank Space (From 1989)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=e-ORhEE9VVg',
    tags: 'Pop, Dance, Catchy, Love Song, 2014 Hit, International, Party, Energetic',
    createdAt: new Date('2025-02-18T08:00:00Z')
  },
  {
    id: TRACK_CUIDS['taylor.swift']['shake-it-off-1989'],
    primaryArtistId: USER_CUIDS['taylor.swift'],
    secondaryArtists: [],
    title: 'Shake It Off (From 1989)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=nfWlot6h_JM',
    tags: 'Pop, Dance, Energetic, Catchy, 2014 Hit, Party Song, International, Fun Track',
    createdAt: new Date('2025-02-20T08:00:00Z')
  },
  {
    id: TRACK_CUIDS['taylor.swift']['anti-hero-midnights'],
    primaryArtistId: USER_CUIDS['taylor.swift'],
    secondaryArtists: [],
    title: 'Anti-Hero (From Midnights)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=b1kbLwvqugk',
    tags: 'Pop, 2022 Hit, International, Catchy, Energetic, Fun Track, Melody, Contemporary',
    createdAt: new Date('2025-02-22T08:00:00Z')
  },
  {
    id: TRACK_CUIDS['taylor.swift']['cruel-summer-lover'],
    primaryArtistId: USER_CUIDS['taylor.swift'],
    secondaryArtists: [],
    title: 'Cruel Summer (From Lover)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=ic8j13piAhQ',
    tags: 'Pop, Dance, Energetic, Love Song, International, Catchy, Fun Track, 2019 Hit',
    createdAt: new Date('2025-02-25T08:00:00Z')
  },
  {
    id: TRACK_CUIDS['taylor.swift']['you-belong-with-me-fearless'],
    primaryArtistId: USER_CUIDS['taylor.swift'],
    secondaryArtists: [],
    title: 'You Belong With Me (From Fearless)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=VuNIsY6JdUw',
    tags: 'Pop, Country-Pop, 2008 Hit, Romantic, Love Song, International, Catchy, Soft Ballad',
    createdAt: new Date('2025-02-28T08:00:00Z')
  },
  {
    id: TRACK_CUIDS['ed.sheeran']['shape-of-you'],
    primaryArtistId: USER_CUIDS['ed.sheeran'],
    secondaryArtists: [],
    title: 'Shape of You',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    tags: 'Pop, Dance, Romantic, 2017 Hit, International, Catchy, Party Song, Melody',
    createdAt: new Date('2025-03-05T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['ed.sheeran']['sapphire-feat-arijit-singh'],
    primaryArtistId: USER_CUIDS['ed.sheeran'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Sapphire (feat. Arijit Singh)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=JgDNFQ2RaLQ',
    tags: 'Pop, Romantic, International, Melody, Duet, Soft Ballad, Emotional, Catchy',
    createdAt: new Date('2025-03-08T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['ed.sheeran']['thinking-out-loud'],
    primaryArtistId: USER_CUIDS['ed.sheeran'],
    secondaryArtists: [],
    title: 'Thinking Out Loud',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=lp-EO5I60KA',
    tags: 'Pop, Romantic, Love Song, 2014 Hit, Soft Ballad, Melody, International, Evergreen',
    createdAt: new Date('2025-03-10T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['ed.sheeran']['bad-habits'],
    primaryArtistId: USER_CUIDS['ed.sheeran'],
    secondaryArtists: [],
    title: 'Bad Habits',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=orJSJGHjBLI',
    tags: 'Pop, Dance, 2021 Hit, Catchy, Party Song, Energetic, International, Fun Track',
    createdAt: new Date('2025-03-12T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['ed.sheeran']['give-me-love'],
    primaryArtistId: USER_CUIDS['ed.sheeran'],
    secondaryArtists: [],
    title: 'Give Me Love',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=FOjdXSrtUxA',
    tags: 'Pop, Romantic, Love Song, Soft Ballad, Melody, 2012 Hit, International, Emotional',
    createdAt: new Date('2025-03-15T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['jasmine.sandlas']['dhurandhar-title-track'],
    primaryArtistId: USER_CUIDS['jasmine.sandlas'],
    secondaryArtists: [],
    title: 'Dhurandhar Title Track',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=1a5nyrMtRsk',
    tags: 'Punjabi, Hindi, Movie Soundtrack, Remake, Energetic, Cultural Fusion, Retro Vibes',
    createdAt: new Date('2025-04-18T14:30:00Z')
  },
  {
    id: TRACK_CUIDS['jasmine.sandlas']['illegal-weapon'],
    primaryArtistId: USER_CUIDS['jasmine.sandlas'],
    secondaryArtists: [],
    title: 'Illegal Weapon ft. Garry Sandhu',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=H7_yY3yr-jE',
    tags: 'Punjabi, Party Anthem, Dance, Club Track, High Energy, Desi Banger',
    createdAt: new Date('2025-04-18T14:30:00Z')
  },
  {
    id: TRACK_CUIDS['jasmine.sandlas']['ittar-desi-melodies'],
    primaryArtistId: USER_CUIDS['jasmine.sandlas'],
    secondaryArtists: [USER_CUIDS['b.praak']],
    title: 'Ittar By Jasmine Sandlas & B Praak',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=kxeACXtiZNQ',
    tags: 'Punjabi, Romantic, Pop, Duet, Feel-Good, Danceable, Love Song',
    createdAt: new Date('2025-04-18T14:30:00Z')
  },
  {
    id: TRACK_CUIDS['jasmine.sandlas']['sawan-mein'],
    primaryArtistId: USER_CUIDS['jasmine.sandlas'],
    secondaryArtists: [],
    title: 'Sawan Mein - Divya Kumar and Jasmine Sandlas',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=uFsV0ieoU-w',
    tags: 'Hindi, Soft Melody, Heart Break, Romantic, Emotional, Monsoon Mood, Heartfelt Ballad',
    createdAt: new Date('2025-04-18T14:30:00Z')
  },
  {
    id: TRACK_CUIDS['jasmine.sandlas']['taras-munjya'],
    primaryArtistId: USER_CUIDS['jasmine.sandlas'],
    secondaryArtists: [],
    title: 'Taras (Munjya)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=kfXy4W0aD40',
    tags: 'Punjabi, Film Song, Emotional, Romantic, Melodic, Storytelling',
    createdAt: new Date('2025-04-18T14:30:00Z')
  },
  {
    id: TRACK_CUIDS['k.k']['pyaar-ke-pal'],
    primaryArtistId: USER_CUIDS['k.k'],
    secondaryArtists: [],
    title: 'Pyaar Ke Pal',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=NUqlCJTYu6I',
    tags: 'Hindi, Romantic, Melody, Love Song, Soft Ballad, Evergreen, Emotional, Bollywood',
    createdAt: new Date('2023-11-22T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['k.k']['yaaron-rockford'],
    primaryArtistId: USER_CUIDS['k.k'],
    secondaryArtists: [],
    title: 'Yaaron (From Rockford)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=mQ-hLsVTcW8',
    tags: 'Rockford, Hindi, Friendship, Melody, Emotional, Soft Ballad, Inspirational, Evergreen',
    createdAt: new Date('2023-11-25T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['k.k']['tadap-tadap-ke-hum-dil-de-chuke-sanam'],
    primaryArtistId: USER_CUIDS['k.k'],
    secondaryArtists: [],
    title: 'Tadap Tadap Ke (From Hum Dil De Chuke Sanam)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=KwiDJclWo44',
    tags: 'Hum Dil De Chuke Sanam, Salman Khan, Aishwarya Rai, Hindi, Romantic, Heartbreak, Melody, Emotional',
    createdAt: new Date('2023-11-28T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['k.k']['tu-hi-meri-shab-hai-gangster'],
    primaryArtistId: USER_CUIDS['k.k'],
    secondaryArtists: [],
    title: 'Tu Hi Meri Shab Hai (From Gangster)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=mWBvudKcByg',
    tags: 'Gangster, Emraan Hashmi, Kangana Ranaut, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2023-12-01T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['k.k']['aankhon-mein-teri-om-shanti-om'],
    primaryArtistId: USER_CUIDS['k.k'],
    secondaryArtists: [],
    title: 'Aankhon Mein Teri (From Om Shanti Om)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=7KKVb0_IdD4',
    tags: 'Om Shanti Om, Shah Rukh Khan, Deepika Padukone, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2023-12-05T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['k.k']['zara-sa-jannat'],
    primaryArtistId: USER_CUIDS['k.k'],
    secondaryArtists: [],
    title: 'Zara Sa (From Jannat)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=-8C_2BBVWk8',
    tags: 'Jannat, Emraan Hashmi, Hindi, Romantic, Melody, Love Song, Soft Ballad, Emotional',
    createdAt: new Date('2023-12-08T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['k.k']['khuda-jaane-bachna-ae-haseeno'],
    primaryArtistId: USER_CUIDS['k.k'],
    secondaryArtists: [],
    title: 'Khuda Jaane (From Bachna Ae Haseeno)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=lUPltG1hb3k',
    tags: 'Bachna Ae Haseeno, Ranbir Kapoor, Bipasha Basu, Hindi, Romantic, Duet, Melody, Love Song',
    createdAt: new Date('2023-12-10T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['alan.walker']['faded-official'],
    primaryArtistId: USER_CUIDS['alan.walker'],
    secondaryArtists: [],
    title: 'Faded (Official)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=60ItHLz5WEA',
    tags: 'EDM, Electronic, Dance, International, Catchy, Melancholic, 2015 Hit, Party Song',
    createdAt: new Date('2025-01-28T10:30:00Z')
  },
  {
    id: TRACK_CUIDS['alan.walker']['alone-official'],
    primaryArtistId: USER_CUIDS['alan.walker'],
    secondaryArtists: [],
    title: 'Alone (Official)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=1-xGerv5FOk',
    tags: 'EDM, Dance, Electronic, International, Catchy, Party Song, Energetic, 2016 Hit',
    createdAt: new Date('2025-02-01T10:30:00Z')
  },
  {
    id: TRACK_CUIDS['alan.walker']['not-you'],
    primaryArtistId: USER_CUIDS['alan.walker'],
    secondaryArtists: [],
    title: 'Not You',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=vjexVOf-s2Y',
    tags: 'EDM, Electronic, Dance, International, Catchy, Party Song, Melodic, Fun Track',
    createdAt: new Date('2025-02-03T10:30:00Z')
  },
  {
    id: TRACK_CUIDS['alan.walker']['on-my-way'],
    primaryArtistId: USER_CUIDS['alan.walker'],
    secondaryArtists: [],
    title: 'On My Way',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=dhYOPzcsbGM',
    tags: 'EDM, Electronic, Dance, International, Catchy, Energetic, Party Song, 2019 Hit',
    createdAt: new Date('2025-02-05T10:30:00Z')
  },
  {
    id: TRACK_CUIDS['alan.walker']['the-spectre'],
    primaryArtistId: USER_CUIDS['alan.walker'],
    secondaryArtists: [],
    title: 'The Spectre',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=wJnBTPUQS5A',
    tags: 'EDM, Electronic, Dance, International, Catchy, Party Song, Energetic, 2017 Hit',
    createdAt: new Date('2025-02-10T10:30:00Z')
  },
  {
    id: TRACK_CUIDS['sam.smith']['unholy-kim-petras'],
    primaryArtistId: USER_CUIDS['sam.smith'],
    secondaryArtists: [],
    title: 'Unholy (with Kim Petras)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=Uq9gPaIzbe8',
    tags: 'Pop, Dance, International, Catchy, Party Song, 2022 Hit, Energetic, Fun Track',
    createdAt: new Date('2023-10-12T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['sam.smith']['stay-with-me'],
    primaryArtistId: USER_CUIDS['sam.smith'],
    secondaryArtists: [],
    title: 'Stay With Me',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=pB-5XG-DbAA',
    tags: 'Pop, Soul, Ballad, International, Emotional, Soft Melody, Romantic, 2014 Hit',
    createdAt: new Date('2023-10-15T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['sam.smith']['im-not-the-only-one'],
    primaryArtistId: USER_CUIDS['sam.smith'],
    secondaryArtists: [],
    title: "I'm Not The Only One",
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=nCkpzqqog4k',
    tags: 'Pop, Soul, Ballad, Romantic, Emotional, Soft Melody, International, 2014 Hit',
    createdAt: new Date('2023-10-18T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['sam.smith']['dancing-with-a-stranger-normani'],
    primaryArtistId: USER_CUIDS['sam.smith'],
    secondaryArtists: [],
    title: 'Dancing With A Stranger (with Normani)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=av5JD1dfj_c',
    tags: 'Pop, Dance, Duet, International, Catchy, Party Song, Energetic, 2019 Hit',
    createdAt: new Date('2023-10-20T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['sunidhi.chauhan']['kamli-dhoom-3'],
    primaryArtistId: USER_CUIDS['sunidhi.chauhan'],
    secondaryArtists: [],
    title: 'Kamli (From Dhoom 3)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=C8kSrkz8Hz8',
    tags: 'Dhoom 3, Aamir Khan, Katrina Kaif, Hindi, Dance, Party Song, Energetic, Peppy',
    createdAt: new Date('2023-09-05T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['sunidhi.chauhan']['sheila-ki-jawani-tees-maar-khan'],
    primaryArtistId: USER_CUIDS['sunidhi.chauhan'],
    secondaryArtists: [],
    title: 'Sheila Ki Jawani (From Tees Maar Khan)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZTmF2v59CtI',
    tags: 'Tees Maar Khan, Akshay Kumar, Katrina Kaif, Hindi, Dance, Party Song, Energetic, Catchy',
    createdAt: new Date('2023-09-08T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['sunidhi.chauhan']['beedi-omkara'],
    primaryArtistId: USER_CUIDS['sunidhi.chauhan'],
    secondaryArtists: [],
    title: 'Beedi (From Omkara)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=XLJCtZK0x5M',
    tags: 'Omkara, Ajay Devgn, Kareena Kapoor, Hindi, Folk, Dance, Party Song, Catchy',
    createdAt: new Date('2023-09-10T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['sunidhi.chauhan']['crazy-kiya-re-dhoom-2'],
    primaryArtistId: USER_CUIDS['sunidhi.chauhan'],
    secondaryArtists: [],
    title: 'Crazy Kiya Re (From Dhoom 2)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=J2Bh68GTUOU',
    tags: 'Dhoom 2, Hrithik Roshan, Aishwarya Rai, Hindi, Dance, Party Song, Energetic, Catchy',
    createdAt: new Date('2023-09-12T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['sunidhi.chauhan']['aaja-nachle-title-track'],
    primaryArtistId: USER_CUIDS['sunidhi.chauhan'],
    secondaryArtists: [],
    title: 'Aaja Nachle (Title Track)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=MP4F0ZcW_G0',
    tags: 'Aaja Nachle, Madhuri Dixit, Hindi, Dance, Party Song, Energetic, Catchy, Celebration',
    createdAt: new Date('2023-09-15T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['sunidhi.chauhan']['dhoom-machale-dhoom'],
    primaryArtistId: USER_CUIDS['sunidhi.chauhan'],
    secondaryArtists: [],
    title: 'Dhoom Machale (From Dhoom)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=2uUmHTgT65I',
    tags: 'Dhoom, John Abraham, Esha Deol, Hindi, Dance, Party Song, Energetic, Peppy',
    createdAt: new Date('2023-09-18T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['sunidhi.chauhan']['the-disco-song-student-of-the-year'],
    primaryArtistId: USER_CUIDS['sunidhi.chauhan'],
    secondaryArtists: [],
    title: 'The Disco Song (From Student Of The Year)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=mcL6ZErM49Q',
    tags: 'Student Of The Year, Varun Dhawan, Alia Bhatt, Sidharth Malhotra, Hindi, Dance, Party Song, Catchy',
    createdAt: new Date('2023-09-20T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['b.praak']['teri-mitti-kesari'],
    primaryArtistId: USER_CUIDS['b.praak'],
    secondaryArtists: [],
    title: 'Teri Mitti (From Kesari)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=tionpZAVPd4',
    tags: 'Kesari, Akshay Kumar, Hindi, Patriotic, Emotional, Melody, War Film, Heartfelt',
    createdAt: new Date('2023-12-18T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['b.praak']['filhaal-single'],
    primaryArtistId: USER_CUIDS['b.praak'],
    secondaryArtists: [],
    title: 'Filhaal (Single)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=hMy5za-m5Ew',
    tags: 'Pop, Romantic, Melody, Emotional, Soft Ballad, Punjabi, Love Song, Heartfelt',
    createdAt: new Date('2023-12-20T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['b.praak']['mann-bharryaa-2-0-shershaah'],
    primaryArtistId: USER_CUIDS['b.praak'],
    secondaryArtists: [],
    title: 'Mann Bharryaa 2.0 (From Shershaah)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=1poXN3jF3Bw',
    tags: 'Shershaah, Sidharth Malhotra, Kiara Advani, Hindi, Romantic, Emotional, Soft Ballad, Melody',
    createdAt: new Date('2023-12-22T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['b.praak']['ranjha-shershaah'],
    primaryArtistId: USER_CUIDS['b.praak'],
    secondaryArtists: [],
    title: 'Ranjha (From Shershaah)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=V7LwfY5U5WI',
    tags: 'Shershaah, Sidharth Malhotra, Kiara Advani, Hindi, Romantic, Emotional, Melody, Love Song',
    createdAt: new Date('2023-12-25T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['b.praak']['saari-duniya-jalaa-denge-animal'],
    primaryArtistId: USER_CUIDS['b.praak'],
    secondaryArtists: [],
    title: 'Saari Duniya Jalaa Denge (From Animal)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=6DfaBq2rVoE',
    tags: 'Animal, Hindi, Action, Energetic, Mass Track, Peppy, Catchy, Party Song',
    createdAt: new Date('2023-12-28T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['b.praak']['yaar-ka-sataya-hua-hai'],
    primaryArtistId: USER_CUIDS['b.praak'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Yaar Ka Sataya Hua Hai - B Praak',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=OBEOPnAO1hc',
    tags: 'Romantic, Melody, Emotional, Soft Ballad, Punjabi, Love Song, Heartfelt, Catchy',
    createdAt: new Date('2025-01-01T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['honey.singh']['lungi-dance-chennai-express'],
    primaryArtistId: USER_CUIDS['honey.singh'],
    secondaryArtists: [],
    title: 'Lungi Dance (From Chennai Express)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=69CEiHfS_mc',
    tags: 'Chennai Express, Shah Rukh Khan, Deepika Padukone, Hindi, Dance, Party Song, Peppy, Fun Track',
    createdAt: new Date('2025-01-05T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['honey.singh']['brown-rang-international-villager'],
    primaryArtistId: USER_CUIDS['honey.singh'],
    secondaryArtists: [],
    title: 'Brown Rang (From International Villager)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=PqFMFVcCZgI',
    tags: 'Punjabi, Party Song, Dance, Peppy, Youth Favorite, Catchy, Fun Track, Energetic',
    createdAt: new Date('2025-01-08T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['honey.singh']['blue-eyes-single'],
    primaryArtistId: USER_CUIDS['honey.singh'],
    secondaryArtists: [],
    title: 'Blue Eyes (Single)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=NbyHNASFi6U',
    tags: 'Punjabi, Pop, Romantic, Catchy, Peppy, Youth Favorite, Fun Track, Party Song',
    createdAt: new Date('2025-01-10T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['honey.singh']['dheere-dheere-single'],
    primaryArtistId: USER_CUIDS['honey.singh'],
    secondaryArtists: [],
    title: 'Dheere Dheere Se Meri Zindagi (Single)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=nCD2hj6zJEc',
    tags: 'Hindi, Romantic, Melody, Soft Ballad, Catchy, Peppy, Love Song, Fun Track',
    createdAt: new Date('2025-01-12T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['honey.singh']['laal-pari-house-full-5'],
    primaryArtistId: USER_CUIDS['honey.singh'],
    secondaryArtists: [],
    title: 'Laal Pari (From Housefull 5)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=KGn-erOG-Bs',
    tags: 'Housefull 5, Hindi, Dance, Party Song, Peppy, Catchy, Fun Track, Energetic',
    createdAt: new Date('2025-01-15T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['honey.singh']['raat-jashan-di'],
    primaryArtistId: USER_CUIDS['honey.singh'],
    secondaryArtists: [],
    title: 'Raat Jashan Di',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=D--rQj49heE',
    tags: 'Punjabi, Party Song, Dance, Peppy, Youth Favorite, Fun Track, Catchy, Energetic',
    createdAt: new Date('2025-01-18T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['honey.singh']['maniac-glory'],
    primaryArtistId: USER_CUIDS['honey.singh'],
    secondaryArtists: [],
    title: 'Maniac (From Glory)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=W8x6Dwyj0-A',
    tags: 'Glory, Hindi, Dance, Party Song, Peppy, Energetic, Fun Track, Catchy',
    createdAt: new Date('2025-01-20T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['honey.singh']['millionaire-glory'],
    primaryArtistId: USER_CUIDS['honey.singh'],
    secondaryArtists: [],
    title: 'Millionaire (From Glory)',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=XO8wew38VM8',
    tags: 'Glory, Hindi, Dance, Party Song, Peppy, Catchy, Energetic, Fun Track',
    createdAt: new Date('2025-01-22T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['honey.singh']['one-bottle-down'],
    primaryArtistId: USER_CUIDS['honey.singh'],
    secondaryArtists: [],
    title: 'One Bottle Down',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=NDJ-1FK1c_k',
    tags: 'Punjabi, Party Song, Dance, Peppy, Fun Track, Youth Favorite, Catchy, Energetic',
    createdAt: new Date('2025-01-25T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['imagine.dragons']['believer-evolve-2017'],
    primaryArtistId: USER_CUIDS['imagine.dragons'],
    secondaryArtists: [],
    title: 'Believer (2017)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=7wtfhZwyrcc',
    tags: 'Rock, Alternative, Pop Rock, Energetic, Catchy, Motivational, Anthem, 2017 Hit',
    createdAt: new Date('2025-02-07T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['imagine.dragons']['thunder-evolve'],
    primaryArtistId: USER_CUIDS['imagine.dragons'],
    secondaryArtists: [],
    title: 'Thunder (Official)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=fKopy74weus',
    tags: 'Rock, Alternative, Pop Rock, Energetic, Catchy, Motivational, Anthem, 2017 Hit',
    createdAt: new Date('2025-02-10T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['imagine.dragons']['bleeding-out-night-visions'],
    primaryArtistId: USER_CUIDS['imagine.dragons'],
    secondaryArtists: [],
    title: 'Bleeding Out (Night Visions)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=QFKHScAStsU',
    tags: 'Rock, Alternative, Pop Rock, Energetic, Anthem, Motivational, Catchy, 2012 Hit',
    createdAt: new Date('2025-02-10T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['imagine.dragons']['gods-dont-pray-loom'],
    primaryArtistId: USER_CUIDS['imagine.dragons'],
    secondaryArtists: [],
    title: "Gods Don't Pray (Loom)",
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=NKcWKS2MW1M',
    tags: 'Rock, Alternative, Pop Rock, Energetic, Catchy, Anthem, Motivational, International',
    createdAt: new Date('2025-06-10T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['imagine.dragons']['nice-to-meet-you-loom'],
    primaryArtistId: USER_CUIDS['imagine.dragons'],
    secondaryArtists: [],
    title: 'Nice to Meet You (Loom)',
    language: 'english',
    youtubeUrl: 'https://www.youtube.com/watch?v=NeUfmyu5t8Q',
    tags: 'Rock, Alternative, Pop Rock, Energetic, Catchy, Anthem, Motivational, International',
    createdAt: new Date('2025-06-15T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['atif.aslam']['dil-diyan-gallan-tiger-zinda-hai'],
    primaryArtistId: USER_CUIDS['atif.aslam'],
    secondaryArtists: [],
    title: 'Dil Diyan Gallan (From Tiger Zinda Hai)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=SAcpESN_Fk4',
    tags: 'Tiger Zinda Hai, Salman Khan, Katrina Kaif, Hindi, Romantic, Soft Ballad, Melody, Love Song',
    createdAt: new Date('2025-07-21T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['atif.aslam']['tera-hone-laga-hoon'],
    primaryArtistId: USER_CUIDS['atif.aslam'],
    secondaryArtists: [],
    title: 'Tera Hone Laga Hoon (From Ajab Prem Ki Ghazab Kahani)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=rTuxUAuJRyY',
    tags: 'Ajab Prem Ki Ghazab Kahani, Ranbir Kapoor, Katrina Kaif, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2025-03-12T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['atif.aslam']['tu-jaane-na-ajab-prem-ki-ghazab-kahani'],
    primaryArtistId: USER_CUIDS['atif.aslam'],
    secondaryArtists: [],
    title: 'Tu Jaane Na (From Ajab Prem Ki Ghazab Kahani)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=P8PWN1OmZOA',
    tags: 'Ajab Prem Ki Ghazab Kahani, Ranbir Kapoor, Katrina Kaif, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2025-03-15T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['atif.aslam']['pehli-nazar-mein-race'],
    primaryArtistId: USER_CUIDS['atif.aslam'],
    secondaryArtists: [],
    title: 'Pehli Nazar Mein (From Race)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=BadBAMnPX0I',
    tags: 'Race, Saif Ali Khan, Katrina Kaif, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2025-03-18T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['atif.aslam']['jeena-jeena-badlapur'],
    primaryArtistId: USER_CUIDS['atif.aslam'],
    secondaryArtists: [],
    title: 'Jeena Jeena (From Badlapur)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=zFdi834FiZ4',
    tags: 'Badlapur, Varun Dhawan, Hindi, Romantic, Soft Ballad, Melody, Love Song, Emotional',
    createdAt: new Date('2025-03-20T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['atif.aslam']['woh-lamhe-woh-baatein-zeher'],
    primaryArtistId: USER_CUIDS['atif.aslam'],
    secondaryArtists: [],
    title: 'Woh Lamhe Woh Baatein (From Zeher)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=y12BRDS1CHI',
    tags: 'Zeher, Emraan Hashmi, Hindi, Romantic, Melody, Soft Ballad, Love Song, Emotional',
    createdAt: new Date('2025-03-22T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['atif.aslam']['tere-sang-yaara-rustom'],
    primaryArtistId: USER_CUIDS['atif.aslam'],
    secondaryArtists: [],
    title: 'Tere Sang Yaara (From Rustom)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=gIOea2pgfIo',
    tags: "Rustom, Akshay Kumar, Ileana D'Cruz, Hindi, Romantic, Soft Ballad, Melody, Love Song",
    createdAt: new Date('2025-03-25T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['atif.aslam']['o-saathi-baaghi-2'],
    primaryArtistId: USER_CUIDS['atif.aslam'],
    secondaryArtists: [],
    title: 'O Saathi (From Baaghi 2)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=YuXLN23ZGQo',
    tags: 'Baaghi 2, Tiger Shroff, Disha Patani, Hindi, Romantic, Soft Ballad, Melody, Love Song',
    createdAt: new Date('2025-03-28T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['jonita.gandhi']['the-breakup-song-ae-dil-hai-mushkil'],
    primaryArtistId: USER_CUIDS['jonita.gandhi'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'The Breakup Song (From Ae Dil Hai Mushkil)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=kd5KqlmcHNo',
    tags: 'Ae Dil Hai Mushkil, Ranbir Kapoor, Anushka Sharma, Hindi, Dance, Party, Catchy, Peppy',
    createdAt: new Date('2025-04-20T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['jonita.gandhi']['dil-ka-telephone-dream-girl'],
    primaryArtistId: USER_CUIDS['jonita.gandhi'],
    secondaryArtists: [],
    title: 'Dil Ka Telephone (From Dream Girl)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=a3B2glol4IU',
    tags: 'Dream Girl, Ayushmann Khurrana, Nushrat Bharucha, Hindi, Dance, Fun Track, Party Song, Catchy',
    createdAt: new Date('2025-04-25T11:30:00Z')
  },
  {
    id: TRACK_CUIDS['jonita.gandhi']['chellamma-doctor-tamil'],
    primaryArtistId: USER_CUIDS['jonita.gandhi'],
    secondaryArtists: [USER_CUIDS['anirudh.ravichander']],
    title: 'Chellamma (From Doctor - Tamil)',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=DV7nV9W7y-0',
    tags: 'Doctor, Vijay, Samantha Ruth Prabhu, Tamil, Dance, Catchy, Peppy, Fun Track',
    createdAt: new Date('2025-05-01T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['jonita.gandhi']['mental-manadhil-ok-kanmani'],
    primaryArtistId: USER_CUIDS['jonita.gandhi'],
    secondaryArtists: [USER_CUIDS['a.r.rahman']],
    title: 'Mental Manadhil (From OK Kanmani)',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=ryD8BqVexJI',
    tags: 'OK Kanmani, Dulquer Salmaan, Nithya Menen, Tamil, Romantic, Soft Ballad, Melody, Love Song',
    createdAt: new Date('2025-05-05T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['jonita.gandhi']['jimikki-ponnu-varisu'],
    primaryArtistId: USER_CUIDS['jonita.gandhi'],
    secondaryArtists: [],
    title: 'Jimikki Ponnu (From Varisu)',
    language: 'tamil',
    youtubeUrl: 'https://www.youtube.com/watch?v=HfMTwkVQohM',
    tags: 'Varisu, Vijay, Rashmika Mandanna, Tamil, Dance, Catchy, Party Song, Peppy',
    createdAt: new Date('2025-05-08T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['jonita.gandhi']['beparwai-solo'],
    primaryArtistId: USER_CUIDS['jonita.gandhi'],
    secondaryArtists: [],
    title: 'Beparwai - Jonita Gandhi',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=NivkHWpLDdQ',
    tags: 'Hindi, Romantic, Melody, Soft Ballad, Love Song, Catchy, Emotional, Pop',
    createdAt: new Date('2025-05-10T16:00:00Z')
  },
  {
    id: TRACK_CUIDS['jonita.gandhi']['what-jhumka'],
    primaryArtistId: USER_CUIDS['jonita.gandhi'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'What Jhumka? | Rocky Aur Rani Kii Prem Kahaani',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=P1fIdFRnfqw',
    tags: 'Rocky Aur Rani Kii Prem Kahaani, Ranveer Singh, Alia Bhatt, Hindi, Dance, Catchy, Peppy, Fun Track',
    createdAt: new Date('2025-05-15T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['jonita.gandhi']['nuvve-nuvve-kick-2'],
    primaryArtistId: USER_CUIDS['jonita.gandhi'],
    secondaryArtists: [],
    title: 'Nuvve Nuvve - Kick 2',
    language: 'telugu',
    youtubeUrl: 'https://www.youtube.com/watch?v=B-mW-XIYHGk',
    tags: 'Kick 2, Ravi Teja, Telugu, Dance, Party, Catchy, Energetic, Peppy',
    createdAt: new Date('2025-05-20T08:00:00Z')
  },
  {
    id: TRACK_CUIDS['jonita.gandhi']['takdi-ravan-jindua'],
    primaryArtistId: USER_CUIDS['jonita.gandhi'],
    secondaryArtists: [],
    title: 'Takdi Ravan (Full Song) - Jindua',
    language: 'punjabi',
    youtubeUrl: 'https://www.youtube.com/watch?v=94CeDlXPLVk',
    tags: 'Jindua, Diljit Dosanjh, Punjabi, Dance, Party, Peppy, Catchy, Fun Track',
    createdAt: new Date('2025-05-25T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['jeet.ganguly']['khujechi-toke-raat-berate'],
    primaryArtistId: USER_CUIDS['jeet.ganguly'],
    secondaryArtists: [],
    title: 'Khujechi Toke Raat Berate',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZrDlqXsIblA',
    tags: 'Bengali, Romantic, Melody, Soft Ballad, Emotional, Love Song, Regional Hit, Popular',
    createdAt: new Date('2025-02-01T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['jeet.ganguly']['muskurane-citylights'],
    primaryArtistId: USER_CUIDS['jeet.ganguly'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Muskurane (From Citylights)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=2ltGXfmI6mk',
    tags: 'Citylights, Rajkummar Rao, Bengali, Romantic, Soft Ballad, Melody, Emotional, Love Song',
    createdAt: new Date('2025-02-05T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['jeet.ganguly']['raaz-aankhein-teri-raaz-reboot'],
    primaryArtistId: USER_CUIDS['jeet.ganguly'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Jitni Dafa - PARMANU',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=AvgFmr-ckpk',
    tags: 'Parmanu, John Abraham, Hindi, Romantic, Melody, Soft Ballad, Love Song, Emotional',
    createdAt: new Date('2025-02-10T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['jeet.ganguly']['hamari-adhuri-kahani-title-track'],
    primaryArtistId: USER_CUIDS['jeet.ganguly'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Hamari Adhuri Kahani (Title Track)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=sVRwZEkXepg',
    tags: 'Hamari Adhuri Kahani, Emraan Hashmi, Hindi, Romantic, Soft Ballad, Melody, Emotional, Love Song',
    createdAt: new Date('2025-02-15T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['jeet.ganguly']['khamoshiyan-title-track'],
    primaryArtistId: USER_CUIDS['jeet.ganguly'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Khamoshiyan (Title Track)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=Mv3SZDP7QUo',
    tags: 'Khamoshiyan, Gurmeet Choudhary, Hindi, Romantic, Soft Ballad, Melody, Emotional, Love Song',
    createdAt: new Date('2025-02-20T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['jeet.ganguly']['chaahun-main-ya-naa-aashiqui-2'],
    primaryArtistId: USER_CUIDS['jeet.ganguly'],
    secondaryArtists: [],
    title: 'Chaahun Main Ya Naa (From Aashiqui 2)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=VdyBtGaspss',
    tags: 'Aashiqui 2, Aditya Roy Kapur, Shraddha Kapoor, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2025-02-25T15:00:00Z')
  },
  {
    id: TRACK_CUIDS['jeet.ganguly']['tor-ek-kothaye'],
    primaryArtistId: USER_CUIDS['jeet.ganguly'],
    secondaryArtists: [USER_CUIDS['arijit.singh']],
    title: 'Tor Ek Kothaye - Besh Korechi Prem Kore',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=AbluPg_E14k',
    tags: 'Bengali, Romantic, Melody, Soft Ballad, Love Song, Emotional, Regional Hit, Popular',
    createdAt: new Date('2025-03-10T09:00:00Z')
  },
  {
    id: TRACK_CUIDS['jeet.ganguly']['dhaker-taale-poran-jay-joliya-re'],
    primaryArtistId: USER_CUIDS['jeet.ganguly'],
    secondaryArtists: [USER_CUIDS['shreya.ghoshal']],
    title: 'Dhaker Taale (From Poran Jay Joliya Re)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=hbXuXt7gkFY',
    tags: 'Bengali, Romantic, Melody, Soft Ballad, Love Song, Emotional, Regional Hit, Popular',
    createdAt: new Date('2025-03-15T10:00:00Z')
  },
  {
    id: TRACK_CUIDS['jeet.ganguly']['boss-title-track'],
    primaryArtistId: USER_CUIDS['jeet.ganguly'],
    secondaryArtists: [],
    title: 'Boss (Title Track)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=pP3lIwYc9BU',
    tags: 'Boss, Akshay Kumar, Hindi, Dance, Energetic, Party Song, Peppy, Catchy',
    createdAt: new Date('2025-03-20T11:00:00Z')
  },
  {
    id: TRACK_CUIDS['zubeen.garg']['ya-ali-gangster'],
    primaryArtistId: USER_CUIDS['zubeen.garg'],
    secondaryArtists: [],
    title: 'Ya Ali (From Gangster)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=QFW6FnryEpk',
    tags: 'Gangster, Emraan Hashmi, Kareena Kapoor, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2025-02-25T12:00:00Z')
  },
  {
    id: TRACK_CUIDS['zubeen.garg']['dil-tu-hi-bataa-krrish-3'],
    primaryArtistId: USER_CUIDS['zubeen.garg'],
    secondaryArtists: [],
    title: 'Dil Tu Hi Bataa (From Krrish 3)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=Hievfejv90c',
    tags: 'Krrish 3, Hrithik Roshan, Priyanka Chopra, Hindi, Romantic, Melody, Soft Ballad, Love Song',
    createdAt: new Date('2025-03-01T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['zubeen.garg']['jhoom-barabar-jhoom'],
    primaryArtistId: USER_CUIDS['zubeen.garg'],
    secondaryArtists: [],
    title: 'Jhoom Barabar Jhoom (Title Track)',
    language: 'hindi',
    youtubeUrl: 'https://www.youtube.com/watch?v=NvSt5Nsmxlg',
    tags: 'Jhoom Barabar Jhoom, Abhishek Bachchan, Preity Zinta, Hindi, Dance, Catchy, Fun Track, Peppy',
    createdAt: new Date('2025-03-03T13:00:00Z')
  },
  {
    id: TRACK_CUIDS['zubeen.garg']['khuda-jaane-paglu-2'],
    primaryArtistId: USER_CUIDS['zubeen.garg'],
    secondaryArtists: [USER_CUIDS['shreya.ghoshal']],
    title: 'Khuda Jaane (From Paglu 2)',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=Ze1p1cwqtNc',
    tags: 'Paglu 2, Hindi, Romantic, Melody, Soft Ballad, Love Song, Emotional, Catchy',
    createdAt: new Date('2025-03-05T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['zubeen.garg']['tomar-amar-prem'],
    primaryArtistId: USER_CUIDS['zubeen.garg'],
    secondaryArtists: [],
    title: 'Tomar Amar Prem',
    language: 'bengali',
    youtubeUrl: 'https://www.youtube.com/watch?v=s4WEbB4vvVU',
    tags: 'Bengali, Romantic, Melody, Soft Ballad, Love Song, Emotional, Regional Hit, Popular',
    createdAt: new Date('2025-03-07T14:00:00Z')
  },
  {
    id: TRACK_CUIDS['zubeen.garg']['tumi-suwa-jetia'],
    primaryArtistId: USER_CUIDS['zubeen.garg'],
    secondaryArtists: [],
    title: 'Tumi Suwa Jetia - Zubeen Garg Beautiful Song',
    language: 'assamese',
    youtubeUrl: 'https://www.youtube.com/watch?v=VTdTRreNiI8',
    tags: 'Assamese, Romantic, Melody, Soft Ballad, Love Song, Emotional, Regional Hit, Popular',
    createdAt: new Date('2025-03-10T15:00:00Z')
  }
]

// Curated playlists for seeding the database
export const SEED_PLAYLISTS: TSeedPlaylist[] = [
  {
    id: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    ownerId: USER_CUIDS['arijit.singh'],
    name: 'Bollywood Romantic Hits',
    description:
      'The most beautiful romantic songs from Bollywood that will touch your heart and soul.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b2734d21df80ef60fc7fdfee5292',
    createdAt: new Date('2025-01-15T10:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['tamil-dance-anthems'],
    ownerId: USER_CUIDS['anirudh.ravichander'],
    name: 'Tamil Dance Anthems',
    description:
      'High-energy Tamil dance tracks that will get you moving! Perfect for parties and workouts.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d00001e026e89960ef135d6398696385f',
    createdAt: new Date('2025-02-01T11:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['punjabi-party-bangers'],
    ownerId: USER_CUIDS['diljit.dosanjh'],
    name: 'Punjabi Party Bangers',
    description:
      'The ultimate Punjabi party playlist with bhangra beats and energetic vibes.',
    posterUrl:
      'https://i.scdn.co/image/ab67706c0000da84b5f11ac79d96dbabd5ed34f1',
    createdAt: new Date('2025-02-10T12:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['bengali-soulful-collection'],
    ownerId: USER_CUIDS['anupam.roy'],
    name: 'Bengali Soulful Collection',
    description:
      'A curated collection of the most soulful and emotional Bengali songs that speak to the heart.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b2739ed555535dd99ca0266940a6',
    createdAt: new Date('2025-01-20T13:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['ar-rahman-classics'],
    ownerId: USER_CUIDS['a.r.rahman'],
    name: 'A.R. Rahman Classics',
    description:
      'Timeless compositions by the Mozart of Madras featuring his greatest hits across languages.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b273949eb6b7959abb947ae862ff',
    createdAt: new Date('2025-03-15T14:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    ownerId: USER_CUIDS['shreya.ghoshal'],
    name: 'Arijit Singh Love Songs',
    description:
      "The voice of love - Arijit Singh's most romantic and emotional tracks compiled together.",
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b273426b907c48173c04e430aa6e',
    createdAt: new Date('2025-01-25T15:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['western-pop-favorites'],
    ownerId: USER_CUIDS['taylor.swift'],
    name: 'Western Pop Favorites',
    description:
      'Chart-topping Western pop hits featuring the biggest artists and their most popular songs.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d00001e0281959e6fcd97c1509a0cd055',
    createdAt: new Date('2025-02-20T16:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['bollywood-item-songs'],
    ownerId: USER_CUIDS['sunidhi.chauhan'],
    name: 'Bollywood Item Songs',
    description:
      'High-energy Bollywood dance numbers and item songs that light up the screen.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b2733c528c581a6b3f940a24cb5f',
    createdAt: new Date('2025-01-30T17:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['emotional-ballads'],
    ownerId: USER_CUIDS['sonu.nigam'],
    name: 'Emotional Ballads',
    description:
      'Soul-stirring ballads across languages that capture the deepest emotions of love and life.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d00001e02159b3340c36d70908440901a',
    createdAt: new Date('2025-02-25T18:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['cross-cultural-fusion'],
    ownerId: USER_CUIDS['ed.sheeran'],
    name: 'Cross-Cultural Fusion',
    description:
      'A unique blend of Eastern and Western music featuring collaborations and fusion tracks.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b2735a1aec2e30e701d9f1d8526b',
    createdAt: new Date('2025-03-01T19:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['bollywood-bangers'],
    ownerId: USER_CUIDS['pritam.chakraborty'],
    name: 'Bollywood Bangers',
    description:
      'High-energy Bollywood dance tracks that dominate the charts and dance floors.',
    posterUrl:
      'https://i.scdn.co/image/ab67706c0000da84e88843a52a60aee3a348391e',
    createdAt: new Date('2025-03-05T10:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['classical-hits'],
    ownerId: USER_CUIDS['usha.uthup'],
    name: 'Classical Hits',
    description:
      "Timeless classical and traditional compositions that showcase India's rich musical heritage.",
    posterUrl:
      'https://i.scdn.co/image/ab67706c0000d72c4ed1546759ae6e2e1256cfb0',
    createdAt: new Date('2025-03-10T11:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['devotional-bliss'],
    ownerId: USER_CUIDS['shreya.ghoshal'],
    name: 'Devotional Bliss',
    description:
      'Spiritual and devotional songs that elevate the soul and connect you with the divine.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d00001e02b94fb7607195aa4c8e215c20',
    createdAt: new Date('2025-03-15T12:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['sufi-sanctuary'],
    ownerId: USER_CUIDS['zubeen.garg'],
    name: 'Sufi Sanctuary',
    description:
      'Mystical Sufi melodies and soulful qawwalis that touch the deepest corners of the heart.',
    posterUrl:
      'https://i.scdn.co/image/ab67706c0000da8457d9344f09f1957fcfbc0aaf',
    createdAt: new Date('2025-03-20T13:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['regional-hits'],
    ownerId: USER_CUIDS['jonita.gandhi'],
    name: 'Regional Hits',
    description:
      'Popular songs from South Indian cinema including Telugu, Kannada, and more regional gems.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d00001e0268cb8aa2bafff95536a085ca',
    createdAt: new Date('2025-03-25T14:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['deep-focus'],
    ownerId: USER_CUIDS['alan.walker'],
    name: 'Deep Focus',
    description:
      'Calm and contemplative tracks perfect for deep work, study sessions, and concentration.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b273e3a03829bed283a3d72bcdf0',
    createdAt: new Date('2025-04-01T15:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['quiet-moments'],
    ownerId: USER_CUIDS['sonu.nigam'],
    name: 'Quiet Moments',
    description:
      'Peaceful and serene songs for relaxation, meditation, and quiet contemplation.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d00001e024d0204b5bb55fcd38e429ad1',
    createdAt: new Date('2025-04-05T16:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['indie-india'],
    ownerId: USER_CUIDS['anupam.roy'],
    name: 'Indie India',
    description:
      'Independent and alternative Indian music that breaks conventional boundaries.',
    posterUrl:
      'https://i.scdn.co/image/ab67706c0000da846ed88b653d703826f8026e34',
    createdAt: new Date('2025-04-10T17:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['retro-classics'],
    ownerId: USER_CUIDS['kishore.kumar'],
    name: 'Retro Classics',
    description:
      'Golden oldies and vintage classics that defined generations and remain evergreen.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d00001e02ee15bb043702a45064d0eb33',
    createdAt: new Date('2025-04-15T18:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    ownerId: USER_CUIDS['shreya.ghoshal'],
    name: 'Arabic & Malayalam Fusion',
    description:
      'Exotic fusion of Arabic melodies with Malayalam classics and cross-cultural experiments.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b273727470c5e0a196d46d3ed3d3',
    createdAt: new Date('2025-04-20T19:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['action-anthems'],
    ownerId: USER_CUIDS['anirudh.ravichander'],
    name: 'Action Anthems',
    description:
      'Adrenaline-pumping tracks from action movies that fuel your energy and motivation.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b2731be8e9bf7929f4d3d7ac34ef',
    createdAt: new Date('2025-04-25T20:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['patriotic-pride'],
    ownerId: USER_CUIDS['b.praak'],
    name: 'Patriotic Pride',
    description:
      'Songs that celebrate the nation and evoke feelings of patriotism and national pride.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d00001e0222366fe48681c79d11ebfd54',
    createdAt: new Date('2025-04-30T21:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['folk-treasures'],
    ownerId: USER_CUIDS['diljit.dosanjh'],
    name: 'Folk Treasures',
    description:
      'Authentic folk songs from different regions that preserve traditional musical heritage.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d00001e029ce5acfc9346d01a4873a543',
    createdAt: new Date('2025-05-05T22:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['electronic-beats'],
    ownerId: USER_CUIDS['alan.walker'],
    name: 'Electronic Beats',
    description:
      'Electronic dance music and EDM tracks that get your heart pumping and feet moving.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b273bf10471c9bfef2719d7585bd',
    createdAt: new Date('2025-05-10T23:00:00Z')
  },
  {
    id: PLAYLIST_CUIDS['beats-to-think-to'],
    ownerId: USER_CUIDS['k.k'],
    name: 'Beats to Think To',
    description:
      'Thoughtful melodies and introspective songs perfect for reflection and creative thinking.',
    posterUrl:
      'https://i.scdn.co/image/ab67616d0000b2732da49f9ecc8c48b83f7ce450',
    createdAt: new Date('2025-05-15T08:00:00Z')
  }
]

// Playlist-track relationships for seeding playlist contents
export const SEED_PLAYLIST_TRACKS: TSeedPlaylistTrack[] = [
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['tum-hi-ho-aashiqui-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['a.r.rahman']['enna-sona-ok-jaanu']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['kesariya-brahmastra']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['channa-mereya-ae-dil-hai-mushkil']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['ae-dil-hai-mushkil-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['gerua-dilwale']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['phir-le-aaya-dil-barfi']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['kumar.sanu']['tujhe-dekha-to-yeh-jaana-sanam']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['kumar.sanu']['ek-ladki-ko-dekha-to-1942-a-love-story']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['kumar.sanu']['mera-dil-bhi-kitna-pagal-hai']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['kumar.sanu']['jab-koi-baat-bigad-jaye-jurm']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['kumar.sanu']['do-dil-mil-rahe-hain-pardes']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['sonu.nigam']['kal-ho-naa-ho-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['sonu.nigam']['abhi-mujh-mein-kahin-agneepath']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['sonu.nigam']['saathiya-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['janam-janam-dilwale']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['atif.aslam']['dil-diyan-gallan-tiger-zinda-hai']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['atif.aslam']['tera-hone-laga-hoon']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['atif.aslam']['tu-jaane-na-ajab-prem-ki-ghazab-kahani']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-romantic-hits'],
    trackId: TRACK_CUIDS['atif.aslam']['pehli-nazar-mein-race']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['a.r.rahman']['urvasi-urvasi']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['a.r.rahman']['mukkala-muqabala-kadhalan']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['arabic-kuthu-beast']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['vaathi-coming-master']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['hukum-jailer']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['naa-ready-leo']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['why-this-kolaveri-di']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['zinda-banda-jawan']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['ayudha-pooja-devara']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['jonita.gandhi']['chellamma-doctor-tamil']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['jonita.gandhi']['jimikki-ponnu-varisu']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['jonita.gandhi']['mental-manadhil-ok-kanmani']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['munbe-vaa-sillunu-oru-kaadhal']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['a.r.rahman']['tu-hi-re-bombay']
  },
  {
    playlistId: PLAYLIST_CUIDS['tamil-dance-anthems'],
    trackId: TRACK_CUIDS['a.r.rahman']['hamma-hamma-bombay']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['lover-moonchild-era']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['jasmine.sandlas']['illegal-weapon']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['tenu-ki-pata']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['proper-patola-namaste-england']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['jasmine.sandlas']['taras-munjya']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['jasmine.sandlas']['dhurandhar-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['born-to-shine-g-o-a-t']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['patiala-peg']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['g-o-a-t-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['honey.singh']['brown-rang-international-villager']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['honey.singh']['blue-eyes-single']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['honey.singh']['raat-jashan-di']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['honey.singh']['one-bottle-down']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['honey.singh']['lungi-dance-chennai-express']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['b.praak']['filhaal-single']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['b.praak']['yaar-ka-sataya-hua-hai']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['jonita.gandhi']['takdi-ravan-jindua']
  },
  {
    playlistId: PLAYLIST_CUIDS['punjabi-party-bangers'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['do-you-know']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['anupam.roy']['amake-amar-moto-thakte-dao']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['anupam.roy']['gobheere-jao-baishe-srabon']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['anupam.roy']['bondhu-chol']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['anupam.roy']['tumi-jaake-bhalobasho-praktan']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['anupam.roy']['ekbar-bol']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['anupam.roy']['bariye-dao-tomar-haat']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['anupam.roy']['ure-jaak-uma']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['anupam.roy']['jaago-jaago-uma']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['kishore.kumar']['ami-chini-go-chini-charulata']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['jao-pakhi-bolo']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['jeet.ganguly']['khujechi-toke-raat-berate']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['jeet.ganguly']['tor-ek-kothaye']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['jeet.ganguly']['dhaker-taale-poran-jay-joliya-re']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['zubeen.garg']['tomar-amar-prem']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['arijit.singh']['aami-tomar-kache-yoddha']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['arijit.singh']['ki-kore-toke-bolbo']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['arijit.singh']['mon-majhi-re']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['arijit.singh']['tomake-chuye-dilam']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['usha.uthup']['aami-shotti-bolchi-kahaani']
  },
  {
    playlistId: PLAYLIST_CUIDS['bengali-soulful-collection'],
    trackId: TRACK_CUIDS['zubeen.garg']['khuda-jaane-paglu-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['a.r.rahman']['jai-ho-slumdog-millionaire']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['a.r.rahman']['maa-tujhe-salaam']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['a.r.rahman']['urvasi-urvasi']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['a.r.rahman']['mukkala-muqabala-kadhalan']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId:
      TRACK_CUIDS['a.r.rahman']['vellipomaakey-saahasam-swaasaga-saagipo']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['a.r.rahman']['tu-hi-re-bombay']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['a.r.rahman']['chaka-chak-atragi-re']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['a.r.rahman']['hamma-hamma-bombay']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['a.r.rahman']['enna-sona-ok-jaanu']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['usha.uthup']['darling-7-khoon-maaf']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['tum-se-hi-jab-we-met']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['jonita.gandhi']['mental-manadhil-ok-kanmani']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['jonita.gandhi']['chellamma-doctor-tamil']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['munbe-vaa-sillunu-oru-kaadhal']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['in-dino-life-in-a-metro']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['zubeen.garg']['ya-ali-gangster']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['atif.aslam']['pehli-nazar-mein-race']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['atif.aslam']['jeena-jeena-badlapur']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['usha.uthup']['auva-auva-koi-yahan-nache']
  },
  {
    playlistId: PLAYLIST_CUIDS['ar-rahman-classics'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['raabta-agent-vinod']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['arijit.singh']['tum-hi-ho-aashiqui-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['arijit.singh']['channa-mereya-ae-dil-hai-mushkil']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['arijit.singh']['kesariya-brahmastra']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['arijit.singh']['khairiyat-chhichhore']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['arijit.singh']['gerua-dilwale']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['arijit.singh']['phir-le-aaya-dil-barfi']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['a.r.rahman']['enna-sona-ok-jaanu']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['arijit.singh']['anuvanuvuu-om-bheem-bush']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['ae-dil-hai-mushkil-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['shayad-love-aaj-kal']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['raabta-agent-vinod']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['jeet.ganguly']['hamari-adhuri-kahani-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['jeet.ganguly']['khamoshiyan-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['jeet.ganguly']['chaahun-main-ya-naa-aashiqui-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['ed.sheeran']['sapphire-feat-arijit-singh']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['oh-my-love-amanush-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId:
      TRACK_CUIDS['pritam.chakraborty']['pee-loon-once-upon-a-time-in-mumbaai']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['atif.aslam']['tere-sang-yaara-rustom']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['atif.aslam']['o-saathi-baaghi-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['arijit-singh-love-songs'],
    trackId: TRACK_CUIDS['jeet.ganguly']['muskurane-citylights']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['dua.lipa']['dont-start-now']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['dua.lipa']['levitating-feat-dababy']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['dua.lipa']['new-rules']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['dua.lipa']['one-kiss-calvin-harris']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['dua.lipa']['houdini-single']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['taylor.swift']['love-story-fearless']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['taylor.swift']['blank-space-1989']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['taylor.swift']['shake-it-off-1989']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['taylor.swift']['anti-hero-midnights']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['taylor.swift']['cruel-summer-lover']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['taylor.swift']['you-belong-with-me-fearless']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['ed.sheeran']['shape-of-you']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['ed.sheeran']['thinking-out-loud']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['ed.sheeran']['bad-habits']
  },
  {
    playlistId: PLAYLIST_CUIDS['western-pop-favorites'],
    trackId: TRACK_CUIDS['ed.sheeran']['give-me-love']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['sheila-ki-jawani-tees-maar-khan']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['kamli-dhoom-3']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId:
      TRACK_CUIDS['kumar.sanu']['chura-ke-dil-mera-main-khiladi-tu-anari']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['beedi-omkara']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['crazy-kiya-re-dhoom-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['aaja-nachle-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['dhoom-machale-dhoom']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId:
      TRACK_CUIDS['sunidhi.chauhan']['the-disco-song-student-of-the-year']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['jonita.gandhi']['the-breakup-song-ae-dil-hai-mushkil']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId:
      TRACK_CUIDS['pritam.chakraborty']['badtameez-dil-yeh-jawaani-hai-deewani']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['jonita.gandhi']['what-jhumka']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['honey.singh']['laal-pari-house-full-5']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['jonita.gandhi']['dil-ka-telephone-dream-girl']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['jonita.gandhi']['chellamma-doctor-tamil']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-item-songs'],
    trackId: TRACK_CUIDS['zubeen.garg']['jhoom-barabar-jhoom']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['arijit.singh']['tum-hi-ho-aashiqui-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['arijit.singh']['channa-mereya-ae-dil-hai-mushkil']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['arijit.singh']['phir-le-aaya-dil-barfi']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['sonu.nigam']['kal-ho-naa-ho-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['sonu.nigam']['abhi-mujh-mein-kahin-agneepath']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['sonu.nigam']['main-agar-kahoon-om-shanti-om']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['sonu.nigam']['sandese-aate-hain-border']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['sonu.nigam']['shukran-allah-kurbaan']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['k.k']['tadap-tadap-ke-hum-dil-de-chuke-sanam']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['k.k']['tu-hi-meri-shab-hai-gangster']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['k.k']['aankhon-mein-teri-om-shanti-om']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['k.k']['zara-sa-jannat']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['k.k']['khuda-jaane-bachna-ae-haseeno']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['sam.smith']['stay-with-me']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['sam.smith']['im-not-the-only-one']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['atif.aslam']['woh-lamhe-woh-baatein-zeher']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['arijit.singh']['suno-na-sangemarmar-youngistaan']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['zubeen.garg']['dil-tu-hi-bataa-krrish-3']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['b.praak']['mann-bharryaa-2-0-shershaah']
  },
  {
    playlistId: PLAYLIST_CUIDS['emotional-ballads'],
    trackId: TRACK_CUIDS['b.praak']['ranjha-shershaah']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['guli-mata']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['yimmy-yimmy-tayc']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['ed.sheeran']['sapphire-feat-arijit-singh']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['a.r.rahman']['jai-ho-slumdog-millionaire']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['chhaila-bhoomi']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['dua.lipa']['one-kiss-calvin-harris']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['sam.smith']['dancing-with-a-stranger-normani']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['arabic-kuthu-beast']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['zinda-banda-jawan']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['sam.smith']['unholy-kim-petras']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['imagine.dragons']['nice-to-meet-you-loom']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['dua.lipa']['levitating-feat-dababy']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['dua.lipa']['dont-start-now']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['ed.sheeran']['bad-habits']
  },
  {
    playlistId: PLAYLIST_CUIDS['cross-cultural-fusion'],
    trackId: TRACK_CUIDS['dua.lipa']['houdini-single']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['honey.singh']['lungi-dance-chennai-express']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId:
      TRACK_CUIDS['pritam.chakraborty']['badtameez-dil-yeh-jawaani-hai-deewani']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['jonita.gandhi']['the-breakup-song-ae-dil-hai-mushkil']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['kamli-dhoom-3']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['sheila-ki-jawani-tees-maar-khan']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['crazy-kiya-re-dhoom-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['dhoom-machale-dhoom']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['aaja-nachle-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId:
      TRACK_CUIDS['sunidhi.chauhan']['the-disco-song-student-of-the-year']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['jonita.gandhi']['what-jhumka']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['a.r.rahman']['chaka-chak-atragi-re']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['b.praak']['saari-duniya-jalaa-denge-animal']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['jeet.ganguly']['boss-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['honey.singh']['maniac-glory']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['honey.singh']['millionaire-glory']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId:
      TRACK_CUIDS['pritam.chakraborty']['subhanallah-yeh-jawaani-hai-deewani']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['in-dino-life-in-a-metro']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['usha.uthup']['auva-auva-koi-yahan-nache']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['usha.uthup']['uri-uri-baba']
  },
  {
    playlistId: PLAYLIST_CUIDS['bollywood-bangers'],
    trackId: TRACK_CUIDS['jeet.ganguly']['raaz-aankhein-teri-raaz-reboot']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['deewani-mastani-bajirao-mastani']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['ghoomar-padmaavat']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['aayat-bajirao-mastani']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['nagada-sang-dhol-ram-leela']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['ami-je-tomar-bhool-bhulaiyaa-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['munbe-vaa-sillunu-oru-kaadhal']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['kishore.kumar']['ami-chini-go-chini-charulata']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['kumar.sanu']['tujhe-dekha-to-yeh-jaana-sanam']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['kumar.sanu']['ek-ladki-ko-dekha-to-1942-a-love-story']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['kumar.sanu']['mera-dil-bhi-kitna-pagal-hai']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['suno-na-sangemarmar-youngistaan']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['atif.aslam']['pehli-nazar-mein-race']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['atif.aslam']['tu-jaane-na-ajab-prem-ki-ghazab-kahani']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['atif.aslam']['tera-hone-laga-hoon']
  },
  {
    playlistId: PLAYLIST_CUIDS['classical-hits'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['janam-janam-dilwale']
  },
  {
    playlistId: PLAYLIST_CUIDS['devotional-bliss'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['namo-shankara-mahashivaratri']
  },
  {
    playlistId: PLAYLIST_CUIDS['devotional-bliss'],
    trackId: TRACK_CUIDS['usha.uthup']['vande-mataram-k3g']
  },
  {
    playlistId: PLAYLIST_CUIDS['devotional-bliss'],
    trackId: TRACK_CUIDS['b.praak']['teri-mitti-kesari']
  },
  {
    playlistId: PLAYLIST_CUIDS['devotional-bliss'],
    trackId: TRACK_CUIDS['anupam.roy']['jaago-jaago-uma']
  },
  {
    playlistId: PLAYLIST_CUIDS['devotional-bliss'],
    trackId: TRACK_CUIDS['a.r.rahman']['maa-tujhe-salaam']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['zubeen.garg']['ya-ali-gangster']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['arijit.singh']['phir-le-aaya-dil-barfi']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['sonu.nigam']['shukran-allah-kurbaan']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['a.r.rahman']['tu-hi-re-bombay']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['atif.aslam']['jeena-jeena-badlapur']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['k.k']['khuda-jaane-bachna-ae-haseeno']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['jeet.ganguly']['hamari-adhuri-kahani-title-track']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['tum-se-hi-jab-we-met']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['arijit.singh']['suno-na-sangemarmar-youngistaan']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['atif.aslam']['woh-lamhe-woh-baatein-zeher']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId:
      TRACK_CUIDS['pritam.chakraborty']['pee-loon-once-upon-a-time-in-mumbaai']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['jeet.ganguly']['muskurane-citylights']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['arijit.singh']['aayat-bajirao-mastani']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['atif.aslam']['tere-sang-yaara-rustom']
  },
  {
    playlistId: PLAYLIST_CUIDS['sufi-sanctuary'],
    trackId: TRACK_CUIDS['atif.aslam']['pehli-nazar-mein-race']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['gaali-vaaluga-agnyaathavaasi']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['hoyna-hoyna-gang-leader']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId:
      TRACK_CUIDS['anirudh.ravichander']['baitikochi-chuste-agnyaathavaasi']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['jonita.gandhi']['nuvve-nuvve-kick-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId:
      TRACK_CUIDS['a.r.rahman']['vellipomaakey-saahasam-swaasaga-saagipo']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['ee-raathale-radhe-shyam']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['arijit.singh']['anuvanuvuu-om-bheem-bush']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['sonu.nigam']['mungaru-maleye']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['sonu.nigam']['anisuthide-yaako-indhu-mungaru-maleye']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['neenadena-yuvarathnaa']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['anuraga-vilochananayi']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['neel-digante']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['jeev-rangla-jogwa']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['adhir-man-zhaley']
  },
  {
    playlistId: PLAYLIST_CUIDS['regional-hits'],
    trackId: TRACK_CUIDS['zubeen.garg']['tumi-suwa-jetia']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['ed.sheeran']['give-me-love']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['ed.sheeran']['thinking-out-loud']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['ed.sheeran']['sapphire-feat-arijit-singh']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId:
      TRACK_CUIDS['a.r.rahman']['vellipomaakey-saahasam-swaasaga-saagipo']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['jonita.gandhi']['mental-manadhil-ok-kanmani']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['munbe-vaa-sillunu-oru-kaadhal']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['arijit.singh']['ee-raathale-radhe-shyam']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['sonu.nigam']['mungaru-maleye']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['sonu.nigam']['anisuthide-yaako-indhu-mungaru-maleye']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['neel-digante']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['anupam.roy']['journey-song-piku']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['anupam.roy']['gobheere-jao-baishe-srabon']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['jao-pakhi-bolo']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['anupam.roy']['ure-jaak-uma']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['anupam.roy']['bezubaan-piku']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['arijit.singh']['tomake-chuye-dilam']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['usha.uthup']['aami-shotti-bolchi-kahaani']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['oh-my-love-amanush-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['b.praak']['mann-bharryaa-2-0-shershaah']
  },
  {
    playlistId: PLAYLIST_CUIDS['deep-focus'],
    trackId: TRACK_CUIDS['b.praak']['ranjha-shershaah']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['anupam.roy']['bezubaan-piku']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['anupam.roy']['journey-song-piku']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['anupam.roy']['ure-jaak-uma']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['jao-pakhi-bolo']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['anupam.roy']['bariye-dao-tomar-haat']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['neel-digante']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['anuraga-vilochananayi']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['munbe-vaa-sillunu-oru-kaadhal']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['jonita.gandhi']['mental-manadhil-ok-kanmani']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['sonu.nigam']['mungaru-maleye']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['ed.sheeran']['give-me-love']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['ed.sheeran']['thinking-out-loud']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['sam.smith']['stay-with-me']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['sam.smith']['im-not-the-only-one']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['ed.sheeran']['sapphire-feat-arijit-singh']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['arijit.singh']['ki-kore-toke-bolbo']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['arijit.singh']['mon-majhi-re']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['arijit.singh']['tomake-chuye-dilam']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['atif.aslam']['woh-lamhe-woh-baatein-zeher']
  },
  {
    playlistId: PLAYLIST_CUIDS['quiet-moments'],
    trackId: TRACK_CUIDS['jeet.ganguly']['muskurane-citylights']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['k.k']['pyaar-ke-pal']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['k.k']['yaaron-rockford']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['jonita.gandhi']['beparwai-solo']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['b.praak']['filhaal-single']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['honey.singh']['dheere-dheere-single']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['honey.singh']['maniac-glory']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['honey.singh']['millionaire-glory']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['honey.singh']['blue-eyes-single']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['born-to-shine-g-o-a-t']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['anupam.roy']['amake-amar-moto-thakte-dao']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['anupam.roy']['bondhu-chol']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['anupam.roy']['jaago-jaago-uma']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['tumi-bondhu-aaj-shunbe']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['chawlraastaye-autograph']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['zubeen.garg']['khuda-jaane-paglu-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['pritam.chakraborty']['in-dino-life-in-a-metro']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['arijit.singh']['mon-majhi-re']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['arijit.singh']['ki-kore-toke-bolbo']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['arijit.singh']['tomake-chuye-dilam']
  },
  {
    playlistId: PLAYLIST_CUIDS['indie-india'],
    trackId: TRACK_CUIDS['usha.uthup']['aami-shotti-bolchi-kahaani']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kishore.kumar']['mere-sapno-ki-rani-aradhana']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kishore.kumar']['o-mere-dil-ke-chain']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kishore.kumar']['yeh-shaam-mastani-kati-patang']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kishore.kumar']['roop-tera-mastana-aradhana']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kishore.kumar']['pal-pal-dil-ke-paas-blackmail']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kishore.kumar']['ami-chini-go-chini-charulata']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kumar.sanu']['tujhe-dekha-to-yeh-jaana-sanam']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kumar.sanu']['ek-ladki-ko-dekha-to-1942-a-love-story']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId:
      TRACK_CUIDS['kumar.sanu']['chura-ke-dil-mera-main-khiladi-tu-anari']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kumar.sanu']['mera-dil-bhi-kitna-pagal-hai']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kumar.sanu']['jab-koi-baat-bigad-jaye-jurm']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['kumar.sanu']['do-dil-mil-rahe-hain-pardes']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['usha.uthup']['darling-7-khoon-maaf']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['usha.uthup']['hari-om-hari-pyara-dushman']
  },
  {
    playlistId: PLAYLIST_CUIDS['retro-classics'],
    trackId: TRACK_CUIDS['usha.uthup']['rambha-ho-ho-ho-armageddon']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['guli-mata']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['arabic-kuthu-beast']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['anuraga-vilochananayi']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['namo-shankara-mahashivaratri']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['munbe-vaa-sillunu-oru-kaadhal']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['jonita.gandhi']['mental-manadhil-ok-kanmani']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['yimmy-yimmy-tayc']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['a.r.rahman']['tu-hi-re-bombay']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['a.r.rahman']['hamma-hamma-bombay']
  },
  {
    playlistId: PLAYLIST_CUIDS['arabic-malayalam-fusion'],
    trackId: TRACK_CUIDS['jonita.gandhi']['chellamma-doctor-tamil']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['b.praak']['saari-duniya-jalaa-denge-animal']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['zinda-banda-jawan']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['hukum-jailer']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['naa-ready-leo']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['vaathi-coming-master']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['arabic-kuthu-beast']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['gaali-vaaluga-agnyaathavaasi']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['hoyna-hoyna-gang-leader']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId:
      TRACK_CUIDS['anirudh.ravichander']['baitikochi-chuste-agnyaathavaasi']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['ayudha-pooja-devara']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['imagine.dragons']['believer-evolve-2017']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['imagine.dragons']['thunder-evolve']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['imagine.dragons']['bleeding-out-night-visions']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['imagine.dragons']['gods-dont-pray-loom']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['a.r.rahman']['jai-ho-slumdog-millionaire']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['imagine.dragons']['nice-to-meet-you-loom']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['jeet.ganguly']['raaz-aankhein-teri-raaz-reboot']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId:
      TRACK_CUIDS['pritam.chakraborty']['subhanallah-yeh-jawaani-hai-deewani']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['usha.uthup']['uri-uri-baba']
  },
  {
    playlistId: PLAYLIST_CUIDS['action-anthems'],
    trackId: TRACK_CUIDS['atif.aslam']['dil-diyan-gallan-tiger-zinda-hai']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['a.r.rahman']['maa-tujhe-salaam']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['usha.uthup']['vande-mataram-k3g']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['sonu.nigam']['sandese-aate-hain-border']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['b.praak']['teri-mitti-kesari']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['a.r.rahman']['jai-ho-slumdog-millionaire']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['anupam.roy']['jaago-jaago-uma']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['arijit.singh']['suno-na-sangemarmar-youngistaan']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['namo-shankara-mahashivaratri']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['tumi-bondhu-aaj-shunbe']
  },
  {
    playlistId: PLAYLIST_CUIDS['patriotic-pride'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['born-to-shine-g-o-a-t']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['ghoomar-padmaavat']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['nagada-sang-dhol-ram-leela']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['sunidhi.chauhan']['beedi-omkara']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['a.r.rahman']['chaka-chak-atragi-re']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['jeev-rangla-jogwa']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['adhir-man-zhaley']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['chawlraastaye-autograph']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['patiala-peg']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['honey.singh']['brown-rang-international-villager']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['diljit.dosanjh']['proper-patola-namaste-england']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['jonita.gandhi']['takdi-ravan-jindua']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['honey.singh']['raat-jashan-di']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['honey.singh']['lungi-dance-chennai-express']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['anirudh.ravichander']['why-this-kolaveri-di']
  },
  {
    playlistId: PLAYLIST_CUIDS['folk-treasures'],
    trackId: TRACK_CUIDS['a.r.rahman']['urvasi-urvasi']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['alan.walker']['faded-official']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['alan.walker']['alone-official']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['alan.walker']['not-you']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['alan.walker']['on-my-way']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['alan.walker']['the-spectre']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['dua.lipa']['one-kiss-calvin-harris']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['dua.lipa']['levitating-feat-dababy']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['dua.lipa']['dont-start-now']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['ed.sheeran']['bad-habits']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['dua.lipa']['houdini-single']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['sam.smith']['dancing-with-a-stranger-normani']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['sam.smith']['unholy-kim-petras']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['taylor.swift']['shake-it-off-1989']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['taylor.swift']['cruel-summer-lover']
  },
  {
    playlistId: PLAYLIST_CUIDS['electronic-beats'],
    trackId: TRACK_CUIDS['dua.lipa']['new-rules']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['shreya.ghoshal']['tumi-bondhu-aaj-shunbe']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['anupam.roy']['gobheere-jao-baishe-srabon']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['anupam.roy']['ekbar-bol']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['anupam.roy']['bezubaan-piku']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['jasmine.sandlas']['sawan-mein']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['jasmine.sandlas']['ittar-desi-melodies']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['anupam.roy']['journey-song-piku']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['jonita.gandhi']['mental-manadhil-ok-kanmani']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId:
      TRACK_CUIDS['a.r.rahman']['vellipomaakey-saahasam-swaasaga-saagipo']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['arijit.singh']['ee-raathale-radhe-shyam']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['sonu.nigam']['mungaru-maleye']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['ed.sheeran']['give-me-love']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['ed.sheeran']['thinking-out-loud']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['ed.sheeran']['sapphire-feat-arijit-singh']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['sam.smith']['stay-with-me']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['k.k']['pyaar-ke-pal']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['k.k']['yaaron-rockford']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['arijit.singh']['ki-kore-toke-bolbo']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['arijit.singh']['mon-majhi-re']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['atif.aslam']['tere-sang-yaara-rustom']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['atif.aslam']['o-saathi-baaghi-2']
  },
  {
    playlistId: PLAYLIST_CUIDS['beats-to-think-to'],
    trackId: TRACK_CUIDS['zubeen.garg']['dil-tu-hi-bataa-krrish-3']
  }
]
