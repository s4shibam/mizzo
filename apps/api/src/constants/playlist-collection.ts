/* cspell:disable */

export const APP_PICKS_PLAYLIST_IDS: string[] = [
  'z7ugoobnr9wgmly2mujah6j4', // bollywood-romantic-hits
  'm4kiniri3b47yzpikgiybk7q', // ar-rahman-classics
  'l8cet0r812qrq2mebrfq9954', // arijit-singh-love-songs
  'ltaz13sssjwx54x7cxnlyu4v', // cross-cultural-fusion
  'lpp9ottgcyyas1i8iosgiacs', // indie-india
  'edhh14d0offac30u55y5qwas', // deep-focus
  'vpfycdkenc2c3dr6pz7hrhwz', // quiet-moments
  'lai0h63khqyev0pou2sgws0a' // beats-to-think-to
]

export const TRENDING_PLAYLIST_IDS: string[] = [
  'kane4wmvhovc819uhyeunu1v', // bollywood-bangers
  'vwm1zrdb6oi20lyd5bxlpalc', // tamil-dance-anthems
  'g0p3bz88dji9i5cnotrgc90x', // punjabi-party-bangers
  'q63oy5in3kwzyfyjmpxgz6kp', // bollywood-item-songs
  'ci0usr1e3xer6qpj57bhicf0', // action-anthems
  'vc4lwcqzflo5b52gkgxocc6e', // electronic-beats
  'tjbxkba7by13kozovuuefuez', // western-pop-favorites
  'osgfthau7fs1v4uwg7tt0sbz' // arabic-malayalam-fusion
]

export const INDIA_LISTENING_PLAYLIST_IDS: string[] = [
  'la1mp6y7tugoajm76g52zjlr', // bengali-soulful-collection
  'innbyplefa7fg5gm1p79wpwc', // classical-hits
  'x3ijncbbgu12ktz8fgnsshmf', // devotional-bliss
  'qpdowoirpa4jkhi3ic97v5ua', // sufi-sanctuary
  'dzuabd0p1uvjjk3t6oebee8g', // regional-hits
  'fy8jdxsmwj9r6e80ia0gnwxm', // retro-classics
  'sg6as30usqvhfa0ls3xocq1c', // patriotic-pride
  'iru0n8bfkbzjqehdshv2gzil' // folk-treasures
]

export const playlistCollectionMap: Record<
  string,
  {
    heading: string
    playlist_ids: string[]
  }
> = {
  app_picks: {
    heading: 'Mizzo Picks',
    playlist_ids: APP_PICKS_PLAYLIST_IDS
  },
  most_played: {
    heading: 'Most Played',
    playlist_ids: TRENDING_PLAYLIST_IDS
  },
  india_listening: {
    heading: 'India Listening',
    playlist_ids: INDIA_LISTENING_PLAYLIST_IDS
  }
}
