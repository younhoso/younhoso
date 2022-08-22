import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap%27');
  /* =========== // CSS RESET =========== */
  html,body { height:100%;}
  body { -webkit-text-size-adjust:none; }
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,textarea,p,blockquote,th,td,input,select,textarea,button { margin:0; padding:0; box-sizing:border-box;}
  body,input,select,textarea,button,table { font-family: $font-main,'맑은 고딕','Malgun Gothic','Apple SD Gothic Neo','돋움',dotum, sans-serif; font-size: $font-size-16; color: $primary; font-weight:400; word-break:keep-all; word-wrap:break-word; letter-spacing: $letter-spacing-16;}
  h1,h2,h3,h4, h5,h6 { font-weight:inherit; font-size:inherit; }
  iframe, fieldset { border:0; }
  img { border:0; vertical-align:middle; }
  article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary { display:block; }
  dl,ul,ol,menu,li { list-style:none; }
  em,address { font-style:normal; }
  a { color:inherit; text-decoration:none; }
  a:hover,a:active,a:focus { text-decoration:none; }
  input,select,textarea,button { 
      border: 0; vertical-align:middle; background:transparent;
      &:focus { 
          outline:none; box-shadow: none; 
      }
  }
  button { cursor:pointer; width:auto; overflow:visible; color:inherit; font-size:inherit; vertical-align:middle; background:transparent; border:0; }
  button[disabled="disabled"] { cursor:default; }
  sup { line-height:1; font-size:0.4em; }
  table { border-collapse:separate; border-spacing:0; table-layout:fixed; width:100%; empty-cells:show; }
  caption,legend { visibility:hidden; font-size:0; width:0; height:0; line-height:0; }
  input[type='text']::-ms-clear, input[type='password']::-ms-reveal { display:none; }
  input[disabled="disabled"], input[readonly="readonly"], select[disabled="disabled"], input.disabled, input.readonly { background-color:#f5f5f5; cursor:default; border-color:#ddd; }
  select { vertical-align:middle; -webkit-appearance:none; -moz-appearance:none; appearance:none; border-radius:0; }
  select::-ms-expand { display:none; }
  ::-webkit-input-placeholder { color:#888 !important; font-weight:normal; }
  ::-moz-placeholder { color:#888 !important; font-weight:normal; }
  :-ms-input-placeholder { color:#888 !important; font-weight:normal !important; }
  :-moz-placeholder { color:#888 !important; font-weight:normal; }
  select.placeholder { color:#888 !important; font-weight:normal; }
  th, td { text-indent:0; }
  /* =========== CSS RESET // =========== */
`;

export default GlobalStyles;
