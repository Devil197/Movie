const films = [
    {
        "id": "1",
        "title": "Maou Gakuin no Futekigoushaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "thumb": "https://img.anime47.com/imgur/xVuhyWc.jpg",
        "_id": "P8qEusQiwsw",
        "url": "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FCua-HIEUTHUHAIMANBO-6408297.mp3?alt=media&token=5ffa692a-e5e9-4778-8277-e0aeae2bfdc0",
    },
    {
        "id": "2",
        "title": "Peter Grill to Kenja no Jikan",
        "thumb": "https://img.anime47.com/imgur/6hhR2bl.jpg",
        "_id": "vP4zGMdTDPM",
        "url": "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FLinkin_Park_-_In_The_End_(Mellen_Gi_%26_Tommee_Profitt_Remix)_v2%5B1%5D.mp3?alt=media&token=34597cf8-fa16-4959-9513-7bea40576efe",
    },
    {
        "id": "3",
        "title": "Dokyuu Hentai HxEros",
        "thumb": "https://img.anime47.com/imgur/gEfsKK8.jpg",
        "_id": "QihWKyosoYw",
        "url": "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FCua-HIEUTHUHAIMANBO-6408297.mp3?alt=media&token=5ffa692a-e5e9-4778-8277-e0aeae2bfdc0",
    },
    {
        "id": "4",
        "title": "Kanojo, Okarishimasu",
        "thumb": "https://img.anime47.com/imgur/KKrknWT.jpg",
        "_id": "WNeLUngb-Xg",
        "url": "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FLinkin_Park_-_In_The_End_(Mellen_Gi_%26_Tommee_Profitt_Remix)_v2%5B1%5D.mp3?alt=media&token=34597cf8-fa16-4959-9513-7bea40576efe",
    },
    {
        "id": "5",
        "title": "Deca-Dence",
        "thumb": "https://img.anime47.com/imgur/4A8EO07.jpg",
        "_id": "2JL_KcEzkqg",
        "url": "https://firebasestorage.googleapis.com/v0/b/asmmob306-78bf4.appspot.com/o/music%2FCua-HIEUTHUHAIMANBO-6408297.mp3?alt=media&token=5ffa692a-e5e9-4778-8277-e0aeae2bfdc0",
    },
    {
        "id": "6",
        "title": "Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season",
        "thumb": "https://img.anime47.com/imgur/9HpTWLd.jpg",
        "_id": "j__Q13iAxNk",
        "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
    },
    {
        "id": 7,
        "title": "The God of High School",
        "thumb": "https://img.anime47.com/imgur/A9txARE.jpg"
    },
    {
        "id": 8,
        "title": "Sword Art Online: Alicization - Đại Chiến Underworld 2",
        "thumb": "https://img.anime47.com/imgur/dcfyjSL.png"
    },
    {
        "id": 9,
        "title": "Lapis Re:LiGHTs",
        "thumb": "https://img.anime47.com/imgur/o6Ghr0q.jpg"
    },
    {
        "id": 10,
        "title": "Ore wo Suki nano wa Omae dake ka yo: Oretachi no Game Set",
        "thumb": "https://img.anime47.com/imgur/DlO2bxC.jpg"
    },
    {
        "id": 11,
        "title": "Ninja Collection",
        "thumb": "https://img.anime47.com/imgur/TJFUev7.jpg"
    },
    {
        "id": 12,
        "title": "Uzaki-chan wa Asobitai!",
        "thumb": "https://img.anime47.com/imgur/BMSYbHI.jpg"
    },
    {
        "id": 13,
        "title": "Monster Musume no Oishasan",
        "thumb": "https://img.anime47.com/imgur/5Ebljox.jpg"
    },
    {
        "id": 14,
        "title": "Nakitai Watashi wa Neko wo Kaburu",
        "thumb": "https://img.anime47.com/imgur/x47Eo0U.jpg"
    },
    {
        "id": 15,
        "title": "Baki 2nd Season",
        "thumb": "https://img.anime47.com/imgur/X4reTK5.jpg"
    },
    {
        "id": 16,
        "title": "Heya Camp△: Sauna to Gohan to Miwa Bike Bluray",
        "thumb": "https://img.anime47.com/imgur/xtfuN49.jpg"
    },
    {
        "id": 17,
        "title": "BanG Dream! Garupa☆Pico: Oomori",
        "thumb": "https://img.anime47.com/imgur/mjFb7f6.jpg"
    },
    {
        "id": 18,
        "title": "Evangelion: 3.0+1.0",
        "thumb": "https://img.anime47.com/imgur/N82fZGy.jpg"
    },
    {
        "id": 19,
        "title": "Given Movie",
        "thumb": "https://img.anime47.com/imgur/eWSn0n5.jpg"
    },
    {
        "id": 20,
        "title": "Omoi, Omoware, Furi, Furare",
        "thumb": "https://img.anime47.com/imgur/zzWrp7B.jpg"
    },
    {
        "id": 21,
        "title": "Shokugeki no Souma: Gou no Sara",
        "thumb": "https://img.anime47.com/imgur/mFpZYeU.jpg"
    },
    {
        "id": 22,
        "title": "Houkago Teibou Nisshi",
        "thumb": "https://img.anime47.com/imgur/n9Lu06d.jpg"
    },
    {
        "id": 23,
        "title": "Fruits Basket 2nd Season",
        "thumb": "https://img.anime47.com/imgur/dZligE2.jpg"
    },
    {
        "id": 24,
        "title": "No Guns Life 2nd Season",
        "thumb": "https://img.anime47.com/imgur/gpMeLAe.jpg"
    },
    {
        "id": 25,
        "title": "Fugou Keiji: Balance:Unlimited",
        "thumb": "https://img.anime47.com/imgur/1VtjNKS.jpg"
    },
    {
        "id": 26,
        "title": "Yu☆Gi☆Oh!: Sevens",
        "thumb": "https://img.anime47.com/imgur/HJ7Hzot.jpg"
    },
    {
        "id": 27,
        "title": "Gundam Build Divers Re:Rise 2nd Season",
        "thumb": "https://img.anime47.com/imgur/3iLjAgi.jpg"
    },
    {
        "id": 28,
        "title": "Shadowverse (TV)",
        "thumb": "https://img.anime47.com/imgur/LIhTVQ3.jpg"
    },
    {
        "id": 29,
        "title": "Strike the Blood Ⅳ",
        "thumb": "https://img.anime47.com/imgur/6HN03r0.jpg"
    },
    {
        "id": 30,
        "title": "Digimon Adventure:",
        "thumb": "https://img.anime47.com/imgur/YBBv2AF.jpg"
    },
    {
        "id": 31,
        "title": "Bungou to Alchemist: Shinpan no Haguruma",
        "thumb": "https://img.anime47.com/imgur/Q3H9AkY.jpg"
    },
    {
        "id": 32,
        "title": "Tamayomi",
        "thumb": "https://img.anime47.com/imgur/H4DlQ8x.jpg"
    },
    {
        "id": 33,
        "title": "Kitsutsuki Tanteidokoro",
        "thumb": "https://img.anime47.com/imgur/zl1K5v2.jpg"
    },
    {
        "id": 34,
        "title": "Argonavis from BanG Dream!",
        "thumb": "https://img.anime47.com/imgur/oka7Tnh.jpg"
    },
    {
        "id": 35,
        "title": "Shachou, Battle no Jikan Desu!",
        "thumb": "https://img.anime47.com/imgur/7HMZh0l.jpg"
    },
    {
        "id": 36,
        "title": "Princess Connect! Re:Dive",
        "thumb": "https://img.anime47.com/imgur/iObbi16.jpg"
    },
    {
        "id": 37,
        "title": "Gleipnir",
        "thumb": "https://img.anime47.com/imgur/WSgvXYV.jpg"
    },
    {
        "id": 38,
        "title": "Tsugu Tsugumomo",
        "thumb": "https://img.anime47.com/imgur/WfBhJ4s.jpg"
    },
    {
        "id": 39,
        "title": "Kaguya-sama wa Kokurasetai?: Tensai-tachi no Renai Zunousen",
        "thumb": "https://img.anime47.com/imgur/Cqh26UT.jpg"
    },
    {
        "id": 40,
        "title": "Mashin Eiyuuden Wataru: Nana Tamashii no Ryuujinmaru",
        "thumb": "https://img.anime47.com/imgur/utr2mVW.jpg"
    },
    {
        "id": 41,
        "title": "Honey And Clover",
        "thumb": "https://img.anime47.com/imgur/G8UWSl5.jpg"
    },
    {
        "id": 42,
        "title": "Toaru Kagaku no Railgun T",
        "thumb": "https://img.anime47.com/imgur/UdJIai4.jpg"
    },
    {
        "id": 43,
        "title": "Shokugeki no Souma: Gou no Sara",
        "thumb": "https://img.anime47.com/imgur/mFpZYeU.jpg"
    },
    {
        "id": 44,
        "title": "Biệt Đội Lính Cứu Hỏa Phần 2",
        "thumb": "https://img.anime47.com/imgur/UekNDIr.jpg"
    },
    {
        "id": 45,
        "title": "Kanojo, Okarishimasu",
        "thumb": "https://img.anime47.com/imgur/KKrknWT.jpg"
    },
    {
        "id": 46,
        "title": "Yahari Ore no Seishun Love Comedy wa Machigatteiru. Kan",
        "thumb": "https://img.anime47.com/imgur/zoArbgQ.jpg"
    },
    {
        "id": 47,
        "title": "Bakugan Battle Brawlers: Gundalian Invaders",
        "thumb": "https://img.anime47.com/imgur/gJCtnmU.jpg"
    },
    {
        "id": 48,
        "title": "Zenonzard The Animation",
        "thumb": "https://img.anime47.com/imgur/hXqO7Wo.jpg"
    },
    {
        "id": 49,
        "title": "Houkago Teibou Nisshi",
        "thumb": "https://img.anime47.com/imgur/n9Lu06d.jpg"
    },
    {
        "id": 50,
        "title": "Gibiate",
        "thumb": "https://img.anime47.com/imgur/uvDAjQA.jpg"
    },
    {
        "id": 51,
        "title": "Muhyo to Rouji no Mahouritsu Soudan Jimusho 2nd Season",
        "thumb": "https://img.anime47.com/imgur/lmSfOTV.jpg"
    },
    {
        "id": 52,
        "title": "Strike Witches - 501 Butai Hasshin Shimasu! Gekijouban",
        "thumb": "https://img.anime47.com/imgur/ulpwpBa.jpg"
    },
    {
        "id": 53,
        "title": "Healin' Good♡Precure",
        "thumb": "https://img.anime47.com/imgur/K8216JX.jpg"
    },
    {
        "id": 54,
        "title": "Ahiru no Sora",
        "thumb": "https://img.anime47.com/imgur/68adU8B.png"
    },
    {
        "id": 55,
        "title": "Jojos Bizarre Adventure",
        "thumb": "https://img.anime47.com/imgur/idpm6J0.jpg"
    },
    {
        "id": 56,
        "title": "Black Clover",
        "thumb": "https://img.anime47.com/imgur/3RPi4eW.jpg"
    },
    {
        "id": 57,
        "title": "Fruits Basket 2nd Season",
        "thumb": "https://img.anime47.com/imgur/dZligE2.jpg"
    },
    {
        "id": 58,
        "title": "Ookami-san wa Taberaretai",
        "thumb": "https://img.anime47.com/imgur/6ggTOxg.jpg"
    },
    {
        "id": 59,
        "title": "Pokemon (2019)",
        "thumb": "https://img.anime47.com/imgur/x0pSTVc.jpg"
    },
    {
        "id": 60,
        "title": "Anime Music Video",
        "thumb": "https://s2.vndb.org/cv/40/28440.jpg"
    },
    {
        "id": 61,
        "title": "Jinzo Ningen Hakaider",
        "thumb": "https://img.anime47.com/imgur/MMB5qVh.jpg"
    },
    {
        "id": 62,
        "title": "Dororo Live Action",
        "thumb": "https://img.anime47.com/imgur/KEjAtax.jpg"
    },
    {
        "id": 63,
        "title": "Kamen Rider Build the Movie: Be the One",
        "thumb": "https://img.anime47.com/imgur/37dJSuy.jpg"
    },
    {
        "id": 64,
        "title": "Mình Muốn Ăn Tụy Của Cậu",
        "thumb": "https://img.anime47.com/imgur/o9yXo3d.jpg"
    },
    {
        "id": 65,
        "title": "Lão Hạc Siêu Nhân",
        "thumb": "https://img.anime47.com/imgur/DXanldC.jpg"
    },
    {
        "id": 66,
        "title": "Sukina Hito Ga Iru Koto",
        "thumb": "https://img.anime47.com/imgur/Qh1cv42.jpg"
    },
    {
        "id": 67,
        "title": "Yêu Lại Từ Đầu",
        "thumb": "https://img.anime47.com/imgur/neNvweM.jpg"
    },
    {
        "id": 68,
        "title": "Kuzu no Honkai: Ước nguyện của kẻ cặn bã",
        "thumb": "https://img.anime47.com/imgur/Mx1IyzW.jpg"
    }
]

const menu = [

    "Action",
    "Adventure",
    "Casual",
    "Indie",
    "Multiplayer",
    "Racing",
    "RPG",
    "Simulation",
    "Sports",
    "Strategy"
]
export { films, menu }