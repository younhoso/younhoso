import acc_ballcap from './acc_ballcap.svg';
import acc_earbuds from './acc_earbuds.svg';
import acc_earings from './acc_earings.svg';
import acc_headset from './acc_headset.svg';
import acc_nametag from './acc_nametag.svg';
import acc_none from './acc_none.svg';
import hair_default_blonde from './hair_default-blonde.svg';
import hair_default_brown from './hair_default-brown.svg';
import hair_long1_black from './hair_long1-black.svg';
import hair_long1_blonde from './hair_long1-blonde.svg';
import hair_long1_brown from './hair_long1-brown.svg';
import hair_long2_black from './hair_long2-black.svg';
import hair_long2_blonde from './hair_long2-blonde.svg';
import hair_long2_brown from './hair_long2-brown.svg';
import hair_long3_black from './hair_long3-black.svg';
import hair_long3_blonde from './hair_long3-blonde.svg';
import hair_long3_brown from './hair_long3-brown.svg';
import hair_none_black from './hair_none-black.svg';
import hair_short1_black from './hair_short1-black.svg';
import hair_short1_blonde from './hair_short1-blonde.svg';
import hair_short1_brown from './hair_short1-brown.svg';
import hair_short2_black from './hair_short2-black.svg';
import hair_short2_blonde from './hair_short2-blonde.svg';
import hair_short2_brown from './hair_short2-brown.svg';
import hair_short3_black from './hair_short3-black.svg';
import hair_short3_blonde from './hair_short3-blonde.svg';
import hair_short3_brown from './hair_short3-brown.svg';
import tone_100 from './tone_100.svg';
import tone_200 from './tone_200.svg';
import tone_300 from './tone_300.svg';
import tone_400 from './tone_400.svg';
import collar_basic from './collar_basic.svg';
import dress_formal from './dress_formal.svg';
import hoodie from './hoodie.svg';
import jacket_leather from './jacket_leather.svg';
import knit_layered from './knit_layered.svg';
import knit_vest from './knit_vest.svg';
import tshirt_basic from './tshirt_basic.svg';
import tshirt_printed from './tshirt_printed.svg';
import PreviewAccBallcap from './previews/preview_acc_ballcap.svg';
import PreviewAccEarbuds from './previews/preview_acc_earbuds.svg';
import PreviewAccEarings from './previews/preview_acc_earings.svg';
import PreviewAccHeadset from './previews/preview_acc_headset.svg';
import PreviewAccNametag from './previews/preview_acc_nametag.svg';
import PreviewAccNone from './previews/preview_acc_none.svg';
import PreviewCollarBasic from './previews/preview_collar_basic.svg';
import PreviewColorBlack from './previews/preview_color_black.svg';
import PreviewColorBlonde from './previews/preview_color_blonde.svg';
import PreviewColorBrown from './previews/preview_color_brown.svg';
import PreviewDressFormal from './previews/preview_dress_formal.svg';
import PreviewHairDefault from './previews/preview_hair_default.svg';
import PreviewHairLong1 from './previews/preview_hair_long1.svg';
import PreviewHairLong2 from './previews/preview_hair_long2.svg';
import PreviewHairLong3 from './previews/preview_hair_long3.svg';
import PreviewHairShort1 from './previews/preview_hair_short1.svg';
import PreviewHairShort2 from './previews/preview_hair_short2.svg';
import PreviewHairShort3 from './previews/preview_hair_short3.svg';
import PreviewHoodie from './previews/preview_hoodie.svg';
import PreviewJacketLeather from './previews/preview_jacket_leather.svg';
import PreviewKnitLayered from './previews/preview_knit_layered.svg';
import PreviewKnitVest from './previews/preview_knit_vest.svg';
import PreviewTone100 from './previews/preview_tone_100.svg';
import PreviewTone200 from './previews/preview_tone_200.svg';
import PreviewTone300 from './previews/preview_tone_300.svg';
import PreviewTone400 from './previews/preview_tone_400.svg';
import PreviewTshirtBasic from './previews/preview_tshirt_basic.svg';
import PreviewTshirtPrinted from './previews/preview_tshirt_printed.svg';

const hair = {
  none: {
    black: hair_none_black,
    blonde: hair_default_blonde,
    brown: hair_default_brown,
  },
  long1: {
    black: hair_long1_black,
    blonde: hair_long1_blonde,
    brown: hair_long1_brown,
  },
  long2: {
    black: hair_long2_black,
    blonde: hair_long2_blonde,
    brown: hair_long2_brown,
  },
  long3: {
    black: hair_long3_black,
    blonde: hair_long3_blonde,
    brown: hair_long3_brown,
  },
  short1: {
    black: hair_short1_black,
    blonde: hair_short1_blonde,
    brown: hair_short1_brown,
  },
  short2: {
    black: hair_short2_black,
    blonde: hair_short2_blonde,
    brown: hair_short2_brown,
  },
  short3: {
    black: hair_short3_black,
    blonde: hair_short3_blonde,
    brown: hair_short3_brown,
  },
};

const accessories = {
  ballcap: acc_ballcap,
  earbuds: acc_earbuds,
  earings: acc_earings,
  headset: acc_headset,
  nametag: acc_nametag,
  none: acc_none,
};

const skin = {
  tone100: tone_100,
  tone200: tone_200,
  tone300: tone_300,
  tone400: tone_400,
};

const clothes = {
  collarBasic: collar_basic,
  dressFormal: dress_formal,
  hoodie: hoodie,
  jacketLeather: jacket_leather,
  knitLayered: knit_layered,
  knitVest: knit_vest,
  tshirtBasic: tshirt_basic,
  tshirtPrinted: tshirt_printed,
};

export const PreviewAvatarImages = {
  hairType: {
    none: PreviewHairDefault,
    long1: PreviewHairLong1,
    long2: PreviewHairLong2,
    long3: PreviewHairLong3,
    short1: PreviewHairShort1,
    short2: PreviewHairShort2,
    short3: PreviewHairShort3,
  },
  hairColor: {
    blonde: PreviewColorBlonde,
    brown: PreviewColorBrown,
    black: PreviewColorBlack,
  },
  clothes: {
    collarBasic: PreviewCollarBasic,
    dressFormal: PreviewDressFormal,
    hoodie: PreviewHoodie,
    jacketLeather: PreviewJacketLeather,
    knitLayered: PreviewKnitLayered,
    knitVest: PreviewKnitVest,
    tshirtBasic: PreviewTshirtBasic,
    tshirtPrinted: PreviewTshirtPrinted,
  },
  accessories: {
    ballcap: PreviewAccBallcap,
    earbuds: PreviewAccEarbuds,
    earings: PreviewAccEarings,
    headset: PreviewAccHeadset,
    nametag: PreviewAccNametag,
    none: PreviewAccNone,
  },
  skin: {
    tone100: PreviewTone100,
    tone200: PreviewTone200,
    tone300: PreviewTone300,
    tone400: PreviewTone400,
  },
};

export const AvatarImages = {
  hair,
  accessories,
  skin,
  clothes,
};

export const AvatarImageLabels = {
  hairType: {
    none: '머리 없음',
    long1: '긴 머리 1',
    long2: '긴 머리 2',
    long3: '긴 머리 3',
    short1: '짧은 머리 1',
    short2: '짧은 머리 2',
    short3: '짧은 머리 3',
  },
  hairColor: {
    black: '검정',
    blonde: '금발',
    brown: '갈색',
  },
  accessories: {
    ballcap: '모자',
    earbuds: '이어폰',
    earings: '귀걸이',
    headset: '헤드셋',
    nametag: '이름표',
    none: '액세서리 없음',
  },
  skin: {
    tone100: '톤 100',
    tone200: '톤 200',
    tone300: '톤 300',
    tone400: '톤 400',
  },
  clothes: {
    collarBasic: '기본 카라티',
    dressFormal: '검은 드레스',
    hoodie: '후드티',
    jacketLeather: '가죽 재킷',
    knitLayered: '니트 가디건',
    knitVest: '니트 조끼',
    tshirtBasic: '기본 티셔츠',
    tshirtPrinted: '프린트 티셔츠',
  },
};
