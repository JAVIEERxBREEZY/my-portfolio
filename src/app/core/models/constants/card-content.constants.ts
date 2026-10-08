import { ICard, ICardColors } from "../interfaces/card.interface";


export const CARD_DATA: { card: ICard; colors: ICardColors, btnType: string }[] = [
  {
    card: {
      image: 'assets/images/profiles/linkedin-profile.jpeg',
      icon : 'bi-linkedin',
      name: 'Javier Sanz Roa',
      description: 'CARDS.LINKEDIN.DESCRIPTION',
      link: 'https://www.linkedin.com/in/javier-sanz-roa/'
    },
    colors: {
      header : '#e9e5df', content : '#FFF', icon : '#0a66c2'
    },
    btnType : 'c-btn--linkedin'
  },
  {
    card: {
      image: 'assets/images/profiles/github-profile.jpg',
      icon : 'bi-github',
      name: 'JAVIEERxBREEZY',
      description: 'CARDS.GITHUB.DESCRIPTION',
      link: 'https://github.com/JAVIEERxBREEZY'
    },
    colors: {
      header : '#1E1F1C', content : '#FFF', icon : '#FFF'
    },
    btnType : 'c-btn--github'
  },
  {
    card : {
      image : 'assets/images/profiles/youtube-profile.jpg',
      icon : 'bi-youtube',
      name : 'Código JS',
      description : 'CARDS.YOUTUBE.DESCRIPTION',
      link : 'https://www.youtube.com/c/C%C3%B3digoJS'
    },
    colors: {
      header : '#e1002d', content : '', icon : ''
    },
    btnType : 'c-btn--yt'
  }
];
