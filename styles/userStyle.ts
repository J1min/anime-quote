import { createGlobalStyle } from "styled-components";

const UserStyle = createGlobalStyle` 
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 200;
  font-style: normal;
}

@font-face {
    font-family: 'Chosunilbo_myungjo';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Chosunilbo_myungjo.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

html {
  font-family: 'Pretendard-Regular';
}
`;

export default UserStyle;
