import { styled } from 'nativewind';
import * as React from 'react';

import { type Media, MediaType } from '@/types/anilist';
import { BannerCard, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import CardSwiper from '@/ui/card-swiper';
import { FeatureItem } from '@/ui/feature-item';
import {
  Character as CharacterIcon,
  ImageIcon,
  Schedule as ScheduleIcon,
  VoiceActor as VoiceActorIcon,
} from '@/ui/icons';

const SScheduleIcon = styled(ScheduleIcon);
const SImageIcon = styled(ImageIcon);
const SCharacterIcon = styled(CharacterIcon);
const SVoiceActorIcon = styled(VoiceActorIcon);

// @ts-ignore
const animeList: Media[] = [
  {
    id: 105334,
    type: MediaType.Anime,
    title: {
      userPreferred: 'Fruits Basket: 1st Season',
      english: 'Fruits Basket (2019)',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx105334-b7sF53ayVDoB.jpg',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx105334-b7sF53ayVDoB.jpg',
      color: '#e4d6a1',
    },
    startDate: {
      year: 2019,
      month: 4,
      day: 6,
    },
    endDate: {
      year: 2019,
      month: 9,
      day: 21,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/105334-dPfrCyZ8GkOI.jpg',
    season: 'SPRING',
    seasonYear: 2019,
    description:
      'Tohru Honda thought her life was headed for misfortune when a family tragedy left her living in a tent. When her small home is discovered by the mysterious Soma clan, she suddenly finds herself living with Yuki, Kyo, and Shigure Soma. But she quickly learns their family has a bizarre secret of their own: when hugged by the opposite sex, they turn into the animals of the Zodiac!\n<br><br>\n(Source: Crunchyroll)',
    format: 'TV',
    status: 'FINISHED',
    episodes: 25,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 10390,
    trending: 3,
    genres: ['Comedy', 'Drama', 'Romance', 'Slice of Life', 'Supernatural'],
    isAdult: false,
    averageScore: 82,
    popularity: 212693,
    trailer: {
      id: 'bIcQIZUarjY',
      site: 'youtube',
    },
    nextAiringEpisode: null,
  },
  {
    id: 125206,
    type: MediaType.Anime,
    title: {
      userPreferred: 'Tsuki ga Michibiku Isekai Douchuu',
      english: 'TSUKIMICHI -Moonlit Fantasy-',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx125206-O2MsOWdW1lVi.jpg',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx125206-O2MsOWdW1lVi.jpg',
      color: '#e4a150',
    },
    startDate: {
      year: 2021,
      month: 7,
      day: 7,
    },
    endDate: {
      year: 2021,
      month: 9,
      day: 22,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/125206-UdWijVTgcC5t.jpg',
    season: 'SUMMER',
    seasonYear: 2021,
    description:
      'Makoto Misumi was just an average teenager who happened to suddenly be summoned to another world as a "hero." But the goddess of this world called him ugly and took his hero status away from him then sent him to the ends of the world. In the wastelands, he meets dragons, spiders, orcs, dwarves and many other non-human races. Makoto manages to show promises in the use of magic and fighting, which he wouldn\'t have been able to do in his former world. He has numerous encounters, but will he be able to survive this new world? A fantasy where a guy who had been abandoned by gods and humanity tries to reset his life in this new world is about to begin!<br>\n<br>\n(Source: Crunchyroll)',
    format: 'TV',
    status: 'FINISHED',
    episodes: 12,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 2686,
    trending: 3,
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    isAdult: false,
    averageScore: 76,
    popularity: 77859,
    trailer: {
      id: 'U8T63kIny7E',
      site: 'youtube',
    },
    nextAiringEpisode: null,
  },
  {
    id: 130588,
    type: MediaType.Anime,
    title: {
      userPreferred:
        'Maou Gakuin no Futekigousha: Shijou Saikyou no Maou no Shiso, Tensei shite Shison-tachi no Gakkou e Kayou II',
      english:
        "The Misfit of Demon King Academy Ⅱ: History's Strongest Demon King Reincarnates and Goes to School with His Descendants",
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130588-zYz8Gp2kZfTm.jpg',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx130588-zYz8Gp2kZfTm.jpg',
      color: '#e45dc9',
    },
    startDate: {
      year: 2023,
      month: 1,
      day: 8,
    },
    endDate: {
      year: 2023,
      month: 9,
      day: 24,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/130588-TVZlsARgfLfm.jpg',
    season: 'WINTER',
    seasonYear: 2023,
    description:
      'As peace returns to the demon realm, Anos Voldigoad wishes nothing more than to put his reputation as the Demon King of Tyranny to rest and go back to being a misfit at the prestigious Demon King Academy. Unfortunately, any tranquility is fleeting: sinister demons, kings, and deities plot Anos\'s demise from the shadows.\n<br><br>\nRumors spread about the "Child of God," a being whose power may rival that of Anos. To uncover the truth and eliminate the potential threat, Anos must journey deep into the land of spirits. However, the spirit world is shrouded in mystery, and it may only be entered after undergoing a series of difficult trials.\n<br><br>\nWith unrivaled power and confidence, Anos braces himself to defeat various formidable enemies with grandiose titles. But he—with the assistance of his trusted allies—will barely have to break a sweat as the true Demon King of Tyranny.\n<br><br>\n(Source: MAL Rewrite)',
    format: 'TV',
    status: 'RELEASING',
    episodes: 12,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 1860,
    trending: 12,
    genres: ['Action', 'Fantasy'],
    isAdult: false,
    averageScore: 69,
    popularity: 76183,
    trailer: {
      id: 'yr0YpMLsEaA',
      site: 'youtube',
    },
    nextAiringEpisode: {
      airingAt: 1693668600,
      episode: 9,
    },
  },
  {
    id: 135806,
    type: MediaType.Anime,
    title: {
      userPreferred: 'Isekai Oji-san',
      english: 'Uncle from Another World',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx135806-NwyVfDvm0O3G.jpg',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx135806-NwyVfDvm0O3G.jpg',
      color: '#f1a15d',
    },
    startDate: {
      year: 2022,
      month: 7,
      day: 6,
    },
    endDate: {
      year: 2023,
      month: 3,
      day: 8,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/135806-1220X720dDpZ.jpg',
    season: 'SUMMER',
    seasonYear: 2022,
    description:
      "​Seventeen years ago, Takafumi's uncle fell into a coma, but now he's back like a man risen from his grave. Soon, Takafumi discovers two bizarre things: His uncle treasures video games above all else, and, while comatose, he was actually transported to another world as some heroic guardian! Now, not only does Takafumi have to room with an uncle who is literally magical, he also has to catch the guy up on two decades of history—smartphones, high-speed internet, modern anime tropes…and the traumatic outcome of the '90s console war!  <br>\n<br>\n(Source: Yen Press)",
    format: 'TV',
    status: 'FINISHED',
    episodes: 13,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 1989,
    trending: 4,
    genres: ['Adventure', 'Comedy', 'Fantasy'],
    isAdult: false,
    averageScore: 77,
    popularity: 71903,
    trailer: {
      id: 'A3UCpef8-D0',
      site: 'youtube',
    },
    nextAiringEpisode: null,
  },
  {
    id: 146065,
    type: MediaType.Anime,
    title: {
      userPreferred: 'Mushoku Tensei II: Isekai Ittara Honki Dasu',
      english: 'Mushoku Tensei: Jobless Reincarnation Season 2',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx146065-1hTpwsW2fQIA.jpg',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx146065-1hTpwsW2fQIA.jpg',
      color: '#e4a143',
    },
    startDate: {
      year: 2023,
      month: 7,
      day: 3,
    },
    endDate: {
      year: 2023,
      month: 9,
      day: 25,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/146065-33RDijfuxLLk.jpg',
    season: 'SUMMER',
    seasonYear: 2023,
    description:
      'The second season of <i>Mushoku Tensei: Isekai Ittara Honki Dasu</i>. <br><br>\nRudeus heads north with new friends and powers in search of adventure and those he once knew.  <br><br>\n(Source: Crunchyroll)<br><br>\n<i>Note: Includes episode 0.</i>',
    format: 'TV',
    status: 'RELEASING',
    episodes: 13,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 3563,
    trending: 47,
    genres: ['Adventure', 'Drama', 'Ecchi', 'Fantasy'],
    isAdult: false,
    averageScore: 83,
    popularity: 102711,
    trailer: {
      id: 'ts5NGoDI1V0',
      site: 'youtube',
    },
    nextAiringEpisode: {
      airingAt: 1693753200,
      episode: 10,
    },
  },
  {
    id: 148465,
    type: MediaType.Anime,
    title: {
      userPreferred: 'Level 1 dakedo Unique Skill de Saikyou desu',
      english: 'My Unique Skill Makes Me OP even at Level 1',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx148465-JHRudD6EbUVU.jpg',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx148465-JHRudD6EbUVU.jpg',
      color: '#0d78fe',
    },
    startDate: {
      year: 2023,
      month: 7,
      day: 8,
    },
    endDate: {
      year: 2023,
      month: 9,
      day: 23,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/148465-BHAQJr9zZPO4.jpg',
    season: 'SUMMER',
    seasonYear: 2023,
    description:
      'Satou Ryouta, a salaryman working for an exploitative company, suddenly finds himself inside an unfamiliar dungeon in a strange world where monsters drop all sorts of items as loot. With the help of a girl he happens to run into named Emily, he\'s able to check his own stats... and finds that all of them, both physical and magical, are at rank F (the weakest)! What\'s more, his level is stuck at 1 (the lowest)! Ryouta is on the verge of utter despair... but then he learns that he also has "Drop Skill: All S," the most powerful unique skill there is! Can Ryouta manage to survive in this bizarre world?! The strongest and weakest adventure of all is about to begin!<br>\n<br>\n(Source: Crunchyroll)',
    format: 'TV',
    status: 'RELEASING',
    episodes: 12,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 463,
    trending: 9,
    genres: ['Adventure', 'Fantasy'],
    isAdult: false,
    averageScore: 60,
    popularity: 19532,
    trailer: {
      id: '33c4X2wvInM',
      site: 'youtube',
    },
    nextAiringEpisode: {
      airingAt: 1693659600,
      episode: 9,
    },
  },
  {
    id: 153339,
    type: MediaType.Anime,
    title: {
      userPreferred: 'Okashi na Tensei',
      english: 'Sweet Reincarnation',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153339-u8i4Sc28U6En.jpg',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx153339-u8i4Sc28U6En.jpg',
      color: '#f1a15d',
    },
    startDate: {
      year: 2023,
      month: 7,
      day: 4,
    },
    endDate: {
      year: null,
      month: null,
      day: null,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/153339-nQlvdfni50jE.jpg',
    season: 'SUMMER',
    seasonYear: 2023,
    description:
      "A boy named Pastry is set to become the next lord of the destitute dominion of Morteln. He's known for having remarkable talent for his age... and it just so happens he was a genius pastry chef with a promising future in his previous life! He still retains his determination to make sweets that will make everyone smile, even after reincarnating as Pastry. But many challenges stand before him, including bandits attacking his domain, malicious and eccentric nobles, an unfortunate financial situation, and land so barren that even water is scarce. The only weapons he has to fight them with are his own ingenuity and love for making sweets. Can Pastry succeed in bringing happiness to the land?!<br>\n<br>\n(Source: Crunchyroll)<br><br>\n<i>Note: Episodes are streaming on Crunchyroll, UNEXT and Anime Houdai 1 week in advance of regular broadcast.</i>",
    format: 'TV',
    status: 'RELEASING',
    episodes: 12,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 347,
    trending: 15,
    genres: ['Action', 'Fantasy', 'Slice of Life'],
    isAdult: false,
    averageScore: 63,
    popularity: 14529,
    trailer: {
      id: 'MyIlkg5B5zA',
      site: 'youtube',
    },
    nextAiringEpisode: {
      airingAt: 1693845000,
      episode: 11,
    },
  },
  {
    id: 156040,
    type: MediaType.Anime,
    title: {
      userPreferred:
        'Higeki no Genkyou to Naru Saikyou Gedou Last Boss Joou wa Tami no Tame ni Tsukushimasu.',
      english: 'The Most Heretical Last Boss Queen: From Villainess to Savior',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx156040-qWlfbAk6GJJR.png',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx156040-qWlfbAk6GJJR.png',
      color: '#e4865d',
    },
    startDate: {
      year: 2023,
      month: 7,
      day: 7,
    },
    endDate: {
      year: 2023,
      month: 9,
      day: 22,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/156040-5ZETAYIXKOU2.jpg',
    season: 'SUMMER',
    seasonYear: 2023,
    description:
      'It’s one thing to get reincarnated as a righteous hero. It’s another thing entirely to get reincarnated as a villain! Our protagonist was just reincarnated into the body of Princess Pride Royal Ivy, the last boss and ultimate villain of her favorite otome game. But evil just isn’t her style, so she’ll use Pride’s powerful abilities to sow peace and love instead of discord! Can she change the fate of this vile villainess, or is her role in the story already rotten to the core?<br>\n<br>\n(Source: HIDIVE)',
    format: 'TV',
    status: 'RELEASING',
    episodes: 12,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 339,
    trending: 47,
    genres: ['Comedy', 'Fantasy', 'Romance'],
    isAdult: false,
    averageScore: 68,
    popularity: 15392,
    trailer: {
      id: 'euuksRO5YuU',
      site: 'youtube',
    },
    nextAiringEpisode: {
      airingAt: 1694098800,
      episode: 10,
    },
  },
  {
    id: 157397,
    type: MediaType.Anime,
    title: {
      userPreferred: 'Yumemiru Danshi wa Genjitsushugisha',
      english: 'The Dreaming Boy is a Realist',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx157397-L1ZUMTuxf8OK.jpg',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx157397-L1ZUMTuxf8OK.jpg',
      color: '#c9f1f1',
    },
    startDate: {
      year: 2023,
      month: 7,
      day: 4,
    },
    endDate: {
      year: 2023,
      month: 9,
      day: 19,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/157397-lMf3pt84a0EQ.jpg',
    season: 'SUMMER',
    seasonYear: 2023,
    description:
      'Sajou Wataru, who is deeply in love with his beautiful classmate Natsukawa Aika, is continuing to approach her without getting discouraged while having dreams about their mutual love. However one day he woke up thinking "I am not really fit to be together with someone as good as her, huh..." Upon realizing this, Wataru started keeping an appropriate distance towards her, much to Aika\'s surprise. "Could it be that he hates me now...?" Did his intentions slip by her because she was getting impatient after arriving at the wrong conclusion!? This is the start of a romcom revolving around two people who just can\'t get their feelings across and both think their love is unrequited!',
    format: 'TV',
    status: 'RELEASING',
    episodes: 12,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 760,
    trending: 23,
    genres: ['Comedy', 'Romance', 'Slice of Life'],
    isAdult: false,
    averageScore: 63,
    popularity: 28131,
    trailer: {
      id: 'B64pev0auco',
      site: 'youtube',
    },
    nextAiringEpisode: {
      airingAt: 1693846800,
      episode: 10,
    },
  },
  {
    id: 159831,
    type: MediaType.Anime,
    title: {
      userPreferred: 'Zom 100: Zombie ni Naru Made ni Shitai 100 no Koto',
      english: 'Zom 100: Bucket List of the Dead',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx159831-TxAC0ujoLTK6.png',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx159831-TxAC0ujoLTK6.png',
      color: '#d6e428',
    },
    startDate: {
      year: 2023,
      month: 7,
      day: 9,
    },
    endDate: {
      year: 2023,
      month: 10,
      day: 15,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/159831-FWfdyqpxhLli.jpg',
    season: 'SUMMER',
    seasonYear: 2023,
    description:
      "Surviving a zombie apocalypse beats being a wage slave any day! After spending years slaving away for a soul-crushing company, Akira's life has lost its luster. He lives in a trash-filled apartment, his pay is abysmal, and he can't even muster up the nerve to confess his love to his beautiful co-worker. But when a zombie apocalypse ravages his town, it gives him the push he needs to live for himself. Now Akira's on a mission to complete all 100 items on his bucket list before he...well, kicks the bucket.\n<br><br>\n(Source: Viz Media) ",
    format: 'TV',
    status: 'RELEASING',
    episodes: 12,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 2602,
    trending: 74,
    genres: ['Action', 'Comedy', 'Horror'],
    isAdult: false,
    averageScore: 80,
    popularity: 98356,
    trailer: {
      id: '2VvZIEXmltw',
      site: 'youtube',
    },
    nextAiringEpisode: {
      airingAt: 1693728000,
      episode: 7,
    },
  },
  {
    id: 163132,
    type: MediaType.Anime,
    title: {
      userPreferred: 'Horimiya: piece',
      english: 'Horimiya: The Missing Pieces',
    },
    coverImage: {
      extraLarge:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx163132-C220CO5UrTxY.jpg',
      large:
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx163132-C220CO5UrTxY.jpg',
      color: '#e4a143',
    },
    startDate: {
      year: 2023,
      month: 7,
      day: 1,
    },
    endDate: {
      year: 2023,
      month: 9,
      day: 23,
    },
    bannerImage:
      'https://s4.anilist.co/file/anilistcdn/media/anime/banner/163132-bxxTKGlmlnOm.jpg',
    season: 'SUMMER',
    seasonYear: 2023,
    description:
      'A new anime project adapting popular side stories that were left out from the previous adaptation.\n<br><br>\nAs the graduation ceremony at Katagiri High School comes to an end, Kyouko Hori, her boyfriend Izumi Miyamura, and their friends begin to look back on their time as students. The moments they shared together may be fleeting, but each one is a colorful piece of their precious memories.\n<br><br>\n(Source: MAL Rewrite)',
    format: 'TV',
    status: 'RELEASING',
    episodes: 13,
    duration: 24,
    chapters: null,
    volumes: null,
    favourites: 1789,
    trending: 24,
    genres: ['Comedy', 'Romance', 'Slice of Life'],
    isAdult: false,
    averageScore: 81,
    popularity: 66092,
    trailer: {
      id: 'sZNb0jxVmF4',
      site: 'youtube',
    },
    nextAiringEpisode: {
      airingAt: 1693665000,
      episode: 10,
    },
  },
];

animeList[0].bannerImage =
  'https://www.themoviedb.org/t/p/original/rpGgUr2gxJPY3sZKm45xIp2qUAE.jpg';

export const AnimeHomeScreen = () => {
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="relative h-96 w-full">
          <BannerCard media={animeList[0]} />
        </View>

        <View className="flex-1 p-4">
          <View className="mb-8 space-y-1">
            <FeatureItem
              leftIcon={<SScheduleIcon className="h-5 w-5 text-white" />}
              className="flex-1 p-4"
              title="Episodes schedule"
              to="/schedule"
            />

            <View className="flex flex-row items-center gap-2">
              <FeatureItem
                leftIcon={<SImageIcon className="h-7 w-7 text-white" />}
                className="flex-1 flex-col p-4"
                title="Scene"
                to="/schedule"
              />

              <FeatureItem
                leftIcon={<SCharacterIcon className="h-7 w-7 text-white" />}
                className="flex-1 flex-col p-4"
                title="Character"
                to="/schedule"
              />
              <FeatureItem
                leftIcon={<SVoiceActorIcon className="h-7 w-7 text-white" />}
                className="flex-1 flex-col p-4"
                title="Staff"
                to="/schedule"
              />
            </View>
          </View>

          <View className="mb-8 w-full space-y-2">
            <Text variant="lg">Airing now</Text>

            <CardSwiper data={animeList} />
          </View>

          <View className="w-full space-y-2">
            <Text variant="lg">Upcoming</Text>

            <CardSwiper data={animeList} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
